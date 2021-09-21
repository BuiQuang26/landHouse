const path = require('path');
const fs = require('fs');
const Home = require('../models/home');
const { throws } = require('assert');

class adminController{

    // [GET] /admin/
    index(req,res,next){
        res.sendFile(path.dirname(__dirname) + '/views/admin/index.html');
    }

    // [GET] /admin/up-home
    upHome(req, res, next){
        res.sendFile(path.dirname(__dirname) + '/views/admin/up-home.html');
    }

    saveHome(req,res,next){
        var avatar = '';
        var gallery = [];
        if(req.files.avatar){
             avatar = `uploads/${req.files.avatar[0].filename}`;
        }
        if(req.files.gallery){
            gallery = req.files.gallery.map((img)=>{
               return `uploads/${img.filename}`;
           });
        }
        req.body.location = `${req.body.location}[ ${req.body.city} ]`;
        
        var newHome ={...req.body, avatar, gallery};
        var home = new Home(newHome);
        home.save()
            .then(()=>{
                res.redirect('back');
            })
            .catch(err=>{res.status(500).json({message: 'loi server ' + err})});
    }

    updateHome(req,res,next){
        res.sendFile(path.dirname(__dirname) + '/views/admin/update-home.html');
    }

    // [PUT] /admin/update/:slug
    updateHomeSave(req,res,next){
        var slug = req.params.slug;
        var newHome = req.body;
        if(req.file){
            Home.findOne({slug: slug})
                .then(home=>{
                    if(home.avatar){
                        const oldAvatarUrl = path.dirname(__dirname) + '/public/' + home.avatar;
                        fs.unlink(oldAvatarUrl, function(err){
                            if(err) throw err;
                            console.log('delete success')
                        })
                    }
                })
            var avatar = `uploads/${req.file.filename}`;
            newHome = {...req.body, avatar}
        }
        Home.updateOne({slug: slug},
            { $set: newHome}
            )
            .then(()=>{
                res.redirect('/admin/')
            })
            .catch(()=>{
                res.status(500).json({message: 'update false!!!'});
            })
    }

    // [DELETE] /admin/delete/:id
    deleteHome(req,res,next){
        let idHome = req.params.id;
        console.log(idHome)
        
        Home.deleteOne({_id: idHome})
            .then(()=>{
                res.redirect('/admin/')
            })
            .catch(()=>{res.status(500).json({delete: 'false'})});
    }
}

module.exports = new adminController;