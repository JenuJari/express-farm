var mongoose = require('mongoose');
var authSchema = require('./schema/AuthSchema');

var Auth = mongoose.model('auths', authSchema);

module.exports = Auth;
