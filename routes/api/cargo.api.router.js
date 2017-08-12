/*
@Descripcion: Rutas para comunicarse con el controlador de Cargos
@Autor: erialper
@FechaCreacion: 29/07/2017
@UltimaFechaModificacion: @erialper 12/08/2017 Se eliman rutas a cargosFormación y cargosFundación
*/
var controladorCargo = require('../../controllers/cargo')
var express = require('express');
var router = express.Router();

//Post persona-cargoFormacion
router.post('/directorF', controladorCargo.asignarDirectorFormacion);

module.exports = router;
