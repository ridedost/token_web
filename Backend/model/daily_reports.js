const mongoose = require("mongoose");

const dailyReportSchema = mongoose.Schema({

   total_couponGenerate: { type: String,  },
   total_couponRedeem: { type: String, },
   totalSendRequest:{ type: String,  },
   totalAproveByAdmin:{ type: String,  },
   totalForwardByAdmin:{ type: String, },
   totalAmountGive:{ type: String,},
   totalAmountTake:{ type: String,},
   createdAt:  { type: String, default: "N/A" },
   time:{type:String}
  
});

const dailyReportModel = mongoose.model("request", dailyReportSchema);


module.exports = dailyReportModel;
