/*
	CRUD de Tareas
*/
var controladorTarea = require('../../controllers/tarea')
var express = require('express');
var router = express.Router();

//Post de la Tareas
router.post('/', controladorTarea.crearTarea);

//Read Tareas

//router.get('/', controladorTarea.mostrarTareas);


/*
router.get('/', controladorTarea.mostrarTarea);
*/

//Update Tareas
router.put('/:id', controladorTarea.editarTarea);

//Delete Tareas
router.delete('/:id', controladorTarea.eliminarTarea);


module.exports = router;


//mostrar tareas de todos (para el personal)
router.get('/', controladorTarea.mostrarTareas);

//mostrar tareas del usuario
router.get('/:id', controladorTarea.mostrarTareaPorUsuario);


module.exports = router;