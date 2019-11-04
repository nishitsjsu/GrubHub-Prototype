var mongoose = require('mongoose');

var orderdetails = new mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    itemname: String,
    itemquantity: String,
    itemprice: String,
    orderid: String,
    // sectionname: String
})

module.exports = mongoose.model('Orderdetails', orderdetails);