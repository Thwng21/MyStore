const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    price: { type: Number, required: true },
    image: { type: String }, // link hình
    description: { type: String },
    isAvailable: { type: Boolean, default: true }, // còn bán ko
    type: {
      type: String,
      enum: ["drink", "food"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
// SẢN PHẨM TRONG MENU: ĐỒ UỐNG, MÓN ĂN