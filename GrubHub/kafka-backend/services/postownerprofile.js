var Owner = require("../../Backend/Models/owner");
var bcrypt = require('bcrypt');
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var name = msg.username;
    var email = msg.email;
    var phone = msg.phone;
    var restaurant = msg.restaurant;
    var cuisine = msg.cuisine;
    var idcookie = msg.idcookie;
    var emailcookie = msg.emailcookie;

    Owner.findOneAndUpdate({ email: emailcookie }, { $set: { name: name, email: email, restaurantname: restaurant, phone: phone, cuisine: cuisine } }, { new: true })
        .then((doc) => {
            console.log("profile update success", doc);
            callback(null, doc);
        }).catch((e) => {
            callback(null, []);
        })
};

exports.handle_request = handle_request;