const Reservation = require("../models/reservation.model");

exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("table");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
