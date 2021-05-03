var express = require('express');
var router = express.Router();
const User=require('../models/userSchema')
const crypto=require('crypto');

//INSCRIPTION//
router.get('/', function (req, res, next) {
  res.render('registation',{title:'Login'})
});
router.post('/signup', (req, res, next) => {
      console.log(req.body);
      let firstname = req.body.firstname.trim();
      let lastname = req.body.lastname.trim();
      let email = req.body.email.trim();
      let password = req.body.password.trim()
      let passwordC = req.body.passwordC.trim()
      let reg = /^[a-zA-Z]+$/;
      let re = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
      var hashPassword = crypto.createHash('sha256').update(password).digest('hex');

      if (re.test(email) && password != '' && reg.test(firstname) && reg.test(lastname) && email != '' && passwordC != '') {
        console.log('ok');
        if (password === passwordC) {
          var hashPassword = crypto.createHash('sha256').update(password).digest('hex');
          User.find({email: req.body.email}).then((users) => {
              //console.log('users')
              if (users.length < 1) {
                 const user = new User({
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  password: hashPassword
                });

                user.save((err,doc)=>{
                  if(err)throw err;
                  else{
                    res.redirect('/login')
                  }
                })
              
            } else {
              res.render('registation', {error: 'email deja existant'})
            }
          })
         }else {
            res.render('registation', {
              error: 'mot de passe inccorect'
            })
          };

        } else {
          res.render('registation', { error: 'veuillez remplir les champs corectement'})

        }

       })
//CONNEXION//
router.get('/', function (req, res, next) {
  res.render('registation')
});
router.post('/',(req,res,next)=>{
  console.log(req.body);
  let email = req.body.email.trim();
  let password =req.body.password.trim();
  let re = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
  if(re.test(email)&&password!=''&&email!=''){
    User.find({email: req.body.email}).then((users) => {
      if(users.length>0){
      var hashPassword = crypto.createHash('sha256').update(password).digest('hex');
      if(users[0].password==hashPassword){
        req.session.user_ID = users[0]._id;
        res.redirect('/')
      }else{
        res.render('registation',{error:'mot de passe incorect'})
      }

      }else{
        res.render('registation',{error:'email n\'exist pas'})
      }
    })
  }else{
    res.render('registation',{error:'veuillez inserer les champs correctement'})
  }
    

})

//DECONNEXION
router.get('/logout',function(req,res,next) {
  
  req.session.destroy(function(){
    console.log('session suprimée');
    res.redirect('/')

  })
})
module.exports = router;

