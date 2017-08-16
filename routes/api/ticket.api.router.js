/*
@Descripcion: Api de Club por ti
@Autor: Luis Lainez
@FechaCreacion: 14/07/2017
@UltimaFechaModificacion: 12/08/2017 @erialper Corrige las rutas

*/
var controladorticket= require('../../controllers/ticket')
var express = require('express');
var router = express.Router();

//Post de ticket
router.post('/nuevo', controladorticket.crearTicket);

//Read ticket
router.get('/procariano/:id', controladorticket.mostrarTicketProcariano);

//Update ticket
router.put('/:id', controladorticket.editarTicket);

//Delete ticket
router.delete('/:id', controladorticket.eliminarTicket);

//Delete ticket(no ganadores)
router.delete('/todos/noGanadores', controladorticket.eliminarNoGanadores);

//Read ticket(solo ganadores)
router.get('/ganadores', controladorticket.mostrarGanadores);

module.exports = router;
