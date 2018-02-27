/*
	@Descripcion: Ventanas de Niño de Procare Acción
	@Autor: @edisonmora95
	@FechaCreacion: 28/12/2017
	@UltimaFechaModificacion: 
*/

'use strict';
const express = require('express');
const router  = express.Router();

const authViews 	= require('../../utils/authentication.views');

router.use(authViews.usuario);

/*
	@Descripción:
		Responde con la página de ingreso de niño
	@Permisos:
		Usuario
		Personal
*/
router.get('/nuevo', authViews.verifyRolView(['Personal', 'Admin']), function(req, res){
	res.render('nino_accion/ingresarNino');
});

module.exports = router;