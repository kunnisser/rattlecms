var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session=require("express-session");
var cookieParser = require('cookie-parser');
var RedisStore=require("connect-redis")(session);

var routes = require('./admin/routes/index');
var users = require('./admin/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/admin/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit:"10kb"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('rattlecms_'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	store:new RedisStore({
		host:"127.0.0.1",
		port:6379,
		ttl:60*60*24*1
}),
resave:false,
saveUninitialized:false,
secret:'rattlecms is smarty',
cookie:{maxAge:1000000}
}));

app.use('/', routes);
app.use('/users', users);

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
