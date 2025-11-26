const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
    totalAmount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "serving", "completed", "paid"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "qr", "none"],
      default: "none",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
// ĐƠN HÀNG: CHỜ PHỤC VỤ, ĐANG PHỤC VỤ, HOÀN THÀNH, ĐÃ THANH TOÁN