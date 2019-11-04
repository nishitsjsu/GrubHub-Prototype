var mongoose = require('mongoose');

var message = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    message: String,
    sender: String,
    receiver: String,
    restaurant: String,
    orderid: String,
})

module.exports = mongoose.model('Message', message);