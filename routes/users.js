var express = require('express');
var router = express.Router();
const User = require('../models/userSchema');
 //profil//
 router.get('/profil',(req,res,next)=>{
     User.find({_id:req.session.user_ID})
     .then((users)=>{
         console.log(users)
         res.render('profil',{User:users})

     })
     .catch((error)=>{
         throw error
     })
    
    
 })




    module.exports = router;