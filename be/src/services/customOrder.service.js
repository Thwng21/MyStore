const CustomOrder = require("../models/customOrder.model");

class CustomOrderService {
  async createOrder(data) {
    const order = await CustomOrder.create(data);
    return order;
  }

  async getAllOrders() {
    return await CustomOrder.find().sort({ createdAt: -1 });
  }
}

module.exports = new CustomOrderService();
