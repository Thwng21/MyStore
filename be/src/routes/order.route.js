const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  validateRegister,
  validateLogin,
  validateChangePassword,
} = require("../middlewares/validation.middleware");

// Public routes
router.get("/getAll", OrderController.getAllOrders);
router.get("/:id", OrderController.getOrderById);
router.post("/create", authenticate, OrderController.createOrder);
router.put("/:id", authenticate, OrderController.updateOrder);
router.delete("/:id", authenticate, OrderController.deleteOrder);

// Item manipulation routes
router.post("/:id/items", authenticate, OrderController.addItemToOrder);
router.put("/:id/items", authenticate, OrderController.updateItemQuantity);
router.delete("/:id/items", authenticate, OrderController.removeItemFromOrder);

module.exports = router;
