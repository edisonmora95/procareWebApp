/*
Creado: Jose Viteri
Fecha Creacion : 14/08/2017
Objetivo: manejar el perder una contraseña

*/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('perderContrasenna')
});

module.exports = router;
