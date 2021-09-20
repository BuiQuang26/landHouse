const Home = require('../models/home');

class homeController{

    // [POST] api/get/homes
    getHomes(req,res,next){
        var data = req.body;
        Home.find({})
            .then(homes=>{
                var homeFilter = homes.filter(home=>{
                    if(data.location === 'all'){
                        return home;
                    }
                    else{
                        return home.location.indexOf(data.location) > -1;
                    }
                })

                homeFilter = homeFilter.filter(home=>{
                    if(data.typeLand === 'all'){
                        return home;
                    }
                    else{
                        return home.type.indexOf(data.typeLand) > -1;
                    }
                })
                homeFilter = homeFilter.filter(home=>{
                    switch (data.price){
                        case 'all':
                            return home;
                        case '-1ty' : 
                            return home.price < 1000000000;
                        case '1+3ty' : 
                            return home.price >= 1000000000 && home.price <= 3000000000;
                        case '+3ty' : 
                            return home.price > 3000000000;
                    }
                })
                homeFilter = homeFilter.filter(home=>{
                    switch (data.area){
                        case 'all':
                            return home;
                        case '-1000' : 
                            return home.area < 1000;
                        case '1000+2000' : 
                        return home.area >= 1000 && home.area <= 2000;
                            case '+3000' : 
                        return home.area > 2000;
                    }
                })
                homeFilter = homeFilter.filter(home=>{
                    let textSearch = data.search;
                    if(textSearch.length > 0){
                        return home.name.toLowerCase().indexOf(textSearch.toLowerCase()) > -1
                                || home.location.toLowerCase().indexOf(textSearch.toLowerCase()) > -1;
                    }
                    return home;
                })

                res.json(homeFilter)
            })
            .catch(err=>{
                res.status(500).json({message: 'false'});
            })
    }

    // [POST] api/chi-tiet/:slug
    detailsHome(req,res,next){
        var slug = req.params.slug;
        Home.findOne({slug : slug})
            .then(home=>{
                res.json(home);
            })
            .catch(err=>{
                res.status(500).json({message: 'false'});
            })
    }

    // [GET] api/newHomes
    newHomes(req,res,next){
        Home.find({})
            .then(homes=>{
                homes.sort((a,b)=>{
                    if(a.updatedAt > b.updatedAt) return -1;
                    if(a.updatedAt < b.updatedAt) return 1;
                    return 0;
                })
                var newHomes = [];
                if(homes.length > 10)
                {
                    for(var i=0;i<10;i++){
                        newHomes.push(homes[i]);
                    }
                }else{
                    newHomes = homes;
                }
                res.json(newHomes);
            })
            .catch(err=>{
                res.status(500).json({message: 'false'});
            })

    }
}

module.exports = new homeController;
