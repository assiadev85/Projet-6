const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname:{type: String},
    email: {type: String},
    photo: {type:String},
    isAdmin:{type:Boolean,default:false},
    password: {type: String},
    });

const User = mongoose.model('User', userSchema);

module.exports = User;
