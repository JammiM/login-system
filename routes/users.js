var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Displays the register page
router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register'});
});


// Displays the login page
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
});



module.exports = router;
