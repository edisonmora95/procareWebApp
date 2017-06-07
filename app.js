/* jshint node: true */
'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Ventanas
var index = require('./routes/index');
var users = require('./routes/users');
var procarianos = require('./routes/procarianos.router');
var asistencias = require('./routes/asistencias.router');
var grupos = require('./routes/grupos.router');
var login = require('./routes/login');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

//Rutas de las ventanas
app.use('/', login);
app.use('/users', users);
app.use('/procarianos', procarianos);
app.use('/asistencias', asistencias);
app.use('/grupos', grupos);
app.use('/login',login);

//Rutas de la api
app.use('/api/procarianos', require('./routes/api/procarianos.api.router'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
