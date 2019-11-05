var express = require('express');
var app = express();
var router = express.Router();
var pool = require('../Db/Connections').pool;
var cont = require('../Db/Connections').cont;
var upload = require('../Image/UploadImage').upload;
var storage = require('../Image/UploadImage').storage;
var Section = require("../Models/section")
var Item = require("../Models/items")
var Order = require("../Models/orders")
var Orderdetails = require("../Models/orderdetails")
var Ownermessage = require("../Models/message")
const mongoose = require("mongoose")
var kafka = require('../kafka/client');
const jwt = require("jsonwebtoken");
const passport = require("passport");
require('../config/passport')(passport)
app.use(passport.initialize());

// router.get("/ownerhome", function (req, res) {
//     console.log("Inside OwnerHome");

//     sql = `select * from orders where ownerid=${req.query.idcookie} and status NOT IN ('Delivered','Cancel')`;
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 //console.log(JSON.stringify(resultObject))
//                 res.end(JSON.stringify(result));
//             }
//         });
//         db.release()
//     });
// });


router.get("/ownerhome", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside OwnerHome");

    kafka.make_request('ownerhome', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful ownerhome");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful ownerhome");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });

    // emailcookie = req.query.emailcookie;
    // Order.find({ owneremail: emailcookie, status: { $nin: ["Delivered", "Cancel"] } }).then((doc) => {
    //     console.log("ownerhome success!" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log("owner home fail! " + err)
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end("ownerhome fail");
    // })
});


// router.get("/orderitemdetails", function (req, res) {
//     console.log("Inside orderitemdetails");

//     sql = `select * from orderdetails where orderid =${req.query.orderid} `;
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 console.log(JSON.stringify(result))
//                 res.end(JSON.stringify(result));
//             }
//         });
//         db.release()
//     });


// });


router.get("/orderitemdetails", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside orderitemdetails");

    kafka.make_request('orderitemdetails', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful orderitemdetails");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful orderitemdetails");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });

    //     Orderdetails.find({ orderid: req.query.orderid }).then((doc) => {
    //         console.log("orderitemdetails success!" + doc)
    //         res.writeHead(200, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end(JSON.stringify(doc));
    //     }).catch((err) => {
    //         console.log("orderitemdetails fail! " + err)
    //         res.writeHead(400, {
    //             "Content-Type": "text/plain"
    //         });
    //         //console.log(JSON.stringify(resultObject))
    //         res.end("orderitemdetails fail");
    //     })
});



// router.post("/changestatus", function (req, res) {
//     console.log("Inside changestatus Order Request");
//     console.log("Req Body : ", req.body);

//     var orderid = req.body.orderid;
//     var status = req.body.status;

//     // if (status === "New" || status === "Preparing" || status === "Ready" || status === "Delivered") {
//     //   sql = `update orders set status='${status}' where orderid=${orderid}`;
//     // } else if (status === "Cancel") {
//     //   sql = `delete from orders where orderid=${orderid}`;
//     // }

//     sql = `update orders set status='${status}' where orderid=${orderid}`;

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
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 res.end("Successfully cancelled the order");
//             }
//         });
//         db.release()
//     });
// });

router.post("/changestatus", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside changestatus Order Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('changestatus', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful changestatus");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful changestatus");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful changestatus");
            }
        }

    });

    // var orderid = req.body.orderid;
    // var status = req.body.status;

    // Order.findOneAndUpdate({ _id: orderid }, { $set: { status: status } }, { new: true })
    //     .then((doc) => {
    //         console.log("update status success", doc);
    //         res.writeHead(200, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Successfully updated status");
    //     }).catch((e) => {
    //         res.writeHead(400, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Unsuccessfully updated status");
    //     })
});

// router.get("/ownersection", function (req, res) {
//     console.log("Inside OwnerSection");

//     sql = `select * from sections where ownerid=${req.query.idcookie}`
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 //console.log(JSON.stringify(resultObject))
//                 res.end(JSON.stringify(result));
//             }
//         });
//         db.release()
//     });
// });

router.get("/ownersection", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside OwnerSection");

    kafka.make_request('ownersection', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful ownersection");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful ownersection");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });

    // Section.find({ ownername: req.query.emailcookie }).then((doc) => {
    //     console.log("Inside 200 response")
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end("Error in ownersection");
    // });
});


// router.get("/sectiondetails", function (req, res) {
//     console.log("Inside Section Details");

//     sql = `select * from items where sectionid =${req.query.sectionid} and ownerid=${req.query.idcookie} `;
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 console.log(JSON.stringify(result))
//                 res.end(JSON.stringify(result));
//             }
//         });
//         db.release()
//     });


// });


router.get("/sectiondetails", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside Section Details");


    kafka.make_request('sectiondetails', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful sectiondetails");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful sectiondetails");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });


    // Item.find({ owneremail: req.query.emailcookie, sectionname: req.query.sectionid }).then((doc) => {
    //     console.log("success owner section details" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end("Error in ownersection details");
    // });
});




// router.post("/updatesectionitems", function (req, res) {
//     console.log("Inside update section items Request");
//     console.log("Req Body : ", req.body);

//     var name = req.body.name;
//     var description = req.body.description;
//     var price = req.body.price;
//     var itemid = req.body.itemid

//     sql = `update items set name='${name}',description='${description}',price='${price}' where itemid='${itemid}'`;
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
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 res.end("Successfully updated section items");
//             }
//         });
//         db.release()
//     });
// });


router.post("/updatesectionitems", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside update section items Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('updatesectionitems', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful updatesectionitems");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful updatesectionitems");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful updatesectionitems");
            }
        }

    });

    // var name = req.body.name;
    // var description = req.body.description;
    // var price = req.body.price;
    // var itemid = req.body.itemid

    // Item.findOneAndUpdate({ _id: itemid }, { $set: { name: name, description: description, price: price } }, { new: true })
    //     .then((doc) => {
    //         console.log("update item success", doc);
    //         res.writeHead(200, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Successfully updated item");
    //     }).catch((e) => {
    //         res.writeHead(400, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Unsuccessfully updated item");
    //     })
});

// router.post("/additem", function (req, res) {
//     console.log("Inside additem Request");
//     console.log("Req Body : ", req.body);

//     var itemname = req.body.itemname;
//     var description = req.body.description;
//     var price = req.body.price;
//     var sectionid = req.body.sectionid;
//     var itemimage = req.body.itemimage;
//     var idcookie = req.body.idcookie

//     //sql = `insert into items (name,description,price,sectionid) values ('${itemname}','${description}','${price}',${sectionid})`;
//     sql = `update items set name='${itemname}',description='${description}',price='${price}',sectionid=${sectionid}, ownerid=${idcookie} where itemimage='${itemimage}'`
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 res.end("Successfully added item");
//             }
//         });
//         db.release()
//     });
// });


router.post("/additem", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside additem Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('additem', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful additem");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful additem");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful additem");
            }
        }

    });

    // var itemname = req.body.itemname;
    // var description = req.body.description;
    // var price = req.body.price;
    // var sectionid = req.body.sectionid;
    // var itemimage = req.body.itemimage;
    // var idcookie = req.body.idcookie;
    // var emailcookie = req.body.emailcookie;
    // var cuisinecookie = req.body.cuisinecookie;
    // var restaurantcookie = req.body.restaurantcookie;


    // Item.findOneAndUpdate({ itemimage: itemimage }, { $set: { name: itemname, description: description, price: price, sectionname: sectionid, owneremail: emailcookie, cuisine: cuisinecookie, restaurantname: restaurantcookie } }, { new: true })
    //     .then((doc) => {
    //         console.log("update doc", doc);
    //         res.writeHead(200, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Successfully added item");
    //     }).catch((e) => {
    //         res.writeHead(400, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Unsuccessfully added item");
    //     })
});

// router.post('/additemuploadimage', function (req, res) {
//     upload(req, res, err => {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end('Issue with uploading')
//         } else {
//             console.log('Inside upload post call')
//             console.log(req.file)

//             emailCookie = req.cookies.email;
//             filename = req.file.filename;



//             console.log("Filename : " + req.file.filename)
//             console.log(req.file)



//             //sql = `update buyer set profileimage='${filename}' where email='${emailCookie}'`;
//             //sql="Select name,email from " + radio + " where password="' + password + '";
//             sql = `insert into items (itemimage) values ('${filename}')`;
//             console.log("SQL: " + sql);

//             pool.getConnection(function (err, db) {
//                 if (err) {
//                     console.log("Error while getting connection")
//                 }
//                 db.query(sql, (err, result) => {
//                     if (err) {
//                         console.log("Error occured : " + err);
//                     } else {
//                         console.log("Image updated in database")
//                     }
//                 });
//                 db.release()
//             });



//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end(JSON.stringify(req.file))
//         }
//     })
// })

router.post('/additemuploadimage', passport.authenticate("jwt", { session: false }), function (req, res) {
    upload(req, res, err => {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end('Issue with uploading')
        } else {
            console.log('Inside upload post call')
            console.log(req.file)

            emailCookie = req.cookies.email;
            filename = req.file.filename;
            console.log("Filename : " + req.file.filename)
            console.log(req.file)

            const item = new Item({
                _id: mongoose.Types.ObjectId(),
                name: "",
                description: "",
                itemimage: filename,
                price: "",
                sectionname: "",
                owneremail: "",
                restaurantname: "",
                restaurantimage: "",
                cuisine: ""
            })
            console.log("object creatd " + item)
            item.save().then(result => {
                console.log("Item added successfully " + result);
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end(JSON.stringify(req.file))
            }).catch(error => {
                console.log("error occured" + error);
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful add item");
            });
        }
    })
})


// router.post("/deletesectionitems", function (req, res) {
//     console.log("Inside deletesectionitems Request");
//     console.log("Req Body : ", req.body);

//     var itemid = req.body.itemid;


//     sql = `delete from items where itemid=${itemid}`;
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
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 res.end("Successfully deleted the item");
//             }
//         });
//         db.release()
//     });
// });


router.post("/deletesectionitems", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside deletesectionitems Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('deletesectionitems', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful deletesectionitems");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful deletesectionitems");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful deletesectionitems");
            }
        }

    });


    // var itemid = req.body.itemid;

    // Item.remove({ _id: itemid }, { single: true })
    //     .then((doc) => {
    //         console.log("item delete success", doc);
    //         res.writeHead(200, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Successfully deleted item");
    //     }).catch((e) => {
    //         res.writeHead(400, {
    //             "Content-Type": "text/plain"
    //         });
    //         res.end("Unsuccessfully deleted item");
    //     })
});

// router.post("/addsection", function (req, res) {
//     console.log("Inside Add Section Request");
//     console.log("Req Body : ", req.body);
//     var sectionname = req.body.sectionname;
//     var idcookie = req.body.idcookie;
//     var emailcookie = req.body.emailcookie
//     console.log(sectionname)

//     sql = `insert into sections (sectionname,ownerid) values ('${sectionname}',${idcookie})`
//     console.log(sql)

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Data inserted into orders table successfully!")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 //console.log(JSON.stringify(resultObject))
//                 res.end("Section added successfully");
//             }
//         })
//         db.release()
//     });
// });

router.post("/addsection", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside Add Section Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('addsection', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful addsection");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful addsection");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful addsection");
            }
        }

    });


    // var sectionname = req.body.sectionname;
    // var idcookie = req.body.idcookie;
    // var emailcookie = req.body.emailcookie
    // console.log(sectionname)

    // const section = new Section({
    //     sectionname: sectionname,
    //     ownername: emailcookie
    // })
    // console.log("object creatd " + section)
    // section.save().then(result => {
    //     console.log("Section added successfully " + result);
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end("Successful Add section");
    // }).catch(error => {
    //     console.log("error occured" + error);
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end("Unsuccessful add section");
    // });
});

router.post("/deletesection", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside deletesection Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('deletesection', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful deletesection");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful deletesection");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful deletesection");
            }
        }

    });


    // var sectionid = req.body.sectionid;
    // var emailcookie = req.body.emailcookie;

    // Section.deleteMany({ ownername: emailcookie, sectionname: sectionid }).then((doc) => {
    //     console.log("Data deleted in section")
    //     Item.deleteMany({ ownername: emailcookie, sectionname: sectionid }).then((doc) => {
    //         console.log("Data deleted in Items")
    //         res.writeHead(200, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Section deleted successfully")
    //     })
    // }).catch((err) => {
    //     console.log("Data not deleted in section" + err)
    //     res.writeHead(200, {
    //         'Content-Type': 'text/plain'
    //     })
    //     res.end("Section deleted unsuccessfully")
    // })
});


// router.get("/owneroldorders", function (req, res) {
//     console.log("Inside owneroldorders");

//     sql = `select orderid, personname, status from orders
//     where ownerid=${req.query.idcookie} and status in ("Delivered","Cancel")`;
//     console.log("SQL: " + sql);

//     pool.getConnection(function (err, db) {
//         if (err) {
//             console.log("Error while getting connection")
//         }
//         db.query(sql, (err, result) => {
//             if (err) {
//                 console.log("Error occured : " + err);
//             } else {
//                 console.log("Inside 200 response")
//                 res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 //console.log(JSON.stringify(resultObject))
//                 res.end(JSON.stringify(result));
//             }
//         });
//         db.release()
//     });
// });

router.get("/owneroldorders", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside owneroldorders");

    kafka.make_request('owneroldorders', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful owneroldorders");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful owneroldorders");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });


    // Order.find({ owneremail: req.query.emailcookie, status: { $in: ["Delivered", "Cancel"] } }).then((doc) => {
    //     console.log("owneroldorders success!" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log("owneroldorders fail! " + err)
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end("owneroldorders fail");
    // })
});

//----------new functionality

router.post("/ownermessage", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside Add Section Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('ownermessage', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful ownermessage");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful ownermessage");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful ownermessage");
            }
        }

    });

    // var message = req.body.message;
    // var owneremail = req.body.owneremail;
    // var buyeremail = req.body.buyeremail;
    // var restaurant = req.body.restaurant;
    // var orderid = req.body.orderid;

    // const ownermessage = new Ownermessage({
    //     _id: new mongoose.Types.ObjectId(),
    //     message: message,
    //     sender: owneremail,
    //     receiver: buyeremail,
    //     restaurant: restaurant,
    //     orderid: orderid,
    // })
    // console.log("object creatd " + ownermessage)
    // ownermessage.save().then(result => {
    //     console.log("Message saved successfully " + result);
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end("Message saved successfully");
    // }).catch(error => {
    //     console.log("error occured" + error);
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end("Message saved unsuccessfully");
    // });
});

router.get("/ownerviewmessage", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside buyerviewmessage ");

    kafka.make_request('ownerviewmessage', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful ownerviewmessage");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful ownerviewmessage");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(results);
            }
        }

    });


    // emailcookie = req.query.emailcookie;
    // Ownermessage.find({ receiver: emailcookie }).then((doc) => {
    //     console.log("buyerviewmessage success" + doc)
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end(JSON.stringify(doc));
    // }).catch((err) => {
    //     console.log(err);
    //     console.log("Inside 400 response")
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     res.end("Error in buyerviewmessage");
    // });
});


module.exports = router;
