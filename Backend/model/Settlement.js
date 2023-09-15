const mongoose = require("mongoose");

const vendorSettlementSchema = mongoose.Schema({
  sendor: {
    vendorId: { type: String, required: true },
    vendorName: { type: String, required: true },
    Date:{ type: String, default: "N/A" },
   time:{type:String},
   reject_region:{type:String},
    status: {
      type: String,
      enum: ["pending", "requested", 'accepted','forwarded',"rejected"],
      default: "pending",
    },
  },

  superAdmin: {
    adminId: { type: String },
    time:{type:String},
    Date:{ type: String, default: "N/A" },
    reject_region:{type:String},
    status: {
      type: String,
      enum: ["pending", "forwarded", 'returning',"requestedback","accepted","rejected"],
      
    },
  },
  receiver: {
    vendorId: { type: String, required: true },
    vendorName: { type: String, required: true },
    Date:{ type: String, default: "N/A" },
    reject_region:{type:String},
    time:{type:String},
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
    
    },
  },
  amount: {
    type: Number,
    required: true,
  },

  CouponValue: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
  },

  // status: {
  //   type: String,
  //   default: "pending",
  // },

  coupon: {
    Date: { type: Date },
    couponCode: { type: String, required: true },
  },

  user: {
    name: { type: String, required: true },
    userId: { type: String, required: true },
  },
});

const VendorSettlement = mongoose.model(
  "VendorSettlement",
  vendorSettlementSchema
);

module.exports = VendorSettlement;
