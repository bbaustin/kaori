// User Model
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String, 
  nickname: String
});

module.exports = mongoose.model('User', UserSchema);
