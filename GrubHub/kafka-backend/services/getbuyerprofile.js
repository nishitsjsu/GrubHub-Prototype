var Buyer = require("../../Backend/Models/buyer");
var bcrypt = require('bcrypt');
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var resultObject = {}
    var emailcookie = msg.emailcookie

    Buyer.find({ email: emailcookie }).then((doc) => {
        console.log("buyerprofile success!" + doc)

        Object.keys(doc).forEach(function (key) {
            var row = doc[key];
            resultObject = {
                username: row.name,
                email: row.email,
                phone: row.phone,
                profileimage: row.profileimage
            }
            // var name = row.name;
            console.log("Name : " + row.name)
        })

        callback(null, JSON.stringify(resultObject));
    }).catch((err) => {
        console.log("get buyerprofile! " + err)
        callback(null, []);
    })
};

exports.handle_request = handle_request;