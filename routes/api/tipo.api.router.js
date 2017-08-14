/*
	CRUD de Tipo
*/
var controladorTipo = require('../../controllers/tipo.controller')
var express = require('express');
var router = express.Router();

//Post de la etapa
router.post('/nuevo', controladorTipo.crearTipo);

//Obtiene todos los tipos de procariano de la base de datos
router.get('/', controladorTipo.mostrarTipo);


//Update etapa
router.put('/:id', controladorTipo.editarTipo);

//Delete etapa
router.delete('/:id', controladorTipo.eliminarTipo);

//Asignar etapa
//router.post('/asignar', controladorTipo.asignarTipo);

module.exports = router;
