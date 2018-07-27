var express = require('express');
var router = express.Router();
var Kitten = require('./../models/Kitten'); 
var authService = require('./../repos/authService');
var casperService = require('./../repos/casperService');
var error_resp = require('./../repos/common_funcs').error_resp;

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

router.all('/t', async (req,res) => {
    try {
        let t = req.body.time;
        let s = await authService.demoAsync(t);
        res.send(s);
    } catch(e) {
        error_resp(req, res, e);
    }
});

router.all('/caspertest', async (req,res) => {
    try {
        let test = await casperService.fiftyTwoLow();
        res.send(test);
    } catch(e) {
        error_resp(req, res, e);
    }
});

module.exports = router;
