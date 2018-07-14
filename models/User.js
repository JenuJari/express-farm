var mongoose = require('mongoose');
var userSchema = require('./schema/UserSchema');

var Users = mongoose.model('Users', userSchema);

module.exports = Users;
