var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "rootpasswordgiven",
    database: "myschema"
});

const cont = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpasswordgiven",
    database: "myschema"
});

cont.connect(err => {
    if (err) {
        console.log("Error occured : " + err);
    } else {
        console.log("Connected!");
    }
});

module.exports.pool = pool;
module.exports.cont = cont;