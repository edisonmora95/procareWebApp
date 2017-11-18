var controladorCalendario = require('../../controllers/calendario.controller');
var express = require('express');
var router = express.Router();

/**
	*@api {get} /api/calendario/
	*@apiDescription Obtiene todas las tareas y eventos de la base de datos
	*@apiGroup Calendario
	*@apiName mostrarCalendario
	*@apiversion 0.1.2
	*@apiSuccess {Object[]} datos lista de todas las tareas y eventos
*/
router.get('/', controladorCalendario.mostrarCalendario);

/**
	*@api {get} /api/calendario/:id_responsable
	*@apiDescription Obtiene todas las tareas y eventos del usuario indicado de la base de datos
	*@apiGroup Calendario
	*@apiName mostrarCalendarioUsuario
	*@apiversion 0.1.2
	*@apiSuccess {Object[]} datos lista de todas las tareas y eventos del usuario
*/
router.get('/usuario/:id_responsable', controladorCalendario.mostrarCalendarioUsuario);

module.exports = router;