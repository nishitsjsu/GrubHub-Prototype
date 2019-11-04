var Item = require("../../Backend/Models/items");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {


    Item.find({ owneremail: msg.emailcookie, sectionname: msg.sectionid }).then((doc) => {
        console.log("success owner section details" + doc)
        callback(null, JSON.stringify(doc));
    }).catch((err) => {
        console.log(err);
        console.log("Inside 400 response")
        callback(null, []);
    });
};
exports.handle_request = handle_request;