const mongoose = require("mongoose");

const vendorSettlementSchema = mongoose.Schema({
  sendor: {
    vendorId: { type: String, required: true },
    vendorName: { type: String, required: true },
    Date:{type: Date},

    status: {
      type: String,
      enum: ["pending", "requested", 'accepted','forwarded'],
      default: "pending",
    },
  },

  superAdmin: {
    adminId: { type: String },
    Date:{type: Date},
    status: {
      type: String,
      enum: ["pending", "forwarded", 'returning'],
      
    },
  },
  reciever: {
    vendorId: { type: String, required: true },
    vendorName: { type: String, required: true },
    Date:{type: Date},
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
