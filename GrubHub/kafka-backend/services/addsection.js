var Section = require("../../Backend/Models/section");
const mongoose = require("../../Backend/mongoose")

function handle_request(msg, callback) {

    var sectionname = msg.sectionname;
    var idcookie = msg.idcookie;
    var emailcookie = msg.emailcookie
    console.log(sectionname)

    const section = new Section({
        sectionname: sectionname,
        ownername: emailcookie
    })
    console.log("object creatd " + section)
    section.save().then(result => {
        console.log("Section added successfully " + result);
        callback(null, result);
    }).catch(error => {
        console.log("error occured" + error);
        callback(null, []);
    });
};
exports.handle_request = handle_request;