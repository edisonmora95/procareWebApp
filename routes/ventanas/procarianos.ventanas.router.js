/*
	@Descripcion: Ventanas del procariano
	@Autor: jose viteri
	@FechaCreacion: 20/05/2017
	@UltimaFechaModificacion: 17/08/2017 @edisonmora - Autenticación de rutas
*/

'use strict';

const express = require('express');
const router = express.Router();

const authViews 	= require('../../utils/authentication.views');

router.use(authViews.usuario)
/*
	@Descripción:
		Responde con la página de ingreso de procarianos
	@Permisos:
		Usuario
		Personal
*/
router.get('/nuevo', authViews.verifyRolView(['Personal', 'Admin']), function(req, res){
	res.render('procariano/ingresarProcariano');
});

/*
	@Descripción:
		Responde con la página de búsqueda de procarianos
	@Permisos:
		Usuario
		Personal | Director ejecutivo | Director de Procare Formación
*/
router.get('/', authViews.verifyRolView(['Personal', 'Admin']), function(req, res) {
  res.render('procariano/buscarProcariano');
});

/*
	@Descripción:
		Responde con la página de perfil del procariano
	@Permisos:
		Usuario
		Personal | Director ejecutivo | Director de Procare Formación: solo si es alguien de Procare o PM | Animador: solo si es suyo o de su grupo
*/
router.get('/perfil/:id', authViews.verifyRolView(['Personal', 'Admin']), function(req, res){
	res.render('procariano/verProcariano');
});

/*
	@Descripción:
		Responde con la página de edición de información de Procariano
	@Permisos:
		Usuario
		Personal | Director ejecutivo | Director de Procare Formación: solo si es alguien de Procare o PM | Animador: solo si es suyo o de su grupo
*/
router.get('/perfil/:id/editar', authViews.verifyRolView(['Personal', 'Admin']), function(req, res){
	res.render('procariano/editarProcariano');
});

module.exports = router;
