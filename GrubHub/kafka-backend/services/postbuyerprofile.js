var Buyer = require("../../Backend/Models/buyer");
var bcrypt = require('bcrypt');
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {


    var name = msg.username;
    var email = msg.email;
    var phone = msg.phone;
    var emailcookie = msg.emailcookie;

    Buyer.findOneAndUpdate({ email: emailcookie }, { $set: { name: name, email: email, phone: phone } }, { new: true })
        .then((doc) => {
            console.log("Buyer profile update success", doc);
            callback(null, doc);
        }).catch((e) => {
            console.log("post buyer profile failure")
            callback(null, []);
        })

};

exports.handle_request = handle_request;
