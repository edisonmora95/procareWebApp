var express = require('express');
var router = express.Router();

router.get('/formacion', function(req, res, next){
	res.render('asistencias/subirAsistenciasFormacion');
});

router.get('/accion', function(req, res, next){
	res.render('../procareApp/views/asistencias/accion/subirAsistenciasAccion');
})

module.exports = router;
