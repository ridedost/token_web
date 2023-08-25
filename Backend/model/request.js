const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  sendor: {
    vendorId: { type: String, required: true },
    Date:{type:Date}
  },
  receiver: {
    vendorId: { type: String, required: true },
    Date:{type:Date}
  },

  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'requested'],
    default: 'pending',
  },
  comment: {
    type: String,
  },
  coupon:{
    couponCode:{type:String, required:true}
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const requestModel = mongoose.model("request", requestSchema);


module.exports = requestModel;
