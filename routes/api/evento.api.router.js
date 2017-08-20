/*
	CRUD de Eventos
*/
var controladorEvento = require('../../controllers/evento.controller')
var express = require('express');
var router = express.Router();

//Post de la Evento
router.post('/', controladorEvento.crearEvento);

//Read Evento
//router.get('/', controladorEvento.mostrarEvento);

router.get('/', controladorEvento.mostrarEventos);

//Update Evento
router.put('/:id', controladorEvento.editarEvento);

//Delete Evento
router.delete('/:id', controladorEvento.eliminarEvento);


module.exports = router;