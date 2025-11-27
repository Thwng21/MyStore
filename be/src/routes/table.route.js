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
router.get("/getAll", TableController.getAllTables);
router.get("/:id", TableController.getTableById);
router.post("/create", authenticate, TableController.createTable);
router.put("/:id", authenticate, TableController.updateTable);
router.delete("/:id", authenticate, TableController.deleteTable);


module.exports = router;
