const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    items: [
      {
        name: String,     // Tên món tại thời điểm xuất hóa đơn
        quantity: Number,
        price: Number,    // Giá tại thời điểm thanh toán
        total: Number,
      },
    ],

    tableNumber: { type: Number, required: true },

    subtotal: { type: Number, required: true }, // tổng tiền món ăn
    discount: { type: Number, default: 0 },
    finalTotal: { type: Number, required: true }, // sau giảm giá

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },

    cashierName: { type: String }, // ai xuất hóa đơn
    customerName: { type: String }, // nếu có

    qrImage: { type: String }, // lưu QR dùng để thanh toán (nếu có)
    invoiceCode: { type: String, unique: true }, // mã hóa đơn (HD2025-001)

    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
