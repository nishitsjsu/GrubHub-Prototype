var Order = require("../../Backend/Models/orders");
var bcrypt = require('bcrypt');
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var orderid = msg.orderid;
    var status = msg.status;

    Order.findOneAndUpdate({ _id: orderid }, { $set: { status: status } }, { new: true })
        .then((doc) => {
            console.log("update status success", doc);
            callback(null, doc);
        }).catch((e) => {
            console.log("update status failure", e);
            callback(null, []);
        })
};
exports.handle_request = handle_request;