var mongoose = require('mongoose');
var kittySchema = require('./schema/kittySchema ');

var Kitten = mongoose.model('Kitten', kittySchema);

module.exports = Kitten;