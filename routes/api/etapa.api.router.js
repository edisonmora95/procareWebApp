/*
	CRUD de Etapas
*/
var controladorEtapa = require('../../controllers/etapa.controller')
var express = require('express');
var router = express.Router();

//Crear las etapas
router.post('/nuevo', controladorEtapa.crearEtapa);

//Ver las etapas
router.get('/', controladorEtapa.mostrarEtapa);

//Modificar una etapa
router.put('/:id', controladorEtapa.editarEtapa);

//Eliminar una etapa
router.delete('/:id', controladorEtapa.eliminarEtapa);

//Asignar etapa
router.post('/asignar', controladorEtapa.asignarEtapa);


module.exports = router;
