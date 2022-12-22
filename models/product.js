const mongoose =require('mongoose')
const ProductSchema=mongoose.Schema({
Image:[{
    data:Buffer,
    ContentType:String,
    filename:String
}],
Name:{
    type:String
},
Description:{
    type:String
},
MRP:{
    type:String
},
Discount:{
    type:String
},
Shippingcharge:{
    type:String
}
},{timestamp:true})
module.exports =mongoose.model("product",ProductSchema)