var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/login-system');


// db ' holds the conection'
var db = mongoose.connection;

// User a
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  profileimage: {
    type: String
  }

}); // userSchema


// Allowing for 'users' & 'createUser' to be used outside of this file
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
  newUser.save(callback);
}