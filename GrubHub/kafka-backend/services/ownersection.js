var Section = require("../../Backend/Models/section");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    Section.find({ ownername: msg.emailcookie }).then((doc) => {
        console.log("Inside 200 response")
        callback(null, JSON.stringify(doc));
    }).catch((err) => {
        console.log(err);
        console.log("Inside 400 response")
        callback(null, []);
    });
};
exports.handle_request = handle_request;