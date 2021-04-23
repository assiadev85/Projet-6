const mongoose=require('mongoose')
const likeSchema=new mongoose.Schema({
    //newPplace={type:String},
    newPlace:{type:String},
    author:{type:String},
    like:{type:String},
    nbrlike:{type:Number},
    dates:{type:Date,default:Date.now()}

})
const Like =mongoose.model('Like',likeSchema)
module.exports=Like;