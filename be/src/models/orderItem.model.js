const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // giá tại thời điểm order
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderItem", OrderItemSchema);
// MẶT HÀNG TRONG ĐƠN HÀNG: SẢN PHẨM, SỐ LƯỢNG, GIÁ TẠI THỜI ĐIỂM ORDER