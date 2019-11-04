var Item = require("../../Backend/Models/items");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    Item.find({ owneremail: msg.ownername, sectionname: msg.sectionname }).then((doc) => {
        console.log("sectiondetailsbuyer success" + doc)
        callback(null, JSON.stringify(doc))
    }).catch((err) => {
        console.log(err);
        console.log("Inside 400 response")
        callback(null, [])
    });
};
exports.handle_request = handle_request;