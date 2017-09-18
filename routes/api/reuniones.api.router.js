var controladorReunionGrupo = require('../../controllers/reunion.controller');
var express = require('express');
var router = express.Router();

//Creación de las reuniones
router.post('/formacion', controladorReunionGrupo.crearReunion);

//Añadir los  procarianos ausentes a la reunion
router.post('/ausentes', controladorReunionGrupo.anadirProcarianosAReunion);

//Obtiene todas las reuniones de los grupo
router.get('/', controladorReunionGrupo.obtenerReuniones);

router.get('/:id', controladorReunionGrupo.obtenerReunionPorId);

router.delete('/:id', controladorReunionGrupo.eliminarReunion);

//router.put('/:id_grupo', controladorReunionGrupo.editarGrupo);


module.exports = router;