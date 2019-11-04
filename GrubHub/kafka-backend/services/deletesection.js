var Section = require("../../Backend/Models/section");
var Item = require("../../Backend/Models/items");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {
    var sectionid = msg.sectionid;
    var emailcookie = msg.emailcookie;

    Section.deleteMany({ ownername: emailcookie, sectionname: sectionid }).then((doc) => {
        console.log("Data deleted in section")
        Item.deleteMany({ ownername: emailcookie, sectionname: sectionid }).then((doc) => {
            console.log("Data deleted in Items")
            callback(null, doc);
        })
    }).catch((err) => {
        console.log("Data not deleted in section" + err)
        callback(null, []);
    })
};
exports.handle_request = handle_request;