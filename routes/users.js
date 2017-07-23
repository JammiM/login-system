var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});



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


// Uploads the profile picture
router.post('/register', upload.single('profileImage') ,function(req, res, next) {

  let name = req.body.name;
  let email = req.body.email;
  let userName = req.body.userName;
  let password = req.body.password;
  let password2 = req.body.password2;

  if(req.file){
  	console.log('Uploading file...');

  	// Grabs the file name
  	let profileImage = req.file.filename;


  } else {
  	console.log('No file uploaded...');

  	// If no image is uploaded.
  	let profileImage = 'noimage.jpg';
  }// else


  // Form validation
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('userName', 'User Name field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);


// Check for errors
let errors = req.validationErrors();
if(errors){
	//console.log('Errors detected');
	res.render('register', {
		errors: errors
	})
} else {
	console.log('No Errors detected');
}




});



module.exports = router;
