
/*
@Descripcion: esta es la ventana del login , implementa passport para hacerlo
@Autor: jose viteri
@FechaCreacion: 14/06/2017
@UltimaFechaModificacion: 16/06/2017 @JoseViteri
*/

var controladorLogin = require('../../controllers/login.controller')
var utils = require('../../utils/utils');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var modelos = require('../../models');



/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('login');
});

// loggedin
//revisa si esta autenticadno
router.get("/loggedin", function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

//logout
//deslogea la sesion
router.get('/logout', function(req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/');
});

module.exports = router;