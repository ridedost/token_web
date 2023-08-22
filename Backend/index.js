const express = require("express");
const cors = require("cors");
const { user_Router } = require("./Router/user_data");
const { connection } = require("./db");
const admin = require("./Router/admin");
const paymentRouter = require("./Router/payment_Routes");
const Coupon_validate = require("./Router/CouponValidate");
const Product_Router = require("./Router/Product");
const settleMentRoute = require("./Router/SettlementRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", user_Router);
app.use("/admin", admin);
app.use("/admin/payment", paymentRouter);
app.use('/admin/validate', Coupon_validate)
app.use('/admin/product', Product_Router)
app.use('/admin/coupons', Coupon_validate);

app.use('/admin/settle',settleMentRoute)

app.listen(4200, async () => {
  console.log("port is listing 4200");
  await connection;
});
