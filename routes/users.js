var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


/* Links to models folder, allowing for access to the User object*/
var User = require('../models/user');

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




// Passport login system
router.post('/login',
  passport.authenticate('local', {failureRedirect: '/users/login', failureFlash: 'Invalid user name or password.'}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    req.flash('success', 'You are logged in !!!')
    //res.redirect('/users/' + req.user.username);
    res.redirect('/');

  });



// 
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});





passport.use(new LocalStrategy(function(username, password, done){


  // Gets the user by the username passed in.
  User.getUserByUsername(username, function (err, user) {

    // if there's an error then throw the error
    if(err) throw err;

    // If there is not a user
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    // Compares the users password
    User.comparePassword(password, user.password, function(err, isMatch) {
      
     // if there's an error then throw the error
      if(err) return done(err);

      // if there's an error then throw the error
      if(isMatch){

        // if the password does match
        return done(null, user);
      } else {

        // if the password does not match
        return done(null, false, {message:'Invalid Password'})
      }

    }); // User.comparePassword

  }); // getUserByUsername

})); // passport.use





// Uploads the profile picture
router.post('/register', upload.single('profileimage') ,function(req, res, next) {

  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2;

  if(req.file){
  	console.log('Uploading file...');

  	// Grabs the file name
  	var profileimage = req.file.filename;


  } else {
  	console.log('No file uploaded...');

  	// If no image is uploaded.
  	var profileimage = 'noimage.jpg';
  }// else


  // Form validation
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('username', 'User Name field is required').notEmpty();
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
	//console.log('No Errors detected');

  // Assigns the entered values to a new User Object
  var newUser = new User({
    name: name,
    email: email,
    username: username,
    password: password,
    profileimage: profileimage
  });



  // If no errors have been detected, then create a new user
  User.createUser(newUser, function (err, user) {
    
    if (err) throw err
    console.log(newUser);
  });


  req.flash('sucess','You are now registered !')

  // Redirects to the home page
  res.location('/');
  res.redirect('/');

} //else


});



module.exports = router;
