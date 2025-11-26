const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema(
  {
    tableNumber: { type: Number, required: true, unique: true },
    status: {
      type: String,
      enum: ["empty", "reserved", "occupied"],
      default: "empty",
    },
    currentOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", TableSchema);
// BÀN ĂN TRONG NHÀ HÀNG: TRỐNG, ĐÃ ĐẶT, ĐANG SỬ DỤNG