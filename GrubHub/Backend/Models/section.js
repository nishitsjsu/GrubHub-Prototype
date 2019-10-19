var mongoose = require('mongoose');

var section = new mongoose.Schema({
    sectionname: String,
    ownername: String
})

module.exports = mongoose.model('Section', section);