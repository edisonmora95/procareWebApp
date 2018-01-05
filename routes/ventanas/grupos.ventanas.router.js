'use strict';
const express 		= require('express');
const router  		= express.Router();
const authViews 	= require('../../utils/authentication.views');

router.use(authViews.usuario);

/*
	@Descripción:
		Responde con la página de ingreso de grupo
	@Permisos:
		Usuario
		Personal
*/
router.get('/nuevo', authViews.verifyRolView(['Personal', 'Admin']), function(req, res, next){
	res.render('grupo/crearGrupo');
});

/*
	@Descripción:
		Responde con la página de búsqueda de grupos
	@Permisos:
		Usuario
		Personal | Director ejecutivo | Director de Procare Formación
*/
router.get('/', authViews.verifyRolView(['Personal', 'Admin']), function(req, res, next){
	res.render('grupo/buscarGrupo');
});

/*
	@Descripción:
		Responde con la página de perfil del grupo
	@Permisos:
		Usuario
*/
router.get('/:id', function(req, res, next){
	res.render('grupo/verGrupo');
});

router.get('/:id/editar', authViews.verifyRolView(['Personal', 'Admin']), function(req, res, next){
	res.render('grupo/editarGrupo');
});

module.exports = router;