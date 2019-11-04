var mongoose = require('mongoose');

var cart = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    itemname: String,
    quantity: String,
    price: String,
    itemid: String,
    buyeremail: String,
    owneremail: String,
    restaurant: String
})

module.exports = mongoose.model('Cart', cart);