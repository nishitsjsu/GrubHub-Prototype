var Buyer = require("../../Backend/Models/buyer");
var Owner = require("../../Backend/Models/owner");
var bcrypt = require('bcrypt');
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {


    var email = msg.username;
    var password = msg.password;
    var radio = msg.radio;

    if (radio == "buyer") {

        Buyer.find({ email: email }).then((doc) => {
            console.log(doc);
            if (doc.length == 0) {
                console.log(" No users found ");
                callback(null, []);
            } else {
                console.log("User found")
                Object.keys(doc).forEach(function (key) {
                    var row = doc[key];
                    var name = row.name;
                    // var emailrow = row.email;
                    var id = row._id;
                    var hash = row.password;

                    console.log("HAsh " + name + id + hash)

                    if (bcrypt.compareSync(password, hash)) {

                        const payload = {
                            name: name,
                            id: id,
                            email: email,
                            radio: radio
                        };

                        console.log("PAyload " + payload.email)

                        jwt.sign(
                            payload,
                            "CMPE_273_Grubhub_secret",
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) {
                                    console.log("Error in jwt token" + err)
                                } else {
                                    console.log("Token " + token)
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                }
                            }
                        );

                        res.cookie("email", email, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/"
                        });
                        res.cookie("cookie", radio, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/"
                        });
                        res.cookie("id", id, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/"
                        });
                        res.cookie("name", name, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/"
                        });
                        req.session.user = email;

                        // res.writeHead(200, {
                        //     "Content-Type": "text/plain"
                        // });
                        // res.end("Successful Login");
                    } else {
                        console.log(" Invalid credentials found ");
                        callback(null, []);
                    }
                })
            }

        }).catch(err => {
            console.log(err)
            callback(null, []);
        });
    } else if (radio == "owner") {
        Owner.find({ email: email }).then((doc) => {
            console.log(doc);
            if (doc.length == 0) {
                console.log(" No users found ");
                callback(null, []);
            } else {
                console.log("User found")
                Object.keys(doc).forEach(function (key) {
                    var row = doc[key];
                    var name = row.name;
                    // var emailrow = row.email;
                    var id = row._id;
                    var hash = row.password;
                    var cuisine = row.cuisine;
                    var restaurant = row.restaurantname;

                    console.log("HAsh " + name + id + hash)

                    if (bcrypt.compareSync(password, hash)) {
                        res.cookie("email", email, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/"
                        });
                        res.cookie("cookie", radio, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/"
                        });
                        res.cookie("id", id, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/"
                        });
                        res.cookie("name", name, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/"
                        });
                        res.cookie("cuisine", cuisine, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/"
                        });
                        res.cookie("restaurant", restaurant, {
                            maxAge: 900000,
                            httpOnly: false,
                            path: "/"
                        });
                        req.session.user = email;

                        callback(null, result);
                    } else {
                        console.log(" Invalid credentials found ");
                        callback(null, []);
                    }
                })
            }

        }).catch(err => {
            console.log(err);
            callback(null, []);
        });
    }

};

exports.handle_request = handle_request;    