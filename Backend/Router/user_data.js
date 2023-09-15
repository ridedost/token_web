const express = require("express");
const { userModel } = require("../model/user_Model.js");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../midleware/userAuth.js");
const CouponModel = require("../model/coupon.js");
const cloudinary=require("./cloudinary")
const AdminModel = require("../model/Admin_Model");
const Admin = require("../model/Admin_Model");

const user_Router = express.Router();
const itemsPerPage = 8;
user_Router.post("/register", async (req, res) => {
  try {
    const { mobile } = req.body;
    const data = await userModel.findOne({ mobile });
    
    if (data) {
      return res.status(409).json({ message: "User is already present" });
    }
    
    const user = new userModel({ ...req.body });
    const details = await user.save();
    
    if (!details) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    var token = jwt.sign({ userId: user._id }, "shhhhh");
    token = token + "3";
    
    return res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error while user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


user_Router.post("/login/:mob", async (req, res) => {
  try {
    const { mob } = req.params;

    const user = await userModel.findOne({ mobile: mob });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    var token = jwt.sign({ userId: user._id }, "shhhhh");

    token = token + "3";

    return res.status(200).json({ message: "User already present", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

user_Router.get("/coupon", userAuth, async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId, "this is userId");
    const coupons = await CouponModel.find({ userID: userId });

    if (!coupons) {
      return res.status(404).json({ message: "There is something went wrong" });
    }

    if (coupons.length === 0) {
      return res.status(404).json({ message: "No Coupons are Available" });
    }

    return res.status(200).json({ message: "Get all the Coupons", coupons });
  } catch (error) {
    console.error("Error while getting user coupons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

user_Router.get("/vendor/list", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const Admins = await AdminModel.find({ status: "completed" });
    console.log(Admins.length)
    if (!Admins) {
      return res.status(404).json({ message: "Something went wrong" });
    }

    if (Admins.length === 0) {
      return res.status(200).json({ message: "No vendors are available", Admins });
    }
    const itemsToSend = Admins .slice(startIndex, endIndex);
    const totalPages = Math.ceil(Admins .length / itemsPerPage);
    return res.status(200).json({ message: "Here is a list of vendors", Admins:itemsToSend ,
    currentPage: page,
    totalPages: totalPages });
  } catch (error) {
    console.error("Error while getting vendor list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//user profile update
user_Router.patch("/profile/update", userAuth, async (req, res) => {
  try {
    const { userId } = req.body;
    const payload = req.body;

    const { profileImage } = req.body;

    // if (profileImage) {
    //   const image = await cloudinary.uploader.upload(profileImage, {
    //     upload_preset: "ridedost",
    //   });

    //   req.body.profileImage = image;
    // }

    const updatedProfile = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Something went wrong" });
    }

    return res
      .status(200)
      .json({ message: "Successfully updated profile", updatedProfile });
  } catch (error) {
    console.error("Error while updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//get data of single user
user_Router.get("/personalInfo",userAuth,async(req,res)=>{
  const _id=  req.body.userId 
  console.log("id",  req.body.userId )
  try {
   const vendorInfo=await userModel.find({_id:_id})
   return res.status(200).json({ message: "succesfully get the data", vendorInfo });
  } catch (error) {
   console.error("Error approving update:", error);
   return res.status(500).json({ message: "Server error" });
  }
 
  
 })
 
 user_Router.get("/wallet", userAuth, async (req, res) => {
  try {
    const { userId } = req.body;

    const coupons = await CouponModel.find({ userID: userId });

    if (!coupons) {
      return res.status(404).json({ message: "Something went wrong" });
    }

    if (coupons.length === 0) {
      return res.status(204).json({ message: "No points available", point: 0 });
    }

    let point = 0;

    coupons.forEach((ele) => {
      point += +ele.point;
    });

    return res.status(200).json({ message: "Here are all the Points", point });
  } catch (error) {
    console.error("Error while fetching wallet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

user_Router.get("/points", userAuth, async (req, res) => {
  try {
    const { userId } = req.body;

    const generate = await CouponModel.find({ userID: userId,"redeem.vendorId":"N/A","redeem.useDate":"N/A"});
    const redeem = await CouponModel.find({userID: userId,"redeem.status": { $ne: "N/A" },"redeem.useDate":{ $ne: "N/A" }});
    const generate_point= generate.reduce((acc, current) => acc + +current.point, 0);
    const redeem_point= redeem.reduce((acc, current) => acc + +current.point, 0);
    const total_point=generate_point+redeem_point
    const points={
      generate_point:parseFloat(generate_point.toFixed(2)),
      redeem_point:parseFloat(redeem_point.toFixed(2)),
      total_point:parseFloat(total_point.toFixed(2)),
    }
    console.log("point",points)
    return res.status(200).json({ message: "Here are all the Points", points });
  } catch (error) {
    console.error("Error while fetching wallet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});





user_Router.get("/user/wallet", userAuth, async (req, res) => {
  try {
    const { userId } = req.body;

    const coupons = await CouponModel.find({ userID: userId,status:"valid" });

    if (!coupons) {
      return res.status(404).json({ message: "Something went wrong" });
    }

    if (coupons.length === 0) {
      return res.status(204).json({ message: "No points available", point: 0 });
    }

    let point = 0;

  
    const max = coupons.reduce((acc, current) => acc + +current.point, 0);

      
    return res.status(200).json({ message: "Here are all the Points", max });
  } catch (error) {
    console.error("Error while fetching wallet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});





module.exports = { user_Router };
