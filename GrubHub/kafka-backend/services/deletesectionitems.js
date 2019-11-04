var Item = require("../../Backend/Models/items");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var itemid = msg.itemid;

    Item.remove({ _id: itemid }, { single: true })
        .then((doc) => {
            console.log("item delete success", doc);
            callback(null, doc);
        }).catch((e) => {
            console.log("deletesectionitems error " + e)
            callback(null, []);
        })
};
exports.handle_request = handle_request;