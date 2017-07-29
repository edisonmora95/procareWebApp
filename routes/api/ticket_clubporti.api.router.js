/*
@Descripcion: Api de Club por ti
@Autor: Luis Lainez
@FechaCreacion: 14/07/2017
@UltimaFechaModificacion: 14/07/2017

*/
var controladorticket= require('../../controllers/ticket_clubporti')
var express = require('express');
var router = express.Router();

//Post de ticket
router.post('/nuevo', controladorticket.crearTicket);

//Read ticket
router.get('/', controladorticket.mostrarTicket);

//Update ticket
router.put('/:id', controladorticket.editarTicket);

//Delete ticket
router.delete('/:id', controladorticket.eliminarTicket);

//Delete ticket(no ganadores)
router.delete('/:id', controladorticket.eliminarNoGanadores);

//Read ticket(solo ganadores)
router.get('/:id', controladorticket.mostrarGanadores);

module.exports = router;
