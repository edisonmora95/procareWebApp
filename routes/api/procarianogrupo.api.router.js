var controladorProcarianoGrupo = require('../../controllers/procarianogrupo');
var express = require('express');
var router = express.Router();

router.post('/', controladorProcarianoGrupo.anadirProcarianoAGrupo);

module.exports = router;
