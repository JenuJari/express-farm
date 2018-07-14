var mongoose = require('mongoose');

var schema = {
    name: String,
    email : String,
    password : String,
    created_at : { type: Date, default: Date.now },
    updated_at : Date
};

var User = mongoose.Schema(schema);

User.index({ email : 1 }, { unique: true});

module.exports = User;
