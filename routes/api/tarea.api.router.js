/*
	CRUD de Tareas
*/
var controladorTarea = require('../../controllers/tarea')
var express = require('express');
var router = express.Router();

//Post de la Tareas
router.post('/nuevo', controladorTarea.crearTarea);

//Read Tareas
<<<<<<< HEAD
router.get('/', controladorTarea.mostrarTarea);

=======
/*
router.get('/', controladorTarea.mostrarTarea);
*/
>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149

//Update Tareas
router.put('/:id', controladorTarea.editarTarea);

//Delete Tareas
router.delete('/:id', controladorTarea.eliminarTarea);

<<<<<<< HEAD
module.exports = router;
=======
//mostrar tareas de todos (para el personal)
router.get('/', controladorTarea.mostrarTareas);

//mostrar tareas del usuario
router.get('/:id', controladorTarea.mostrarTareaPorUsuario);

module.exports = router;
>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149
