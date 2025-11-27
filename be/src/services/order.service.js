const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");
const Table = require("../models/table.model");
const Product = require("../models/product.model");
const { AppError } = require("../until/errorHandler");

class OrderService {
  // Lấy danh sách orders với filter và pagination
  async getAllOrders({ status, table, page = 1, limit = 20 }) {
    try {
      const filter = {};

      // Build filter object
      if (status) {
        filter.status = status;
      }

      if (table) {
        filter.table = table;
      }

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const [orders, total] = await Promise.all([
        Order.find(filter)
          .populate('table', 'tableNumber status')
          .populate({
            path: 'items',
            populate: {
              path: 'product',
              select: 'name price image'
            }
          })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .exec(),
        Order.countDocuments(filter)
      ]);

      const totalPages = Math.ceil(total / limitNum);

      return {
        orders,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalOrders: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      };
    } catch (error) {
      throw new AppError(`Lỗi khi lấy danh sách orders: ${error.message}`, 500);
    }
  }

  // Lấy chi tiết order theo ID
  async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId)
        .populate('table', 'tableNumber status')
        .populate({
          path: 'items',
          populate: {
            path: 'product',
            select: 'name price image description type'
          }
        });

      if (!order) {
        throw new AppError("Không tìm thấy order", 404);
      }

      return order;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID order không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Tạo order mới
  async createOrder({ table, items }) {
    let orderItems = [];
    try {
      // Validate required fields
      if (!table) {
        throw new AppError("Bàn là bắt buộc", 400);
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        throw new AppError("Danh sách món ăn là bắt buộc", 400);
      }

      // Check if table exists and is available
      const tableExists = await Table.findById(table);
      if (!tableExists) {
        throw new AppError("Không tìm thấy bàn", 404);
      }

      if (tableExists.status === 'occupied') {
        throw new AppError("Bàn đang được sử dụng", 400);
      }

      // Validate and create order items
      let totalAmount = 0;

      for (const item of items) {
        const { productId, quantity } = item;

        if (!productId) {
          throw new AppError("Product ID là bắt buộc", 400);
        }

        if (!quantity || quantity <= 0) {
          throw new AppError("Số lượng phải lớn hơn 0", 400);
        }

        // Check if product exists and is available
        const product = await Product.findById(productId);
        if (!product) {
          throw new AppError(`Không tìm thấy sản phẩm với ID: ${productId}`, 404);
        }

        if (!product.isAvailable) {
          throw new AppError(`Sản phẩm "${product.name}" hiện không khả dụng`, 400);
        }

        // Calculate item total
        const itemTotal = product.price * quantity;

        // Create order item
        const orderItem = new OrderItem({
          product: productId,
          quantity,
          price: product.price,
          // total: itemTotal // OrderItem schema doesn't have total field
        });

        const savedItem = await orderItem.save();
        orderItems.push(savedItem._id);
        totalAmount += itemTotal;
      }

      // Create order
      const order = new Order({
        table,
        items: orderItems,
        totalAmount,
        status: 'pending'
      });

      const savedOrder = await order.save();

      // Update table status
      await Table.findByIdAndUpdate(table, {
        status: 'occupied',
        currentOrder: savedOrder._id
      });

      return await this.getOrderById(savedOrder._id);
    } catch (error) {
      // Clean up: delete any created order items if order creation fails
      if (orderItems && orderItems.length > 0) {
        await OrderItem.deleteMany({ _id: { $in: orderItems } });
      }
      
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        throw new AppError(`Dữ liệu không hợp lệ: ${messages.join(', ')}`, 400);
      }
      throw error;
    }
  }

  // Thêm món vào order
  async addItem(orderId, { productId, quantity }) {
    try {
      if (!productId) {
        throw new AppError("Product ID là bắt buộc", 400);
      }

      if (!quantity || quantity <= 0) {
        throw new AppError("Số lượng phải lớn hơn 0", 400);
      }

      // Check if order exists and is not completed/paid
      const order = await Order.findById(orderId);
      if (!order) {
        throw new AppError("Không tìm thấy order", 404);
      }

      if (['completed', 'paid'].includes(order.status)) {
        throw new AppError("Không thể thêm món vào order đã hoàn thành", 400);
      }

      // Check if product exists and is available
      const product = await Product.findById(productId);
      if (!product) {
        throw new AppError("Không tìm thấy sản phẩm", 404);
      }

      if (!product.isAvailable) {
        throw new AppError(`Sản phẩm "${product.name}" hiện không khả dụng`, 400);
      }

      // Check if product already exists in order
      const existingItems = await OrderItem.find({ _id: { $in: order.items } });
      const existingItem = existingItems.find(item => 
        item.product.toString() === productId
      );

      let newOrderItem;
      let itemTotal;

      if (existingItem) {
        // Update existing item quantity
        existingItem.quantity += quantity;
        // existingItem.total = existingItem.unitPrice * existingItem.quantity;
        await existingItem.save();
        newOrderItem = existingItem;
        itemTotal = existingItem.price * quantity;
      } else {
        // Create new order item
        itemTotal = product.price * quantity;
        newOrderItem = new OrderItem({
          product: productId,
          quantity,
          price: product.price,
          // total: itemTotal
        });
        await newOrderItem.save();

        // Add to order items array
        order.items.push(newOrderItem._id);
      }

      // Update order total
      order.totalAmount += itemTotal;
      await order.save();

      return await this.getOrderById(orderId);
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Xóa món khỏi order
  async removeItem(orderId, itemId) {
    try {
      // Check if order exists
      const order = await Order.findById(orderId);
      if (!order) {
        throw new AppError("Không tìm thấy order", 404);
      }

      if (['completed', 'paid'].includes(order.status)) {
        throw new AppError("Không thể xóa món khỏi order đã hoàn thành", 400);
      }

      // Check if item exists in order
      if (!order.items.includes(itemId)) {
        throw new AppError("Món không tồn tại trong order", 404);
      }

      // Get item details before removal
      const orderItem = await OrderItem.findById(itemId);
      if (!orderItem) {
        throw new AppError("Không tìm thấy món", 404);
      }

      // Remove item from order and update total
      order.items = order.items.filter(id => id.toString() !== itemId);
      order.totalAmount -= (orderItem.price * orderItem.quantity);
      await order.save();

      // Delete the order item
      await OrderItem.findByIdAndDelete(itemId);

      return await this.getOrderById(orderId);
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Cập nhật số lượng món
  async updateItemQuantity(orderId, itemId, quantity) {
    try {
      if (!quantity || quantity <= 0) {
        throw new AppError("Số lượng phải lớn hơn 0", 400);
      }

      // Check if order exists
      const order = await Order.findById(orderId);
      if (!order) {
        throw new AppError("Không tìm thấy order", 404);
      }

      if (['completed', 'paid'].includes(order.status)) {
        throw new AppError("Không thể cập nhật order đã hoàn thành", 400);
      }

      // Check if item exists in order
      if (!order.items.includes(itemId)) {
        throw new AppError("Món không tồn tại trong order", 404);
      }

      // Update item quantity
      const orderItem = await OrderItem.findById(itemId);
      if (!orderItem) {
        throw new AppError("Không tìm thấy món", 404);
      }

      const oldTotal = orderItem.price * orderItem.quantity;
      orderItem.quantity = quantity;
      // orderItem.total = orderItem.unitPrice * quantity;
      await orderItem.save();

      // Update order total
      order.totalAmount = order.totalAmount - oldTotal + (orderItem.price * quantity);
      await order.save();

      return await this.getOrderById(orderId);
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Cập nhật trạng thái order
  async updateStatus(orderId, status) {
    try {
      const validStatuses = ['pending', 'serving', 'completed', 'paid'];
      if (!validStatuses.includes(status)) {
        throw new AppError(`Trạng thái không hợp lệ. Chỉ chấp nhận: ${validStatuses.join(', ')}`, 400);
      }

      const order = await Order.findById(orderId);
      if (!order) {
        throw new AppError("Không tìm thấy order", 404);
      }

      // Validate status transition
      if (order.status === 'paid' && status !== 'paid') {
        throw new AppError("Không thể thay đổi trạng thái của order đã thanh toán", 400);
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      )
      .populate('table', 'tableNumber status')
      .populate({
        path: 'items',
        populate: {
          path: 'product',
          select: 'name price image'
        }
      });

      // If order is completed or paid, free up the table
      if (status === 'completed' || status === 'paid') {
        await Table.findByIdAndUpdate(order.table, {
          status: 'empty',
          currentOrder: null
        });
      }

      return updatedOrder;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID order không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Hủy order
  async cancelOrder(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new AppError("Không tìm thấy order", 404);
      }

      if (order.status === 'paid') {
        throw new AppError("Không thể hủy order đã thanh toán", 400);
      }

      // Free up the table
      await Table.findByIdAndUpdate(order.table, {
        status: 'empty',
        currentOrder: null
      });

      // Delete order items
      await OrderItem.deleteMany({ _id: { $in: order.items } });

      // Delete order
      await Order.findByIdAndDelete(orderId);

      return { message: "Hủy order thành công" };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID order không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Thanh toán order
  async processPayment(orderId, paymentMethod) {
    try {
      const validPaymentMethods = ['cash', 'qr'];
      if (!validPaymentMethods.includes(paymentMethod)) {
        throw new AppError(`Phương thức thanh toán không hợp lệ. Chỉ chấp nhận: ${validPaymentMethods.join(', ')}`, 400);
      }

      const order = await Order.findById(orderId);
      if (!order) {
        throw new AppError("Không tìm thấy order", 404);
      }

      if (order.status === 'paid') {
        throw new AppError("Order đã được thanh toán", 400);
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          status: 'paid',
          paymentMethod
        },
        { new: true }
      )
      .populate('table', 'tableNumber status')
      .populate({
        path: 'items',
        populate: {
          path: 'product',
          select: 'name price image'
        }
      });

      // Free up the table
      await Table.findByIdAndUpdate(order.table, {
        status: 'empty',
        currentOrder: null
      });

      return updatedOrder;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID order không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Lấy orders theo bàn
  async getOrdersByTable(tableId) {
    try {
      const orders = await Order.find({ table: tableId })
        .populate('table', 'tableNumber status')
        .populate({
          path: 'items',
          populate: {
            path: 'product',
            select: 'name price image'
          }
        })
        .sort({ createdAt: -1 });

      return orders;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID bàn không hợp lệ", 400);
      }
      throw new AppError(`Lỗi khi lấy orders theo bàn: ${error.message}`, 500);
    }
  }
}

module.exports = new OrderService();