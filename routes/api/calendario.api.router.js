'use strict';

const express = require('express');
const router  = express.Router();
const controladorCalendario = require('../../controllers/calendario.controller');
const authApi								= require('../../utils/authentication.api');

router.use(authApi.verifyToken);

/**
	*	@api {get} /api/calendario/ Mostrar tareas y eventos
	*	@apiDescription Obtiene todas las tareas y eventos de la base de datos
	*	@apiGroup Calendario
	*	@apiName mostrarCalendario
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT  
	*	@apiSuccess {Object[]} datos lista de todas las tareas y eventos
*/
router.get('/', authApi.verifyRol(['Personal', 'Admin']), controladorCalendario.mostrarCalendario);

/**
	*	@api {get} /api/calendario/:id_responsable Mostrar tareas y eventos de usuario
	*	@apiDescription Obtiene todas las tareas y eventos del usuario indicado de la base de datos
	*	@apiGroup Calendario
	*	@apiName mostrarCalendarioUsuario
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT  
	*	@apiSuccess {Object[]} datos lista de todas las tareas y eventos del usuario
*/
router.get('/usuario/:id_responsable', controladorCalendario.mostrarCalendarioUsuario);

module.exports = router;