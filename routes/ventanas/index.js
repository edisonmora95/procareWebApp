var express = require('express');
var router = express.Router();

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
