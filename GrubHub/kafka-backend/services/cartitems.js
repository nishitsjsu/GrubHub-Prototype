var Cart = require("../../Backend/Models/cart");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var idCookie = msg.idcookie;
    var emailcookie = msg.emailcookie
    console.log("Inside cart items " + emailcookie);

    Cart.countDocuments({ buyeremail: emailcookie }).then((doc) => {
        console.log("cartitems success" + doc)
        callback(null, JSON.stringify(doc))
    }).catch((err) => {
        console.log(err);
        callback(null, [])
    });
};
exports.handle_request = handle_request;