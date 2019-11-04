
var Orderdetails = require("../../Backend/Models/orderdetails");
var bcrypt = require('bcrypt');
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    Orderdetails.find({ orderid: msg.orderid }).then((doc) => {
        console.log("orderitemdetails success!" + doc)
        callback(null, JSON.stringify(doc));
    }).catch((err) => {
        console.log("orderitemdetails fail! " + err)
        callback(null, []);
    })
};
exports.handle_request = handle_request;