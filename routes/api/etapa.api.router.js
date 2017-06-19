/*
	CRUD de Etapas
*/
var controladorEtapa = require('../controllers/etapa')
var express = require('express');
var router = express.Router();

//Post de la etapa
router.post('/nuevo', controladorEtapa.crearEtapa);

//Read etapa
router.get('/', controladorEtapa.mostrarEtapa);


//Update etapa
router.put('/:id', controladorEtapa.editarEtapa);

//Delete etapa
router.delete('/:id', controladorEtapa.eliminarEtapa);

module.exports = router;
