var express = require('express');
var router = express.Router();
var authService = require('./../repos/authService');
var error_resp = require('./../repos/common_funcs').error_resp;

/* GET users listing. */
router.post('/register', async function(req, res) {
    try {
        const token = await authService.registerUser(req.body);
        res.json({token});
    } catch(e) {
        error_resp(req, res, e);
    }
});

router.post('/signin_auth', async (req, res) => {
    try {
        const token = await authService.signinUser(req.body);
        res.json({token});
    } catch(e) {
        error_resp(req, res, e);
    }
});

module.exports = router;
