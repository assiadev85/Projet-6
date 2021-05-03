var express = require('express');
var router = express.Router();
const {upload}= require('../config/multer')
const crypto=require('crypto');
const User=require('../models/userSchema')
const Place =require('../models/placeSchema')
const Comment=require('../models/commentSchema');
const Like=require('../models/likeSchema')
const { Console } = require('console');

//AFFICHER LES LIEUX SUR LACCEUIL////

router.get('/',(req,res,next)=>{
  Place.find({isValid:true}).then((newPlace)=>{

 res.render('index',{Place:newPlace,title:'Home'})
 })
 .catch((error)=>{
   throw error
})
});


//SEARCH//
router.get('/search',(req,res,next)=>{
  console.log(req.query.query)
  
  Place.find({name:{$regex:req.query.query,$options:'i'}}).then(places=>{

    res.status(200).send({places})
  }).catch(err=>{
    throw err;
  })

 })


module.exports = router;

