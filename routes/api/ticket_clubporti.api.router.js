/*
	CRUD de Club Por Ti
*/
var controladorticket= require('../../controllers/ticket_clubporti')
var express = require('express');
var router = express.Router();

//Post de la etapa
router.post('/nuevo', controladorticket.crearTicket);

//Read etapa
router.get('/', controladorticket.mostrarTicket);


//Update etapa
router.put('/:id', controladorticket.editarTicket);

//Delete etapa
router.delete('/:id', controladorticket.eliminarTicket);

module.exports = router;
