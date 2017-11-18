/*
	@Descripcion: Api del procariano
	@Autor: jose viteri
	@FechaCreacion: 25/05/2017
	@UltimaFechaModificacion: 05/06/2017 @EdisonMora (se lo puso bonito)
*/

/* jshint node: true */
'use strict';

let controladorProcariano = require('../../controllers/procariano.controller');
let express 						  = require('express');
let router 								= express.Router();
let utils 								= require('../../utils/utils');

/*
	@api {post} /api/procarianos/
	@apiDescription	Ingresa un procariano a la base de datos
	@apiGroup Procariano
	@apiName crearProcariano
	@apiversion 0.1.2
*/
router.post('/',controladorProcariano.crearProcariano);

/*
	@api {get} /api/procarianos/
	@apiDescription Retorna a los procarianos que coinciden con los campos de búsqueda
	@apiGroup Procariano
	@apiName buscarProcariano
	@apiVersion 0.1.2
*/
router.get('/', controladorProcariano.buscarProcariano);

/*
	@api {get} /api/procarianos/activos
	@apiDescription Devuelve solo a los procarianos que estén en estado activo
	@apiGroup Procariano
	@apiName buscarProcarianosActivos
	@apiVersion 0.1.2
*/
router.get('/activos', controladorProcariano.buscarProcarianosActivos);

/*
	@api {get} /api/procarianos/formacion
	@apiDescription Busca a los procarianos de Formacion sin grupo
	@apiGroup Procarianos
	@apiName buscarChicosFormacionSinGrupo
	@apiVersion 0.1.2
*/
router.get('/formacion', controladorProcariano.buscarChicosFormacionSinGrupo);

/*
	@api {get} /api/procarianos/:id
	@apiDescription Devuelve toda la información del procariano con el id indicado
	@apiGroup Procariano
	@apiName buscarProcarianoPorId
	@apiVersion 0.1.2
*/
router.get('/:id', controladorProcariano.buscarProcarianoPorId);

/*
	@api {get} /api/procarianos/:id/grupo
	@apiDescription Busca el grupo actual del procariano
	@apiGroup Procarianos
	@apiName obtenerGrupoActualDeProcariano
	@apiVersion 0.1.2
*/
router.get('/grupo/:id', controladorProcariano.obtenerGrupoActualDeProcariano);

/*
	@api {put} /api/procarianos/:id
	@apiDescription Actualiza información del procariano
	@apiGroup Procarianos
	@apiName editarProcariano
	@apiVersion 0.1.2
*/
router.put('/:id', controladorProcariano.editarProcariano);

/*
	@api {delete} /api/procarianos/:id
	@apiDescription Cambia el estado de un procariano a inactivo
	@apiGroup Procarianos
	@apiName eliminarProcariano
	@apiVersion 0.1.2
*/
router.delete('/:id', controladorProcariano.eliminarProcariano);


module.exports = router;