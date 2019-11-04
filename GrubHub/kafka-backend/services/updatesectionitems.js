var Item = require("../../Backend/Models/items");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var name = msg.name;
    var description = msg.description;
    var price = msg.price;
    var itemid = msg.itemid

    Item.findOneAndUpdate({ _id: itemid }, { $set: { name: name, description: description, price: price } }, { new: true })
        .then((doc) => {
            console.log("update item success", doc);
            callback(null, doc);
        }).catch((e) => {
            callback(null, []);
        })
};
exports.handle_request = handle_request;