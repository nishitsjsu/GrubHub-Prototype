var Cart = require("../../Backend/Models/cart");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var emailcookie = msg.emailcookie

    Cart.find({ buyeremail: emailcookie }).then((doc) => {
        console.log("viewcart success" + doc)
        callback(null, JSON.stringify(doc))
    }).catch((err) => {
        console.log(err);
        console.log("Inside 400 response")
        callback(null, [])
    });
};
exports.handle_request = handle_request;