var express = require('express');
var app = express();
var router = express.Router();
//var pool = require('../Db/Connections').pool;
//var cont = require('../Db/Connections').cont;
var bcrypt = require('bcrypt');
var upload = require('../Image/UploadImage').upload;
var storage = require('../Image/UploadImage').storage;
var Buyer = require("../Models/buyer");
var Owner = require("../Models/owner");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const passport = require("passport");
require('../config/passport')(passport)
app.use(passport.initialize());
// require("../config/passport")
app.use(express.static('public'))

var kafka = require('../kafka/client');

var resultObject;

router.post("/login", function (req, res) {

    console.log("Inside Login Post Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('login', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful login");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful login");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(JSON.stringify(results));
            }
        }
    });
});


router.post("/ownersignup", function (req, res) {
    console.log("Inside ownersignup Request");
    console.log("Req Body : ", req.body);

    var name = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var restaurant = req.body.restaurant;
    var cuisine = req.body.cuisine;
    var zipcode = req.body.zipcode;

    kafka.make_request('owner_signup', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful owner_signup");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful Signup");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful owner_signup");
            }
        }
    });
});

router.post("/buyersignup", function (req, res) {
    console.log("Inside buyer signup Request");
    console.log("Req Body : ", req.body);

    var name = req.body.username;
    var password = req.body.password;
    var email = req.body.email;


    kafka.make_request('buyer_signup', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful buyer_signup");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful buyer_signup");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful buyer_signup");
            }
        }
    });
});

router.post("/ownerprofile", function (req, res) {
    console.log("Inside update owner profile Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('post_ownerprofile', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful post_ownerprofile");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful post_ownerprofile");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful post_ownerprofile");
            }
        }

    });
});

router.post("/buyerprofile", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside update buyer profile Request");
    console.log("Req Body : ", req.body);

    kafka.make_request('post_buyerprofile', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful post_buyerprofile");
        } else {
            if (results.length == 0) {
                console.log("Inside err");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful post_buyerprofile");
            } else {
                console.log("Inside else");
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successful post_buyerprofile");
            }
        }

    });
});

router.get("/ownerprofile", function (req, res) {
    console.log("Inside owner profile");

    kafka.make_request('get_ownerprofile', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful get_ownerprofile");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful get_ownerprofile");
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

router.get("/buyerprofile", passport.authenticate("jwt", { session: false }), function (req, res) {
    console.log("Inside buyer profile");

    kafka.make_request('get_buyerprofile', req.query, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.writeHead(400, {
                "Content-Type": "text/plain"
            });
            res.end("Unsuccessful get_buyerprofile");
        } else {
            if (results.length == 0) {
                console.log("Inside err len 0");
                res.writeHead(400, {
                    "Content-Type": "text/plain"
                });
                res.end("Unsuccessful get_buyerprofile");
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

router.post('/buyerprofileuploadimage', passport.authenticate("jwt", { session: false }), function (req, res) {
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

            Buyer.findOneAndUpdate({ email: emailCookie }, { $set: { profileimage: filename } }, { new: true })
                .then((doc) => {
                    console.log("Buyer profile upload image success", doc);
                    res.writeHead(200, {
                        "Content-Type": "text/plain"
                    });
                    res.end("Successfully updated status");
                }).catch((e) => {
                    res.writeHead(400, {
                        "Content-Type": "text/plain"
                    });
                    res.end("Unsuccessfully uploaded Buyer profile");
                })
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

            Owner.findOneAndUpdate({ email: emailCookie }, { $set: { profileimage: filename } }, { new: true })
                .then((doc) => {
                    console.log("Owner profile upload image success", doc);
                    res.writeHead(200, {
                        "Content-Type": "text/plain"
                    });
                    res.end("Successfully updated status");
                }).catch((e) => {
                    res.writeHead(400, {
                        "Content-Type": "text/plain"
                    });
                    res.end("Unsuccessfully uploaded Owner profile");
                })
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

            Owner.findOneAndUpdate({ email: emailCookie }, { $set: { restaurantimage: filename } }, { new: true })
                .then((doc) => {
                    console.log("Owner profile upload restaurant image success", doc);
                    res.writeHead(200, {
                        "Content-Type": "text/plain"
                    });
                    res.end("Successfully updated status");
                }).catch((e) => {
                    res.writeHead(400, {
                        "Content-Type": "text/plain"
                    });
                    res.end("Unsuccessfully uploaded Owner restaurant");
                })
        }
    })
})

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log("Inside current functions@")
    res.json({
        msg: "Passport successful"
    });
}
);

module.exports = router;