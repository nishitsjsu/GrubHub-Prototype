var express = require('express');
var app = express();
var router = express.Router();
//var pool = require('../Db/Connections').pool;
//var cont = require('../Db/Connections').cont;
var upload = require('../Image/UploadImage').upload;
var storage = require('../Image/UploadImage').storage;
var Section = require("../Models/section")
var Item = require("../Models/items")
var Owner = require("../Models/owner")
var Cart = require("../Models/cart")
var Order = require("../Models/orders")
var Orderdetails = require("../Models/orderdetails")
var Message = require("../Models/message")
const mongoose = require("mongoose")
const kafka = require('../kafka/client');
const passport = require("passport");
require('../config/passport')(passport)
app.use(passport.initialize());

router.get("/viewrestaurants", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside viewrestaurants");

    kafka.make_request('viewrestaurants', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful viewrestaurants");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful viewrestaurants");
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

router.get("/buyersection", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside BuyerSection");

    kafka.make_request('buyersection', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful buyersection");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyersection");
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

router.get("/sectiondetailsbuyer", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside Section Details buyer");

    kafka.make_request('sectiondetailsbuyer', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful sectiondetailsbuyer");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful sectiondetailsbuyer");
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

router.post("/addtocart", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside Add to cart Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('addtocart', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful addtocart");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful addtocart");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful addtocart");
            }
        }
    });
});

router.get("/viewcart", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside View Cart");

    kafka.make_request('viewcart', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful viewcart");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful viewcart");
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

router.get("/calculateSum", passport.authenticate("jwt", { session: false }), function (req, res) {

    kafka.make_request('calculateSum', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful calculateSum");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful calculateSum");
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

router.get("/cartitems", passport.authenticate("jwt", { session: false }), function (req, res) {

    kafka.make_request('cartitems', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful cartitems");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful cartitems");
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

router.post("/placeorder", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside place order Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('placeorder', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful placeorder");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful placeorder");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful placeorder");
            }
        }
    });
});

router.get("/buyerpastorders", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside buyerpastorders");

    kafka.make_request('buyerpastorders', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful buyerpastorders");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyerpastorders");
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

router.get("/buyerfutureorders", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside buyerfutureorders ");

    kafka.make_request('buyerfutureorders', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful buyerfutureorders");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyerfutureorders");
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


//-------new functionality

router.get("/buyerviewmessage", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside buyerviewmessage ");

    kafka.make_request('buyerviewmessage', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful buyerviewmessage");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyerviewmessage");
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


router.post("/buyermessage", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside Add Section Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('buyermessage', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful buyermessage");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyermessage");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful buyermessage");
            }
        }
    });
});



module.exports = router;
