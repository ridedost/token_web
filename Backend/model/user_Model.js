const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  name: { type: String, required: true },
  DOB: { type: String, required: true },
  mobile: { type: String, required: true, immutable: true },
  email: { type: String, required: true },
});

const userModel = new mongoose.model("user_data", user_schema);
module.exports = { userModel };
