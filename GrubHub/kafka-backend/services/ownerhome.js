var Order = require("../../Backend/Models/orders");
var bcrypt = require('bcrypt');
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    emailcookie = msg.emailcookie;

    Order.find({ owneremail: emailcookie, status: { $nin: ["Delivered", "Cancel"] } }).then((doc) => {
        console.log("ownerhome success!" + doc)
        callback(null, JSON.stringify(doc));
    }).catch((err) => {
        console.log("owner home fail! " + err)
        callback(null, []);
    })
};
exports.handle_request = handle_request;