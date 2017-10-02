var express = require('express');
var router = express.Router();
let autenticacion = require('./../../utils/authentication');

// middleware that is specific to this router
/*router.use(function timeLog(req, res, next) {
  console.log('Fecha: ', new Date().toString());
  next();
});*/

/*
	@Permisos:
		Usuario
*/

//router.use(autenticacion.usuario)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('calendario/index');
});

router.get('/tarea/', function(req, res, next){
	res.render('calendario/tareaNueva');
});

router.get('/evento/', function(req, res, next){
	res.render('calendario/eventoNuevo');
});

module.exports = router;