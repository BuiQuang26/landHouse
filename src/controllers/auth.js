const path = require('path');
const home = require('../models/home')
const jwt = require('jsonwebtoken');

class auth{
    isadmin(req,res,next){
        var token = req.query.token;
        try {
            var decoded = jwt.verify(token, 'shhhhh');
            console.log(decoded);
            next();
          } catch(err) {
            // err
            res.status(400).json({message: 'token false'});
          }
    }

}

module.exports = new auth;