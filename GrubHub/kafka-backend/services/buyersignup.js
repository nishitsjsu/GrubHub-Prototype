var Buyer = require("../../Backend/Models/buyer");
var bcrypt = require('bcrypt');
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    console.log("Inside book kafka backend");
    console.log(msg);

    bcrypt.hash(msg.password, 10, function (err, hash) {

        const buyer = new Buyer({
            // _id: new mongoose.Schema.Types.ObjectId(),
            email: msg.email,
            password: hash,
            name: msg.username,
            phone: "",
            profileimage: "pro.jpg",
        })
        console.log("object creatd " + buyer)
        buyer.save().then(result => {
            console.log(result);
            callback(null, result);
        }).catch(error => {
            console.log("error occured" + error);
            callback(null, []);
        });
    });
};

exports.handle_request = handle_request;