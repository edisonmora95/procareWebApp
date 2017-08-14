var controladorGrupo = require('../../controllers/grupo.controller');
var express = require('express');
var router = express.Router();

//Creación de registro de grupo
router.post('/', controladorGrupo.crearGrupo);
//Obtiene todos los grupos
router.get('/', controladorGrupo.mostrarGrupos);

router.get('/:id_grupo', controladorGrupo.obtenerGrupoPorId);

router.put('/:id_grupo', controladorGrupo.editarGrupo);

module.exports = router;