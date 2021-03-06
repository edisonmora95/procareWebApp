/* jshint node: true */
'use strict';

const config = require('./config/config.json');

let express       = require('express');
let path          = require('path');
let favicon       = require('serve-favicon');
let logger        = require('morgan');
let cookieParser  = require('cookie-parser');
let bodyParser    = require('body-parser');
let session       = require('express-session');
let passport      = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let flash         = require('connect-flash');

//Ventanas
const asistencias         = require('./routes/ventanas/asistencias.ventanas.router');
const benefactor          = require('./routes/ventanas/benefactor.ventanas.router');
const cambioContrasenna   = require('./routes/ventanas/cambioContrasenna.ventanas.router');
const donacion            = require('./routes/ventanas/donacion.ventanas.router');
const grupos              = require('./routes/ventanas/grupos.ventanas.router');
const index               = require('./routes/ventanas/index.ventanas.router');
const login               = require('./routes/ventanas/login.ventanas.router');
const perderContrasenna   = require('./routes/ventanas/perderContrasenna.ventanas.router');
const personal            = require('./routes/ventanas/personal.ventanas.router');
const procarianos         = require('./routes/ventanas/procarianos.ventanas.router');
const usuarios            = require('./routes/ventanas/usuarios.ventanas.router');

//Api
const apiAnimadores        = require('./routes/api/animadores.api.router.js');
const apiBenefactor        = require('./routes/api/benefactor.api.router');
const apiCalendario        = require('./routes/api/calendario.api.router');
const apiCargo             = require('./routes/api/cargo.api.router');
const apiCorreo            = require('./routes/api/correo.api.router');
const apiDonacion          = require('./routes/api/donacion.api.router.js');
const apiEtapa             = require('./routes/api/etapa.api.router');
const apiEventos           = require('./routes/api/evento.api.router.js');
const apiGrupos            = require('./routes/api/grupos.api.router');
const apiLogin             = require('./routes/api/login.api.router');
const apiNinoAccion        = require('./routes/api/ninoaccion.api.router');
const apiPersonal          = require('./routes/api/personal.api.router');
const apiProcarianos       = require('./routes/api/procarianos.api.router');
const apiProcarianosGrupos = require('./routes/api/procarianogrupo.api.router');
const apiReuniones         = require('./routes/api/reuniones.api.router');
const apiTareas            = require('./routes/api/tarea.api.router');
const apiTicket            = require('./routes/api/ticket.api.router');
const apiTipo              = require('./routes/api/tipo.api.router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//BODY PARSER
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit   : '10mb'
}));

app.use(cookieParser());

//RUTAS PARA USAR EN <SCRIPT> TAGS
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

// Express Session
const express_session_secret = config[process.env.NODE_ENV].secretP;
app.use(session({
    secret: express_session_secret,
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

//Rutas de las ventanas
app.use('/', login);
app.use('/asistencias', asistencias);
app.use('/benefactores', benefactor);
app.use('/cambioContrasenna', cambioContrasenna);
app.use('/donacion', donacion);
app.use('/grupos', grupos);
app.use('/home', index);
app.use('/perderContrasenna', perderContrasenna);
app.use('/personal', personal);
app.use('/procarianos', procarianos);
app.use('/usuarios', usuarios);

//Rutas de la api
app.use('/api/animadores', apiAnimadores);
app.use('/api/benefactores', apiBenefactor);
app.use('/api/calendario', apiCalendario);
app.use('/api/cargo', apiCargo);
app.use('/api/correo', apiCorreo);
app.use('/api/donacion', apiDonacion);
app.use('/api/etapas', apiEtapa);
app.use('/api/eventos', apiEventos);
app.use('/api/grupos', apiGrupos);
app.use('/api/login', apiLogin);
app.use('/api/ninos', apiNinoAccion);
app.use('/api/personal', apiPersonal);
app.use('/api/pg', apiProcarianosGrupos);
app.use('/api/procarianos', apiProcarianos);
app.use('/api/reuniones', apiReuniones);
app.use('/api/tareas', apiTareas);
app.use('/api/ticket', apiTicket);
app.use('/api/tipo', apiTipo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ERROR HANDLERS

// DEVELOPMENT error handler
// will print stacktrace
if ( process.env.NODE_ENV === 'development' ) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error  : err
    });
  });
}


// PRODUCTION error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error  : {}
    });
});

module.exports = app;
