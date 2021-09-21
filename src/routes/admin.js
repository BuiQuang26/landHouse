const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const path = require('path');
const multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.dirname(__dirname) + '/public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,file.fieldname + '-' + uniqueSuffix + '.jpg');
    }
  })

  const upload = multer({ storage: storage })

router.get('/',adminController.index)
router.get('/up-home',adminController.upHome)
router.post('/up-home', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery'}]) ,adminController.saveHome)
router.get('/update/:slug',adminController.updateHome);
router.put('/update/:slug',upload.single('avatar'),adminController.updateHomeSave);
router.delete('/delete/:id',removeImg,adminController.deleteHome)

const fs = require('fs')
const Home = require('../models/home');
function removeImg(req,res,next){
    let idHome = req.params.id;
    Home.findOne({_id: idHome})
        .then(home=>{
            const oldAvatarUrl = path.dirname(__dirname) + '/public/' + home.avatar;
            if(home.avatar){
                fs.unlink(oldAvatarUrl, function(err){
                    if(err) throw err;
                })
            }
            if(home.gallery.length !== 0){
                var oldImgGallery = home.gallery.map(imgUrl=>{
                    return path.dirname(__dirname) + '/public/' + imgUrl;
                })
                oldImgGallery.forEach(element => {
                    fs.unlinkSync(element);
                });
            }
            next();
        })
        .catch(()=>{res.status(500).json({delete: 'remove img false'})});
}

module.exports = router;