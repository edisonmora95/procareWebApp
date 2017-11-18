/*
	CRUD de Tareas
*/
var controladorTarea = require('../../controllers/tarea')
var express = require('express');
var router = express.Router();

/**
	*@api {post} /api/tareas/
	*@apiDescription Crea el registro de Tarea en la base de datos
	*@apiGroup Tarea
	*@apiName crearTarea
	*@apiversion 0.1.2
	*@apiParam {String} nombre
	*@apiParam {String} descripción
	*@apiParam {Date}   fechaPublicación 
	*@apiParam {Date}   fechaInicio
	*@apiParam {Date}   fechaFin
	*@apiParam {number = 1, 2, 3}	prioridad
	*@apiParam {number = 1, 2, 3}	estado
	*@apiParam {number = 1, 2, 3}	categoría
	*@apiParam {Int}		responsable
	*@apiPermission Personal
*/
router.post('/', controladorTarea.crearTarea);

/**
	*@api {put} /api/tareas/:id
	*@apiDescription Edita una tarea existente en la base de datos
	*@apiGroup Tarea
	*@apiName editarTarea
	*@apiversion 0.1.2
	*@apiParam {Int}		id
	*@apiParam {String} nombre
	*@apiParam {String} descripción
	*@apiParam {Date}   fechaPublicación 
	*@apiParam {Date}   fechaInicio
	*@apiParam {Date}   fechaFin
	*@apiParam {number = 1, 2, 3}	prioridad
	*@apiParam {number = 1, 2, 3}	estado
	*@apiParam {number = 1, 2, 3}	categoría
	*@apiParam {Int}		responsable
	*@apiPermission Personal
*/
router.put('/:id', controladorTarea.editarTarea);

/**
	*@api {delete} /api/tareas/:id
	*@apiDescription Elimina el registro de Tarea en la base de datos
	*@apiGroup Tarea
	*@apiName eliminarTarea
	*@apiversion 0.1.2
	*@apiParam {Int}		id
	*@apiPermission Personal
*/
router.delete('/:id', controladorTarea.eliminarTarea);

/**
	*@api {get} /api/tareas/
	*@apiDescription Obtiene todas las tareas de la base de datos
	*@apiGroup Tarea
	*@apiName eliminarTarea
	*@apiversion 0.1.2
	*@apiSuccess {Object[]} tareas lista de todas las tareas
*/
router.get('/', controladorTarea.mostrarTareas);

/**
	*@api {get} /api/tareas/:id
	*@apiDescription Obtiene todas las tareas de la base de datos
	*@apiGroup Tarea
	*@apiName eliminarTarea
	*@apiversion 0.1.2
	*@apiParams  {Int}    id
	*@apiSuccess {Int}		id
	*@apiSuccess {String} nombre
	*@apiSuccess {String} descripción
	*@apiSuccess {Date}   fechaPublicación 
	*@apiSuccess {Date}   fechaInicio
	*@apiSuccess {Date}   fechaFin
	*@apiSuccess {number = 1, 2, 3}	prioridad
	*@apiSuccess {number = 1, 2, 3}	estado
	*@apiSuccess {number = 1, 2, 3}	categoría
	*@apiSuccess {JSON}		responsable
*/
router.get('/:id', controladorTarea.mostrarTareaPorUsuario);

router.put('/cambiarEstado/:id', controladorTarea.cambiarEstado);

module.exports = router;