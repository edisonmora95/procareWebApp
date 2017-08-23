var controlador = require('../../controllers/animador.controller');
var express = require('express');
var router = express.Router();

router.post('/', controlador.crearAnimadorAPartirDeProcarianoYAgregarAGrupo);
router.get('/', controlador.mostrarProcarianosPosiblesAnimadores);
router.get('/:id_animador', controlador.obtenerGrupoDeAnimador);
//router.get('/', controlador.mostrarAnimadores);


module.exports = router;