var express = require('express');
var router = express.Router();
var pool = require('../Db/Connections').pool;
var cont = require('../Db/Connections').cont;
var upload = require('../Image/UploadImage').upload;
var storage = require('../Image/UploadImage').storage;
var Section = require("../Models/section")
const mongoose = require("mongoose")

router.get("/ownerhome", function (req, res) {
    console.log("Inside OwnerHome");

    sql = `select * from orders where ownerid=${req.query.idcookie} and status NOT IN ('Delivered','Cancel')`;
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
        if (err) {
            console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error occured : " + err);
            } else {
                console.log("Inside 200 response")
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                //console.log(JSON.stringify(resultObject))
                res.end(JSON.stringify(result));
            }
        });
        db.release()
    });
});

router.get("/orderitemdetails", function (req, res) {
    console.log("Inside orderitemdetails");

    sql = `select * from orderdetails where orderid =${req.query.orderid} `;
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
        if (err) {
            console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error occured : " + err);
            } else {
                console.log("Inside 200 response")
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                console.log(JSON.stringify(result))
                res.end(JSON.stringify(result));
            }
        });
        db.release()
    });


});



router.post("/changestatus", function (req, res) {
    console.log("Inside changestatus Order Request");
    console.log("Req Body : ", req.body);

    var orderid = req.body.orderid;
    var status = req.body.status;

    // if (status === "New" || status === "Preparing" || status === "Ready" || status === "Delivered") {
    //   sql = `update orders set status='${status}' where orderid=${orderid}`;
    // } else if (status === "Cancel") {
    //   sql = `delete from orders where orderid=${orderid}`;
    // }

    sql = `update orders set status='${status}' where orderid=${orderid}`;

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
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successfully cancelled the order");
            }
        });
        db.release()
    });
});

router.get("/ownersection", function (req, res) {
    console.log("Inside OwnerSection");

    sql = `select * from sections where ownerid=${req.query.idcookie}`
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
        if (err) {
            console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error occured : " + err);
            } else {
                console.log("Inside 200 response")
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                //console.log(JSON.stringify(resultObject))
                res.end(JSON.stringify(result));
            }
        });
        db.release()
    });
});

router.get("/sectiondetails", function (req, res) {
    console.log("Inside Section Details");

    sql = `select * from items where sectionid =${req.query.sectionid} and ownerid=${req.query.idcookie} `;
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
        if (err) {
            console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error occured : " + err);
            } else {
                console.log("Inside 200 response")
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                console.log(JSON.stringify(result))
                res.end(JSON.stringify(result));
            }
        });
        db.release()
    });


});



router.post("/updatesectionitems", function (req, res) {
    console.log("Inside update section items Request");
    console.log("Req Body : ", req.body);

    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    var itemid = req.body.itemid

    sql = `update items set name='${name}',description='${description}',price='${price}' where itemid='${itemid}'`;
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
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successfully updated section items");
            }
        });
        db.release()
    });
});


router.post("/additem", function (req, res) {
    console.log("Inside additem Request");
    console.log("Req Body : ", req.body);

    var itemname = req.body.itemname;
    var description = req.body.description;
    var price = req.body.price;
    var sectionid = req.body.sectionid;
    var itemimage = req.body.itemimage;
    var idcookie = req.body.idcookie

    //sql = `insert into items (name,description,price,sectionid) values ('${itemname}','${description}','${price}',${sectionid})`;
    sql = `update items set name='${itemname}',description='${description}',price='${price}',sectionid=${sectionid}, ownerid=${idcookie} where itemimage='${itemimage}'`
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
        if (err) {
            console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error occured : " + err);
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successfully added item");
            }
        });
        db.release()
    });
});

router.post('/additemuploadimage', function (req, res) {
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


            //sql = `update buyer set profileimage='${filename}' where email='${emailCookie}'`;
            //sql="Select name,email from " + radio + " where password="' + password + '";
            sql = `insert into items (itemimage) values ('${filename}')`;
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


router.post("/deletesectionitems", function (req, res) {
    console.log("Inside deletesectionitems Request");
    console.log("Req Body : ", req.body);

    var itemid = req.body.itemid;


    sql = `delete from items where itemid=${itemid}`;
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
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successfully deleted the item");
            }
        });
        db.release()
    });
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

router.post("/addsection", function (req, res) {
    console.log("Inside Add Section Request");
    console.log("Req Body : ", req.body);
    var sectionname = req.body.sectionname;
    var idcookie = req.body.idcookie;
    var emailcookie = req.body.emailcookie
    console.log(sectionname)

    const section = new Section({
        sectionname: sectionname,
        ownername: emailcookie
    })
    console.log("object creatd " + section)
    section.save().then(result => {
        console.log("Section added successfully " + result);
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end("Successful Add section");
    }).catch(error => {
        console.log("error occured" + error);
        res.writeHead(400, {
            "Content-Type": "text/plain"
        });
        res.end("Unsuccessful add section");
    });
});

router.post("/deletesection", function (req, res) {
    console.log("Inside deletesection Request");
    console.log("Req Body : ", req.body);

    var sectionid = req.body.sectionid;


    sql = `delete from sections where sectionid=${sectionid}`;
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
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Successfully deleted the section");
            }
        });
        db.release()
    });
});


router.get("/owneroldorders", function (req, res) {
    console.log("Inside owneroldorders");

    sql = `select orderid, personname, status from orders
    where ownerid=${req.query.idcookie} and status in ("Delivered","Cancel")`;
    console.log("SQL: " + sql);

    pool.getConnection(function (err, db) {
        if (err) {
            console.log("Error while getting connection")
        }
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Error occured : " + err);
            } else {
                console.log("Inside 200 response")
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                //console.log(JSON.stringify(resultObject))
                res.end(JSON.stringify(result));
            }
        });
        db.release()
    });
});


module.exports = router;
