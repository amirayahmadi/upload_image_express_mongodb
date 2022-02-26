const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
  name:{
      type:String,
  } ,
  qte:{
    type:Number,
 } ,
price:{
    type:Number,
},
images:[{
    name:{
        type:String
    }
}],
category:{
    type:mongoose.Types.ObjectId,
    ref:'category'
},
selled:{
    type:Number,
    default:0
}   

},{timestamps:true})
module.exports = new mongoose.model('product',productSchema)
