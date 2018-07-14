var express = require('express');
var router = express.Router();
var authService = require('./../repos/authService');

/* GET users listing. */
router.post('/register', function(req, res) {
    authService.registerUser(req.body).then(function(u) {
        res.send(u);
    }).catch(function (e) { throw  e});
});

module.exports = router;
