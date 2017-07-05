/*
	CRUD de Eventos
*/
var controladorEvento = require('../../controllers/evento')
var express = require('express');
var router = express.Router();

//Post de la Evento
router.post('/nuevo', controladorEvento.crearEvento);

//Read Evento
router.get('/', controladorEvento.mostrarEvento);


//Update Evento
router.put('/:id', controladorEvento.editarEvento);

//Delete Evento
router.delete('/:id', controladorEvento.eliminarEvento);


module.exports = router;

module.exports = router;

