var Cart = require("../../Backend/Models/cart");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var itemid = msg.itemid;
    var name = msg.itemname;
    var price = msg.itemprice;
    var quantity = msg.quantity;
    var idcookie = msg.idcookie;
    var emailcookie = msg.emailcookie;
    var owneremail = msg.owneremail;
    var restaurant = msg.restaurant;

    const cart = new Cart({
        // _id: mongoose.Types.ObjectId(),
        itemname: name,
        quantity: quantity,
        price: price,
        itemid: itemid,
        buyeremail: emailcookie,
        owneremail: owneremail,
        restaurant: restaurant
    })
    console.log("object creatd " + cart)
    cart.save().then(result => {
        console.log("Item added to the cart successfully " + result);
        // res.writeHead(200, {
        //     'Content-Type': 'text/plain'
        // })
        // res.end(JSON.stringify(req.file))
        callback(null, result)
    }).catch(error => {
        console.log("error occured" + error);
        callback(null, [])
    });
};
exports.handle_request = handle_request;