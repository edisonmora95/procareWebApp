var controladorGrupo = require('../../controllers/grupo.controller');
var express = require('express');
var router = express.Router();

/*
	*@api {post} /api/grupos/
	*@apiDescription Crea el registro de Grupo en la base de datos
	*@apiGroup Grupo
	*@apiName crearGrupo
	*@apiversion 0.1.2
	*@apiParam {String} nombre
	*@apiParam {String} tipo
	*@apiParam {Int}    cantidadChicos 
	*@apiParam {Int}    numeroReuniones
	*@apiParam {Int} 		etapa
	*@apiParam {Int}		animador
	*@apiPermission Personal
*/
router.post('/', controladorGrupo.crearGrupo);

/*
	*@api {get} /api/grupos/
	*@apiDescription Devuelve todos los grupos de la base de datos. Con su etapa.
	*@apiGroup Grupo
	*@apiName mostrarGrupos
	*@apiversion 0.1.2
	*@apiSuccess {Object[]} grupos lista de todos las grupos
*/
router.get('/', controladorGrupo.mostrarGrupos);

/*
	*@api {get} /api/grupos/:id_grupo
	*@apiDescription Devuelve el grupo  por el id dado
	*@apiGroup Grupo
	*@apiName obtenerGrupoPorId
	*@apiversion 0.1.2
	*@apiParam 	 {Int}    id_grupo 
	*@apiSuccess {String} nombre
	*@apiSuccess {String} tipo
	*@apiSuccess {Int}    cantidadChicos 
	*@apiSuccess {Int}    numeroReuniones
	*@apiSuccess {Int} 		etapa
	*@apiSuccess {Int}		animador
*/
router.get('/:id_grupo', controladorGrupo.obtenerGrupoPorId);

/*
	*@api {put} /api/grupos/:id_grupo
	*@apiDescription Edita la información completa del grupo, aninador, etapa e integrantes
	*@apiGroup Grupo
	*@apiName editarGrupo
	*@apiversion 0.1.2
	*@apiParam 	 {Int}    id_grupo 
	*@apiParam {String} nombre
	*@apiParam {String} tipo
	*@apiParam {Int}    cantidadChicos 
	*@apiParam {Int}    numeroReuniones
	*@apiParam {Int} 		etapa
	*@apiParam {Int}		animador
	*@apiPermission Personal
*/
router.put('/:id_grupo', controladorGrupo.editarGrupo);

/*
	*@api {delete} /api/grupos/:id
	*@apiDescription Elimina el registro del grupo y de todas las tablas relacionadas
	*@apiGroup Grupo
	*@apiName eliminarGrupo
	*@apiversion 0.1.2
	*@apiParam {Int}		id
	*@apiPermission Personal
*/
router.delete('/:id', controladorGrupo.eliminarGrupo);

module.exports = router;