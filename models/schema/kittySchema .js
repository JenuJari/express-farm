var mongoose = require('mongoose');

var schema = {
    name: String
};

var Kitten = mongoose.Schema(schema);

Kitten.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    return greeting;
}

module.exports = Kitten;