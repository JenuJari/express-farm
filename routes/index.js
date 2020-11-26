var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const moment = require("moment");

/* GET home page. */
router.get('/', function (req, res) {

    // console.log(req.body);
    // console.log(req.params);
    // console.log(req.query);
    let name = req.query.name;
    res.render('root/index', { name });
});
router.get('/test', async function (req, res) {
    
    // let name = req.query.name;
    // let expiry = moment().add(30,"day").format("x");
    // var token = await jwt.sign({ uid: 54, expiry }, process.env.JWT_SECRATE);
    // var decoded = await jwt.verify(token, process.env.JWT_SECRATE);
    // var date = moment(decoded.expiry,"x").format("DD MM YYYY hh:mm:ss");
    const {headers} = req;
    res.json({headers});
});

module.exports = router;
