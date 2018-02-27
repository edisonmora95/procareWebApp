/*
	CRUD de Etapas
*/
'use strict';
const controladorEtapa = require('../../controllers/etapa.controller');
const authApi	  		   = require('../../utils/authentication.api'); 
const express = require('express');
const router  = express.Router();


router.use(authApi.verifyToken);

/**
	*	@api {get} /api/etapas/	Mostrar Etapas
	*	@apiDescription Obtiene todas las etapas de la base de datos
	*	@apiGroup Etapa
	*	@apiName mostrarEtapa
	*	@apiversion 0.3.0
	*	@apiPermission Usuario | Personal | Admin
	*	@apiHeader {String} x-access-token JWT
	*	@apiSuccess {Boolean} estado True
	*	@apiSuccess {String} mensaje 'Busqueda exitosa'
	*	@apiSuccess {Object[]} datos Etapas
	*	@apiError (ERROR_SERVIDOR) {Boolean} estado	False
	*	@apiError (ERROR_SERVIDOR) {String}  mensaje	'Error en el servidor'
	*	@apiError (ERROR_SERVIDOR) {Object}  error		Descripción del error ocurrido.
*/
router.get('/', authApi.verifyRol(['Personal']), controladorEtapa.mostrarEtapa);

//Asignar etapa
//router.post('/asignar', controladorEtapa.asignarEtapa);


module.exports = router;