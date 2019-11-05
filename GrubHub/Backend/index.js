//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var multer = require("multer");
var path = require("path");
var mysql = require("mysql");
var passport = require("passport");
app.set("view engine", "ejs");
const bcrypt = require('bcrypt');
require("./mongoose");
var kafka = require('./kafka/client');

//use cors to allow cross origin resource sharing
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors({ origin: "13.58.80.223:3000", credentials: true }));
app.use(passport.initialize());




//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(cookieParser());
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Allow Access Control
app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", "13.58.80.223:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const user = require('./Routes/User')
const owner = require('./Routes/Owner')
const buyer = require('./Routes/Buyer')
app.use(user)
// app.use("/User", user)
app.use(owner)
app.use(buyer)


// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function(req, file, cb){
//      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// });



// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
// }).single("myImage");
// const router = express.Router();



// router.post('/upload', function (req, res) {
//   upload(req, res, function (err) {
//       console.log("Request ---", req.body);
//       console.log("Request file ---", req.file);//Here you get file.
//       /*Now do where ever you want to do*/
//       if(!err) {
//           return res.send(200).end();
//       }
//   })
// })



// using second method-----------------------------
// app.use(express.static('public'))
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images/uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });
// const upload = multer({
//     storage
// })
// app.use(cors());
// app.post('/upload', upload.single('image'), (req, res) => {
//     if (req.file)
//         res.json({
//             imageUrl: `images/uploads/${req.file.filename}`
//         });
//     else
//         res.status("409").json("No Files to Upload.");
// });



//method 3 ---------------------------------------------
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//   cb(null, '/public')
// },
// filename: function (req, file, cb) {
//   cb(null, Date.now() + '-' +file.originalname )
// }
// })


// var upload = multer({ storage: storage }).single('file')


// app.post('/upload',function(req, res) {

//   upload(req, res, function (err) {
//          if (err instanceof multer.MulterError) {
//              return res.status(500).json(err)
//          } else if (err) {
//              return res.status(500).json(err)
//          }
//     return res.status(200).send(req.file)

//   })

// });

app.use(express.static('public'))

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");