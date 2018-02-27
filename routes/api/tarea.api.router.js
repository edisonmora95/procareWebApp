/*
	CRUD de Tareas
*/
'use strict';

const express = require('express');
const router  = express.Router();
const controladorTarea = require('../../controllers/tarea.controller');
const authApi					 = require('../../utils/authentication.api');

router.use(authApi.verifyToken);

/**
	*	@api {post} /api/tareas/ Crear Tarea
	*	@apiDescription Crea el registro de Tarea en la base de datos
	*	@apiGroup Tarea
	*	@apiName crearTarea
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT 
	*	@apiParam {String} nombre Nombre de la tarea
	*	@apiParam {String} descripcion Descripción de la tarea
	*	@apiParam {Date}   fechaPublicacion Fecha en la que la tarea fue creada
	*	@apiParam {Date}   fechaInicio Fecha de inicio de la tarea
	*	@apiParam {Date}   fechaFin	Fecha en la que la tarea debe completarse
	*	@apiParam {number = 1, 2, 3}	prioridad 1 : Alta | 2 : Media | 3 : Baja
	*	@apiParam {number = 1, 2, 3}	estado 1 : Pendiente | 2 : En proceso | 3 : Completada
	*	@apiParam {number = 1, 2, 3}	categoria 1 : Formación | 2 : Acción | 3 : Fundación
	*	@apiParam {Int}		responsable Id de la persona responsable
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Tarea creada correctamente'
	*	@apiSuccess {Int} datos Id de la tarea creada
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.post('/', authApi.verifyRol(['Personal', 'Admin']), controladorTarea.crearTarea);

/**
	*	@api {put} /api/tareas/:id Editar Tarea
	*	@apiDescription Edita una tarea existente en la base de datos
	*	@apiGroup Tarea
	*	@apiName editarTarea
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiParam {Int}		Id Id de la tarea a editar
	*	@apiParam {String} nombre Nombre de la tarea
	*	@apiParam {String} descripcion Descripción de la tarea
	*	@apiParam {Date}   fechaPublicacion Fecha en la que la tarea fue creada
	*	@apiParam {Date}   fechaInicio Fecha de inicio de la tarea
	*	@apiParam {Date}   fechaFin	Fecha en la que la tarea debe completarse
	*	@apiParam {number = 1, 2, 3}	prioridad 1 : Alta | 2 : Media | 3 : Baja
	*	@apiParam {number = 1, 2, 3}	estado 1 : Pendiente | 2 : En proceso | 3 : Completada
	*	@apiParam {number = 1, 2, 3}	categoria 1 : Formación | 2 : Acción | 3 : Fundación
	*	@apiParam {Int}		responsable Id de la persona responsable
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Tarea editada correctamente'
	*	@apiSuccess {Int} datos Id de la tarea creada
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.put('/:id',  authApi.verifyRol(['Personal', 'Admin']), controladorTarea.editarTarea);

/**
	*	@api {delete} /api/tareas/:id Eliminar Tarea
	*	@apiDescription Elimina el registro de Tarea en la base de datos
	*	@apiGroup Tarea
	*	@apiName eliminarTarea
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiParam {Int}		id Id de la tarea a eliminar
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Tarea eliminada correctamente'
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/	
router.delete('/:id',  authApi.verifyRol(['Personal', 'Admin']), controladorTarea.eliminarTarea);

/**
	*	@api {get} /api/tareas/ Mostrar Tareas
	*	@apiDescription Obtiene todas las tareas de la base de datos
	*	@apiGroup Tarea
	*	@apiName eliminarTarea
	*	@apiversion 0.3.0
	*	@apiPermission Usuario
	*	@apiSuccess {Object[]} tareas lista de todas las tareas
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/', controladorTarea.mostrarTareas);

/**
	*	@api {get} /api/tareas/:id Mostrar Tareas De Usuario
	*	@apiDescription Obtiene todas las tareas de un usuario de la base de datos
	*	@apiGroup Tarea
	*	@apiName mostrarTareaPorUsuario
	*	@apiversion 0.3.0
	*	@apiParams  {Int}	Id Id del usuario
	*	@apiPermission Usuario
	*	@apiSuccess {Object[]} tareas lista de todas las tareas
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/:id', controladorTarea.mostrarTareaPorUsuario);


/**
	*	@api {put} /api/tareas/cambiarEstado/:id Cambiar Estado Tarea
	*	@apiDescription Cambia el estado de una tarea de la base de datos
	*	@apiGroup Tarea
	*	@apiName cambiarEstado
	*	@apiversion 0.3.0
	*	@apiPermission Usuario
	*	@apiParam {Int}		Id Id de la tarea a editar
	*	@apiParam {Int = 1, 2, 3}	estado 1 : Pendiente | 2 : En proceso | 3 : Completada
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Tarea cambiada de estado'
	*	@apiSuccess {Int} datos Id de la tarea creada
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.put('/cambiarEstado/:id', controladorTarea.cambiarEstado);

module.exports = router;