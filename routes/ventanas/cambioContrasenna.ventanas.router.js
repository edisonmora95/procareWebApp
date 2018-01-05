/*
Creado: Jose Viteri
Fecha Creacion : 15/07/2017
Objetivo: manejar el cambio de contraseña
*/
'use strict';
let express = require('express');
let router  = express.Router();

const authViews 	= require('../../utils/authentication.views');

router.use(authViews.usuario);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('cambiarContrasenna')
});

module.exports = router;
