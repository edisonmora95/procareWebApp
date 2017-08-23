/*
@Descripcion: Api de Nino de Accion
@Autor: Luis Lainez
@FechaCreacion: 29/07/2017
@UltimaFechaModificacion: 12/08/2017 @erialper Corrige las rutas
*/

var controladorNinoAccion= require('../../controllers/ninoaccion')
var express = require('express');
var router = express.Router();

//Post de Nino de Accion
router.post('/nuevo', controladorNinoAccion.crearNinoAccion);

//Update Nino de Accion
router.put('/:id', controladorNinoAccion.editarNinoAccion);

//Delete Nino Accion
router.delete('/:id', controladorNinoAccion.eliminarNinoAccion);

//Busqueda Nino de Accion
router.get('/', controladorNinoAccion.buscarNinoAccion);

//Busqueda por Id Nino de Accion
router.get('/:id', controladorNinoAccion.buscarNinoAccionPorId);


module.exports = router;
