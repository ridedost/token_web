const mongoose = require('mongoose');


const CheckoutSchema = mongoose.Schema({
    phoneNumber :{type:String, required:true},
    amount :{type:Number, required:true},
    
    coupon: {type:String},
})


const checkoutModel = mongoose.model('checkout', CheckoutSchema);

module.exports = checkoutModel;