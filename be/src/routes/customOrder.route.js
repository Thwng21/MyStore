const express = require("express");
const router = express.Router();
const customOrderController = require("../controllers/customOrder.controller");

router.post("/", customOrderController.create);
router.get("/", customOrderController.getAll); // Có thể cần auth middleware sau này

module.exports = router;
