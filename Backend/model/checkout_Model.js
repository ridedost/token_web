const mongoose = require('mongoose');


const CheckoutSchema = mongoose.Schema({
    phoneNumber :{type:String, required:true},
    amount :{type:Number, required:true},
    Date:{type:String,default:getCurrentDateFormatted()},
    coupon: {type:String},
    
})


const checkoutModel = mongoose.model('checkout', CheckoutSchema);

module.exports = checkoutModel;

function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }