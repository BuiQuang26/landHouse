const siteController = require('../controllers/siteController');
const homeController = require('../controllers/homeController')
const express = require('express');
const router = express.Router();

router.post('/get/homes',homeController.getHomes);
router.post('/chi-tiet/:slug',homeController.detailsHome);
router.get('/newHomes',homeController.newHomes)


module.exports = router