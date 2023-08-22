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
  cash: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "pending",
  },
  vendorId: { type: String, default: "N/A" },
});

const Admin = mongoose.model("admin", superAdminSchema);

module.exports = Admin;
