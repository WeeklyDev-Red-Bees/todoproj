var path = require('path');
var express = require('express');
var users = require('./users');
var account = require('./account');
var admin = require('./admin');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ToDoList for the Red Bees' });
});

router.use('/users', users);
router.use('/myaccount', account);
router.use('/account', account);
router.use('/admin', admin);

module.exports = router;
