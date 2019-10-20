var mongoose = require('mongoose');

var item = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    description: String,
    itemimage: String,
    price: String,
    sectionname: String,
    owneremail: String,
    // sectionname: String
    restaurantname: String,
    restaurantimage: String,
    cuisine: String,
})

module.exports = mongoose.model('Item', item);