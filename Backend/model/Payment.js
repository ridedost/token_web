const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  name: { type: String, required: true },
  paymentMode: { type: String, required: true },
  amount: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userID: { type: String, required: true },
  vendorID: { type: String, required: true },
  productId:{type:String, require:true},
  couponCode:{type:String, default:"N/A"},
  pointValue:{type:String, default :"N/A"},
  actualAmount:{type:String, default: "N/A"}
});

const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = { paymentModel };
