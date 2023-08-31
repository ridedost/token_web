const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user_Model");
const Admin = require("../model/Admin_Model");

const adminAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];
    const decoded = jwt.verify(token, "shhhh");

    const { userId } = decoded;

    const isvendor = await Admin.findById({ _id: userId });

    if (!isvendor) {
      return res.status(404).json({ message: "Vendor not valid" });
    }

    req.body.vendorID = userId;

    const { phoneNumber } = req.body;

    const isUser = await userModel.findOne({ mobile: phoneNumber });

    if (!isUser) {
      return res.status(404).json({ message: "User is not registered" });
    }

    req.body.userID = isUser._id.toString();
    req.body.phoneNumber = isUser.mobile;
    req.body.name = isUser.name;

    next();
  } catch (error) {
    console.error("adminAuth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = { adminAuth };
