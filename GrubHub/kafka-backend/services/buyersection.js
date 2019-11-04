var Section = require("../../Backend/Models/section");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    Section.find({ ownername: msg.restaurantid }).then((doc) => {
        console.log("buyersection success" + doc)
        callback(null, JSON.stringify(doc))
    }).catch((err) => {
        console.log(err);
        callback(null, [])
    });
};
exports.handle_request = handle_request;