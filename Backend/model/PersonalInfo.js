const mongoose = require("mongoose");

const Personal_Info= new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  DOB: { type: String, required: true },
  mobile: { type: String, required: true, immutable: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  profile_Image:{type:Object,default:"N/A"}
  
});

const personalInfoModel = new mongoose.model("personal_Info",Personal_Info);
module.exports = {personalInfoModel};
