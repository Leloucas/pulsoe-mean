// require('./api/data/dbconnection.js').open();
require('dotenv').config();
require('./api/data/db.js');
require('./api/config/passport.js');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var multer = require('multer');

var app = express();

var routes = require('./api/routes');

app.set('port', 3000);

app.use(function(req, res, next){
  console.log(req.method, req.url);
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, 'client')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use('/api', routes);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log('Magic happens on port '+ port) ;
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// para generar la llave se usa el comando: require('crypto').randomBytes(32).toString('hex')
