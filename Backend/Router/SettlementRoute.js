const VendorSettlement = require("../model/Settlement");
const express = require("express");
const { loginAuth } = require("../midleware/auth");
const requestModel = require("../model/request");
const Admin = require("../model/Admin_Model");
const { set } = require("mongoose");

const settleMentRoute = express.Router();
const itemsPerPage = 10;
settleMentRoute.get("/coupon/:TovendorId", loginAuth, async (req, res) => {
  try {
    const usageVendor = req.body.vendorId;
    const generatedVendor = req.params.TovendorId;

    console.log(usageVendor, generatedVendor);

    const coupons = await VendorSettlement.find({
      "sendor.vendorId": usageVendor,
      "receiver.vendorId": generatedVendor,
    });

    const request = coupons.filter((e) => {
      return (
        e.superAdmin.status !== "returning" &&
        e.superAdmin.status !== "accepted" &&
        e.sendor.status !== "accepted" &&
        e.receiver.status !== "accepted"
      );
    });

    console.log(request);
    console.log(coupons);

    if (coupons.length === 0 || !coupons) {
      return res.status(404).json({ message: "No coupon present" });
    }

    res.status(200).json({ message: "Here are all the coupons", request });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Send request to admin for approved settlemenet....

settleMentRoute.post("/send/:couponCode", loginAuth, async (req, res) => {
  try {
    // Taking vendorId...
    const { vendorId } = req.body;
    const { couponCode } = req.params;

    // Date time stamp
    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);

    // Finding coupon

    const isSettle = await VendorSettlement.findOne({
      "coupon.couponCode": couponCode,
      "sendor.vendorId": vendorId,
    });

    if (!isSettle) {
      return res.status(404).json({ message: "Invalid coupons" });
    }

    if (isSettle.sendor.status !== "pending") {
      return res.status(409).json({ message: "You have already requested" });
    }

    const superAdmin = await Admin.findOne({ role: "admin" });

    const { _id } = superAdmin;

    isSettle.sendor.status = "requested";
    isSettle.sendor.Date = getCurrentDateFormatted();
    isSettle.sendor.time =  getCurrentTime();

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
      return res.status(500).json({ message: "Something went wrong" });
    }

    res.status(200).json({ message: "You have successfully sent a request" });
  } catch (error) {
    console.error("Error while sending request:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


settleMentRoute.get("/recieved", loginAuth, async (req, res) => {
  try {
    const { vendorId } = req.body;

    const allRecievedReq = await VendorSettlement.find({
      "reciever.vendorId": vendorId,
      "reciever.status": "pending",
      "superAdmin.status": "forwarded",
    });

    console.log(allRecievedReq, "this is all received requests...");

    if (allRecievedReq.length == 0 || !allRecievedReq) {
      return res.status(404).json({ message: "No data found..." });
    }

    res.status(200).json({ message: "Successfully got the data", data: allRecievedReq });
  } catch (error) {
    console.error("Error while fetching received requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


settleMentRoute.patch("/accepted/:_id", loginAuth, async (req, res) => {
  try {
    const { _id } = req.params;

    const data = await VendorSettlement.findOne({ _id });

    if (data.superAdmin.status === "accepted") {
      return res.status(409).json({ message: "Already accepted" });
    }

    data.superAdmin.status = "accepted";
    data.reciever.status = "accepted";

    const isUpdate = await VendorSettlement.findOneAndUpdate(
      { _id },
      { ...data }
    );

    if (!isUpdate) {
      return res.status(500).json({ message: "Something went wrong..." });
    }

    return res.status(200).json({ message: "Successfully accepted" });
  } catch (error) {
    console.error("Error while accepting:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

settleMentRoute.patch("/rejected/:_id", loginAuth, async (req, res) => {
  try {
    const { _id } = req.params;

    const data = await VendorSettlement.findOne({ _id });

    if (data.superAdmin.status === "accepted") {
      return res.status(409).json({ message: "Already accepted" });
    }

    data.superAdmin.status = "rejected";
    data.reciever.status = "rejected";

    const isUpdate = await VendorSettlement.findOneAndUpdate(
      { _id },
      { ...data }
    );

    if (!isUpdate) {
      return res.status(500).json({ message: "Something went wrong..." });
    }

    return res.status(200).json({ message: "Successfully rejected" });
  } catch (error) {
    console.error("Error while rejecting:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


settleMentRoute.patch("/final/accept/:_id", loginAuth, async (req, res) => {
  try {
    const { _id } = req.params;

    const data = await VendorSettlement.findOne({ _id });

    data.superAdmin.status = "accepted";
    data.sendor.status = "accepted";

    const isUpdate = await VendorSettlement.findOneAndUpdate({ _id }, { ...data });

    if (!isUpdate) {
      return res.status(500).json({ message: "Something went wrong..." });
    }

    return res.status(200).json({ message: "Successfully accepted" });
  } catch (error) {
    console.error("Error while final accept:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


settleMentRoute.patch("/final/rejected/:_id", loginAuth, async (req, res) => {
  try {
    const { _id } = req.params;

    const data = await VendorSettlement.findOne({ _id });

    data.superAdmin.status = "rejected";
    data.sendor.status = "rejected";

    const isUpdate = await VendorSettlement.findOneAndUpdate({ _id }, { ...data });

    if (!isUpdate) {
      return res.status(500).json({ message: "Something went wrong..." });
    }

    return res.status(200).json({ message: "Successfully rejected" });
  } catch (error) {
    console.error("Error while final reject:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



function getCurrentDateFormatted() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function getCurrentTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}








module.exports = settleMentRoute;
