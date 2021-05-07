var express = require('express');
var router = express.Router();
const User = require('../models/userSchema')
const { upload} = require('../config/multer')
const Place = require('../models/placeSchema')
const Comment = require('../models/commentSchema');
const Like = require('../models/likeSchema')
const { Console} = require('console');

//upload image //
router.get('/picture',(req, res, next) => {
res.render('upload');
});

router.post('/addPicture', upload.single('pic'), (req, res, next) => {
    // console.log(req.file);
   const path = "/images/upload/" + req.file.filename
   console.log(path)
    // const dest = req.file.destination.split("/");
    // const path = dest[1] + "/" + dest[2] + "/" + req.file.filename;
    const newPlace = new Place({
        name: req.body.name,
        description: req.body.desc,
        pathImage: path

    });
    newPlace.save(function (error, doc) {

        if (error) throw error;
        else {
            console.log(doc);
            res.status(200).redirect('/')
        }
    })

});
//PROTECTION DE ROUTE //
let isAuth = function (req, res, next) {
    if (req.session.user_ID !== undefined) {
        next();
    } else {
        res.redirect('/login');
    }
}
//ROUTE GET POUR NEWPLACE
router.get('/', isAuth, (req, res) => {
    res.render('newPlace',{title:'newPlace'})
})
//LES DETAIL DE NEWPLACE//
router.get('/details/:id', (req, res, next) => {
    let placeId = req.params.id;
    //console.log(placeId)

    Place.findOne({
            _id: placeId
        }).then((newPlace) => {

            // console.log(newPlace)
            Like.find({
                    newPlace: placeId
                }).then((likes) => {

                    Comment.find({
                        newPlace: placeId
                    }).then((comments) => {
                        res.render('details', {
                            Place: newPlace,
                            Comment: comments,
                            user: req.session.user_ID,
                            Like: likes
                        });

                    })

                })
                .catch((error) => {
                    throw error
                })

        })
        .catch((error) => {
            throw error
        })
})


//COMMENTAIRE//
router.post('/details/:id', (req, res, next) => {
    let placeId = req.params.id;
    let userId = req.session.user_ID;
    let comment = req.body.comtval
    User.findOne({
        _id: req.session.user_ID
    }).then((user) => {
        const newComment = new Comment({
            newPlace: placeId,
            author: `${user.firstname} ${user.lastname}`,
            comment: comment,

        });
        newComment.save((err, doc) => {
            // console.log(newComment)
            if (err) throw err;
            else {
                res.status(200).send({
                    Comment: doc
                })

                console.log('commentaire ajouter')
            }
        });
    }).catch((error) => {
        throw error
    })

})
//LES LIKES//
router.get('/details/:id/like', (req, res, next) => {
    res.render('details')
})


router.post('/details/:id/like', (req, res, next) => {
    // console.log(req.body)

    let placeId = req.params.id
    let userId = req.session.user_ID;

    const newLike = new Like({
        newPlace: placeId,
        user: userId,
      
    });
    newLike.save((err, doc) => {
        console.log(doc)

        if (err) throw err
        else {
            Like.find({
                newPlace:placeId
            })
            .then(likes=>{
                res.status(200).send({
                    Like:likes.length

                }).catch((error) => {
                    throw error
                })
            
            }) 
        }
    })


})






module.exports = router;