var express = require('express');
var router = express.Router();
var Kitten = require('./../models/Kitten'); 

/* GET home page. */
router.get('/', function(req, res, next) {

  // console.log(req.body);
  // console.log(req.params);
  // console.log(req.query);
  let name = req.query.name;
  
  var fluffy = new Kitten({ name: name });
  
  fluffy.save().catch(function (err) { throw err; });

  let greet = fluffy.speak();
  res.render('root/index', { greet : greet});
});

module.exports = router;
