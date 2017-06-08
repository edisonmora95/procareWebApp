var express = require('express');
var router = express.Router();
//Create grupo
//Responde con la página
router.get('/nuevo', function(req, res, next){
	res.render('grupo/crearGrupo');
});
//Post del grupo. API
router.post('/nuevo', function(req, res ,next){

});

//Read grupo
//Responde con la página
router.get('/', function(req, res, next){
	res.render('grupo/buscarGrupo');
});

router.get('/:id', function(req, res, next){
	res.render('grupo/verGrupo');
});

module.exports = router;