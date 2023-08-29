const express = require("express");
const Admin = require("../model/Admin_Model");
const admin = express.Router();
const { userModel } = require("../model/user_Model.js");
const productModel = require("../model/product");
const jwt = require("jsonwebtoken");
const { sendNotification } = require("./firebase");
const VendorSettlement = require("../model/Settlement");
const cloudinary = require("./cloudinary");
const requestModel = require("../model/request");
const {
  Adminauth,
  AdminAithentication,
  loginAuth,
} = require("../midleware/auth");

const { adminAuth } = require("../midleware/adminAuth");
const { paymentModel } = require("../model/Payment");
const CouponModel = require("../model/coupon");
const coponCode = require("coupon-code");
const checkoutModel = require("../model/checkout_Model");
const PaymentSettlement = require("../model/paymentSettle");

admin.post("/login/:mobile", async (req, res) => {
  const { mobile } = req.params;
  const isAdmin = await Admin.findOne({ phoneNumber: mobile });
  console.log(isAdmin, "this is admin");
  if (!isAdmin) {
    return res.status(404).json({ message: "User not found" });
  }

  const { _id } = isAdmin;

  var token = jwt.sign({ userId: _id }, "shhhh");

  if (isAdmin?.role === "admin") {
    token += "1";
    return res.status(200).json({ message: "login succesfully", token });
  }

  if (isAdmin?.role === "vendor") {
    token = token + "2";

    return res.status(200).json({ message: "login succesfully", token });
  }
});

admin.post("/add", loginAuth, async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      companyName,
      companyOwner,
      companyLogo,
      address,
      presentageValue,
      thresholdvalue,
      id_proof,
      vendorId,
    } = req.body;

    console.log(req.body);

    const isAdmin = await Admin.findOne({ phoneNumber });
    const isUser = await userModel.findOne({ phoneNumber });

    if (isAdmin || isUser) {
      res
        .status(409)
        .json({ message: "Already present contact customer care" });
    }
    var adminData;
    if (id_proof && companyLogo) {
      const uploadedIDproof = await cloudinary.uploader.upload(id_proof, {
        upload_preset: "ridedost",
      });

      const uploadedLogo = await cloudinary.uploader.upload(companyLogo, {
        upload_preset: "ridedost",
        folder: "ridedost",
      });

      if (uploadedIDproof && uploadedLogo) {
        adminData = new Admin({
          name,
          email,
          phoneNumber,
          companyName,
          companyOwner,
          address,
          presentageValue,
          thresholdvalue,
          id_proof: uploadedIDproof,
          companyLogo: uploadedLogo,
          vendorId,
        });

        const response = await adminData.save();
        console.log("this is created admin ID", adminData._id);
      }
    }

    // const { vendorId } = adminData;

    const isVendor = await Admin.findOne({ _id: vendorId });

    console.log("vendor", isVendor);

    if (isVendor.role == "vendor") {
      const superAdmin = await Admin.findOne({ role: "admin" });
      const { _id } = superAdmin;
      const superAdminID = _id.toString();
      sendNotification(
        "success",
        superAdminID,
        "new Vendor Added",
        "Please Approve new vendor added"
      );
    }

    res.status(201).json({ message: "succesfully created" });
    console.log("successful created");
  } catch (err) {
    console.log("error", err);
    return res.status(500).json(err);
  }
});

admin.patch("/update/:id", Adminauth, async (req, res) => {
  const payload = req.body;

  const _id = req.params.id;
  const updateData = await Admin.findByIdAndUpdate({ _id }, { ...payload });

  if (!updateData) {
    return res.status(400).json({ message: "something went wrong" });
  }

  await updateData.save();
  return res.status(200).json({ message: "successFully update data" });
});

admin.get("/vendor", loginAuth, async (req, res) => {
  const vendors = await Admin.find();
  if (vendors.length == 0) {
    return res.status(404).json({ message: "data not found" });
  }

  res.status(200).json({ message: "succesfully get the data", vendors });
});

admin.patch("/approval/:id", AdminAithentication, async (req, res) => {
  const { id } = req.params;
  console.log("thi sis id", id);
  const isAdmin = await Admin.findOneAndUpdate(
    { _id: id },
    { status: "completed" }
  );

  if (!isAdmin) {
    return res.status(404).json({ message: "vendor not found" });
  }

  console.log("this is apporval routes", isAdmin);
  const { vendorId } = isAdmin;

  const isSuperAdmin = await Admin.find({ _id: vendorId });

  if (isSuperAdmin.role !== "admin") {
    sendNotification(
      "success",
      vendorId,
      "approved Vendor by Admin",
      `${isAdmin.phoneNumber} Vendor aproved by Admin`
    );
  }

  return res.status(200).json({ message: "succesfully Aproved by admin" });
});

admin.patch("/reject/:id", AdminAithentication, async (req, res) => {
  const { id } = req.params;

  const isAdmin = await Admin.findOneAndUpdate(
    { _id: id },
    { status: "Reject" }
  );
  if (!isAdmin) {
    return res.status(404).json({ message: "vendor not found" });
  }
  const { vendorId } = isAdmin;
  const isSuperAdmin = await Admin.find({ _id: vendorId });

  if (isSuperAdmin.role !== "admin") {
    sendNotification(
      "danger",
      vendorId,
      "Rejected Vendor by Admin",
      `${isAdmin.phoneNumber} Vendor Rejected by Admin`
    );
  }

  return res.status(200).json({ message: "succesfully reject  " });
});

admin.delete("/vendor/:id", AdminAithentication, async (req, res) => {
  const { id } = req.params;
  const isAdmin = await Admin.findOneAndDelete({ _id: id });

  if (!isAdmin) {
    return res.status(404).json({ message: "Not Found" });
  }
  return res.status(200).json({ message: "Deleted SuccesFully" });
});

admin.patch("/vendor/update/:id", AdminAithentication, async (req, res) => {
  const id = req.params;
  const data = req.body;
  const updatedData = await Admin.findOneAndUpdate({ _id: id }, data);
  if (!updatedData) {
    return res.status(404).json({ message: "User not Found" });
  }
  return res.status(200).json({ message: "succesFully update" });
});

admin.get("/recieved/request", AdminAithentication, async (req, res) => {
  const _id = req.body.adminId.toString();

  const allRequest = await VendorSettlement.find({ "superAdmin.adminId": _id });
  console.log(allRequest);

  if (allRequest.length == 0 || !allRequest) {
    return res
      .status(404)
      .json({ message: "no incoming settlement avavilable.." });
  }

  res
    .status(200)
    .json({ message: "here all the pending request..", allRequest });
});

admin.post("/forward/:_id", AdminAithentication, async (req, res) => {
  const { _id } = req.params;

  const forwardRequest = await VendorSettlement.findOne({ _id: _id });
  console.log(forwardRequest);
  // forwardRequest.sendor.status = "forwarded";
  forwardRequest.receiver.status = "pending";
  forwardRequest.superAdmin.status = "forwarded";

  const isrequested = await VendorSettlement.findByIdAndUpdate(
    { _id },
    { ...forwardRequest }
  );

  if (!isrequested) {
    return res.status(500).json({ message: "something went wrong" });
  }

  res
    .status(200)
    .json({ message: "succesfully forwarding to vendor", forwardRequest });
});

admin.patch("/return/:_id", AdminAithentication, async (req, res) => {
  const { _id } = req.params;

  const data = await VendorSettlement.findOne({ _id });

  data.superAdmin.status = "returning";
  // data.sendor.status = "requested";
  data.sendor.status = "pending";

  const isUpdate = await VendorSettlement.findByIdAndUpdate(
    { _id },
    { ...data }
  );

  console.log(isUpdate);

  if (!isUpdate) {
    return res.status(500).json({ message: "something went wrong..." });
  }

  return res.status(200).json({ message: "return to vendor..." });
});

admin.patch("/personalInfo/update", loginAuth, async (req, res) => {
  const payload = req.body;
  const _id = req.body.vendorId;
  const { profileImage } = req.body;

  if (profileImage) {
    const image = await cloudinary.uploader.upload(profileImage, {
      upload_preset: "ridedost",
    });
    req.body.profileImage = image;
  }

  console.log(req.body);
  const updateData = await Admin.findByIdAndUpdate(
    _id,
    { $set: req.body },
    { new: true }
  );

  if (!updateData) {
    return res.status(400).json({ message: "something went wrong" });
  }
  // console.log(updateData);
  await updateData.save();
  return res.status(200).json({ message: "successFully update data" });
});

//get data of single user
admin.get("/personalInfo", loginAuth, async (req, res) => {
  const _id = req.body.vendorId;
  console.log("id", req.body.vendorId);
  try {
    const vendorInfo = await Admin.find({ _id: _id });
    return res
      .status(200)
      .json({ message: "succesfully get the data", vendorInfo });
  } catch (error) {
    console.error("Error approving update:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

//checkout route

admin.post("/checkout", loginAuth, async (req, res) => {
  const vendor_id = req.body.vendorId;
  const data = await userModel.find({ mobile: req.body.phoneNumber });
  const admin = await Admin.find({ role: "admin" });
  console.log("admin", admin[0]._id.toString());

  const thresholdvalue = await Admin.find({ _id: vendor_id });
  var discount = 0; // Initialize discount with 0
  let coupon;
  try {
    if (data && data.length > 0) {
      console.log(thresholdvalue[0].thresholdvalue);

      if (thresholdvalue && thresholdvalue.length > 0 && req.body.coupon) {
        const couponValid = await CouponModel.find({
          couponCode: req.body.coupon,
        });
        console.log(couponValid[0].generate.vendorId);

        const generateCopoun = await Admin.find({
          _id: couponValid[0].generate.vendorId,
        });
        console.log(generateCopoun[0].name, "name");
        let valid = checkCouponValidity(couponValid[0].expirationDate);
        if (valid && couponValid[0].status == "valid") {
          req.body.amount = req.body.amount - couponValid[0].price;
          console.log(req.body.amount);
          const updateData = {
            status: "redeem",
            redeem: {
              vendorId: vendor_id,
              useDate: getCurrentDateFormatted(),
            },
          };

          const updatedCoupon = await CouponModel.findByIdAndUpdate(
            couponValid[0]._id,
            updateData,
            {
              new: true, // Return the updated document after the update
              runValidators: true, // Run Mongoose validation on the update
            }
          );
          console.log("updated", updatedCoupon);
          const sendRequest = new VendorSettlement({
            sendor: {
              vendorId: vendor_id,
              vendorName: thresholdvalue[0].name,
              Date: getCurrentDateFormatted(),
            },

            superAdmin: {
              adminId: admin[0]._id.toString(),

              status: "pending",
            },
            receiver: {
              vendorId: couponValid[0].generate.vendorId,
              vendorName: generateCopoun[0].name,
              status: "pending",
            },
            amount: updatedCoupon.price,

            CouponValue: updatedCoupon.point,
            coupon: {
              couponCode: updatedCoupon.couponCode,
            },

            user: {
              name: data[0].name,
              userId: data[0]._id.toString(),
            },
          });
          await sendRequest.save();
          console.log("updatecopupon", updatedCoupon);
          console.log("thresholdvalue", thresholdvalue[0].thresholdvalue);

          console.log("amount", req.body.amount);

          if (req.body.amount >= thresholdvalue[0].thresholdvalue) {
            console.log("yess");
            discount =
              thresholdvalue[0].thresholdvalue *
              (thresholdvalue[0].presentageValue / 100);
            coupon = await new CouponModel({
              point: discount,
              userID: data[0]._id,
              expirationDate: getFormattedDateSixMonthsLater(),
              status: "valid",
              couponCode: coponCode.generate(),
              generate: {
                vendorId: vendor_id,
              },
              price: discount,
              userName: data[0].name,
            });

            await coupon.save();
            // return res.status(200).json(`${data[0].name} congrats, you collected ${discount} points from the payment of ${thresholdvalue[0].companyName} and your payment is done  of  ${req.body.amount} rupees`);
          }
          const info = new checkoutModel(req.body);
          const response = await info.save();
          return res
            .status(200)
            .json(
              `${data[0].name} your payment is done  of  ${req.body.amount} rupees`
            );
        } else {
          res.status(404).json({ message: "Coupon not found" });
        }
      } else if (
        thresholdvalue &&
        thresholdvalue.length > 0 &&
        thresholdvalue[0].thresholdvalue <= req.body.amount
      ) {
        discount =
          thresholdvalue[0].thresholdvalue *
          (thresholdvalue[0].presentageValue / 100);
        coupon = await new CouponModel({
          point: discount,
          userID: data[0]._id,
          expirationDate: getFormattedDateSixMonthsLater(),
          status: "valid",
          couponCode: coponCode.generate(),
          generate: {
            vendorId: vendor_id,
          },
          price: discount,
          userName: data[0].name,
        });

        await coupon.save();

        const info = new checkoutModel(req.body);
        const response = await info.save();
        return res
          .status(200)
          .json(
            `${data[0].name} congrats, you collected ${discount} points from the payment of ${thresholdvalue[0].companyName} and your payment is done  of  ${req.body.amount} rupees`
          );
      } else {
        const info = new checkoutModel(req.body);
        const response = await info.save();
        return res
          .status(200)
          .json(
            `${data[0].name} your payment is done  of  ${req.body.amount} rupees`
          );
      }
    } else {
      return res
        .status(400)
        .json({ message: "Mobile number is not registered." });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: "An error occurred." });
  }
});

// admin request request
admin.get("/admin/recieved/request", AdminAithentication, async (req, res) => {
  const _id = req.body.adminId.toString();

  // const allRequest = await VendorSettlement.find({"superAdmin.adminId": _id,"sendor.status":"requested", });
  const allRequest = await VendorSettlement.find({
    "superAdmin.adminId": _id,
    $or: [
      // { "sendor.status": "requested" },
      // { "receiver.status": "accepted"},
      // { "receiver.status": "rejected" },
      {
        $and: [
          { "sendor.status": "requested" },
          { "receiver.status": "pending" },
          { "superAdmin.status": "pending" },
        ],
      },
      {
        $and: [
          { "sendor.status": "requested" },
          { "receiver.status": "accepted" },
          { "superAdmin.status": "forwarded" },
        ],
      },
      {
        $and: [
          { "sendor.status": "requested" },
          { "receiver.status": "accepted" },
          { "superAdmin.status": "requestedback" },
        ],
      },
    ],
  });

  console.log(allRequest.length);

  if (allRequest.length == 0 || !allRequest) {
    return res
      .status(404)
      .json({ message: "no incoming settlement avavilable.." });
  }

  res
    .status(200)
    .json({ message: "here all the pending request..", allRequest });
});

//vendor recieved request
admin.get("/vendor/recieved/request", loginAuth, async (req, res) => {
  const _id = req.body.vendorId;
  console.log("id", _id);
  const allRequest = await VendorSettlement.find({
    "sendor.vendorId": _id,
    $or: [
      
      {
        $and: [
          { "sendor.status": "requested" },
          { "receiver.status": "pending" },
          { "superAdmin.status": "accepted" },
        ],
      },
      {
        $and: [
          { "sendor.status": "pending" },
          { "receiver.status": "accepted" },
          { "superAdmin.status": "returning" },
        ],
      },
      {
        $and: [
          { "sendor.status": "pending" },
          { "receiver.status": "pending" },
          { "superAdmin.status": "accepted" },
        ],
      },
      {
        $and: [
          { "sendor.status": "requested" },
          { "receiver.status": "pending" },
          { "superAdmin.status": "forwarded" },
        ],
      },
    ],
  });

  console.log(allRequest);

  if (allRequest.length == 0 || !allRequest) {
    // return res
    //   .status(404)
    //   .json({ message: "no incoming settlement avavilable.." });
    const allReq = await VendorSettlement.find({
      "receiver.vendorId": _id,
      $or: [
        // {"superAdmin.status": "returning"},
        //   // {"superAdmin.status":"forwarded"},
        //   // {"sendor.status":"forwarded",},
        //   {"receiver.status":"accepted"},
        //   {"sendor.status":"pending"},
        // { $and: [  {"sendor.status":"requested"},{"receiver.status":"pending"},{"superAdmin.status":"forwarded"}] },
        {
          $and: [
            { "sendor.status": "requested" },
            { "receiver.status": "pending" },
            { "superAdmin.status": "accepted" },
          ],
        },
        {
          $and: [
            { "sendor.status": "pending" },
            { "receiver.status": "accepted" },
            { "superAdmin.status": "returning" },
          ],
        },
        {
          $and: [
            { "sendor.status": "pending" },
            { "receiver.status": "pending" },
            { "superAdmin.status": "accepted" },
          ],
        },
        {
          $and: [
            { "sendor.status": "requested" },
            { "receiver.status": "pending" },
            { "superAdmin.status": "forwarded" },
          ],
        },
      ],
    });
    return res
      .status(200)
      .json({ message: "here all the pending request..", allReq });
  }

  res
    .status(200)
    .json({ message: "here all the pending request..", allRequest });
});





// admin.get("/vendor/recieved/request/accepted", loginAuth, async (req, res) => {
//   const _id = req.body.vendorId;
//   console.log("id", _id);

//   const allRequest = await VendorSettlement.find({
//     "receiver.vendorId": _id,
//     $or: [
//       // {"superAdmin.status": "returning"},
//       //   // {"superAdmin.status":"forwarded"},
//       //   // {"sendor.status":"forwarded",},
//       //   {"receiver.status":"accepted"},
//       //   {"sendor.status":"pending"},
//       // { $and: [  {"sendor.status":"requested"},{"receiver.status":"pending"},{"superAdmin.status":"forwarded"}] },
//       {
//         $and: [
//           { "sendor.status": "requested" },
//           { "receiver.status": "pending" },
//           { "superAdmin.status": "accepted" },
//         ],
//       },
//       {
//         $and: [
//           { "sendor.status": "requested" },
//           { "receiver.status": "pending" },
//           { "superAdmin.status": "forwarded" },
//         ],
//       },
//       {
//         $and: [
//           { "sendor.status": "pending" },
//           { "receiver.status": "accepted" },
//           { "superAdmin.status": "returning" },
//         ],
//       },
//       {
//         $and: [
//           { "sendor.status": "pending" },
//           { "receiver.status": "pending" },
//           { "superAdmin.status": "accepted" },
//         ],
//       },
//     ],
//   });

//   console.log(allRequest);

//   if (allRequest.length == 0 || !allRequest) {
//     return res
//       .status(404)
//       .json({ message: "no incoming settlement avavilable.." });
//   }

//   res
//     .status(200)
//     .json({ message: "here all the pending request..", allRequest });
// });

admin.patch(
  "/vendor/recieved/request/accept/:_id",
  loginAuth,
  async (req, res) => {
    const { _id } = req.params;

    const data = await VendorSettlement.findOne({ _id });

    if (
      data.superAdmin.status == "accepted" && data.receiver.status == "accepted"
    ) {
      return res.status(409).json({ message: "already accepeted" });
    }

    if (
      (data.superAdmin.status == "returning" &&
        data.sendor.status == "pending") ||
      (data.sendor.status == "pending" &&
        data.superAdmin.status == "accepted" &&
        data.receiver.status == "pending")
    ) {
      data.superAdmin.status = "accepted";
      data.sendor.status = "accepted";
      data.receiver.status = "accepted";

      const paymentsettlemen = new PaymentSettlement({
        requestedBy: {
          vendorId: data.sendor.vendorId,
          vendorName: data.sendor.vendorName,
        },
        requestedTo: {
          vendorId: data.receiver.vendorId,
          vendorName: data.receiver.vendorName,
        },
        amount: data.amount,
        AprovedDate: Date.now(),
        coupon: {
          couponCode: data.coupon.couponCode,
          CouponValue: data.CouponValue,
        },
        user: {
          name: data.user.name,
          userId: data.user.userId,
        },
      });

      const isUpdate = await VendorSettlement.findOneAndUpdate(
        { _id },
        { ...data }
      );
      const response = await paymentsettlemen.save();
      return res.status(409).json({ message: " accepeted", response });
    }

    if (
      data.sendor.status == "requested" &&
      data.receiver.status == "pending" &&
      data.superAdmin.status == "pending"
    ) {
      data.sendor.status = "pending";
      data.superAdmin.status = "accepted";
      const isUpdate = await VendorSettlement.findOneAndUpdate(
        { _id },
        { ...data }
      );
      return res.status(200).json({ message: "succesfully accepeted" });
    }

    data.superAdmin.status = "requestedback";
    data.receiver.status = "accepted";

    const isUpdate = await VendorSettlement.findOneAndUpdate(
      { _id },
      { ...data }
    );

    if (!isUpdate) {
      return res.status(500).json({ message: "something went wrong..." });
    }

    return res.status(200).json({ message: "succesfully accepeted" });
  }
);

admin.patch(
  "/vendor/recieved/request/rejected/:_id",
  loginAuth,
  async (req, res) => {
    const { _id } = req.params;

    const data = await VendorSettlement.findOne({ _id });

    if (data.superAdmin.status == "rejected") {
      return res.status(409).json({ message: "already rejected" });
    }

    data.sender.status = "rejected";
    data.superAdmin.status = "rejected";
    data.reciever.status = "rejected";

    const isUpdate = await VendorSettlement.findOneAndUpdate(
      { _id },
      { ...data }
    );

    if (!isUpdate) {
      return res.status(500).json({ message: "something went wrong..." });
    }

    return res.status(200).json({ message: "succesfully rejected" });
  }
);

// admin.patch("/return/:_id", AdminAithentication, async (req, res) => {
//   const { _id } = req.params;

//   const data = await VendorSettlement.findOne({ _id });

//   data.superAdmin.status ="accepted";
//   data.sendor.status = "requested";

//   const isUpdate = await VendorSettlement.findByIdAndUpdate(
//     { _id },
//     { ...data }
//   );

//   console.log(isUpdate);

//   if (!isUpdate) {
//     return res.status(500).json({ message: "something went wrong..." });
//   }

//   return res.status(200).json({ message: "return to vendor..." });
// });

function getFormattedDateSixMonthsLater() {
  const currentDate = new Date();
  const sixMonthsLater = new Date(currentDate);
  sixMonthsLater.setMonth(currentDate.getMonth() + 6);

  const year = sixMonthsLater.getFullYear();
  const month = (sixMonthsLater.getMonth() + 1).toString().padStart(2, "0");
  const day = sixMonthsLater.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCurrentDateFormatted() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function checkCouponValidity(expirationDate) {
  const currentDate = new Date();
  const expirationDateObj = new Date(expirationDate);

  if (currentDate <= expirationDateObj) {
    return true;
  } else {
    return false;
  }
}

module.exports = admin;
