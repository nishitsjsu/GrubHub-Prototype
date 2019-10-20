var express = require('express');
var app = express();
var router = express.Router();
var pool = require('../Db/Connections').pool;
var cont = require('../Db/Connections').cont;
var bcrypt = require('bcrypt');
var upload = require('../Image/UploadImage').upload;
var storage = require('../Image/UploadImage').storage;
var Buyer = require("../Models/buyer");
var Owner = require("../Models/owner");
const mongoose = require("mongoose")

app.use(express.static('public'))

var resultObject;

//Route to handle Post Request Call
// router.post("/login", function (req, res) {

//     console.log("Inside Login Post Request");
//     //console.log("Req Body : ", username + "password : ",password);
//     console.log("Req Body : ", req.body);
//     var email = req.body.username;
//     var password = req.body.password;
//     var radio = req.body.radio;


//     sql = `Select id,name,email,password from ${radio} where email = '${email}'`;
//     //sql="Select name,email from " + radio + " where password="' + password + '";
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }

//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 if (result.length > 0) {
//                     Object.keys(result).forEach(function (key) {
//                         var row = result[key];
//                         var name = row.name;
//                         var emailrow = row.email;
//                         var id = row.id;
//                         var hash = row.password;



//                         console.log("Name : " + row.name);
//                         console.log("ID: " + id)
//                         console.log("Pass: " + hash)


//                         if (bcrypt.compareSync(password, hash)) {
//                             res.cookie("email", email, {
//                                 maxAge: 900000,
//                                 httpOnly: false,
//                                 path: "/"
//                             });
//                             res.cookie("cookie", radio, {
//                                 maxAge: 900000,
//                                 httpOnly: false,
//                                 path: "/"
//                             });
//                             res.cookie("id", id, {
//                                 maxAge: 900000,
//                                 httpOnly: false,
//                                 path: "/"
//                             });
//                             res.cookie("name", name, {
//                                 maxAge: 900000,
//                                 httpOnly: false,
//                                 path: "/"
//                             });
//                             req.session.user = email;

//                             res.writeHead(200, {
//                                 "Content-Type": "text/plain"
//                             });
//                             res.end("Successful Login");
//                         } else {
//                             console.log(" Invalid credentials found ");
//                             res.writeHead(400, {
//                                 "Content-Type": "text/plain"
//                             });
//                             res.end("Invalid credentials in Login");
//                         }

//                     });
//                 } else {
//                     console.log(" No users found ");
//                     res.writeHead(400, {
//                         "Content-Type": "text/plain"
//                     });
//                     res.end("Unsuccessful Login");
//                 }
//             }
//         });
//         db.release()
//     });
// });


router.post("/login", function (req, res) {

    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ", req.body);
    var email = req.body.username;
    var password = req.body.password;
    var radio = req.body.radio;

    if (radio == "buyer") {

        Buyer.find({ email: email }).then((doc) => {
            console.log(doc);
            if (doc.length == 0) {
                console.log(" No users found ");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful Login");
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

                        res.writeHead(200, {
                            "Content-Type": "text/plain"
                        });
                        res.end("Successful Login");
                    } else {
                        console.log(" Invalid credentials found ");
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end("Invalid credentials in Login");
                    }
                })
            }

        }).catch(err => {
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Error in Login");
        });
    } else if (radio == "owner") {
        Owner.find({ email: email }).then((doc) => {
            console.log(doc);
            if (doc.length == 0) {
                console.log(" No users found ");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful Login");
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

                        res.writeHead(200, {
                            "Content-Type": "text/plain"
                        });
                        res.end("Successful Login");
                    } else {
                        console.log(" Invalid credentials found ");
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end("Invalid credentials in Login");
                    }
                })
            }

        }).catch(err => {
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Error in Login");
        });
    }
});


// router.post("/ownersignup", function (req, res) {
//     console.log("Inside ownersignup Request");
//     console.log("Req Body : ", req.body);

//     var name = req.body.username;
//     var password = req.body.password;
//     var email = req.body.email;
//     var restaurant = req.body.restaurant;
//     var zipcode = req.body.zipcode;

//     bcrypt.hash(req.body.password, 10, function (err, hash) {

//         sql = `insert into owner (name,email,password,restaurantname,zipcode,profileimage,restaurantimage) values ('${name}','${email}','${hash}','${restaurant}',${zipcode},'pro.jpg','default.png')`;
//         //sql="Select name,email from " + radio + " where password="' + password + '";
//         console.log("SQL: " + sql);

//         pool.getConnection(function (err, db) {
//             if (err) {
//                 console.log("Error while getting connection")
//             }
//             db.query(sql, (err, result) => {
//                 if (err) {
//                     console.log("Error occured : " + err);
//                     res.writeHead(400, {
//                         "Content-Type": "text/plain"
//                     });
//                     res.end("Unsuccessful Signup");
//                 } else {
//                     res.writeHead(200, {
//                         "Content-Type": "text/plain"
//                     });
//                     res.end("Successful Signup");
//                 }
//             });
//             db.release()
//         });
//     });

// });



router.post("/ownersignup", function (req, res) {
    console.log("Inside ownersignup Request");
    console.log("Req Body : ", req.body);

    var name = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var restaurant = req.body.restaurant;
    var cuisine = req.body.cuisine;
    var zipcode = req.body.zipcode;

    bcrypt.hash(req.body.password, 10, function (err, hash) {

        const owner = new Owner({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: hash,
            name: name,
            phone: "",
            profileimage: "pro.jpg",
            restaurantname: restaurant,
            zipcode: zipcode,
            restaurantimage: "",
            cuisine: cuisine
        })
        console.log("object creatd " + owner)
        owner.save().then(result => {
            console.log(result);
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            res.end("Successful Signup");
        }).catch(error => {
            console.log("error occured" + error);
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful Signup");
        });
    });
});



// router.post("/buyersignup", function (req, res) {
//     console.log("Inside buyer signup Request");
//     console.log("Req Body : ", req.body);

//     var name = req.body.username;
//     var password = req.body.password;
//     var email = req.body.email;

//     bcrypt.hash(req.body.password, 10, function (err, hash) {

//         sql = `insert into buyer (name,email,password,profileimage) values ('${name}','${email}','${hash}','pro.jpeg')`;
//         //sql="Select name,email from " + radio + " where password="' + password + '";
//         console.log("SQL: " + sql);

//         pool.getConnection(function (err, db) {
//             if (err) {
//                 console.log("Error while getting connection")
//             }
//             db.query(sql, (err, result) => {
//                 if (err) {
//                     console.log("Error occured : " + err);
//                     res.writeHead(400, {
//                         "Content-Type": "text/plain"
//                     });
//                     res.end("Unsuccessful Signup");
//                 } else {
//                     res.writeHead(200, {
//                         "Content-Type": "text/plain"
//                     });
//                     res.end("Successful Signup");
//                 }
//             });
//             db.release()
//         });
//     });
// });

router.post("/buyersignup", function (req, res) {
    console.log("Inside buyer signup Request");
    console.log("Req Body : ", req.body);

    var name = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    bcrypt.hash(req.body.password, 10, function (err, hash) {

        const buyer = new Buyer({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: hash,
            name: name,
            phone: "",
            profileimage: "pro.jpg",
        })
        console.log("object creatd " + buyer)
        buyer.save().then(result => {
            console.log(result);
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            res.end("Successful Signup");
        }).catch(error => {
            console.log("error occured" + error);
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful Signup");
        });
    });
});



router.post("/ownerprofile", function (req, res) {
    console.log("Inside update owner profile Request");
    console.log("Req Body : ", req.body);

    var name = req.body.username;
    var email = req.body.email;
    var phone = req.body.phone;
    var restaurant = req.body.restaurant;
    var cuisine = req.body.cuisine;
    idcookie = req.body.idcookie;

    sql = `update owner set name='${name}',email='${email}',restaurantname='${restaurant}',phone='${phone}',cuisine='${cuisine}' where email='${email}'`;
    //sql="Select name,email from " + radio + " where password="' + password + '";
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
        if (err) {
            console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error occured : " + err);
            } else {

                console.log("Profile updated successfully")

                // sql1 = `insert into restaurant (restaurantname,restaurantimage) values ()`

                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful Signup");
            }
        });
        db.release()
    });
});


router.post("/buyerprofile", function (req, res) {
    console.log("Inside update buyer profile Request");
    console.log("Req Body : ", req.body);

    var name = req.body.username;
    var email = req.body.email;
    var phone = req.body.phone;


    sql = `update buyer set name='${name}',email='${email}',phone='${phone}' where email='${email}'`;
    //sql="Select name,email from " + radio + " where password="' + password + '";
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
        if (err) {
            console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error occured : " + err);
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyerprofile");
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful buyerprofile");
            }
        });
        db.release()
    });
});


router.get("/ownerprofile", function (req, res) {
    console.log("Inside owner profile");
    var emailCookie = req.query.emailcookie;

    sql = `select name,email,phone,restaurantname,cuisine,profileimage,restaurantimage from owner where email="${emailCookie}";`;
    //sql="Select name,email from " + radio + " where password="' + password + '";
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
        if (err) {
            console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error occured : " + err);
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyerprofile post");
            } else {


                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    resultObject = {
                        username: row.name,
                        email: row.email,
                        phone: row.phone,
                        restaurant: row.restaurantname,
                        cuisine: row.cuisine,
                        profileimage: row.profileimage,
                        restaurantimage: row.restaurantimage
                    }
                    // var name = row.name;
                    console.log("Name : " + row.name)
                })




                console.log("Result : ", JSON.stringify(resultObject));
                console.log("Inside 200 response")
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(JSON.stringify(resultObject));
            }
        });
        db.release()
    });

});


router.get("/buyerprofile", function (req, res) {
    console.log("Inside buyer profile");
    // var emailCookie = req.cookies.email;
    var emailCookie = req.query.emailcookie

    sql = `select name,email,phone,profileimage from buyer where email="${emailCookie}";`;
    //sql="Select name,email from " + radio + " where password="' + password + '";
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
        if (err) {
            console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error occured : " + err);
            } else {


                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    resultObject = {
                        username: row.name,
                        email: row.email,
                        phone: row.phone,
                        profileimage: row.profileimage
                    }
                    // var name = row.name;
                    console.log("Name : " + row.name)
                })




                console.log("Result : ", JSON.stringify(resultObject));
                console.log("Inside 200 response")
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(JSON.stringify(resultObject));
            }
        });
        db.release()
    });


});


router.post('/buyerprofileuploadimage', function (req, res) {
    upload(req, res, err => {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end('Issue with uploading')
        } else {
            console.log('Inside upload post call')
            console.log(req.file)

            emailCookie = req.body.emailcookie;
            filename = req.file.filename;



            console.log("Filename : " + req.file.filename)
            console.log(req.file)


            sql = `update buyer set profileimage='${filename}' where email='${emailCookie}'`;
            //sql="Select name,email from " + radio + " where password="' + password + '";
            console.log("SQL: " + sql);

            pool.getConnection(function (err, db) {
                if (err) {
                    console.log("Error while getting connection")
                }
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log("Error occured : " + err);
                    } else {
                        console.log("Image updated in database")
                    }
                });
                db.release()
            });




            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(req.file))
        }
    })
})

router.post('/ownerprofileuploadprofile', function (req, res) {
    upload(req, res, err => {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end('Issue with uploading')
        } else {
            console.log('Inside upload post call')
            console.log(req.file)

            emailCookie = req.body.emailcookie;
            filename = req.file.filename;



            console.log("Filename : " + req.file.filename)
            console.log(req.file)


            sql = `update owner set profileimage='${filename}' where email='${emailCookie}'`;
            //sql="Select name,email from " + radio + " where password="' + password + '";
            console.log("SQL: " + sql);

            pool.getConnection(function (err, db) {
                if (err) {
                    console.log("Error while getting connection")
                }
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log("Error occured : " + err);
                    } else {
                        console.log("Image updated in database")
                    }
                });
                db.release()
            });



            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(req.file))
        }
    })
})


router.post('/ownerprofileuploadrestaurant', function (req, res) {
    upload(req, res, err => {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end('Issue with uploading')
        } else {
            console.log('Inside upload post call')
            console.log(req.file)

            emailCookie = req.body.emailcookie;
            filename = req.file.filename;



            console.log("Filename : " + req.file.filename)
            console.log(req.file)


            sql = `update owner set restaurantimage='${filename}' where email='${emailCookie}'`;
            //sql="Select name,email from " + radio + " where password="' + password + '";
            console.log("SQL: " + sql);

            pool.getConnection(function (err, db) {
                if (err) {
                    console.log("Error while getting connection")
                }
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log("Error occured : " + err);
                    } else {
                        console.log("Image updated in database")
                    }
                });
                db.release()
            });



            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end(JSON.stringify(req.file))
        }
    })
})

module.exports = router;