const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user_Model");
const Admin = require("../model/Admin_Model");

const adminAuth = async (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];
  const decoded = jwt.verify(token, "shhhh");

  const { userId } = decoded;

  const isvendor = await Admin.findById({ _id: userId });

  if (!isvendor) {
    return res.status(404).json({ message: "vendor  not valid" });
  }

  req.body.vendorID = userId;

  const { phoneNumber } = req.body;
  
  const isUser = await userModel.findOne({ mobile: phoneNumber });

  if (!isUser) {
    return res.status(404).json({ message: "User is not regiester" });
  }

  req.body.userID = isUser._id.toString();
  req.body.phoneNumber = isUser.mobile;
  req.body.name = isUser.name;

  next();
};

module.exports = { adminAuth };
