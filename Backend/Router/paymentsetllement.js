const express = require("express");
const paymentSetlement = express.Router();
const PaymentSettlement = require("../model/paymentSettle");
const { AdminAithentication, loginAuth } = require("../midleware/auth");
const { set } = require("mongoose");
const { userAuth } = require("../midleware/userAuth");

// GET route to fetch all payment settlements

// const itemsPerPage = 10;
// paymentSetlement.get("/payment-settlements",loginAuth, async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const settlements = await PaymentSettlement.find();

//     const itemsToSend = settlements.slice(startIndex, endIndex);
//     const totalPages = Math.ceil(settlements.length / itemsPerPage);
//    console.log(itemsToSend.length)
//     res.json({
//       items: itemsToSend,
//       currentPage: page,
//       totalPages: totalPages,
//     });

//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });




// GET route to fetch all payment settlements
const itemsPerPage = 8;

paymentSetlement.get("/payment-settlements",AdminAithentication,async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const settlements = await PaymentSettlement.find();

    if(settlements.length==0){
      return res.status(204).json({ message: "no data for Payment settlements" });
    }
    const itemsToSend = settlements .slice(startIndex, endIndex);
    const totalPages = Math.ceil(settlements .length / itemsPerPage);
    console.log(settlements.length)
    res.status(200).json({ message: "Here are all the coupons",settlements :itemsToSend ,
    currentPage: page,
    totalPages: totalPages});
  
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

paymentSetlement.get("/payment-settlements/vendor", loginAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Fetch payment settlements where either "requestedBy.vendorId" or "requestedTo.vendorId" is equal to "req.body.vendorId"
    const settlements = await PaymentSettlement.find({
      $or: [
        {"requestedBy.vendorId": req.body.vendorId},
        {"requestedTo.vendorId": req.body.vendorId}
      ]
    });
    if(settlements.length==0){
      return res.status(204).json({ message: "no data for Payment settlements" });
    }
    const itemsToSend = settlements .slice(startIndex, endIndex);
    const totalPages = Math.ceil(settlements .length / itemsPerPage);
    console.log(settlements.length)
    res.status(200).json({ message: "Here are all the coupons",settlements :itemsToSend ,
    currentPage: page,
    totalPages: totalPages});
  
  } catch (error) {
    // Handle any errors that may occur during the database query
    res.status(500).json({ error: "Server error" });
  }
});


paymentSetlement.get("/user/payment-settlements/", userAuth, async (req, res) => {
  const userId=req.body.userId 
  try {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Fetch payment settlements where either "requestedBy.vendorId" or "requestedTo.vendorId" is equal to "req.body.vendorId"
    const settlements = await PaymentSettlement.find({
      "user.userId":userId

    });
    if(settlements.length==0){
      return res.status(204).json({ message: "no data for Payment settlements" });
    }
    const itemsToSend = settlements .slice(startIndex, endIndex);
    const totalPages = Math.ceil(settlements .length / itemsPerPage);
    console.log(settlements.length)
    res.status(200).json({ message: "Here are all the coupons",settlements :itemsToSend ,
    currentPage: page,
    totalPages: totalPages});
  
  } catch (error) {
    // Handle any errors that may occur during the database query
    res.status(500).json({ error: "Server error" });
  }
});


module.exports =  paymentSetlement;