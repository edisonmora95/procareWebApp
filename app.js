/* jshint node: true */
'use strict';

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
const usuarios            = require('./routes/ventanas/usuarios.ventanas.router');
const procarianos         = require('./routes/ventanas/procarianos.ventanas.router');
const benefactor          = require('./routes/ventanas/benefactor.ventanas.router');
const asistencias         = require('./routes/ventanas/asistencias.ventanas.router');
const grupos              = require('./routes/ventanas/grupos.ventanas.router');
const index               = require('./routes/ventanas/index.ventanas.router');
const login               = require('./routes/ventanas/login.router');
const personal            = require('./routes/ventanas/personal.ventanas.router');
const cambioContrasenna   = require('./routes/ventanas/cambioContrasenna.ventanas.router');
const perderContrasenna   = require('./routes/ventanas/perderContrasenna.ventanas.router');

//Api
const apiProcarianos       = require('./routes/api/procarianos.api.router');
const apiBenefactor        = require('./routes/api/benefactor.api.router');
const apiEtapa             = require('./routes/api/etapa.api.router');
const apiTicket            = require('./routes/api/ticket.api.router');
const apiTipo              = require('./routes/api/tipo.api.router');
const apiCargo             = require('./routes/api/cargo.api.router');
const apiGrupos            = require('./routes/api/grupos.api.router');
const apiProcarianosGrupos = require('./routes/api/procarianogrupo.api.router');
const apiLogin             = require('./routes/api/login.api.router');
const apiTareas            = require('./routes/api/tarea.api.router');
const apiEventos           = require('./routes/api/evento.api.router.js');
const apiAnimadores        = require('./routes/api/animadores.api.router.js');
const apiPersonal          = require('./routes/api/personal.api.router');
const apiCalendario        = require('./routes/api/calendario.api.router');
const apiNinoAccion        = require('./routes/api/ninoaccion.api.router');
const apiCorreo            = require('./routes/api/correo.api.router');
const apiReuniones         = require('./routes/api/reuniones.api.router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
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
app.use('/home', index);
app.use('/usuarios', usuarios);
app.use('/procarianos', procarianos);
app.use('/benefactores', benefactor);
app.use('/asistencias', asistencias);
app.use('/grupos', grupos);
app.use('/personal', personal);
app.use('/cambioContrasenna', cambioContrasenna);
app.use('/perderContrasenna', perderContrasenna);
app.use('/', login);

//Rutas de la api
app.use('/api/procarianos', apiProcarianos);
app.use('/api/benefactores', apiBenefactor);
app.use('/api/etapa', apiEtapa);
app.use('/api/cargo', apiCargo);
app.use('/api/login', apiLogin);
app.use('/api/tareas', apiTareas);
app.use('/api/eventos', apiEventos);
app.use('/api/ticket', apiTicket);
app.use('/api/tipo', apiTipo);
app.use('/api/grupos', apiGrupos);
app.use('/api/pg', apiProcarianosGrupos);
app.use('/api/animadores', apiAnimadores);
app.use('/api/personal', apiPersonal);
app.use('/api/calendario', apiCalendario);
app.use('/api/ninos', apiNinoAccion);
app.use('/api/correo', apiCorreo);
app.use('/api/reuniones', apiReuniones);

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