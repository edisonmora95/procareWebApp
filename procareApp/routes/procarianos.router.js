/*
	CRUD de procarianos
*/
var express = require('express');
var router = express.Router();

//Create procariano
//Responde con la página
router.get('/nuevo', function(req, res, next){
	res.render('procariano/ingresarProcariano');
});
//Post del procariano
router.post('/nuevo', function(req, res, next){

});

//Read procariano
//Responde con la página
router.get('/', function(req, res, next) {
  res.render('procariano/buscarProcariano');
});
//Responde con los procarianos encontrados
router.get('/buscar', function(req, res, next){

});
//Responde con la ventana del procariano indicado
router.get('/:id', function(req, res, next){
	res.render('procariano/verProcariano');
});

//Update procariano
//Responde con un status indicando si se pudo actualizar o no
router.put(':id', function(req, res, next){

});

//Delete procariano
//Responde con un status indicando si se pudo eliminar o no
router.delete(':id', function(req, res, next){

});

module.exports = router;
