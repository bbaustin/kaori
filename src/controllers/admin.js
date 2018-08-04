// Admin Controller
var express          = require('express'),
    AdminController  = express.Router(),
    User             = require(__dirname + '/../models/user'),
    Article          = require(__dirname + '/../models/article'),
    bcrypt           = require('bcrypt'),
    session          = require('express-session');
       

AdminController.route('/admin') 
.get(function(req, res, next) {
  console.log('hey!!!!!!!!!!!!!')
  res.render('make');
});
module.exports = AdminController;
