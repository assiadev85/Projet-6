var express = require('express');
const { get } = require('.');
const Place =require('../models/placeSchema');
const User=require('../models/userSchema')
var router = express.Router();

const isAdmin=function(req,res,next){
    if(req.session.user_ID !==undefined){
        User.findOne({_id:req.session.user_ID}).then((user)=>{
            if(user.isAdmin===true){
                next()
            }else{
                res.redirect('/')
            }

        })
    }else{
        res.redirect('/')
    }
}
router.get("/",(req,res,next)=>{
   
    Place.find({isValid:false}).then((newPlace)=>{
        console.log('ok')
        res.render("listaddmin",{Place:newPlace})

    }).catch((err)=>{

    })
    
})
router.post("/valid",(req,res,next)=>{
    let placeId = req.body.id
    console.log(placeId)
     Place.findOneAndUpdate({_id:placeId},{isValid:true},{new:true})
     .then((Place) => {
        console.log(Place);
        res.redirect("/");
    })
    .catch((err)=>{
        next(err);
    });
});

     





module.exports = router;