var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/signup', function(req,res){
  console.log("ASking for something");
})
mongoose.connect('mongodb://atl:Mach!123@ds011880.mlab.com:11880/heroku_pn1jpchb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We Are connected");
  // we're connected!
});


// app.get('/test', function(req, res, next) {
//   Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   res.send(kittens);
//
//   console.log(kittens);
//   })
// });
// var triggerSchema = mongoose.Schema({
//     name: String,
//     date: { type: Date, default: Date.now }
//
// });
//
// triggerSchema.methods.speak = function () {
//   var greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name";
//   console.log(greeting);
// }
//
//
//
// var trigger = mongoose.model('trigger', triggerSchema);
//
//
//
// var silence = new trigger({ name: 'This' });
// silence.speak();
//
// silence.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
