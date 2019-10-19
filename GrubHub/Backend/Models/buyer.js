var mongoose = require('mongoose');

var buyer = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: String,
    password: String,
    name: String,
    phone: String,
    profileimage: String
})

module.exports = mongoose.model('Buyer', buyer);