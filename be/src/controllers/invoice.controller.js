const Invoice = require("../models/invoice.model");

exports.createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("order")
      .populate("payment");

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
