/*
	CRUD de Eventos
*/
var controladorEvento = require('../../controllers/evento.controller')
var express = require('express');
var router = express.Router();

//Post de la Evento
router.post('/', controladorEvento.crearEvento);

//Read Evento

router.get('/', controladorEvento.mostrarEventos);

//router.get('/', controladorEvento.mostrarEvento);

//Update Evento
router.put('/:id', controladorEvento.editarEvento);

//Delete Evento
router.delete('/:id', controladorEvento.eliminarEvento);

router.put('/cambiarEstado/:id', controladorEvento.cambiarEstado);

module.exports = router;
