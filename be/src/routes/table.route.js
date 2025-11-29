const express = require("express");
const router = express.Router();
const TableController = require("../controllers/table.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  validateRegister,
  validateLogin,
  validateChangePassword,
} = require("../middlewares/validation.middleware");

// Public routes
router.get("/", TableController.getAllTables);
router.get("/:id", TableController.getTableById);
router.post("/", authenticate, TableController.createTable);
router.post("/bulk", authenticate, TableController.createMultipleTables); // Thêm route tạo nhiều bàn
router.patch("/:id/status", authenticate, TableController.updateTableStatus); // Thêm route cập nhật trạng thái
router.put("/:id", authenticate, TableController.updateTable);
router.delete("/:id", authenticate, TableController.deleteTable);


module.exports = router;
