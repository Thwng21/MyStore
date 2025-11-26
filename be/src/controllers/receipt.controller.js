const Receipt = require("../models/receipt.model");

exports.createReceipt = async (req, res) => {
  try {
    const receipt = new Receipt(req.body);
    await receipt.save();
    res.status(201).json(receipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReceiptsByUser = async (req, res) => {
  try {
    const receipts = await Receipt.find({ user: req.params.userId })
      .populate("order")
      .populate("payment");

    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
