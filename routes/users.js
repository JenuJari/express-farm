var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/me', function(req, res) {
  res.json(req.user);
});

module.exports = router;
