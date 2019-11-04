var Order = require("../../Backend/Models/orders");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {


    var emailcookie = msg.emailcookie;
    Order.find({ buyeremail: emailcookie, status: { $in: ["Delivered", "Cancel"] } }).then((doc) => {
        console.log("buyerpastorders success" + doc)
        callback(null, JSON.stringify(doc))
    }).catch((err) => {
        console.log(err);
        callback(null, [])
    });
};
exports.handle_request = handle_request;