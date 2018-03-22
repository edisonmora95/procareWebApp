/*
	@Descripcion: Api de Benefactores
	@Autor: jose viteri
	@FechaCreacion: 25/05/2017
	@UltimaFechaModificacion: 05/06/2017 @EdisonMora (se lo puso bonito)
*/


/* jshint node: true */
'use strict';

const ControllerBenefactor = require('../../controllers/benefactor.controller');
const ControllerPersona    = require('../../controllers/persona.controller');
const express = require('express');
const router  = express.Router();
const utils   = require('../../utils/utils');

/**
	* @api {get} /api/benefactores/
	* @apiDescription Devuelve una lista de todos los benefactores de la base de datos.
	* @apiGroup Benefactor
	* @apiName buscarBenefactor
	* @apiVersion 0.4.0
	*	@apiPermission Usuario | Director Ejecutivo | Admin
	*	@apiHeader {String} x-access-token JWT
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Grupo creado'
	*	@apiSuccess {Object} datos Datos del grupo creado
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/', ControllerBenefactor.buscarBenefactor);


/*
	@api {post} /api/benefactores/
	@apiDescription Ingresa un benefactor a la base de datos
	@apiGroup Benefactor
	@apiName crearBenefactor
	@apiversion 0.1.2
*/
router.post('/', 
						ControllerPersona.buscarPorCedula,
						ControllerBenefactor.crearBenefactor);

/*
	@api {get} /api/benefactores/:id
	@apiDescription Devuelve toda la información del benefactor con el id indicado
	@apiGroup Benefactor
	@apiName buscarBenefactorPorId
	@apiVersion 0.1.2
*/
router.get('/:id', ControllerBenefactor.buscarBenefactorPorId);

/*
	@api {put} /api/benefactores/:id
	@apiDescription Actualiza información del benefactor indicado
	@apiGroup Benefactor
	@apiName editarBenefactor
	@apiVersion 0.1.2
*/
router.put('/:id', ControllerBenefactor.editarBenefactor);

/*
	@api {delete} /api/benefactores/:id
	@apiDescription Elimina a un benefactor de la base de datos
	@apiGroup Benefactor
	@apiName eliminarBenefactor
	@apiVersion 0.1.2
*/
router.delete('/:id', ControllerBenefactor.eliminarBenefactor);

module.exports = router;