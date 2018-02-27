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
const authApi	= require('../../utils/authentication.api');

router.use(authApi.verifyToken);

/**
	*	@api {post} /api/procarianos/ Crear Procariano
	*	@apiDescription	Ingresa un procariano a la base de datos
	*	@apiGroup Procariano
	*	@apiName crearProcariano
	*	@apiVersion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT
	*	@apiParam {String} nombres	Nombre del Procariano
	*	@apiParam {String} apellidos Apellidos del Procariano
	*	@apiParam {String} cedula	Cédula del Procariano
	*	@apiParam {String} direccion	Dirección de su casa
	*	@apiParam {Date} fechaNacimiento Fecha de nacimiento en formato Date
	*	@apiParam {String = 'masculino', 'femenino'} genero Género del Procariano
	*	@apiParam {String} email	Email del Procariano
	*	@apiParam {String} celular Teléfono celular del Procariano
	*	@apiParam {String} convencional Teléfono convencional del Procariano
	*	@apiParam {String} trabajo	Trabajo del Procariano
	*	@apiParam {String} imagenUrl	Imagen del Procariano
	*	@apiParam {String} colegio	Colegio en donde estudió
	*	@apiParam {String} universidad Universidad
	*	@apiParam {String} parroquia	Campo solo para Sacerdotes
	*	@apiParam {Date} fechaOrdenacion Fecha de ordenación de Sacerdote
	*	@apiParam {String = 'activo', 'inactivo'} estado Estado del Procariano
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Procariano creado correctamente.'
	*	@apiSuccess {Object} datos Datos del Procariano creado
	*	@apiSuccess {Int} datos.id Id del procariano creado
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.post('/', 
						authApi.verifyRol(['Personal']), 
						middlewareCloudinary.subirImagen,
						controladorPersona.crearPersona,
						controladorProcariano.crearProcariano
					);
/**
	*	@api {get} /api/procarianos/ Buscar Procarianos
	*	@apiDescription Retorna a los procarianos que coinciden con los campos de búsqueda
	*	@apiGroup Procariano
	*	@apiName buscarProcariano
	*	@apiVersion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT
	*	@apiParam {String} nombres	Nombre del Procariano
	*	@apiParam {String} apellidos Apellidos del Procariano
	*	@apiParam {String} cedula	Cédula del Procariano
	*	@apiParam {String} direccion	Dirección de su casa
	*	@apiParam {Date} fechaNacimiento Fecha de nacimiento en formato Date
	*	@apiParam {String = 'masculino', 'femenino'} genero Género del Procariano
	*	@apiParam {String} email	Email del Procariano
	*	@apiParam {String} celular Teléfono celular del Procariano
	*	@apiParam {String} convencional Teléfono convencional del Procariano
	*	@apiParam {String} trabajo	Trabajo del Procariano
	*	@apiParam {String} imagenUrl	Imagen del Procariano
	*	@apiParam {String} colegio	Colegio en donde estudió
	*	@apiParam {String} universidad Universidad
	*	@apiParam {String} parroquia	Campo solo para Sacerdotes
	*	@apiParam {Date} fechaOrdenacion Fecha de ordenación de Sacerdote
	*	@apiParam {String = 'activo', 'inactivo'} estado Estado del Procariano
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Búsqueda exitosa'
	*	@apiSuccess {Object[]} datos Procarianos que coinciden con los criterios de búsqueda
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/', authApi.verifyRol(['Personal', 'Admin', 'Director Ejecutivo', 'Director Procare Formacion', 'Director Centro']), controladorProcariano.buscarProcariano);


/**
	*	@api {get} /api/procarianos/activos Buscar Procarianos Activos
	*	@apiDescription Devuelve solo a los procarianos que estén en estado activo
	*	@apiGroup Procariano
	*	@apiName buscarProcarianosActivos
	*	@apiVersion 0.3.0
	*	@apiPermission Usuario
	*	@apiHeader {String} x-access-token JWT
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Búsqueda exitosa'
	*	@apiSuccess {Object[]} datos Procarianos activos
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/activos', controladorProcariano.buscarProcarianosActivos);

/**
	*	@api {get} /api/procarianos/formacion/sinGrupo Buscar Procarianos Sin Grupo
	*	@apiDescription Busca a los procarianos de Formacion sin grupo
	*	@apiGroup Procariano
	*	@apiName buscarChicosFormacionSinGrupo
	*	@apiVersion 0.3.0
	*	@apiPermission Usuario
	*	@apiHeader {String} x-access-token JWT
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Búsqueda exitosa'
	*	@apiSuccess {Object[]} datos Procarianos sin grupo
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/formacion/sinGrupo', controladorProcariano.buscarChicosFormacionSinGrupo);

/**
	*	@api {get} /api/procarianos/:id_persona Buscar Procariano Por Id
	*	@apiDescription Devuelve toda la información del procariano con el id indicado
	*	@apiGroup Procariano
	*	@apiName buscarProcarianoPorId
	*	@apiVersion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT
	*	@apiParam {Int} id_persona	Id de la Persona a buscar
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Búsqueda exitosa'
	*	@apiSuccess {Object} datos Información completa del Procariano
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/:id_persona', 
						authApi.verifyRol(['Personal','Admin', 'Animador']), 
						controladorProcariano.buscarProcarianoPorId);

/**
	*	@api {get} /api/procarianos/grupo/:id_procariano Obtener grupo actual
	*	@apiDescription Busca el grupo actual del procariano
	*	@apiGroup Procariano
	*	@apiName obtenerGrupoActualDeProcariano
	*	@apiVersion 0.3.0
	*	@apiPermission Usuario
	*	@apiHeader {String} x-access-token JWT
	*	@apiParam {Int} id_procariano	Id del Procariano
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Búsqueda exitosa'
	*	@apiSuccess {Object} datos Información completa del Grupo
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/grupo/:id_procariano', controladorProcariano.obtenerGrupoActualDeProcariano);

/*
	@api {put} /api/procarianos/:id/grupo/cambiar
	@apiDescription Cambia al procariano de su grupo actual
	@apiGroup Procarianos
	@apiName cambiarDeGrupo
	@apiVersion 0.2.0
*/
router.put('/:id_procariano/grupo/cambiar/', authApi.verifyRol(['Personal']), controladorProcarianoGrupo.cambiarDeGrupo);

/**
	*	@api {put} /api/procarianos/:id_persona Editar Procariano
	*	@apiDescription	Edita la información de Persona, Procariano y ProcarianoTipo de la base de datos
	*	@apiGroup Procariano
	*	@apiName editarProcariano
	*	@apiVersion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT
	*	@apiParam {Int} id_persona	Id del registro de la persona de la base de datos
	*	@apiParam {String} nombres	Nombre del Procariano
	*	@apiParam {String} apellidos Apellidos del Procariano
	*	@apiParam {String} cedula	Cédula del Procariano
	*	@apiParam {String} direccion	Dirección de su casa
	*	@apiParam {Date} fechaNacimiento Fecha de nacimiento en formato Date
	*	@apiParam {String = 'masculino', 'femenino'} genero Género del Procariano
	*	@apiParam {String} email	Email del Procariano
	*	@apiParam {String} celular Teléfono celular del Procariano
	*	@apiParam {String} convencional Teléfono convencional del Procariano
	*	@apiParam {String} trabajo	Trabajo del Procariano
	*	@apiParam {String} imagenUrl	Imagen del Procariano
	*	@apiParam {String} colegio	Colegio en donde estudió
	*	@apiParam {String} universidad Universidad
	*	@apiParam {String} parroquia	Campo solo para Sacerdotes
	*	@apiParam {Date} fechaOrdenacion Fecha de ordenación de Sacerdote
	*	@apiParam {String = 'activo', 'inactivo'} estado Estado del Procariano
	*	@apiParam {Int} tipoId	Id del tipo nuevo al que se va a cambiar
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Procariano editado correctamente.'
	*	@apiSuccess {Object} datos Datos del Procariano editado
	*	@apiSuccess {Int} datos.id Id del procariano creado
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.put('/:id_persona',
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