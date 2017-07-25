var controladorGrupo = require('../../controllers/grupo');
var express = require('express');
var router = express.Router();

//Creación de registro de grupo
router.post('/', controladorGrupo.crearGrupo);
//Obtiene todos los grupos
router.get('/', controladorGrupo.mostrarGrupos);

router.get('/:id_grupo', controladorGrupo.obtenerGrupoPorId);

module.exports = router;