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
const utils 							= require('../../utils/utils');
const authApi	  					= require('../../utils/authentication.api');

router.use(authApi.verifyToken);

/*
	@api {post} /api/procarianos/
	@apiPermission Usuario | Personal | Admin
	@apiDescription	Ingresa un procariano a la base de datos
	@apiGroup Procariano
	@apiName crearProcariano
	@apiversion 0.1.2
*/
router.post('/', authApi.verifyRol(['Personal']), controladorProcariano.crearProcariano);

/*
	@api {get} /api/procarianos/
	@apiPermission Usuario | Personal | Admin
	@apiDescription Retorna a los procarianos que coinciden con los campos de búsqueda
	@apiGroup Procariano
	@apiName buscarProcariano
	@apiVersion 0.1.2
*/
router.get('/', authApi.verifyRol(['Personal', 'Admin', 'Director Ejecutivo', 'Director Procare Formacion', 'Director Centro']), controladorProcariano.buscarProcariano);

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
router.get('/formacion/sinGrupo', controladorProcariano.buscarChicosFormacionSinGrupo);

/*
	@api {get} /api/procarianos/:id
	@apiPermission Usuario | Personal | Admin
	@apiDescription Devuelve toda la información del procariano con el id indicado
	@apiGroup Procariano
	@apiName buscarProcarianoPorId
	@apiVersion 0.1.2
*/
router.get('/:id', authApi.verifyRol(['Personal','Admin']), controladorProcariano.buscarProcarianoPorId);

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
	@apiPermission Usuario | Personal | Admin
	@apiDescription Actualiza información del procariano
	@apiGroup Procarianos
	@apiName editarProcariano
	@apiVersion 0.1.2
*/
router.put('/:id', controladorProcariano.editarProcariano);

/*
	@api {delete} /api/procarianos/:id
	@apiPermission Usuario | Personal | Admin
	@apiPermission Usuario Personal Admin
	@apiDescription Cambia el estado de un procariano a inactivo
	@apiGroup Procarianos
	@apiName eliminarProcariano
	@apiVersion 0.1.2
*/
router.delete('/:id', authApi.verifyRol(['Personal','Admin']), controladorProcariano.eliminarProcariano);


module.exports = router;