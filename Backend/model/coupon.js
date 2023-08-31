const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  point: { type: String, required: true },
  userID: { type: String, required: true },
  expirationDate: { type: String, required: true },
  status: { type: String, required: true },

  couponCode: { type: String, required: true },
  generate: {
    vendorId: { type: String, required: true },
    generateDate: { type: String, default: "N/A" },
  },
  redeem: {
    vendorId: { type: String, default: "N/A" },
    useDate: { type: String, default: "N/A" },
  },
  price:{type:String,default:'N/A'},
  userName:{type:String, required:true}
});

const CouponModel = mongoose.model("Coupon", couponSchema);

module.exports = CouponModel;
