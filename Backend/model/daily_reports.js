const mongoose = require("mongoose");

const dailyReportSchema = mongoose.Schema({

   total_couponGenerate: { type: Number,  },
   total_couponRedeem: { type: Number, },
   totalSendRequest:{ type: Number,  },
   totalAproveByAdmin:{ type: Number,  },
   totalForwardByAdmin:{ type: Number, },
   totalAmountGive:{ type: Number,},
   totalAmountTake:{ type: Number,},
   createdAt:  { type: String, default: "N/A" },
   time:{type:String},
   csvfileurl:{type:String}
  
});

const dailyReportModel = mongoose.model("dailyreport", dailyReportSchema);


module.exports = dailyReportModel;
