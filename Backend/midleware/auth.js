const jwt = require("jsonwebtoken");
const Admin = require(".././model/Admin_Model");

const Adminauth = async (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];

  var decoded = jwt.verify(token, "shhhh");
  if (!decoded) {
    return res.status(401).json({ message: "invalid token" });
  }
  const AdminData = await Admin.findOne({ _id: decoded.userId });
  if (AdminData) {
    AdminData.role == "admin";
    req.body.staus = "completed";
  }
  req.body.userId = decoded.userId;
  const data = await Admin.findOne({ phoneNumber: req.body.phoneNumber });
  if (data) {
    return res.status(409).json({ message: "Already present" });
  }
  next();
};

const AdminAithentication = async (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];
  console.log("this is token", token);
  const decoded = jwt.verify(token, "shhhh");
  const isAdmin = await Admin.findOne({ _id: decoded.userId });
  if (isAdmin.role == "admin") {
    req.body.adminId = isAdmin._id;
    next();
    return;
  }

  return res.status(401).json({ message: "User not Authorize" });
};

const loginAuth = async (req, res, next) => {
  const auth = req.headers.authorization;
  console.log(auth);
  const token = auth?.split(" ")[1];
  const decoded = jwt.verify(token, "shhhh");
  const isAdmin = await Admin.findOne({ _id: decoded.userId });
  req.body.vendorId = decoded.userId;

  if (isAdmin.role == "admin") {
    req.body.status = "completed";
  }

  if (isAdmin.status == "completed") {
    next();
    return;
  }
  return res.status(401).json({ message: "user is unAuhorize" });
};

module.exports = { Adminauth, AdminAithentication, loginAuth };
