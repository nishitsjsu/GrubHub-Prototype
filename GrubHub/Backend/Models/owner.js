var mongoose = require('mongoose');

var owner = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    email: String,
    password: String,
    name: String,
    phone: String,
    profileimage: String,
    restaurantname: String,
    zipcode: String,
    restaurantimage: String,
    cuisine: String,
    // sectionname: String
})

module.exports = mongoose.model('Owner', owner);