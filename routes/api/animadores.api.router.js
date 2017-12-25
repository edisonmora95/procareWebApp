const controlador = require('../../controllers/animador.controller');
const authApi	  	= require('../../utils/authentication.api'); 

const express = require('express');
const router  = express.Router();

router.use(authApi.verifyToken);

router.get('/posibles', authApi.verifyRol(['Personal', 'Admin']), controlador.posiblesAnimadores)
router.post('/', controlador.crearAnimadorAPartirDeProcarianoYAgregarAGrupo);
//router.get('/', controlador.mostrarProcarianosPosiblesAnimadores);
router.get('/:id_animador', controlador.obtenerGrupoDeAnimador);
//router.get('/', controlador.mostrarAnimadores);


module.exports = router;