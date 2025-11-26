const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // khách đặt

    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true },

    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
        total: Number,
      },
    ],

    subtotal: Number,
    discount: Number,
    finalTotal: Number,

    tableNumber: Number,

    receiptCode: { type: String, unique: true }, // mã biên lai: BL2025-012

    issuedAt: { type: Date, default: Date.now }, // thời điểm tạo biên lai
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receipt", ReceiptSchema);
// BIÊN LAI: THÔNG TIN CHI TIẾT VỀ GIAO DỊCH THANH TOÁN CỦA KHÁCH HÀNG