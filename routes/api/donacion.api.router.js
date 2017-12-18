/*
	CRUD de Donacion
  
*/
var controladorDonacion = require('../../controllers/donacion.controller')
var express = require('express');
var router = express.Router();

//Post de la donación
router.post('/nuevo', controladorDonacion.crearDonacion);

//Read donación
router.get('/', controladorDonacion.mostrarDonacion);


//Update donación
router.put('/:id', controladorDonacion.editarDonacion);

//Delete donación
router.delete('/:id', controladorDonacion.eliminarDonacion);


module.exports = router;
