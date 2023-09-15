const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    immutable: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyOwner: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "vendor",
  },
  presentageValue: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "pending",
  },
  companyLogo:{
    type:String,
    required:true
  },
  address: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  id_proof: {
    type: String,
    required: true,
  },
  thresholdvalue: {
    type: Number,
    default: 0,
    required: true,
  },
  //ADD HERE FOR PERSONAL INFO FILED
  gender: {
    type: String,
  },
  DOB: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  vendorId: { type: String, default: "N/A" },
});

const Admin = mongoose.model("admin", superAdminSchema);

module.exports = Admin;
