/*
	@Descripcion: API de Grupos
	@Autor: @edisonmora95
	@FechaCreacion: 25/05/2017
	@UltimaFechaModificacion:
*/

/* jshint node: true */
'use strict';

const controladorGrupo    = require('../../controllers/grupo.controller');
const controladorAsist    = require('../../controllers/asistenciachico.controller');
const controladorAnimador = require('../../controllers/animador.controller');
const controladorRol      = require('../../controllers/rol.controller');
const authApi	  		      = require('../../utils/authentication.api'); 

let express = require('express');
let router  = express.Router();

router.use(authApi.verifyToken);

/**
	*	@api {post} /api/grupos/	Crear Grupo
	*	@apiDescription Crea el registro de Grupo en la base de datos
	*	@apiGroup Grupo
	*	@apiName crearGrupo
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT
	*	@apiParam {String} nombre	Nombre del grupo
	*	@apiParam {String} tipo	Formación|Caminantes|Pescadores|Mayores
	*	@apiParam {String} genero Procare|Procare Mujeres
	*	@apiParam {Int}    cantidadChicos Cantidad de chicos en el grupo
	*	@apiParam {Int}    numeroReuniones	Número de reuniones planificadas para el grupo
	*	@apiParam {Int} 	 etapa	Id de la etapa a la que pertenece
	*	@apiParam {Int}		 animador Id del animador del grupo
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Grupo creado'
	*	@apiSuccess {Object} datos Datos del grupo creado
	*	@apiSuccess {Int} datos.id Id del grupo creado
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.post('/', 
						authApi.verifyRol(['Personal', 'Admin']), 
						controladorGrupo.crearGrupo, 
						controladorAnimador.agregarAnimador, 
						controladorRol.asignarRol
					);

/**
	*	@api {get} /api/grupos/	Mostrar Grupos
	*	@apiDescription Devuelve todos los grupos de la base de datos. Con su etapa.
	*	@apiGroup Grupo
	*	@apiName mostrarGrupos
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Se obtuvieron los grupos'
	*	@apiSuccess {Object} datos Datos del grupo creado
	*	@apiSuccess {Object[]} datos.grupos Lista de todos los grupos
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/', 
						authApi.verifyRol(['Personal', 'Admin']), 
						controladorGrupo.mostrarGrupos
					);

/**
	*	@api {get} /api/grupos/:id_grupo Obtener Grupo Por Id
	*	@apiDescription Devuelve el grupo por el id dado
	*	@apiGroup Grupo
	*	@apiName obtenerGrupoPorId
	*	@apiversion 0.3.0
	*	@apiPermission Usuario
	*	@apiHeader {String} x-access-token JWT
	*	@apiParam 	 {Int}    id_grupo Id del grupo a buscar
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String}  mensaje 'Se obtuvieron los grupos'
	*	@apiSuccess {Object}  datos Datos del grupo encontrado
	*	@apiSuccess {Object}  datos.grupo Información del grupo encontrado
	*	@apiSuccess {Object[]} datos.procarianos Array de procarianos integrantes del grupo
	*	@apiSuccess {Object}	datos.animador Información del animador del grupo
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/:id_grupo', controladorGrupo.obtenerGrupoPorId);

/**
	*	@api {put} /api/grupos/:id_grupo Editar Grupo
	*	@apiDescription Edita la información completa del grupo, animador, etapa e integrantes
	*	@apiGroup Grupo
	*	@apiName editarGrupo
	*	@apiversion 0.3.0
	*	@apiPermission Personal
	*	@apiHeader {String} x-access-token JWT
	*	@apiParam {Int}    id_grupo 	Id del grupo a editar
	*	@apiParam {String} nombre 		Nombre del grupo
	*	@apiParam {String} tipo 			Tipo del grupo
	*	@apiParam {Int} 	etapaAntigua Id de la etapa antigua
	*	@apiParam {Int} 	etapaNueva   Id de la etapa nueva
	*	@apiParam {Int}		animadorAntiguo Id del animador antiguo
	*	@apiParam {Int}		animadorNuevo   Id del animador nuevo
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String}  mensaje 'Se editó el grupo correctamente.'
	*	@apiSuccess {Object}  datos Datos del grupo editado
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
	
*/
router.put('/:id_grupo', 
						authApi.verifyRol(['Personal', 'Admin']), 
						controladorGrupo.editarGrupo,
						controladorAnimador.cambiarAnimadorDelGrupo,
						controladorRol.asignarRol
					);

/**
	*	@api {delete} /api/grupos/:id Eliminar Grupo
	*	@apiDescription Elimina el registro del grupo y de todas las tablas relacionadas
	*	@apiGroup Grupo
	*	@apiName eliminarGrupo
	*	@apiversion 0.3.0
	*	@apiParam {Int}		id Id del grupo a eliminar
	*	@apiPermission Personal
	*	@apiHeader {String} x-access-token JWT
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String}  mensaje 'Todos los registros del grupo fueron eliminados'
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.delete('/:id_grupo', 
							authApi.verifyRol(['Personal', 'Admin']), 
							controladorGrupo.eliminarGrupo
							);

/**
	*	@api {post} /api/grupos/:id_grupo/anadir Añadir Procariano a Grupo
	*	@apiDescription Añade el registro de un Procariano a un Grupo
	*	@apiGroup Grupo
	*	@apiName anadirProcarianoAGrupo
	*	@apiversion 0.3.0
	*	@apiParam {Int}	id_grupo Id del grupo
	*	@apiPermission Personal
	*	@apiHeader {String} x-access-token JWT
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String}  mensaje 'Procariano añadido a grupo.'
	*	@apiSuccess {Object}  datos Datos del Procariano añadido al grupo
	*	@apiSuccess {Int}  		datos.GrupoId Id del grupo al que fue añadido
	*	@apiSuccess {Int}  		datos.ProcarianoId Id del Procariano
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.post('/:id_grupo/anadir', 
						authApi.verifyRol(['Personal', 'Admin']), 
						controladorGrupo.anadirProcarianoAGrupo
					);


router.post('/asistencia/', controladorAsist.ingresarAsistencia);
router.get('/asistencia/:id_grupo', controladorAsist.obtenerAsistenciasGrupo);



module.exports = router;