const mongoose = require("mongoose");

const paymentSettlementSchema = mongoose.Schema({
 requestedBy: {
    vendorId: { type: String, required: true },
    vendorName: { type: String, required: true },

  },
requestedTo: {
    vendorId: { type: String, required: true },
    vendorName: { type: String, required: true },

  },
  amount: {
    type: Number,
    required: true,
  },
  AprovedDate: {
    type: String,
  },
  AprovedTime: {
    type: String,
  },
  coupon: {

    couponCode: { type: String, required: true },
    CouponValue:{type: Number,required: true,}
  },

  user: {
    name: { type: String, required: true },
    userId: { type: String, required: true },
  },

});

const PaymentSettlement = mongoose.model("paymentSettlement" ,paymentSettlementSchema);

module.exports = PaymentSettlement;
