/*
	CRUD de Eventos
*/

var express = require('express');
var router = express.Router();
const authApi								= require('../../utils/authentication.api');
var controladorEvento 			= require('../../controllers/evento.controller');

router.use(authApi.verifyToken);

/**
	*@api {post} /api/eventos/
	*@apiPermission usuario personal 
	*@apiDescription Crea el registro de Evento en la base de datos
	*@apiGroup Evento
	*@apiName crearEvento
	*@apiversion 0.1.2
	*@apiParam {String} nombre
	*@apiParam {String} descripción
	*@apiParam {Date}   fechaInicio
	*@apiParam {Date}   fechaFin
	*@apiParam {number = 1, 2, 3}	estado
	*@apiParam {Int}		responsable
	*@apiPermission Personal
*/
router.post('/', authApi.verifyRol(['Personal', 'Admin']), controladorEvento.crearEvento);

/**
	*@api {get} /api/eventos/
	*@apiDescription Obtiene todos los eventos de la base de datos
	*@apiGroup Evento
	*@apiName mostrarEventos
	*@apiversion 0.1.2
	*@apiSuccess {Object[]} eventos lista de todos los eventos
*/
router.get('/', controladorEvento.mostrarEventos);

/**
	*@api {put} /api/eventos/:id
	*@apiPermission usuario personal 
	*@apiDescription Edita el registro de Evento en la base de datos
	*@apiGroup Evento
	*@apiName editarEvento
	*@apiversion 0.1.2
	*@apiParam 	 {Int}		id
	*@apiParam {String} nombre
	*@apiParam {String} descripción
	*@apiParam {Date}   fechaInicio
	*@apiParam {Date}   fechaFin
	*@apiParam {number = 1, 2, 3}	estado
	*@apiParam {Int}		responsable
	*@apiPermission Personal
*/
router.put('/:id', authApi.verifyRol(['Personal', 'Admin']), controladorEvento.editarEvento);

/**
	*@api {delete} /api/eventos/:id
	*@apiPermission usuario personal 
	*@apiDescription Elimina el registro de Evento en la base de datos
	*@apiGroup Evento
	*@apiName eliminarEvento
	*@apiversion 0.1.2
	*@apiParam {Int}		id
	*@apiPermission Personal
*/
router.delete('/:id', authApi.verifyRol(['Personal', 'Admin']), controladorEvento.eliminarEvento);

router.put('/cambiarEstado/:id', controladorEvento.cambiarEstado);

module.exports = router;
