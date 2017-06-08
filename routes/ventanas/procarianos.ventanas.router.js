/*
	Ventanas de Procarianos
*/

/* jshint node: true */
'use strict';
var controladorProcariano = require('../../controllers/procariano');
var express = require('express');
var router = express.Router();

//Responde con la página de ingreso de procarianos
router.get('/nuevo', function(req, res){
	res.render('procariano/ingresarProcariano');
});

//Responde con la página de búsqueda de procarianos
router.get('/', function(req, res) {
  res.render('procariano/buscarProcariano');
});

//Responde con la página de perfil del procariano
router.get('/perfil/:cedula', function(req, res){
	res.render('procariano/verProcariano');
});

module.exports = router;
