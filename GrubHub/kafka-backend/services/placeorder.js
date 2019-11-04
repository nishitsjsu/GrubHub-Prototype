var Order = require("../../Backend/Models/orders");
var Orderdetails = require("../../Backend/Models/orderdetails");
var Cart = require("../../Backend/Models/cart");
const mongoose = require("../../Backend/mongoose")


function handle_request(msg, callback) {


    var item = msg.items;
    var idcookie = msg.idcookie;
    var address = msg.address;
    var username = msg.namecookie;
    var emailcookie = msg.emailcookie;
    owneremail = ""
    orderid = ""
    restaurant = ""

    Cart.find({ buyeremail: emailcookie }).limit(1).then((doc) => {
        Object.keys(doc).forEach(function (key) {
            var row = doc[key];
            owneremail = row.owneremail;
            restaurant = row.restaurant;
            console.log("Owner Email & restaurant : " + owneremail + restaurant);
        })

        const order = new Order({
            // _id: mongoose.Types.ObjectId(),
            personname: username,
            personaddress: address,
            status: 'New',
            owneremail: owneremail,
            buyeremail: emailcookie,
            restaurant: restaurant,
            flag: '1',
        })
        console.log("object creatd " + order)
        order.save().then(result => {
            console.log("Items added to the orders table successfully " + result);

            Order.find({ buyeremail: emailcookie, flag: '1' }).then((doc) => {
                Object.keys(doc).forEach(function (key) {
                    var row = doc[key];
                    orderid = row._id;
                    console.log("Order id : " + orderid);
                })

                for (let i = 0; i < item.length; i++) {
                    var itemname = item[i].itemname
                    var quantity = item[i].quantity
                    var price = item[i].price

                    const orderdetails = new Orderdetails({
                        // _id: mongoose.Types.ObjectId(),
                        itemname: itemname,
                        itemquantity: quantity,
                        itemprice: price,
                        orderid: orderid,
                    })
                    console.log("object creatd " + orderdetails)
                    orderdetails.save().then((doc) => {
                        console.log("Data inserted into orderdetails success" + doc)
                    })
                }

                Order.findOneAndUpdate({ _id: orderid, flag: '1' }, { $set: { flag: '2' } }, { new: true }).then((doc) => {
                    console.log("Data updated in orders " + doc);

                    Cart.deleteMany({ buyeremail: emailcookie }).then((doc) => {
                        console.log("Data deleted in cart, all steps completed")
                        callback(null, doc)
                    })
                })
            })
        })
    }).catch((err) => {
        console.log("Errored somewhere" + err)
        callback(null, [])
    })
};

exports.handle_request = handle_request;
