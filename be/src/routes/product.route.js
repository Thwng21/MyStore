const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  validateRegister,
  validateLogin,
  validateChangePassword,
} = require("../middlewares/validation.middleware");

// Public routes
router.get("/getAll", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/create", authenticate, ProductController.createProduct);
router.put("/:id", authenticate, ProductController.updateProduct);
router.delete("/:id", authenticate, ProductController.deleteProduct);
router.put("/:id/availability", authenticate, ProductController.updateAvailability);

module.exports = router;
