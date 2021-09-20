var express = require('express');
var routes = require('./routes/index');
const path = require('path');
var methodOverride = require('method-override')
const connectDb = require('./config/db/index');

// connect database mongodb
connectDb();


var app = express();
var port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

// routes
routes(app);

app.listen(port, function () {
    console.log(`Example app listening on localhost:${port}`);
});