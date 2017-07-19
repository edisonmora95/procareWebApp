var controladorProcarianoGrupo = require('../../controllers/procarianogrupo');
var express = require('express');
var router = express.Router();

//Añadir varios procarianos a un grupo
router.post('/', controladorProcarianoGrupo.anadirProcarianosAGrupo);
//Obtener el grupo del procariano
router.get('/:id_procariano', controladorProcarianoGrupo.obtenerGrupoDeProcariano);
//Cambiar a un procariano de un grupo
router.put('/:id_procariano', controladorProcarianoGrupo.cambiarDeGrupo);

module.exports = router;
