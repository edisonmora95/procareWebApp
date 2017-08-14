/*
@Descripcion: Api del procariano
@Autor: jose viteri
@FechaCreacion: 25/05/2017
@UltimaFechaModificacion: 05/06/2017 @EdisonMora (se lo puso bonito)
*/


/* jshint node: true */
'use strict';

var controladorBenefactor = require('../../controllers/benefactor');
var express = require('express');
var router = express.Router();
var utils = require('../../utils/utils');

//API
 
//Post del procariano
router.post('/', utils.generarHash,controladorBenefactor.crearBenefactor);

//Responde con los procarianos encontrados.
//Esta es la búsqueda en general.
router.get('/', controladorBenefactor.buscarBenefactor);

//Responde con la información del procariano indicado
//Esto es usado para ver el perfil del Procariano
router.get('/:id', controladorBenefactor.buscarProcarianoPorId);

//Update procariano
//Responde con un status indicando si se pudo actualizar o no
router.put('/:id', controladorBenefactor.editarProcariano);

//Delete procariano
//Responde con un status indicando si se pudo eliminar o no
router.delete('/:id', controladorBenefactor.eliminarProcariano);

module.exports = router;