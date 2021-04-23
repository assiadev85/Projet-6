const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    pathImage: {type: String},
    name:{type: String},
    author:{type:mongoose.ObjectId},
    description: {type: String},
    isValid:{type:Boolean,default:false},
    dates:{type:String,default:Date.now()},
    
})
const Place  = mongoose.model('Place', placeSchema);

  
module.exports = Place;