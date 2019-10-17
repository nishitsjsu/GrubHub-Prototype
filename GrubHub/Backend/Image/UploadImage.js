var multer = require("multer");
var path = require("path");
var express = require("express");
var app = express();
app.use(express.static('public'))

const storage = multer.diskStorage({
    destination: './public/profilepics/',
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '_' + Date.now() + path.extname(file.originalname)
        )
    }
})

const upload = multer({
    storage: storage
}).single('myImage')

module.exports.storage = storage;
module.exports.upload = upload