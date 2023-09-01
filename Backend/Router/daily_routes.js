const express = require("express");
const dailyReport = express.Router();
const dailyReportModel = require("../model/daily_reports");
const { AdminAithentication, loginAuth } = require("../midleware/auth");
const { set } = require("mongoose");
const CouponModel = require("../model/coupon");
const VendorSettlement = require("../model/Settlement");
// GET route to fetch all payment settlements
dailyReport.post("/dailyReports", async (req, res) => {
  try {
    const data = await CouponModel.find();
    const setle=await VendorSettlement.find()
    console.log(setle.length)
    const total_couponGenerate = data.reduce((s, e) => {
      // console.log(e.generate.generateDate)
      if (e.generate.generateDate === getCurrentDateFormatted()) {
        s = s + 1;
        // console.log(s)
      }
      return s;
    }, 0);

    const   total_couponRedeem = data.reduce((r, e) => {
      // console.log(e.generate.generateDate)
      if (e.redeem.useDate === getCurrentDateFormatted()) {
        r = r + 1;
        // console.log(s)
      }
      return r;
    }, 0);

    const totalSendRequest =setle.reduce((sr, e) => {
      // console.log(e.generate.generateDate)
      if (e.sendor.Date==getCurrentDateFormatted() && e.sendor.status === "requested" && e.superAdmin.status=="pending" && e.receiver.status==="pending") {
        sr = sr + 1;
        // console.log(s)
      }
      return sr;
    }, 0);

    const totalAproveByAdmin=setle.reduce((aba, e) => {
      // console.log(e.generate.generateDate)
      if (e.superAdmin.Date === getCurrentDateFormatted() && e.sendor.status === "pending" && e.superAdmin.status=="returning" && e.receiver.status==="accepted" ||
       e.superAdmin.Date === getCurrentDateFormatted() &&
      e.sendor.status === "pending" && e.superAdmin.status=="accepted" && e.receiver.status==="pending") {
        aba = aba + 1;
        // console.log(s)
      }
      return aba;
    }, 0);

    const totalForwardByAdmin=setle.reduce((tba, e) => {
      // console.log(e.generate.generateDate)
      if (e.superAdmin.Date === getCurrentDateFormatted() && e.sendor.status === "requested" && e.superAdmin.status=="forwarded" && e.receiver.status==="pending" ) {
        tba = tba + 1;
        // console.log(s)
      }
      return tba;
    }, 0);



    // const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const dailyReport = await dailyReportModel({
      total_couponGenerate,
      total_couponRedeem,
      totalSendRequest,
      totalAproveByAdmin,
      totalForwardByAdmin,
      totalAmountGive:0,
      totalAmountTake:0,
      createdAt:getCurrentDateFormatted(),
      time: getCurrentTime(),
    });
   const result= await dailyReport.save()
   res.status(201).json({ message: "succesfully created",result });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = dailyReport;

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


