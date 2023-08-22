const VendorSettlement = require("../model/Settlement");
const express = require("express");
const { loginAuth } = require("../midleware/auth");
const requestModel = require("../model/request");
const Admin = require("../model/Admin_Model");
const { set } = require("mongoose");

const settleMentRoute = express.Router();

settleMentRoute.get("/coupon/:TovendorId", loginAuth, async (req, res) => {
  const usageVendor = req.body.vendorId;

  const generatedVendor = req.params.TovendorId;

  console.log(usageVendor, generatedVendor);

  const coupons = await VendorSettlement.find({
    "sendor.vendorId": usageVendor,
    "reciever.vendorId": generatedVendor,
  });

  if (coupons.length == 0 || !coupons) {
    return res.status(404).json({ message: "no coupon present" });
  }

  res.status(200).json({ message: "here all the coupons", coupons });
});

// Send request to admin for approved settlemenet....

settleMentRoute.post("/send/:couponCode", loginAuth, async (req, res) => {
  try {
    //taking vendorId...
    const { vendorId } = req.body;
    const { couponCode } = req.params;

    //date time stamp

    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);

    //finding co

    const isSettle = await VendorSettlement.findOne({
      "coupon.couponCode": couponCode,
      "sendor.vendorId": vendorId,
    });

    if (!isSettle) {
      return res.status(404).json({ message: "Invalid coupons" });
    }

    if (isSettle.sendor.status !== "pending") {
      return res.status(409).json({ message: "you have already requested" });
    }

    const superAdmin = await Admin.findOne({ role: "admin" });

    const { _id } = superAdmin;

    isSettle.sendor.status = "requested";
    isSettle.sendor.Date = new Date();

    isSettle.superAdmin.adminId = superAdmin._id;
    isSettle.superAdmin.status = "pending";

    const CouponSettle = await VendorSettlement.findOneAndUpdate(
      {
        "coupon.couponCode": couponCode,
        "sendor.vendorId": vendorId,
      },
      { ...isSettle }
    );

    console.log(isSettle);

    if (!CouponSettle) {
      return res.status(500).json({ message: "something went wrong" });
    }

    res.status(200).json({ message: "You have succesfully send request" });
  } catch (error) {
    console.log(error, "this is error");
    res.status(500).json({ message: "something went wrong" });
  }
});

settleMentRoute.get("/recieved", loginAuth, async (req, res) => {
  const { vendorId } = req.body;

  const allrecievedReq = await VendorSettlement.find({
    "reciever.vendorId": vendorId,
    "reciever.status": "pending",
    "superAdmin.status": "forwarded",
  });

  console.log(allrecievedReq, "this is allreceived req...");

  if (allrecievedReq.length == 0 || !allrecievedReq) {
    return res.status(404).json({ message: "no data found..." });
  }

  res
    .status(200)
    .json({ message: "successfully get the data", data: allrecievedReq });
});

settleMentRoute.patch("/accepted/:_id", loginAuth, async (req, res) => {
  const { _id } = req.params;

  const data = await VendorSettlement.findOne({ _id });

  if (data.superAdmin.status == "accepted") {
    return res.status(409).json({ message: "already accepeted" });
  }

  data.superAdmin.status = "accepted";
  data.reciever.status = "accepted";

  const isUpdate = await VendorSettlement.findOneAndUpdate(
    { _id },
    { ...data }
  );

  if (!isUpdate) {
    return res.status(500).json({ message: "something went wrong..." });
  }

  return res.status(200).json({ message: "succesfully accepeted" });
});

settleMentRoute.patch("/rejected/:_id", loginAuth, async (req, res) => {
  const { _id } = req.params;

  const data = await VendorSettlement.findOne({ _id });

  if (data.superAdmin.status == "accepted") {
    return res.status(409).json({ message: "already accepeted" });
  }

  data.superAdmin.status = "rejected";
  data.reciever.status = "rejected";

  const isUpdate = await VendorSettlement.findOneAndUpdate(
    { _id },
    { ...data }
  );

  if (!isUpdate) {
    return res.status(500).json({ message: "something went wrong..." });
  }

  return res.status(200).json({ message: "succesfully accepeted" });
});

settleMentRoute.patch("/final/accept/:_id", loginAuth, async (req, res) => {
  const data = await VendorSettlement.findOne({ _id });

  data.superAdmin.status = "accepted";

  data.sendor.status = "accepted";

  const isUpdate = VendorSettlement.findOneAndUpdate({ _id }, { ...data });

  if (!isUpdate) {
    return res.status(500).json({ message: "something went wrong..." });
  }

  res.status(200).json({ message: "succesfully accepted" });
});



settleMentRoute.patch("/final/rejected/:_id", loginAuth, async (req, res) => {
  const data = await VendorSettlement.findOne({ _id });

  data.superAdmin.status = "rejected";

  data.sendor.status = "rejected";

  const isUpdate = VendorSettlement.findOneAndUpdate({ _id }, { ...data });

  if (!isUpdate) {
    return res.status(500).json({ message: "something went wrong..." });
  }

  res.status(200).json({ message: "succesfully accepted" });
});

module.exports = settleMentRoute;
