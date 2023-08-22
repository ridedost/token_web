
const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    name :{type:String, required:true},
    rating :{type:String, required:true},
    price: {type:String,required:true},
    vendorId:{type: String,required:true}
})


const productModel = mongoose.model('product', ProductSchema);

module.exports = productModel;