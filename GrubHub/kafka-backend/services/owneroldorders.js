var Order = require("../../Backend/Models/orders");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    Order.find({ owneremail: msg.emailcookie, status: { $in: ["Delivered", "Cancel"] } }).then((doc) => {
        console.log("owneroldorders success!" + doc)
        callback(null, JSON.stringify(doc));
    }).catch((err) => {
        console.log("owneroldorders fail! " + err)
        callback(null, []);
    })
};
exports.handle_request = handle_request;