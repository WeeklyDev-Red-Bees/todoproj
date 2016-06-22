var express = require('express');
var router = express.Router();

/* GET account page. */
router.get('/', function(req, res, next) {
  res.render('account', { title: 'My Account' });
});

module.exports = router;
