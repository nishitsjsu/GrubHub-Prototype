var Message = require("../../Backend/Models/message");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var message = msg.message;
    var owneremail = msg.owneremail;
    var buyeremail = msg.buyeremail;
    var restaurant = msg.restaurant;
    var orderid = msg.orderid;

    const buyermessage = new Message({
        // _id: new mongoose.Types.ObjectId(),
        message: message,
        sender: buyeremail,
        receiver: owneremail,
        restaurant: "",
        orderid: orderid,
    })
    console.log("object creatd " + buyermessage)
    buyermessage.save().then(result => {
        console.log("Message saved successfully " + result);
        callback(null, result)
    }).catch(error => {
        console.log("error occured" + error);
        callback(null, [])
    });

};
exports.handle_request = handle_request;