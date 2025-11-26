const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  validateRegister,
  validateLogin,
  validateChangePassword,
} = require("../middlewares/validation.middleware");

// Public routes
router.get("/getAll", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/create", authenticate, CategoryController.createCategory);
router.put("/:id", authenticate, CategoryController.updateCategory);
router.delete("/:id", authenticate, CategoryController.deleteCategory);

module.exports = router;
