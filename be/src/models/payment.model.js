const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },

    amount: { type: Number, required: true },

    method: {
      type: String,
      enum: ["cash", "bank_qr", "momo", "other"],
      default: "cash",
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    bankCode: { type: String },   // Mã ngân hàng khi tạo VietQR
    accountNumber: { type: String }, // STK nhận tiền
    qrImage: { type: String }, // Lưu hình QR code thanh toán

    paidAt: { type: Date }, // Thời gian thanh toán thật
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
// THÔNG TIN THANH TOÁN CHO ĐƠN HÀNG: TIỀN, PHƯƠNG THỨC, TRẠNG THÁI