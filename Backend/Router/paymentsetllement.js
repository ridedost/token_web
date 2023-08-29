const express = require("express");
const paymentSetlement = express.Router();
const PaymentSettlement = require("../model/paymentSettle");
const { AdminAithentication, loginAuth } = require("../midleware/auth");

// GET route to fetch all payment settlements
paymentSetlement.get("/payment-settlements",loginAuth, async (req, res) => {
  try {
    const settlements = await PaymentSettlement.find();
    res.json(settlements);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports =  paymentSetlement;
