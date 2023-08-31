const jwt = require("jsonwebtoken");
const Admin = require(".././model/Admin_Model");

const Adminauth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];

    const decoded = jwt.verify(token, "shhhh");
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const adminData = await Admin.findOne({ _id: decoded.userId });
    if (adminData && adminData.role === "admin") {
      req.body.status = "completed";
    }

    req.body.userId = decoded.userId;

    const data = await Admin.findOne({ phoneNumber: req.body.phoneNumber });
    if (data) {
      return res.status(409).json({ message: "Already present" });
    }

    next();
  } catch (error) {
    console.error("AdminAuth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const AdminAithentication= async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];
    console.log("this is token", token);
    const decoded = jwt.verify(token, "shhhh");
    const isAdmin = await Admin.findOne({ _id: decoded.userId });
    if (isAdmin?.role === "admin") {
      req.body.adminId = isAdmin._id;
      next();
      return;
    }

    return res.status(401).json({ message: "User not authorized" });
  } catch (error) {
    console.error("AdminAuthentication error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const loginAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    // console.log(auth);
    const token = auth?.split(" ")[1];
    const decoded = jwt.verify(token, "shhhh");
    // console.log(decoded.userId)
    const isAdmin = await Admin.findOne({ _id: decoded.userId });
    // console.log(decoded.userId)
    req.body.vendorId = decoded.userId;

    if (isAdmin?.role === "admin" || isAdmin?.role === "vendor") {
      req.body.status = "completed";
    }

    if (isAdmin?.status === "completed") {
      next();
      return;
    }

    return res.status(401).json({ message: "user is unauthorized" });
  } catch (error) {
    console.error("loginAuth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { Adminauth, AdminAithentication, loginAuth };
