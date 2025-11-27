const orderService = require("../services/order.service");
const { colorStatus } = require("../until/logger");

class OrderController {
  // Lấy danh sách orders
  async getAllOrders(req, res) {
    try {
      const { status, table, page = 1, limit = 20 } = req.query;
      console.log(`📋 [GET] /api/orders - Lấy danh sách orders`, { status, table, page, limit });
      
      const result = await orderService.getAllOrders({
        status,
        table,
        page,
        limit,
      });

      console.log(`✅ ${colorStatus(200)} Lấy danh sách orders thành công: ${result.orders.length} orders`);
      
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(500)} Lỗi lấy danh sách orders: ${error.message}`);
      
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy chi tiết order
  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      console.log(`📋 [GET] /api/orders/${id} - Lấy chi tiết order`);
      
      const order = await orderService.getOrderById(id);

      console.log(`✅ ${colorStatus(200)} Lấy chi tiết order thành công: Order ${id} - ${order.status}`);
      
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(404)} Lỗi lấy chi tiết order: ${error.message}`);
      
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Tạo order mới (staff)
  async createOrder(req, res) {
    try {
      const { table, items } = req.body;
      console.log(`🆕 [POST] /api/orders - Tạo order mới`, { 
        table, 
        itemsCount: items?.length 
      });
      
      const order = await orderService.createOrder({ table, items });

      console.log(`✅ ${colorStatus(201)} Tạo order thành công: Order ${order._id} - ${order.totalAmount.toLocaleString()} VND`);
      
      res.status(201).json({
        success: true,
        message: "Tạo order thành công",
        data: order,
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(400)} Lỗi tạo order: ${error.message}`);
      
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Thêm món vào order (staff)
  async addItemToOrder(req, res) {
    try {
      const { id } = req.params;
      const { productId, quantity } = req.body;
      console.log(`➕ [PATCH] /api/orders/${id}/add-item - Thêm món vào order`, { productId, quantity });
      
      const order = await orderService.addItem(id, {
        productId,
        quantity,
      });

      console.log(`✅ ${colorStatus(200)} Thêm món thành công: Order ${id} - Số lượng: ${quantity}`);
      
      res.status(200).json({
        success: true,
        message: "Thêm món thành công",
        data: order,
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(400)} Lỗi thêm món vào order: ${error.message}`);
      
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Xóa món khỏi order (staff)
  async removeItemFromOrder(req, res) {
    try {
      const { id } = req.params;
      const { itemId } = req.body;
      console.log(`➖ [PATCH] /api/orders/${id}/remove-item - Xóa món khỏi order`, { itemId });
      
      const order = await orderService.removeItem(id, itemId);

      console.log(`✅ ${colorStatus(200)} Xóa món thành công: Order ${id} - Item ${itemId}`);
      
      res.status(200).json({
        success: true,
        message: "Xóa món thành công",
        data: order,
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(400)} Lỗi xóa món khỏi order: ${error.message}`);
      
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật số lượng món (staff)
  async updateItemQuantity(req, res) {
    try {
      const { id } = req.params;
      const { itemId, quantity } = req.body;
      console.log(`✏️ [PATCH] /api/orders/${id}/update-quantity - Cập nhật số lượng món`, { itemId, quantity });
      
      const order = await orderService.updateItemQuantity(id, itemId, quantity);

      console.log(`✅ ${colorStatus(200)} Cập nhật số lượng thành công: Order ${id} - Item ${itemId} -> ${quantity}`);
      
      res.status(200).json({
        success: true,
        message: "Cập nhật số lượng thành công",
        data: order,
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(400)} Lỗi cập nhật số lượng món: ${error.message}`);
      
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật trạng thái order (staff)
  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log(`🔄 [PATCH] /api/orders/${id}/status - Cập nhật trạng thái order: ${status}`);
      
      const order = await orderService.updateStatus(id, status);

      console.log(`✅ ${colorStatus(200)} Cập nhật trạng thái thành công: Order ${id} -> ${status}`);
      
      res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái thành công",
        data: order,
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(400)} Lỗi cập nhật trạng thái order: ${error.message}`);
      
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Hủy order (staff/admin)
  async cancelOrder(req, res) {
    try {
      const { id } = req.params;
      console.log(`🚫 [PATCH] /api/orders/${id}/cancel - Hủy order`);
      
      await orderService.cancelOrder(id);

      console.log(`✅ ${colorStatus(200)} Hủy order thành công: Order ${id}`);
      
      res.status(200).json({
        success: true,
        message: "Hủy order thành công",
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(400)} Lỗi hủy order: ${error.message}`);
      
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật order (chung)
  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log(`✏️ [PUT] /api/orders/${id} - Cập nhật order`, { status });
      
      // Hiện tại chỉ hỗ trợ update status qua route này
      if (status) {
        const order = await orderService.updateStatus(id, status);
        
        console.log(`✅ ${colorStatus(200)} Cập nhật order thành công: Order ${id} -> ${status}`);
        
        return res.status(200).json({
          success: true,
          message: "Cập nhật order thành công",
          data: order,
        });
      }
      
      console.log(`❌ ${colorStatus(400)} Dữ liệu cập nhật không hợp lệ`);
      
      res.status(400).json({
        success: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(400)} Lỗi cập nhật order: ${error.message}`);
      
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Xóa order
  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      console.log(`🗑️ [DELETE] /api/orders/${id} - Xóa order`);
      
      await orderService.cancelOrder(id);

      console.log(`✅ ${colorStatus(200)} Xóa order thành công: Order ${id}`);
      
      res.status(200).json({
        success: true,
        message: "Xóa order thành công",
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(400)} Lỗi xóa order: ${error.message}`);
      
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Thanh toán order (thêm method mới)
  async processPayment(req, res) {
    try {
      const { id } = req.params;
      const { paymentMethod } = req.body;
      console.log(`💳 [PATCH] /api/orders/${id}/payment - Thanh toán order`, { paymentMethod });
      
      const order = await orderService.processPayment(id, paymentMethod);

      console.log(`✅ ${colorStatus(200)} Thanh toán thành công: Order ${id} - ${paymentMethod} - ${order.totalAmount.toLocaleString()} VND`);
      
      res.status(200).json({
        success: true,
        message: "Thanh toán thành công",
        data: order,
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(400)} Lỗi thanh toán order: ${error.message}`);
      
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy orders theo bàn (thêm method mới)
  async getOrdersByTable(req, res) {
    try {
      const { tableId } = req.params;
      console.log(`📋 [GET] /api/orders/table/${tableId} - Lấy orders theo bàn`);
      
      const orders = await orderService.getOrdersByTable(tableId);

      console.log(`✅ ${colorStatus(200)} Lấy orders theo bàn thành công: ${orders.length} orders`);
      
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(500)} Lỗi lấy orders theo bàn: ${error.message}`);
      
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new OrderController();