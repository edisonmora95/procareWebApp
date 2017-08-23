/*
	@Descripcion: Ventanas del procariano
	@Autor: jose viteri
	@FechaCreacion: 20/05/2017
	@UltimaFechaModificacion: 17/08/2017 @edisonmora - Autenticación de rutas
*/

'use strict';

const express = require('express');
const router = express.Router();
let autenticacion = require('./../../utils/authentication');

router.use(autenticacion.usuario);	//Para todas estas rutas, debe ser un usuario de la aplicación

/*
	@Descripción:
		Responde con la página de ingreso de procarianos
	@Permisos:
		Usuario
		Personal
*/
router.get('/nuevo', autenticacion.personal, function(req, res){
	res.render('procariano/ingresarProcariano');
});

/*
	@Descripción:
		Responde con la página de búsqueda de procarianos
	@Permisos:
		Usuario
		Personal | Director ejecutivo | Director de Procare Formación
*/
router.get('/', function(req, res) {
  res.render('procariano/buscarProcariano');
});

/*
	@Descripción:
		Responde con la página de perfil del procariano
	@Permisos:
		Usuario
		Personal | Director ejecutivo | Director de Procare Formación: solo si es alguien de Procare o PM | Animador: solo si es suyo o de su grupo
*/
router.get('/perfil/:cedula', function(req, res){
	res.render('procariano/verProcariano');
});

module.exports = router;
