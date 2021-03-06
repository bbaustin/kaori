var dotenv     = require('dotenv').config({silent:true}),
    express    = require('express'),
    app        = express(),
    favicon    = require('serve-favicon'),
    path       = require('path'),
    exphbs     = require('express-handlebars'),
    bodyParser = require('body-parser'),
    session    = require('express-session');


// Configure Setting
app.engine('hbs', exphbs({
  defaultLayout: 'default',
	layoutsDir:  __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
	extname:     '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: true}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(session({
  name: 'sessionclass',
  resave: false,
  saveUninitialized: false,
  secret: 'akdh;akhfgafihgadkfhgakfdlghhlshf'
}));

// Connect to Database
require('./db/db');

// Mount Middleware
app.use(express.static(__dirname + '/public'));

app.use('/', require('./controllers/home'));
app.use('/admin', require('./controllers/admin'));
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});


// app.use('/', function(req, res, next) {
//   if (req.session.isLoggedIn === true) {
//     return next();
//   } 
//   else {
//     res.redirect('/');
//   }
// });
// app.use('/admin', require('./controllers/admin'));

// Server listen
var server = app.listen(process.env.PORT || 8008, function() {   
	console.log('server running at ' + server.address().port);
});
