var controladorProcarianoGrupo = require('../../controllers/procarianogrupo.controller');
const authApi	  							 = require('../../utils/authentication.api'); 
var express = require('express');
var router = express.Router();

router.use(authApi.verifyToken);

//Añadir varios procarianos a un grupo
router.post('/', controladorProcarianoGrupo.anadirProcarianosAGrupo);
//Obtener el grupo del procariano
router.get('/:id_procariano', controladorProcarianoGrupo.obtenerGrupoDeProcariano);
//Cambiar a un procariano de un grupo
router.put('/:id_procariano',  authApi.verifyRol(['Personal']), controladorProcarianoGrupo.cambiarDeGrupo);

router.post('/anadir', controladorProcarianoGrupo.anadirProcarianoAGrupo);

router.put('/quitar/:id_procariano', controladorProcarianoGrupo.eliminarProcarianoDeGrupo);


module.exports = router;
