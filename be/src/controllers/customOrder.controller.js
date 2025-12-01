const customOrderService = require("../services/customOrder.service");
const { colorStatus } = require("../until/logger");

class CustomOrderController {
  async create(req, res) {
    try {
      const { email, phone, customerName, orderDetails, receiveDate } = req.body;
      
      const order = await customOrderService.createOrder({
        email,
        phone,
        customerName,
        orderDetails,
        receiveDate
      });

      console.log(`POST /custom-order => ${colorStatus(201)} | email: ${email}`);

      res.status(201).json({
        success: true,
        message: "Gửi yêu cầu đặt hàng thành công",
        data: order,
      });
    } catch (error) {
      console.log(`POST /custom-order => ${colorStatus(400)} | Error: ${error.message}`);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const orders = await customOrderService.getAllOrders();
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new CustomOrderController();
