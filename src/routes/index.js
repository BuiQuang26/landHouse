const siteController = require('../controllers/siteController');
const apiRoutes = require('./api');
const adminRouter = require('./admin');

function routes(app) {
    app.get('/', siteController.homePage);
    app.get('/mua-nha/:slug', siteController.showAll)
    app.get('/chi-tiet/:slug', siteController.detailsHome)
    app.get('/mua-nha/', siteController.showAll)
    app.use('/api',apiRoutes);
    app.use('/admin',adminRouter);
}

module.exports = routes