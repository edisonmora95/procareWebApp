var controladorProcarianoGrupo = require('../../controllers/procarianogrupo');
var express = require('express');
var router = express.Router();

router.post('/', controladorProcarianoGrupo.anadirProcarianosAGrupo);

module.exports = router;
