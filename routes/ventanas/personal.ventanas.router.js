
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('personal/buscarPersonal');
	
});

router.get('/nuevo', function(req,res,next){
	res.render('personal/ingresarPersonal')
})

router.get('/perfil/:cedula', function(req, res){
	res.render('personal/verPersonal');
});

module.exports = router;
