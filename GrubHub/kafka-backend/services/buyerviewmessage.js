var Message = require("../../Backend/Models/message");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var emailcookie = msg.emailcookie;
    Message.find({ receiver: emailcookie }).then((doc) => {
        console.log("buyerviewmessage success" + doc)
        callback(null, JSON.stringify(doc))
    }).catch((err) => {
        console.log(err);
        console.log("Inside 400 response")
        callback(null, [])
    });
};
exports.handle_request = handle_request;