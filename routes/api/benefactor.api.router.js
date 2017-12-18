/*
@Descripcion: Api de Benefactores
@Autor: jose viteri
@FechaCreacion: 25/05/2017
@UltimaFechaModificacion: 05/06/2017 @EdisonMora (se lo puso bonito)
*/


/* jshint node: true */
'use strict';

const controladorBenefactor = require('../../controllers/benefactor.controller');
const express               = require('express');
let router                  = express.Router();
const utils                 = require('../../utils/utils');

//API

//Post del benefactor
//router.post('/', utils.generarHash, controladorBenefactor.crearBenefactor);

/*
	@api {get} /api/benefactores/
	@apiDescription Devuelve todos los benefactores de la base de datos
	@apiGroup Benefactor
	@apiName buscarBenefactor
	@apiVersion 0.1.2
*/
router.get('/', controladorBenefactor.buscarBenefactor);


/*
	@api {post} /api/benefactores/
	@apiDescription Ingresa un benefactor a la base de datos
	@apiGroup Benefactor
	@apiName crearBenefactor
	@apiversion 0.1.2
*/
router.post('/', controladorBenefactor.crearBenefactor);

/*
	@api {get} /api/benefactores/:id
	@apiDescription Devuelve toda la información del benefactor con el id indicado
	@apiGroup Benefactor
	@apiName buscarBenefactorPorId
	@apiVersion 0.1.2
*/
router.get('/:id', controladorBenefactor.buscarBenefactorPorId);

/*
	@api {put} /api/benefactores/:id
	@apiDescription Actualiza información del benefactor indicado
	@apiGroup Benefactor
	@apiName editarBenefactor
	@apiVersion 0.1.2
*/
router.put('/:id', controladorBenefactor.editarBenefactor);

/*
	@api {delete} /api/benefactores/:id
	@apiDescription Elimina a un benefactor de la base de datos
	@apiGroup Benefactor
	@apiName eliminarBenefactor
	@apiVersion 0.1.2
*/
router.delete('/:id', controladorBenefactor.eliminarBenefactor);

module.exports = router;