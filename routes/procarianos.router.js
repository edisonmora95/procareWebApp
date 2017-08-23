/*
	CRUD de procarianos
*/
var controladorProcariano = require('../controllers/procariano')
var express = require('express');
var router = express.Router();
var utils = require('../utils/utils')

//Create procariano
//Responde con la página
router.get('/nuevo',  function(req, res, next){
	res.render('procariano/ingresarProcariano');
});
//Post del procariano
router.post('/nuevo', utils.generarHash , controladorProcariano.crearProcariano);

//Read procariano
//Responde con la página
router.get('/', function(req, res, next) {
  res.render('procariano/buscarProcariano');
});

//Responde con los procarianos encontrados
router.get('/buscar', controladorProcariano.buscarProcariano);

//Responde con la ventana del procariano indicado
router.get('/api/:id', controladorProcariano.buscarProcarianoPorId);

//Update procariano
//Responde con un status indicando si se pudo actualizar o no
router.put('/api/:id', controladorProcariano.editarProcariano);

//Delete procariano
//Responde con un status indicando si se pudo eliminar o no
router.delete('/api/:id', controladorProcariano.eliminarProcariano);


module.exports = router;
