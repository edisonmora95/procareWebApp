/*
	CRUD de Donacion
  
*/

var controladorDonacion = require('../../controllers/donacion')
var express = require('express');
var router = express.Router();

//Post de la Tareas
router.post('/nuevo', controladorDonacion.Donacion);

//Read Tareas
router.get('/', controladorDonacion.mostrarDonacion);


//Update Tareas
router.put('/:id', controladorDonacion.editarDonacion);

//Delete Tareas
router.delete('/:id', controladorDonacion.eliminarDonacion);

module.exports = router;
