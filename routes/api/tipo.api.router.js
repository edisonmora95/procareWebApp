/*
	CRUD de Tipo
*/

const authApi	  		  = require('../../utils/authentication.api');
const controladorTipo = require('../../controllers/tipo.controller')
const express         = require('express');
const router          = express.Router();

router.use(authApi.verifyToken);

//Post de la etapa
router.post('/nuevo', controladorTipo.crearTipo);

/*
	*@api {get} /api/tipo/
	*@apiPermission Usuario | Personal | Admin
	*@apiDescription Devuelve todos los tipos de la base de datos
	*@apiGroup Tipo
	*@apiName mostrarTipo
	*@apiversion 0.2.0
	*@apiSuccess {Object[]} tipos lista de todos las tipos
*/
router.get('/', authApi.verifyRol(['Personal']), controladorTipo.mostrarTipo);

//Update etapa
router.put('/:id', controladorTipo.editarTipo);

//Delete etapa
router.delete('/:id', controladorTipo.eliminarTipo);

//Asignar etapa
//router.post('/asignar', controladorTipo.asignarTipo);


module.exports = router;
