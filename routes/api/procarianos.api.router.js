/*
	@Descripcion: Api del procariano
	@Autor: jose viteri
	@FechaCreacion: 25/05/2017
	@UltimaFechaModificacion: 05/06/2017 @EdisonMora (se lo puso bonito)
*/

/* jshint node: true */
'use strict';

const middlewareCloudinary       = require('../../middleware/cloudinary.middleware');
const controladorPersona 		     = require('../../controllers/persona.controller');
const controladorProcariano 		 = require('../../controllers/procariano.controller');
const controladorProcarianoGrupo = require('../../controllers/procarianogrupo.controller');
const controladorProcarianoTipo  = require('../../controllers/procarianotipo.controller');

const express = require('express');
const router  = express.Router();
const utils 	= require('../../utils/utils');
const authApi	= require('../../utils/authentication.api');

router.use(authApi.verifyToken);

/*
	@api {post} /api/procarianos/
	@apiPermission Usuario | Personal | Admin
	@apiDescription	Ingresa un procariano a la base de datos
	@apiGroup Procariano
	@apiName crearProcariano
	@apiVersion 0.2.0
*/
router.post('/', 
						authApi.verifyRol(['Personal']), 
						middlewareCloudinary.subirImagen,
						controladorPersona.crearPersona,
						controladorProcariano.crearProcariano
						);

/*
	@api {get} /api/procarianos/
	@apiPermission Usuario | Personal | Admin
	@apiDescription Retorna a los procarianos que coinciden con los campos de búsqueda
	@apiGroup Procariano
	@apiName buscarProcariano
	@apiVersion 0.2.0
*/
router.get('/', authApi.verifyRol(['Personal', 'Admin', 'Director Ejecutivo', 'Director Procare Formacion', 'Director Centro']), controladorProcariano.buscarProcariano);

/*
	@api {get} /api/procarianos/activos
	@apiDescription Devuelve solo a los procarianos que estén en estado activo
	@apiGroup Procariano
	@apiName buscarProcarianosActivos
	@apiVersion 0.2.0
*/
router.get('/activos', controladorProcariano.buscarProcarianosActivos);

/*
	@api {get} /api/procarianos/formacion
	@apiDescription Busca a los procarianos de Formacion sin grupo
	@apiGroup Procarianos
	@apiName buscarChicosFormacionSinGrupo
	@apiVersion 0.2.0
*/
router.get('/formacion/sinGrupo', controladorProcariano.buscarChicosFormacionSinGrupo);

/*
	@api {get} /api/procarianos/:id
	@apiPermission Usuario | Personal | Admin
	@apiDescription Devuelve toda la información del procariano con el id indicado
	@apiGroup Procariano
	@apiName buscarProcarianoPorId
	@apiVersion 0.2.0
*/
router.get('/:id', authApi.verifyRol(['Personal','Admin', 'Animador']), controladorProcariano.buscarProcarianoPorId);

/*
	@api {get} /api/procarianos/:id/grupo
	@apiDescription Busca el grupo actual del procariano
	@apiGroup Procarianos
	@apiName obtenerGrupoActualDeProcariano
	@apiVersion 0.2.0
*/
router.get('/grupo/:id', controladorProcariano.obtenerGrupoActualDeProcariano);

/*
	@api {put} /api/procarianos/:id/grupo/cambiar
	@apiDescription Cambia al procariano de su grupo actual
	@apiGroup Procarianos
	@apiName cambiarDeGrupo
	@apiVersion 0.2.0
*/
router.put('/:id_procariano/grupo/cambiar/', authApi.verifyRol(['Personal']), controladorProcarianoGrupo.cambiarDeGrupo)

/*
	@api {put} /api/procarianos/:id
	@apiPermission Usuario | Personal | Admin
	@apiDescription Actualiza información del procariano
	@apiGroup Procarianos
	@apiName editarProcariano
	@apiVersion 0.2.0
*/
router.put('/:id',
						authApi.verifyRol(['Personal']),
						middlewareCloudinary.editarImagen,
						controladorPersona.editarPersona,
						controladorProcariano.editarProcariano,
						controladorProcarianoTipo.cambiarTipo
						);

/*
	@api {delete} /api/procarianos/:id
	@apiPermission Usuario | Personal | Admin
	@apiPermission Usuario Personal Admin
	@apiDescription Cambia el estado de un procariano a inactivo
	@apiGroup Procarianos
	@apiName eliminarProcariano
	@apiVersion 0.2.0
*/
router.delete('/:id', authApi.verifyRol(['Personal','Admin']), controladorProcariano.eliminarProcariano);


module.exports = router;