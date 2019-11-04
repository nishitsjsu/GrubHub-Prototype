var mongoose = require('mongoose');

var orders = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    personname: String,
    personaddress: String,
    status: String,
    owneremail: String,
    buyeremail: String,
    flag: String,
    restaurant: String
    // sectionname: String
})

module.exports = mongoose.model('Orders', orders);