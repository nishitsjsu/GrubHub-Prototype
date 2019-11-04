var Cart = require("../../Backend/Models/cart");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    let sum = 0;
    var idCookie = msg.idcookie;
    var emailcookie = msg.emailcookie;
    console.log("Inside calculate sum");

    Cart.find({ buyeremail: emailcookie }).then((doc) => {
        for (let i = 0; i < doc.length; i++) {
            sum = sum + doc[i].quantity * doc[i].price;
        }
        console.log("calculate sum success" + sum)
        callback(null, String(sum))
    }).catch((err) => {
        console.log(err);
        callback(null, [])
    });
};
exports.handle_request = handle_request;