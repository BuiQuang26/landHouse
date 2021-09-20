const path = require('path');
const home = require('../models/home')

class siteController{

    // [GET] /
    homePage(rep,res,next){
        res.sendFile(path.dirname(__dirname) + '/views/index.html');
    }

    // [GET] /mua-nha/
    showAll(req,res,next){
        var slug = req.params.slug;
        res.sendFile(path.dirname(__dirname) + '/views/showAll.html')
    }

    detailsHome(req,res,next){
        res.sendFile(path.dirname(__dirname) + '/views/detailsHome.html')
    }

}

module.exports = new siteController;