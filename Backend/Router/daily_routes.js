const express = require("express");
const dailyReport = express.Router();
const daily= require("../model/paymentSettle");
const { AdminAithentication, loginAuth } = require("../midleware/auth");
const { set } = require("mongoose");
const CouponModel = require("../model/coupon");
const VendorSettlement = require("../model/Settlement");
// GET route to fetch all payment settlements
paymentSetlement.post("/dailyReports", async (req, res) => {
  try {
    const data = await CouponModel.find({ mobile: req.body.phoneNumber });
    const totalrequest=data.reduce((accumulator, e)=>{
            // if(e.generate.generateDate==getCurrentDateFormatted() && e.)
    })
    // const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const dailyReport = await PaymentSettlement ({
      
    });
    res.json(settlements);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports =  paymentSetlement;

function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

