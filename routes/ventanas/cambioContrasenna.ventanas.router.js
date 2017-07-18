/*
Creado: Jose Viteri
Fecha Creacion : 15/07/2017
Objetivo: manejar el cambio de contraseña

*/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('cambiarContrasenna')
});

module.exports = router;
