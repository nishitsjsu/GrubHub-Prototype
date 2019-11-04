var Item = require("../../Backend/Models/items");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var itemname = msg.itemname;
    var description = msg.description;
    var price = msg.price;
    var sectionid = msg.sectionid;
    var itemimage = msg.itemimage;
    var idcookie = msg.idcookie;
    var emailcookie = msg.emailcookie;
    var cuisinecookie = msg.cuisinecookie;
    var restaurantcookie = msg.restaurantcookie;


    Item.findOneAndUpdate({ itemimage: itemimage }, { $set: { name: itemname, description: description, price: price, sectionname: sectionid, owneremail: emailcookie, cuisine: cuisinecookie, restaurantname: restaurantcookie } }, { new: true })
        .then((doc) => {
            console.log("update doc", doc);
            callback(null, doc);
        }).catch((e) => {
            console.log("Error occured in Kafka" + e)
            callback(null, []);
        })
};
exports.handle_request = handle_request;