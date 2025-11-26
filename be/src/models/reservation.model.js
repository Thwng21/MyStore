const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // ví dụ: "19:00"
    numberOfPeople: { type: Number, required: true },
    note: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
// ĐẶT BÀN TRONG QUÁN: CHỜ XÁC NHẬN, ĐÃ XÁC NHẬN, ĐÃ HỦY