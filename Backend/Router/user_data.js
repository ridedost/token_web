const express = require("express");
const { userModel } = require("../model/user_Model.js");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../midleware/userAuth.js");
const couponModel = require("../model/coupon.js");

const AdminModel = require("../model/Admin_Model");

const user_Router = express.Router();

user_Router.post("/register", async (req, res) => {
  const { mobile } = req.body;
  const data = await userModel.findOne({ mobile });
  if (data) {
    return res.status(409).json({ message: "user is already present" });
  }

  const user = new userModel({ ...req.body });
  const details = await user.save();
  if (!details) {
    res.status(500).json({ message: "Internal Server Error" });
  }

  var token = jwt.sign({ userId: user._id }, "shhhhh");

  res.status(201).json({ message: "user created succesFully", token });
});

user_Router.post("/login/:mob", async (req, res) => {
  try {
    const { mob } = req.params;

    const user = await userModel.findOne({ mobile: mob });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    var token = jwt.sign({ userId: user._id }, "shhhhh");

    token = token + "2";

    return res.status(200).json({ message: "User already present", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
}
});

user_Router.get("/coupon", userAuth, async (req, res) => {
  const {userId} = req.body;
  console.log(userId,'this is userId')
  const coupons = await couponModel.find({ userID: userId });

  if (!coupons) {
    return res.status(404).json({ message: "there is something went wrong" });
  }

  if (coupons.length == 0) {
    return res.status(404).json({ message: "No Coupons are Available" });
  }

  return res.status(200).json({ message: "get All the Coupons", coupons });
  // res.send('done')
});

user_Router.get("/vendor/list", userAuth, async (req, res) => {
  const Admins = await AdminModel.find({ status: "completed" });

  if (!Admins) {
    return res.status(404).json({ message: "something went wrong" });
  }

  if (Admins.length == 0) {
    return res.status(200).json({ message: "NO vendor are available", Admins });
  }

  return res.status(200).json({ message: "here are list of vendor", Admins });
});

user_Router.patch("/profile/update", userAuth, async (req, res) => {
  const { userId } = req.body;
  const payload = req.body;

  const updatedProfile = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: { ...payload } },
    { new: true }
  );

  if (!updatedProfile) {
    return res.status(404).json({ message: "something went wrong" });
  }

  return res
    .status(200)
    .json({ message: "succesFully updated Profile", updatedProfile });
});

user_Router.get("/wallet", userAuth, async (req, res) => {
  const { userId } = req.body;

  const coupons = await couponModel.find({ userID: userId });

  if (!coupons) {
    return res.status(404).json({ message: "somwthing went wrong" });
  }

  if (coupons.length == 0) {
    return res.status(200).json({ message: "no point available", point: 0 });
  }

  let point = 0;

  coupons.forEach((ele) => {
    point += +ele.point;
  });

  return res.status(200).json({ message: "Here are all the Points", point });

  res.send("done");
});

module.exports = { user_Router };
