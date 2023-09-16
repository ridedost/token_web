const express = require("express");
const ntpClient = require('ntp-client');
const dailyReport = express.Router();
const dailyReportModel = require("../model/daily_reports");
const { AdminAithentication, loginAuth } = require("../midleware/auth");
const { set } = require("mongoose");
const CouponModel = require("../model/coupon");
const VendorSettlement = require("../model/Settlement");
const fs = require('fs');
const { Parser } = require('json2csv');
const cloudinary = require("./cloudinary");
const { v2: cloudinaryV2 } = require('cloudinary');
const itemsPerPage = 8;
// dailyReport.get('/generate-csv', async (req, res) => {
//   try {
//     const currentDateFormatted = getCurrentDateFormatted();
    
//     // Fetch data from the MongoDB collection for the current date
//     const data = await dailyReportModel.find({ createdAt: currentDateFormatted }).exec();
//     const result = await dailyReportModel.find({ createdAt: currentDateFormatted })
//     console.log("data", result);

//     // Convert the fetched data to CSV format
//     const json2csv = new Parser();
//     const csvData = json2csv.parse(data);

//     // Write the CSV data to a file
//     const fileName = `report_${currentDateFormatted}.csv`;
//     fs.writeFile(fileName, csvData, 'utf8', (err) => {
//       if (err) {
//         console.error('Error writing CSV file:', err);
//         res.status(500).json({ error: 'Error writing CSV file' });
//       } else {
//         console.log(`CSV file ${fileName} has been created successfully.`);
//         res.status(200).json({ message: 'CSV file created successfully',fileName,result });
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching data from MongoDB:', error);
//     res.status(500).json({ error: 'Error fetching data from MongoDB' });
//   }
// });

// dailyReport.get('/generate-csvfile', async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split('T')[0];
//     const publicId = `reports/report_${formattedDate}_${Date.now()}.csv`;
//     const data = await dailyReportModel.find({createdAt: getCurrentDateFormatted()}, {
//       total_couponGenerate: 1,
//       total_couponRedeem: 1,
//       totalSendRequest: 1,
//       totalAproveByAdmin: 1,
//       totalForwardByAdmin: 1,
//       totalAmountGive: 1,
//       totalAmountTake: 1,
//       createdAt: 1,
//       time: 1,
//       _id: 0 // Exclude the _id field
//     }).lean().exec();
//    const json2csv = new Parser();
//     const csvData = json2csv.parse(data);
//    const csvBuffer = Buffer.from(csvData, 'utf-8');

//     const uploadResult = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinaryV2.uploader.upload_stream(
//         {
//           public_id: `reports/report_${formattedDate}.csv`,
//           publicId,
//           resource_type: 'raw',
//           folder: 'reports' // Store in a specific folder on Cloudinary
//         },
//         (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//       // Write the CSV buffer to the upload stream
//       uploadStream.write(csvBuffer);
//       uploadStream.end();
//     });

//     console.log('CSV file uploaded to Cloudinary:', uploadResult);
//     const isAdmin = await dailyReportModel.findOneAndUpdate(
//       { createdAt:getCurrentDateFormatted() },
//        {  csvfileurl: uploadResult.secure_url }
//      );
//      const resultdata = await dailyReportModel.find({ createdAt:getCurrentDateFormatted() })

//     res.status(200).json({ message: 'CSV file uploaded to Cloudinary successfully' , csvUrl: uploadResult.secure_url,resultdata});
//   } catch (error) {
//     console.error('Error fetching data from MongoDB or uploading to Cloudinary:', error);
//     res.status(500).json({ error: 'Error processing the request' });
//   }
// });
 

// dailyReport.post("/dailyReports", async (req, res) => {
//   try {
//     const data = await CouponModel.find();
//     const setle=await VendorSettlement.find()
//     // console.log(setle.length)
//     const total_couponGenerate = data.reduce((s, e) => {
//       // console.log(e.generate.generateDate)
//       if (e.generate.generateDate === getCurrentDateFormatted()) {
//         s = s + 1;
//         // console.log(s)
//       }
//       return s;
//     }, 0);

//     const   total_couponRedeem = data.reduce((r, e) => {
//       // console.log(e.generate.generateDate)
//       if (e.redeem.useDate === getCurrentDateFormatted()) {
//         r = r + 1;
//         // console.log(s)
//       }
//       return r;
//     }, 0);

//     const totalSendRequest =setle.reduce((sr, e) => {
//       // console.log(e.generate.generateDate)
//       if (e.sendor.Date==getCurrentDateFormatted() && e.sendor.status === "requested" && e.superAdmin.status=="pending" && e.receiver.status==="pending") {
//         sr = sr + 1;
//         // console.log(s)
//       }
//       return sr;
//     }, 0);

//     const totalAproveByAdmin=setle.reduce((aba, e) => {
//       // console.log(e.generate.generateDate)
//       if (e.superAdmin.Date === getCurrentDateFormatted() && e.sendor.status === "pending" && e.superAdmin.status=="returning" && e.receiver.status==="accepted" ||
//        e.superAdmin.Date === getCurrentDateFormatted() &&
//       e.sendor.status === "pending" && e.superAdmin.status=="accepted" && e.receiver.status==="pending") {
//         aba = aba + 1;
//         // console.log(s)
//       }
//       return aba;
//     }, 0);

//     const totalForwardByAdmin=setle.reduce((tba, e) => {
//       // console.log(e.generate.generateDate)
//       if (e.superAdmin.Date === getCurrentDateFormatted() && e.sendor.status === "requested" && e.superAdmin.status=="forwarded" && e.receiver.status==="pending" ) {
//         tba = tba + 1;
//         // console.log(s)
//       }
//       return tba;
//     }, 0);



//     // const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//     const dailyReport = await dailyReportModel({
//       total_couponGenerate,
//       total_couponRedeem,
//       totalSendRequest,
//       totalAproveByAdmin,
//       totalForwardByAdmin,
//       totalAmountGive:0,
//       totalAmountTake:0,
//       createdAt:getCurrentDateFormatted(),
//       time: getCurrentTime(),
//     });
//    const result= await dailyReport.save()
//    res.status(201).json({ message: "succesfully created",result, actualDateValue,actualTimeValue });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: "Server error" });
//   }
// });

dailyReport.get('/generate-csvfile',AdminAithentication, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const data = await dailyReportModel.find();

    if(data.length==0){
      return res.status(204).json({ message: "no data avialable" });
    }
    const itemsToSend = data .slice(startIndex, endIndex);
    const totalPages = Math.ceil(data .length / itemsPerPage);
    res.status(200).json({ message: 'daily report' , csv:itemsToSend , currentPage: page,
    totalPages: totalPages});
  } catch (error) {
    console.error('Error fetching data from MongoDB or uploading to Cloudinary:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
});



const task = async () => {
  try {
    const data = await CouponModel.find();
    const setle = await VendorSettlement.find();

    const total_couponGenerate = data.reduce((s, e) => {
      // console.log(e.generate.generateDate)
      if (e.generate.generateDate === getCurrentDateFormatted()) {
        s = s + 1;
        // console.log(s)
      }
      return s;
    }, 0);

    const   total_couponRedeem = data.reduce((r, e) => {
      // console.log(e.generate.generateDate)
      if (e.redeem.useDate === getCurrentDateFormatted()) {
        r = r + 1;
        // console.log(s)
      }
      return r;
    }, 0);

    const totalSendRequest =setle.reduce((sr, e) => {
      // console.log(e.generate.generateDate)
      if (e.sendor.Date==getCurrentDateFormatted() && e.sendor.status === "requested" && e.superAdmin.status=="pending" && e.receiver.status==="pending") {
        sr = sr + 1;
        // console.log(s)
      }
      return sr;
    }, 0);

    const totalAproveByAdmin=setle.reduce((aba, e) => {
      // console.log(e.generate.generateDate)
      if (e.superAdmin.Date === getCurrentDateFormatted() && e.sendor.status === "pending" && e.superAdmin.status=="returning" && e.receiver.status==="accepted" ||
       e.superAdmin.Date === getCurrentDateFormatted() &&
      e.sendor.status === "pending" && e.superAdmin.status=="accepted" && e.receiver.status==="pending") {
        aba = aba + 1;
        // console.log(s)
      }
      return aba;
    }, 0);

    const totalForwardByAdmin=setle.reduce((tba, e) => {
      // console.log(e.generate.generateDate)
      if (e.superAdmin.Date === getCurrentDateFormatted() && e.sendor.status === "requested" && e.superAdmin.status=="forwarded" && e.receiver.status==="pending" ) {
        tba = tba + 1;
        // console.log(s)
      }
      return tba;
    }, 0);

    const dailyReport = await dailyReportModel({
      total_couponGenerate,
      total_couponRedeem,
      totalSendRequest,
      totalAproveByAdmin,
      totalForwardByAdmin,
      totalAmountGive: 0,
      totalAmountTake: 0,
      createdAt: getCurrentDateFormatted(),
      time: getCurrentTime(),
      
    });

 
    const result = await dailyReport.save();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const publicId = `reports/report_${formattedDate}_${Date.now()}.csv`;
    const csvdata = await dailyReportModel.find({createdAt: getCurrentDateFormatted()}, {
      total_couponGenerate: 1,
      total_couponRedeem: 1,
      totalSendRequest: 1,
      totalAproveByAdmin: 1,
      totalForwardByAdmin: 1,
      totalAmountGive: ["b","c","d"],
      totalAmountTake: 1,
      createdAt: 1,
      time: 1,
      _id: 0 // Exclude the _id field
    }).lean().exec();

   const json2csv = new Parser();
    const csvData = json2csv.parse(csvdata);
   const csvBuffer = Buffer.from(csvData, 'utf-8');

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinaryV2.uploader.upload_stream(
        {
          public_id: `reports/report_${formattedDate}.csv`,
          publicId,
          resource_type: 'raw',
          folder: 'reports' // Store in a specific folder on Cloudinary
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      // Write the CSV buffer to the upload stream
      uploadStream.write(csvBuffer);
      uploadStream.end();
    });

    console.log('CSV file uploaded to Cloudinary:', uploadResult);

    const isAdmin = await dailyReportModel.findOneAndUpdate(
      { createdAt:getCurrentDateFormatted() },
       {  csvfileurl: uploadResult.secure_url },
     { new: true }
     );

    await isAdmin.save();
    console.log('Daily report created at', isAdmin);

  } catch (error) {
    console.log(error);
  
  }
};

// cron.schedule('00 23 * * *', task);

dailyReport.post('/triggertask', async (req, res) => {
  try {
    // Call your task function
    await task();

    res.status(200).json({ message: 'Task triggered successfully' });
  } catch (error) {
    console.error('Error triggering task:', error);
    res.status(500).json({ error: 'An error occurred while triggering the task' });
  }
});

module.exports = dailyReport;

function getCurrentDateFormatted() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function getCurrentTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}








