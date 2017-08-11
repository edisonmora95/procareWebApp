var controladorCalendario = require('../../controllers/calendario.controller');
var express = require('express');
var router = express.Router();

router.get('/', controladorCalendario.mostrarCalendario);

module.exports = router;