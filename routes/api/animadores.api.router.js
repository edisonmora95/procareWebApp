var controlador = require('../../controllers/animador');
var express = require('express');
var router = express.Router();

router.post('/', controlador.crearAnimadorAPartirDeProcarianoYAgregarAGrupo);
router.get('/', controlador.mostrarProcarianosPosiblesAnimadores);
router.get('/', controlador.mostrarAnimadores);

module.exports = router;