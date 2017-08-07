var controladorPersonal = require('../../controllers/personal.controller');
var express = require('express');
var router = express.Router();
var utils = require('../../utils/utils');

//Entrega todos los miembros del personal
router.get('/', controladorPersonal.obtenerTablaPersonal);
//Crea un nuevo miembro del personal
router.post('/', utils.generarHash , controladorPersonal.crearPersonal);

router.get('/:id',controladorPersonal.obtenerPersonalIndependiente);

router.delete('/:id', controladorPersonal.eliminarPersonal);

router.put('/:id', controladorPersonal.editarPersonal);


module.exports = router;
