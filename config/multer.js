const multer =require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images/uploads')
    },
    filename:function(req,file,cb){
        const fileName=Date.now()+'-'+file.originalname;
        cb(null,fileName);
    }
})
const upload = multer({storage});

exports.upload=upload;