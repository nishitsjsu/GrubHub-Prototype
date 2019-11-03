var Owner = require("../../Backend/Models/owner");
var bcrypt = require('bcrypt');
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    bcrypt.hash(msg.password, 10, function (err, hash) {

        const owner = new Owner({
            // _id: new mongoose.Types.ObjectId(),
            email: msg.email,
            password: hash,
            name: msg.username,
            phone: "",
            profileimage: "pro.jpg",
            restaurantname: msg.restaurant,
            zipcode: msg.zipcode,
            restaurantimage: "",
            cuisine: msg.cuisine
        })
        console.log("object creatd " + owner)
        owner.save().then(result => {
            console.log(result);
            callback(null, result);
        }).catch(error => {
            console.log("error occured" + error);
            callback(null, []);
        });
    });
};

exports.handle_request = handle_request;