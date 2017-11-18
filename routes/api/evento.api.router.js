/*
	CRUD de Eventos
*/
var controladorEvento = require('../../controllers/evento.controller')
var express = require('express');
var router = express.Router();

/**
	*@api {post} /api/eventos/
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
router.post('/', controladorEvento.crearEvento);

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
router.put('/:id', controladorEvento.editarEvento);

/**
	*@api {delete} /api/eventos/:id
	*@apiDescription Elimina el registro de Evento en la base de datos
	*@apiGroup Evento
	*@apiName eliminarEvento
	*@apiversion 0.1.2
	*@apiParam {Int}		id
	*@apiPermission Personal
*/
router.delete('/:id', controladorEvento.eliminarEvento);

router.put('/cambiarEstado/:id', controladorEvento.cambiarEstado);

module.exports = router;
