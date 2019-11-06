var express = require('express');
var app = express();
var router = express.Router();
//var pool = require('../Db/Connections').pool;
//var cont = require('../Db/Connections').cont;
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
});


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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});


module.exports = router;
