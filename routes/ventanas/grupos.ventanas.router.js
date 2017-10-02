'use strict';
var express = require('express');
var router = express.Router();
let autenticacion = require('./../../utils/authentication');

//router.use(autenticacion.usuario);	//Para todas estas rutas, debe ser un usuario de la aplicación

/*
	@Descripción:
		Responde con la página de ingreso de grupo
	@Permisos:
		Usuario
		Personal
*/
router.get('/nuevo', function(req, res, next){
	res.render('grupo/crearGrupo');
});

/*
	@Descripción:
		Responde con la página de búsqueda de grupos
	@Permisos:
		Usuario
		Personal | Director ejecutivo | Director de Procare Formación
*/
router.get('/', function(req, res, next){
	res.render('grupo/buscarGrupo');
});

router.get('/:id', function(req, res, next){
	res.render('grupo/verGrupo');
});

module.exports = router;