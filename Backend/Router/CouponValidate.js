const CouponModel = require("../model/coupon");
const express = require("express");
const Admin = require("../model/Admin_Model");
const { sendNotification } = require("./firebase");


const {
    loginAuth,
  } = require("../midleware/auth");



const Coupon_validate = express.Router();


Coupon_validate.get("/", loginAuth, async (req, res) => {
  try {
    const { vendorId } = req.body;

    const allCoupons = await CouponModel.find();

    const newCoupons = allCoupons.filter((item) => {
      if (item.generate.vendorId == vendorId && item.status == "valid") {
        console.log("hi");
        return item;
      }
    });

    if (newCoupons.length == 0 || !newCoupons) {
      return res.status(404).json({ message: "No coupons Presents" });
    }
    return res.status(200).json({ message: "Here all the coupons", newCoupons });
  } catch (error) {
    console.error("Error while fetching coupons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

  


  Coupon_validate.post("/:coupon", loginAuth, async (req, res) => {
    try {
      const { coupon } = req.params;
  
      const isCoupon = await CouponModel.findOne({ couponCode: coupon });
  
      if (!isCoupon) {
        return res.status(404).json({ message: "Invalid coupon code...." });
      }
  
      const { vendorId } = req.body;
  
      const isAdmin = await Admin.findOne({ _id: vendorId });
      const { cash } = isAdmin;
  
      if (isCoupon.status == "valid" && isCoupon.redeem.useDate == "N/A") {
        if (isCouponExpired(isCoupon)) {
          isCoupon.status = "invalid";
          await CouponModel.findOneAndUpdate(
            { couponCode: isCoupon.couponCode },
            isCoupon,
            { new: true }
          );
  
          return res.status(200).json({ message: "coupon has Expire" });
        } else {
          isCoupon.price = +cash * +isCoupon.point;
  
          return res
            .status(410)
            .json({ message: "Coupon is still valid", isCoupon });
        }
      } else {
        return res.status(404).json({ message: "Invalid Coupon" });
      }
    } catch (error) {
      console.error("Error while validating coupon:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  




  function isCouponExpired(coupon) {
    const currentDate = new Date();
    return currentDate > coupon.expirationDate;
  }

  module.exports = Coupon_validate