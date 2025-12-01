const mongoose = require("mongoose");

const CustomOrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    phone: { type: String },
    customerName: { type: String },
    orderDetails: { type: String, required: true }, // Mô tả sản phẩm, số lượng
    receiveDate: { type: Date },
    status: {
      type: String,
      enum: ["pending", "contacted", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomOrder", CustomOrderSchema);
