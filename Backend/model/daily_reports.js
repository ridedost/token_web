const mongoose = require("mongoose");

const dailyReportSchema = mongoose.Schema({

   total_couponGenerate: { type: String,  },
   total_couponRedeem: { type: String, },
   totalSendRequest:{ type: String,  },
   totalAproveByAdmin:{ type: String,  },
   totalForwardByAdmin:{ type: String, },
   totalAmountGive:{ type: String,},
   totalAmountTake:{ type: String,},
   createdAt: {
    type: Date,
    default: Date.now,
  },
});

const dailyReportModel = mongoose.model("request", dailyReportSchema);


module.exports = dailyReportModel;
