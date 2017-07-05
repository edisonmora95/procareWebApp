/* jshint node: true */
'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

//Ventanas
var users = require('./routes/ventanas/users');
var procarianos = require('./routes/ventanas/procarianos.ventanas.router');
var asistencias = require('./routes/ventanas/asistencias.ventanas.router');
var grupos = require('./routes/ventanas/grupos.ventanas.router');

//var login = require('./routes/ventanas/login');


var index = require('./routes/ventanas/index');
var login = require('./routes/ventanas/login.router');
//Api
let apiProcarianos = require('./routes/api/procarianos.api.router');
let apiEtapa = require('./routes/api/etapa.api.router');

let apiLogin = require('./routes/api/login.api.router');
let apiTareas = require('./routes/api/tarea.api.router');

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
// Express Session
app.use(session({
    secret: 'Ya_ya_posi_Posi',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());


//Rutas de las ventanas

app.use('/', index);

app.use('/home', index);
app.use('/users', users);
app.use('/procarianos', procarianos);
app.use('/asistencias', asistencias);
app.use('/grupos', grupos);
app.use('/', login);

//Rutas de la api
app.use('/api/procarianos', apiProcarianos);
app.use('/api/etapa',apiEtapa);

//Rutas de la api
app.use('/api/procarianos', apiProcarianos);
app.use('/api/etapa',apiEtapa);
app.use('/api/login',apiLogin);
app.use('/api/tarea',apiTareas);

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
