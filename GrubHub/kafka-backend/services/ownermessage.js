var Ownermessage = require("../../Backend/Models/message");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var message = msg.message;
    var owneremail = msg.owneremail;
    var buyeremail = msg.buyeremail;
    var restaurant = msg.restaurant;
    var orderid = msg.orderid;

    const ownermessage = new Ownermessage({
        // _id: new mongoose.Types.ObjectId(),
        message: message,
        sender: owneremail,
        receiver: buyeremail,
        restaurant: restaurant,
        orderid: orderid,
    })
    console.log("object creatd " + ownermessage)
    ownermessage.save().then(result => {
        console.log("Message saved successfully " + result);
        callback(null, JSON.stringify(result))
    }).catch(error => {
        console.log("error occured" + error);
        callback(null, [])
    });
};
exports.handle_request = handle_request;