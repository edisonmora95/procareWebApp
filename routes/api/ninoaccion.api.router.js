/*
@Descripcion: Api de Nino de Accion
@Autor: Luis Lainez
@FechaCreacion: 29/07/2017
@UltimaFechaModificacion: 29/07/2017

*/
var controladorNinoAccion= require('../../controllers/ninoaccion')
var express = require('express');
var router = express.Router();

//Post de Nino de Accion
router.post('/nuevo', controladorNinoAccion.crearNinoAccion);

//Busqueda Nino de Accion
router.get('/:id', controladorNinoAccion.buscarNinoAccion);

//Busqueda por Id Nino de Accion
router.get('/:id', controladorNinoAccion.buscarNinoAccionPorId);

//Update Nino de Accion
router.put('/:id', controladorNinoAccion.editarNinoAccion);

//Delete Nino Accion
router.delete('/:id', controladorNinoAccion.eliminarNinoAccion);


module.exports = router;
