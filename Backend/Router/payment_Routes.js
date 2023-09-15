const CouponModel = require("../model/coupon");
const productModel = require("../model/product");
const express = require("express");
const Admin = require("../model/Admin_Model");
const { sendNotification } = require("./firebase");
const paymentRouter = express.Router();
const { adminAuth } = require("../midleware/adminAuth");
const { paymentModel } = require("../model/Payment");
const coponCode = require("coupon-code");
const VendorSettlement = require("../model/Settlement");
const { userModel } = require("../model/user_Model");
const checkoutModel = require("../model/checkout_Model");
const { loginAuth } = require("../midleware/auth");
const { userAuth } = require("../midleware/userAuth");

paymentRouter.post("/", adminAuth, async (req, res) => {
  try {
    const payload = req.body;
    const { name } = payload;
    const { couponCode, vendorID, productId } = payload;

    const isProduct = await productModel.findOne({ _id: productId });

    payload.amount = isProduct.price;

    if (couponCode) {
      const isCouponValid = await CouponModel.findOne({ couponCode });
      const isVendor = await Admin.findOne({ _id: vendorID });
      if (isCouponValid.status == "Invalid") {
        return res.status(400).json({ message: "Coupon is Invalid" });
      }
      console.log("this is coupon", isCouponValid);

      const { cash } = isVendor;
      const { point } = isCouponValid;
      const pointValue = +point * +cash;

      payload.actualAmount = +payload.amount - +pointValue;
      payload.pointValue = pointValue;

      isCouponValid.redeem.vendorId = vendorID;
      isCouponValid.redeem.useDate = new Date();
      isCouponValid.status = "Invalid";

      await CouponModel.findOneAndUpdate(
        { couponCode: isCouponValid.couponCode },
        isCouponValid,
        { new: true }
      );

      const vendorId = isCouponValid.generate.vendorId;

      sendNotification(
        "success",
        vendorId,
        "Coupon has been Used",
        "Your coupon has been used by other vendor"
      );

      //sendor vendor finding....

      const receiverVendor = await Admin.findOne({ _id: vendorId });

      //reciever vendor finding....

      const sendorVendor = await Admin.findOne({
        _id: isCouponValid.redeem.vendorId,
      });

      //user details finding ...
      const { userID } = isCouponValid;

      const isUser = await userModel.findOne({ _id: isCouponValid.userID });

      const settlementObj = {
        sendor: {
          vendorId: sendorVendor._id,
          vendorName: sendorVendor.name,
        },
        reciever: {
          vendorId: receiverVendor._id,
          vendorName: receiverVendor.name,
        },
        amount: pointValue,
        CouponValue: isCouponValid.point,
        coupon: {
          Date: new Date(),
          couponCode: isCouponValid.couponCode,
        },
        user: {
          name: isUser.name,
          userId: isCouponValid.userID,
        },
      };

      const isSettlement = await VendorSettlement(settlementObj);

      await isSettlement.save();
    }

    const isPayment = await paymentModel(payload);

    if (!isPayment) {
      return res.status(500).json({ message: "Internal server error" });
    }

    const { amount, userID } = await isPayment.save();

    sendNotification("success", userID, "Payment Done", `${amount} payment Done`);

    const coupon = {
      point: "",
      userId: "",
      expirationDate: "",
      status: "",
      couponCode: "",
      generate: {},
      redeem: {},
    };

    /// send new coupon

    if (amount >= 1000 && amount <= 2000) {
      coupon.point = Math.floor(Math.random() * 6) + 10;
      coupon.userID = userID;
      const currentDate = new Date();
      const day = currentDate.getDate();
      let month = currentDate.getMonth() + 7;
      month = +month % 12;

      if (month <= 9) {
        month = "0" + month;
      }
      const year = currentDate.getFullYear();
      const fullDate = year + "-" + month + "-" + day;

      coupon.expirationDate = fullDate;
      coupon.status = "valid";

      coupon.couponCode = coponCode.generate();

      coupon.generate.vendorId = vendorID;
      coupon.userName = name;

      const newCoupon = await CouponModel(coupon);

      await newCoupon.save();

      sendNotification(
        "success",
        userID,
        "Get Coupon",
        `You have get a coupon ${coupon}`
      );
      return res
        .status(200)
        .json({ message: "successfully payment and get coupon", coupon });
    }

    /// send new coupon

    if (amount >= 2500) {
      coupon.point = Math.floor(Math.random() * 6) + 20;
      coupon.userID = userID;
      const currentDate = new Date();
      const day = currentDate.getDate();
      let month = currentDate.getMonth() + 7;
      month = +month % 12;

      if (month <= 9) {
        month = "0" + month;
      }
      const year = currentDate.getFullYear();
      const fullDate = year + "-" + month + "-" + day;

      coupon.expirationDate = fullDate;
      coupon.status = "valid";

      coupon.couponCode = coponCode.generate();

      coupon.generate.vendorId = vendorID;
      coupon.userName = name;

      const newCoupon = await CouponModel(coupon);

      await newCoupon.save();
      sendNotification(
        "success",
        userID,
        "Get Coupon",
        `You have get a coupon ${coupon}`
      );

      return res
        .status(200)
        .json({ message: "successfully payment and get coupon", coupon });
    }

    res.status(500).json({ message: "payment successfully completed" });
  } catch (error) {
    console.error("Error while processing payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const monthData = {
  Jan: 0,
  Feb: 0,
  Mar: 0,
  Apr: 0,
  May: 0,
  Jun: 0,
  Jul: 0,
  Aug: 0,
  Sep: 0,
  Oct: 0,
  Nov: 0,
  Dec: 0,
};
const monthAmounts = {
  Jan: 0,
  Feb: 0,
  Mar: 0,
  Apr: 0,
  May: 0,
  Jun: 0,
  Jul: 0,
  Aug: 0,
  Sep: 0,
  Oct: 0,
  Nov: 0,
  Dec: 0,
};



//vendor
// paymentRouter.get('/coupon/month-data',loginAuth,async (req, res) => {

//   const vendorId =  req.body.vendorId
//   const inputData= await CouponModel.find({
//     $or: [
//       {"generate.vendorId": req.body.vendorId},
//       {"redeem.vendorId": req.body.vendorId}
//     ]
//   })
//   console.log(inputData)
//   inputData.forEach((item) => {
//     const generateDate = new Date(item.generate.generateDate);
//     const month = generateDate.toLocaleString('default', { month: 'short' });
//     const value = parseInt(item.point, 10);
//     if (!isNaN(value)) {
//       monthData[month] += value;
//     }
//   });


//   const datas = Object.keys(monthData).map((month) => ({
//     label: month,
//     value: monthData[month],
//   }));

//   res.json(datas);
// });


paymentRouter.get('/coupon/month-data', loginAuth, async (req, res) => {
  try {
    const vendorId = req.body.vendorId;

    // Initialize an object to store month-wise data
    const monthData = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    const inputData = await CouponModel.find({
      $or: [
        { "generate.vendorId": vendorId },
        { "redeem.vendorId": vendorId }
      ]
    });
    console.log(inputData);

    inputData.forEach((item) => {
      const generateDate = new Date(item.generate.generateDate);
      const month = generateDate.toLocaleString('default', { month: 'short' });
      const value = parseInt(item.point, 10);
      if (!isNaN(value)) {
        monthData[month] += value;
      }
    });

    const datas = Object.keys(monthData).map((month) => ({
      label: month,
      value: monthData[month],
    }));

    res.json(datas);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while processing the data.' });
  }
});

//user
// paymentRouter.get('/coupon/user/month-data',userAuth,async (req, res) => {
//   const userId = req.body.userId;

//   const inputData= await CouponModel.find({ userID: userId})
//   console.log(inputData)
//   inputData.forEach((item) => {
//     const generateDate = new Date(item.generate.generateDate);
//     const month = generateDate.toLocaleString('default', { month: 'short' });
//     const value = parseInt(item.point, 10);
//     if (!isNaN(value)) {
//       monthData[month] += value;
//     }
//   });


//   const datas = Object.keys(monthData).map((month) => ({
//     label: month,
//     value: monthData[month],
//   }));

//   res.json(datas);
// });

paymentRouter.get('/coupon/user/month-data', userAuth, async (req, res) => {
  try {
    const userId = req.body.userId;

    // Initialize an object to store month-wise data
    const monthData = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    const inputData = await CouponModel.find({ userID: userId });
    console.log(inputData);

    inputData.forEach((item) => {
      const generateDate = new Date(item.generate.generateDate);
      const month = generateDate.toLocaleString('default', { month: 'short' });
      const value = parseInt(item.point, 10);
      if (!isNaN(value)) {
        monthData[month] += value;
      }
    });

    const datas = Object.keys(monthData).map((month) => ({
      label: month,
      value: monthData[month],
    }));

    res.json(datas);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while processing the data.' });
  }
});


//superadmin
// paymentRouter.get('/month-data/amount',loginAuth,async (req, res) => {
//   // Convert the monthData object to the desired output array format

//   const inputData= await checkoutModel.find()
//   console.log(inputData)

// inputData.forEach((item) => {
//   const date = new Date(item.Date);
//   const month = date.toLocaleString('default', { month: 'short' });
//   monthAmounts[month] += item.amount;
// });

// // Convert the monthAmounts object to the desired output array format
// const monthData = Object.keys(monthAmounts).map((month) => ({
//   label: month,
//   value: monthAmounts[month],
// }));

// res.json(monthData );
// });


paymentRouter.get('/month-data/amount', loginAuth, async (req, res) => {
  try {
    // Convert the monthData object to the desired output array format

    const inputData = await checkoutModel.find();
    console.log(inputData);

    const monthAmounts = {
      // Initialize an object to store month-wise amounts
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    inputData.forEach((item) => {
      const date = new Date(item.Date);
      const month = date.toLocaleString('default', { month: 'short' });
      monthAmounts[month] += item.amount;
    });

    // Convert the monthAmounts object to the desired output array format
    const monthData = Object.keys(monthAmounts).map((month) => ({
      label: month,
      value: monthAmounts[month],
    }));

    res.json(monthData);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while processing the data.' });
  }
});






//app vendor



paymentRouter.get('/coupon/week-data/vendor', loginAuth, async (req, res) => {
  const vendorId = req.body.vendorId;

  try {
    const inputData = await CouponModel.find({
      $or: [
        { "generate.vendorId": vendorId },
        { "redeem.vendorId": vendorId }
      ]
    });

    const daysOfWeek = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
    };
    
    const dayAmounts = {
      "Sun": 0,
      "Mon": 0,
      "Tue": 0,
      "Wed": 0,
      "Thu": 0,
      "Fri": 0,
      "Sat": 0,
    };
    
    inputData.forEach((item) => {
      const generateDate = new Date(item.generate.generateDate);
      const dayIndex = generateDate.getDay(); // Get the day index (0-6)
      const dayOfWeek = daysOfWeek[dayIndex];
      const value = parseInt(item.point, 10);
    
      if (!isNaN(value)) {
        dayAmounts[dayOfWeek] += value;
      }
    });
    
    const dayAmount=(Object.keys(dayAmounts).map((day) => ({
      "day": day,
      "value": dayAmounts[day],
    })));
    

    // res.json(dayAmount);

    return res
    .status(200)
    .json({ message: "successfully payment and get coupon", "daydata":dayAmount});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//app user
paymentRouter.get('/coupon/week-data/user', userAuth, async (req, res) => {
  const userId = req.body.userId;

  try {
    const inputData = await CouponModel.find({
      userID:userId
    });

    const daysOfWeek = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
    };
    
    const dayAmounts = {
      "Sun": 0,
      "Mon": 0,
      "Tue": 0,
      "Wed": 0,
      "Thu": 0,
      "Fri": 0,
      "Sat": 0,
    };
    
    inputData.forEach((item) => {
      const generateDate = new Date(item.generate.generateDate);
      const dayIndex = generateDate.getDay(); // Get the day index (0-6)
      const dayOfWeek = daysOfWeek[dayIndex];
      const value = parseInt(item.point, 10);
    
      if (!isNaN(value)) {
        dayAmounts[dayOfWeek] += value;
      }
    });
    
    const dayAmount=(Object.keys(dayAmounts).map((day) => ({
      "day": day,
      "value": dayAmounts[day],
    })));
    

    // res.json(dayAmount);

    return res
    .status(200)
    .json({ message: "successfully payment and get coupon", "daydata":dayAmount});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//app superadmin
paymentRouter.get('/week-data/amount/admin', loginAuth, async (req, res) => {
  // Get the current date
  const currentDate = new Date();
   const dayAmounts = {
    "Sun": 0,
    "Mon": 0,
    "Tue": 0,
    "Wed": 0,
    "Thu": 0,
    "Fri": 0,
    "Sat": 0,
  };
  
  // Calculate the start and end dates of the current week
  const currentWeekStartDate = new Date(currentDate);
  currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the previous Sunday
  const currentWeekEndDate = new Date(currentWeekStartDate);
  currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 6); // Set to the next Saturday

  // Format the start and end dates in the "YYYY-MM-DD" format
  const formattedCurrentWeekStartDate = formatDate(currentWeekStartDate);
  const formattedCurrentWeekEndDate = formatDate(currentWeekEndDate);

  try {
    // Retrieve data from your database for the current week using string comparisons
    const inputData = await checkoutModel.find({
      Date: {
        $gte: formattedCurrentWeekStartDate,
        $lte: formattedCurrentWeekEndDate,
      },
    });

    // Your data processing code goes here

    // res.json(inputData);

    inputData.forEach((item) => {
      const date = new Date(item.Date);
      const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
      const amount = item.amount;
      
      // Update the dayAmounts object based on the day of the week
      if (dayAmounts.hasOwnProperty(dayOfWeek)) {
        dayAmounts[dayOfWeek] += amount;
      }
    });
  
    // // Convert the dayAmounts object to the desired output array format
    const dayData = Object.keys(dayAmounts).map((day) => ({
      "day": day,
      "value": dayAmounts[day],
    }));
    
    
    // res.json(dayData);
    return res
    .status(200)
    .json({ message: "successfully payment and get coupon", "daydata":dayData });
  
  } catch (error) {
    console.error("Error while querying the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to format a Date object as "YYYY-MM-DD"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}








module.exports = paymentRouter;