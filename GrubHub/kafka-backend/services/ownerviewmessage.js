var Ownermessage = require("../../Backend/Models/message");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var emailcookie = msg.emailcookie;
    Ownermessage.find({ receiver: emailcookie }).then((doc) => {
        console.log("buyerviewmessage success" + doc)
        callback(null, JSON.stringify(doc))
    }).catch((err) => {
        console.log(err);
        callback(null, [])
    });
};
exports.handle_request = handle_request;