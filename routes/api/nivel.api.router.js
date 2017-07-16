/*
	CRUD de Nivel
*/
var controladorNivel = require('../../controllers/nivel')
var express = require('express');
var router = express.Router();

//Post de la Nivel
router.post('/nuevo', controladorNivel.crearNivel);

//Read Nivel


router.get('/', controladorNivel.mostrarNivel);


/*
router.get('/', controladorTarea.mostrarTarea);
*/

//Update Nivel
router.put('/:id', controladorNivel.editarNivel);

//Delete Nivel
router.delete('/:id', controladorNivel.eliminarNivel);


module.exports = router;


//mostrar Nivel de todos (para el personal)
router.get('/', controladorNivel.mostrarNivel);

//mostrar Nivel del usuario
router.get('/:id', controladorNivel.mostrarNivelPorUsuario);


module.exports = router;

