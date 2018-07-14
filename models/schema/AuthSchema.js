var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = {
    token: String,
    userid: {type: Schema.Types.ObjectId, ref: 'Users'},
    expriry: Date
};

var Auth = mongoose.Schema(schema);

Auth.index({ userid: 1, token : 1 }, { unique: true});

module.exports = Auth;
