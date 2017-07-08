/*
@Descripcion: Api del procariano
@Autor: jose viteri
@FechaCreacion: 25/05/2017
@UltimaFechaModificacion: 05/06/2017 @EdisonMora (se lo puso bonito)
*/


/* jshint node: true */
'use strict';

var controladorProcariano = require('../../controllers/procariano');
var express = require('express');
var router = express.Router();
var utils = require('../../utils/utils');

//API

//Post del procariano
router.post('/', utils.generarHash,controladorProcariano.crearProcariano);

//Responde con los procarianos encontrados.
//Esta es la búsqueda en general.
router.get('/', controladorProcariano.buscarProcariano);

//Responde con la información del procariano indicado
//Esto es usado para ver el perfil del Procariano
router.get('/:id', controladorProcariano.buscarProcarianoPorId);

//Update procariano
//Responde con un status indicando si se pudo actualizar o no
router.put('/:id', controladorProcariano.editarProcariano);

//Delete procariano
//Responde con un status indicando si se pudo eliminar o no
router.delete('/:id', controladorProcariano.eliminarProcariano);

module.exports = router;