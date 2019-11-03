var Owner = require("../../Backend/Models/owner");
var bcrypt = require('bcrypt');
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var resultObject = {}

    var emailcookie = msg.emailcookie;

    Owner.find({ email: emailcookie }).then((doc) => {
        console.log("ownerprofile success!" + doc)

        Object.keys(doc).forEach(function (key) {
            var row = doc[key];
            resultObject = {
                username: row.name,
                email: row.email,
                phone: row.phone,
                restaurant: row.restaurantname,
                cuisine: row.cuisine,
                profileimage: row.profileimage,
                restaurantimage: row.restaurantimage
            }
            // var name = row.name;
            console.log("Name : " + row.name)
        })

        callback(null, JSON.stringify(resultObject));
    }).catch((err) => {
        console.log("ownerprofile fail! " + err)
        callback(null, []);
    })
};

exports.handle_request = handle_request;