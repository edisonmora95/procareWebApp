/*
	CRUD de Centros
*/
var controladorCentro = require('../../controllers/centro')
var express = require('express');
var router = express.Router();

//Post de la Centros
router.post('/nuevo', controladorCentro.crearCentro);
//Post de la Centros

//Update Centros
router.put('/:id', controladorCentro.editarCentro);

//Delete Centros
router.delete('/:id', controladorCentro.eliminarCentro);


module.exports = router;