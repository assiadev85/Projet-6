const mongoose = require('mongoose');
const commentSchema=new mongoose.Schema({
    newPlace:{type:String},
    comment:{type:String},
    author:{type:String},
    nbrcomt:{type:Number},
    dates:{type:Date,default:Date.now()}


})
const Comment  = mongoose.model('Comment', commentSchema);

module.exports = Comment;