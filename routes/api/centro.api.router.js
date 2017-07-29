/*
	CRUD de Centros
*/
var controladorCentro = require('../../controllers/centro')
var express = require('express');
var router = express.Router();

//Post de la Centros
router.post('/nuevo', controladorCentro.crearCentro);

//Read Centros


router.get('/', controladorCentro.mostrarCentro);


/*
router.get('/', controladorTarea.mostrarTarea);
*/

//Update Centros
router.put('/:id', controladorCentro.editarCentro);

//Delete Centros
router.delete('/:id', controladorCentro.eliminarCentro);


module.exports = router;


//mostrar Centros de todos (para el personal)
router.get('/', controladorCentro.mostrarCentro);

//mostrar Centros del usuario
router.get('/:id', controladorCentro.mostrarCentroPorUsuario);


module.exports = router;

