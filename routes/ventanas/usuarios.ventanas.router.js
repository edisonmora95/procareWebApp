var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('usuarios/verTodos');
});

router.get('/editarUsuarios',function(req,res,next){
	res.render('usuarios/editarUsuarios')
});

module.exports = router;
