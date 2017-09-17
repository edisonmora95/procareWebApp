var express = require('express');
var router = express.Router();

router.get('/formacion', function(req, res, next){
	res.render('asistencias/subirAsistenciasFormacion');
});

router.get('/buscar', function(req, res, next){
	res.render('asistencias/verAsistencias');
});


module.exports = router;
