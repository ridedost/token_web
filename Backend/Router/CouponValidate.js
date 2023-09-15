const CouponModel = require("../model/coupon");
const express = require("express");
const Admin = require("../model/Admin_Model");
const { sendNotification } = require("./firebase");


const {
    loginAuth, AdminAithentication,
  } = require("../midleware/auth");
const { userAuth } = require("../midleware/userAuth");

const itemsPerPage = 8;

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
  


//user get coupon
Coupon_validate.get("/usercoupon", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const userId = req.body.userId;
    const couponlist = await CouponModel.find({ userID: userId });

    const valid_c = await CouponModel.find({ userID: userId,"redeem.vendorId":"N/A"});
    const redeem_c = await CouponModel.find({ userID: userId, "redeem.vendorId": { $ne: "N/A" } });

    total_coupon=couponlist.length||0
    redeem_coupon=redeem_c.length||0
    valid_coupon=valid_c.length||0
    if(couponlist.length==0){
      return res.status(204).json({ message: "no coupon avialable" });
    }
    const itemsToSend = couponlist  .slice(startIndex, endIndex);
    const totalPages = Math.ceil(couponlist .length / itemsPerPage);
    res.status(200).json({ message: "Here are all the coupons", couponlist :itemsToSend ,
    currentPage: page,
    totalPages: totalPages,
    total_coupon,
    redeem_coupon,
    valid_coupon
  });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// admin  
Coupon_validate.get("/admincoupon", AdminAithentication, async (req, res) => {
try {
  console.log("hghgh", req.body.adminId)
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  const couponlist = await CouponModel.find();
  const vendors = await Admin.find({ status: "completed"});

  const valid_c = await CouponModel.find({ "generate.vendorId":  req.body.adminId});
  const redeem_c = await CouponModel.find({"redeem.vendorId":  req.body.adminId });

  redeem_coupon=redeem_c.length||0
  valid_coupon=valid_c.length||0
  vendor_length=vendors.length||0

  if(couponlist.length==0){
    return res.status(204).json({ message: "no coupon avialable" });
  }
  const itemsToSend = couponlist.slice(startIndex, endIndex);
  const totalPages = Math.ceil(couponlist .length / itemsPerPage);

  res.status(200).json({ message: "Here are all the coupons", couponlist :itemsToSend ,
  currentPage: page,
  totalPages: totalPages,
  valid_coupon,
 redeem_coupon
});
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Server error" });
}
});

Coupon_validate.get("/vendorcoupon", loginAuth, async (req, res) => {
try {
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const userId = req.body.userId;
  const couponlist = await CouponModel.find({
    $or: [
      {"generate.vendorId": req.body.vendorId},
      {"redeem.vendorId": req.body.vendorId}
    ]
  });

  const vendors = await Admin.find({ status: "completed"});

  const valid_c = await CouponModel.find({ "generate.vendorId": req.body.vendorId,});
  const redeem_c = await CouponModel.find({"redeem.vendorId": req.body.vendorId });

  redeem_coupon=redeem_c.length||0
  valid_coupon=valid_c.length||0
  vendor_length=vendors.length||0

  if(couponlist.length==0){
    return res.status(204).json({ message: "no coupon avialable" });
  }
  const itemsToSend = couponlist  .slice(startIndex, endIndex);
  const totalPages = Math.ceil(couponlist .length / itemsPerPage);
  res.status(200).json({ message: "Here are all the coupons", couponlist :itemsToSend ,
  currentPage: page,
  totalPages: totalPages,
  valid_coupon,
  redeem_coupon
});
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Server error" });
}
});

  function isCouponExpired(coupon) {
    const currentDate = new Date();
    return currentDate > coupon.expirationDate;
  }

  module.exports = Coupon_validate