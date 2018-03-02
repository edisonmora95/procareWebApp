const ControllerAnimador = require('../../controllers/animador.controller');
const authApi	  	= require('../../utils/authentication.api'); 

const express = require('express');
const router  = express.Router();

router.use(authApi.verifyToken);


/**
	*	@api {get} /api/animadores/posibles	Mostrar Posbles Animadores
	*	@apiDescription Devuelve a los Procarianos que pueden ser Animadores.
		Estos son:
			* Procarianos que no son Chicos de Formación.
			*	Procarianos que no son animadores de otros grupos actualmente.
	*	@apiGroup Animadores
	*	@apiName posiblesAnimadores
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Busqueda exitosa'
	*	@apiSuccess {Object[]} datos Lista de animadores
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/posibles', authApi.verifyRol(['Personal', 'Admin']), ControllerAnimador.posiblesAnimadores)

router.post('/', ControllerAnimador.crearAnimadorAPartirDeProcarianoYAgregarAGrupo);
//router.get('/', controlador.mostrarProcarianosPosiblesAnimadores);
router.get('/:id_animador', ControllerAnimador.obtenerGrupoDeAnimador);
//router.get('/', controlador.mostrarAnimadores);


module.exports = router;