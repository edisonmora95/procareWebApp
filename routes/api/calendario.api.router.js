var controladorCalendario = require('../../controllers/calendario.controller');
var express = require('express');
var router = express.Router();

router.get('/', controladorCalendario.mostrarCalendario);

router.get('/usuario/:id_responsable', controladorCalendario.mostrarCalendarioUsuario);

module.exports = router;