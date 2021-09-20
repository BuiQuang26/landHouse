const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const Schema = mongoose.Schema;
var homeSchema = new Schema({
    name: { type: 'string',},
    price: Number,
    location: String,
    type: String,
    area: Number,
    avatar : String,
    gallery: [ String ],
    slug: {type: String, slug: "name", unique: true}
},{
    timestamps: true,
})

var Home = mongoose.model('home', homeSchema);

module.exports = Home;