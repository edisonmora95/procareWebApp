/*
	CRUD de Etapas
*/
var controladorCargo = require('../../controllers/cargo.controller')
var express = require('express');
var router = express.Router();

//Post del cargo formacion
router.post('/aFormacion', controladorCargo.crearCargoFormacion);

//Post del cargo fundacion
router.post('/aFundacion', controladorCargo.crearCargoFundacion);


//post persona-cargoFormacion
router.post('/pFormacion', controladorCargo.asignarCargoFormacion);

module.exports = router;
