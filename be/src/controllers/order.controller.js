const orderService = require("../services/order.service");

class OrderController {
  // Lấy danh sách orders
  async getAllOrders(req, res) {
    try {
      const { status, table, page = 1, limit = 20 } = req.query;
      
      const result = await orderService.getAllOrders({
        status,
        table,
        page,
        limit,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy chi tiết order
  async getOrderById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id);

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
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
      
      const order = await orderService.createOrder({ table, items });

      res.status(201).json({
        success: true,
        message: "Tạo order thành công",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Thêm món vào order (staff)
  async addItemToOrder(req, res) {
    try {
      const { productId, quantity } = req.body;
      
      const order = await orderService.addItem(req.params.id, {
        productId,
        quantity,
      });

      res.status(200).json({
        success: true,
        message: "Thêm món thành công",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Xóa món khỏi order (staff)
  async removeItemFromOrder(req, res) {
    try {
      const { itemId } = req.body;
      
      const order = await orderService.removeItem(req.params.id, itemId);

      res.status(200).json({
        success: true,
        message: "Xóa món thành công",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật số lượng món (staff)
  async updateItemQuantity(req, res) {
    try {
      const { itemId, quantity } = req.body;
      
      const order = await orderService.updateItemQuantity(
        req.params.id,
        itemId,
        quantity
      );

      res.status(200).json({
        success: true,
        message: "Cập nhật số lượng thành công",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật trạng thái order (staff)
  async updateOrderStatus(req, res) {
    try {
      const { status } = req.body;
      
      const order = await orderService.updateStatus(req.params.id, status);

      res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái thành công",
        data: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Hủy order (staff/admin)
  async cancelOrder(req, res) {
    try {
      await orderService.cancelOrder(req.params.id);

      res.status(200).json({
        success: true,
        message: "Hủy order thành công",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new OrderController();