/*
	CRUD de Eventos
*/
'use strict';

const express = require('express');
const router  = express.Router();
const authApi						= require('../../utils/authentication.api');
const controladorEvento = require('../../controllers/evento.controller');

router.use(authApi.verifyToken);

/**
	*	@api {post} /api/eventos/ Crear Evento
	*	@apiDescription Crea el registro del Evento en la base de datos
	*	@apiGroup Evento
	*	@apiName crearEvento
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT 
	*	@apiParam {String} nombre Nombre del evento
	*	@apiParam {String} descripcion Descripción de la tarea
	*	@apiParam {Date}   fechaInicio Fecha de inicio del evento
	*	@apiParam {Date}   fechaFin	Fecha fin del evento
	*	@apiParam {String} lugar Lugar en donde se realizará el evento
	*	@apiParam {number = 1, 2, 3}	estado 1 : Pendiente | 2 : En proceso | 3 : Completada
	*	@apiParam {Int}		responsable Id de la persona responsable
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Evento creado correctamente'
	*	@apiSuccess {Int} datos Id del evento creado
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.post('/', authApi.verifyRol(['Personal', 'Admin']), controladorEvento.crearEvento);

/**
	*	@api {get} /api/eventos/ Mostrar Eventos
	*	@apiDescription Obtiene todos los eventos de la base de datos
	*	@apiGroup Evento
	*	@apiName mostrarEventos
	*	@apiversion 0.3.0
	*	@apiSuccess {Object[]} eventos lista de todos los eventos
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/', controladorEvento.mostrarEventos);

/**
	*	@api {put} /api/eventos/:id Editar Evento
	*	@apiDescription Edita un evento existente en la base de datos
	*	@apiGroup Evento
	*	@apiName editarEvento
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT 
	*	@apiParam {String} nombre Nombre del evento
	*	@apiParam {String} descripcion Descripción de la tarea
	*	@apiParam {Date}   fechaInicio Fecha de inicio del evento
	*	@apiParam {Date}   fechaFin	Fecha fin del evento
	*	@apiParam {String} lugar Lugar en donde se realizará el evento
	*	@apiParam {number = 1, 2, 3}	estado 1 : Pendiente | 2 : En proceso | 3 : Completada
	*	@apiParam {Int}		responsable Id de la persona responsable
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Evento editado correctamente'
	*	@apiSuccess {Int} datos Id del evento
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.put('/:id', authApi.verifyRol(['Personal', 'Admin']), controladorEvento.editarEvento);

/**
	*	@api {delete} /api/eventos/:id Eliminar evento
	*	@apiDescription Elimina el registro de Evento en la base de datos
	*	@apiGroup Evento
	*	@apiName eliminarEvento
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiParam {Int}		id Id del evento a eliminar
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Evento eliminado correctamente'
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.delete('/:id', authApi.verifyRol(['Personal', 'Admin']), controladorEvento.eliminarEvento);

/**
	*	@api {put} /api/eventos/cambiarEstado/:id Cambiar Estado Evento
	*	@apiDescription Cambia el estado de un evento de la base de datos
	*	@apiGroup Evento
	*	@apiName cambiarEstado
	*	@apiversion 0.3.0
	*	@apiPermission Usuario
	*	@apiParam {Int}		Id Id del evento a editar
	*	@apiParam {Int = 1, 2, 3}	estado 1 : Pendiente | 2 : En proceso | 3 : Completada
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Evento cambiado de estado'
	*	@apiSuccess {Int} datos Id del evento
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.put('/cambiarEstado/:id', controladorEvento.cambiarEstado);

module.exports = router;
