const CouponModel = require("../model/coupon");
const productModel = require("../model/product");
const express = require("express");
const Admin = require("../model/Admin_Model");
const { sendNotification } = require("./firebase");
const paymentRouter = express.Router();
const { adminAuth } = require("../midleware/adminAuth");
const { paymentModel } = require("../model/Payment");
const coponCode = require("coupon-code");
const VendorSettlement = require("../model/Settlement");
const { userModel } = require("../model/user_Model");



paymentRouter.post("/", adminAuth, async (req, res) => {
  const payload = req.body;
  const { name } = payload;
  const { couponCode, vendorID, productId } = payload;

  const isProduct = await productModel.findOne({ _id: productId });

  payload.amount = isProduct.price;

  if (couponCode) {
    const isCouponValid = await CouponModel.findOne({ couponCode });
    const isVendor = await Admin.findOne({ _id: vendorID });
    if (isCouponValid.status == "Invalid") {
      return res.status(400).json({ message: "Coupon is Invalid" });
    }
    console.log("this is coupon", isCouponValid);

    const { cash } = isVendor;
    const { point } = isCouponValid;
    const pointValue = +point * +cash;

    payload.actualAmount = +payload.amount - +pointValue;
    payload.pointValue = pointValue;

    isCouponValid.redeem.vendorId = vendorID;
    isCouponValid.redeem.useDate = new Date();
    isCouponValid.status = "Invalid";

    await CouponModel.findOneAndUpdate(
      { couponCode: isCouponValid.couponCode },
      isCouponValid,
      { new: true }
    );

    const vendorId = isCouponValid.generate.vendorId;

    sendNotification(
      "success",
      vendorId,
      "Coupon has been Used",
      "Your coupon has been used by other vendor"
    );

 //sendor vendor finding....

    const receiverVendor = await Admin.findOne({ _id: vendorId });

    //reciever vendor finding....


    const sendorVendor = await Admin.findOne({
      _id: isCouponValid.redeem.vendorId,
    });


    //user details finding ...
    const { userID } = isCouponValid;
    console.log("thi is coupons ", isCouponValid);
    
    const isUser = await userModel.findOne({ _id: isCouponValid.userID });

    const settlementObj = {
      sendor: {
        vendorId: sendorVendor._id, // Initialize with the appropriate default value
        vendorName: sendorVendor.name, // Initialize with the appropriate default value
      },
      reciever: {
        vendorId: receiverVendor._id , // Initialize with the appropriate default value
        vendorName: receiverVendor.name, // Initialize with the appropriate default value
      },
      amount: pointValue, // Initialize with the appropriate default value
      CouponValue: isCouponValid.point, // Initialize with the appropriate default value
      // Initialize with the appropriate default value
      coupon: {
        Date: new Date(), // Initialize with the appropriate default value
        couponCode: isCouponValid.couponCode, // Initialize with the appropriate default value
      },
      user: {
        name: isUser.name, // Initialize with the appropriate default value
        userId: isCouponValid.userID, // Initialize with the appropriate default value
      },
    };

    const isSettlement = await VendorSettlement(settlementObj);

    await isSettlement.save();
  }





  const isPayment = await paymentModel(payload);

  if (!isPayment) {
    return res.status(500).json({ message: "Internal server error" });
  }

  const { amount, userID } = await isPayment.save();

  sendNotification("success", userID, "Payment Done", `${amount} payment Done`);

  const coupon = {
    point: "",
    userId: "",
    expirationDate: "",
    status: "",
    couponCode: "",
    generate: {},
    redeem: {},
  };



  /// send new coupon

  if (amount >= 1000 && amount <= 2000) {
    coupon.point = Math.floor(Math.random() * 6) + 10;
    coupon.userID = userID;
    const currentDate = new Date();
    const day = currentDate.getDate();
    let month = currentDate.getMonth() + 7; // Months are zero-indexed, so we add 1
    month = +month % 12;

    if (month <= 9) {
      month = "0" + month;
    }
    const year = currentDate.getFullYear();
    const fullDate = year + "-" + month + "-" + day;

    coupon.expirationDate = fullDate;
    coupon.status = "valid";

    coupon.couponCode = coponCode.generate();

    coupon.generate.vendorId = vendorID;
    coupon.userName = name;

    const newCoupon = await CouponModel(coupon);

    await newCoupon.save();

    sendNotification(
      "success",
      userID,
      "Get Coupon",
      `You have get a coupon ${coupon}`
    );
    return res
      .status(200)
      .json({ message: "succesfully payment and get coupon", coupon });
  }


  /// send new coupon


  if (amount >= 2500) {
    coupon.point = Math.floor(Math.random() * 6) + 20;
    coupon.userID = userID;
    const currentDate = new Date();
    const day = currentDate.getDate();
    let month = currentDate.getMonth() + 7; // Months are zero-indexed, so we add 1
    month = +month % 12;

    if (month <= 9) {
      month = "0" + month;
    }
    const year = currentDate.getFullYear();
    const fullDate = year + "-" + month + "-" + day;

    coupon.expirationDate = fullDate;
    coupon.status = "valid";

    coupon.couponCode = coponCode.generate();

    coupon.generate.vendorId = vendorID;
    coupon.userName = name;

    const newCoupon = await CouponModel(coupon);

    await newCoupon.save();
    sendNotification(
      "success",
      userID,
      "Get Coupon",
      `You have get a coupon ${coupon}`
    );

    return res
      .status(200)
      .json({ message: "succesfully payment and get coupon", coupon });
  }

  res.status(500).json({ message: "payment succesfully completed" });
});

module.exports = paymentRouter;
