'use strict';
const express = require('express');
const router  = express.Router();

const authViews = require('../../utils/authentication.views');

router.use(authViews.usuario);

router.get('/formacion', authViews.verifyRolView(['Personal', 'Admin']), function(req, res){
	res.render('asistencias/subirAsistenciasFormacion');
});

router.get('/accion', authViews.verifyRolView(['Personal', 'Admin']), function(req, res){
	res.render('../procareApp/views/asistencias/accion/subirAsistenciasAccion');
}); 
 
module.exports = router;
