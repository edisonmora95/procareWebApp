/*
	CRUD de Etapas
*/
const controladorEtapa = require('../../controllers/etapa.controller')
const authApi	  		   = require('../../utils/authentication.api'); 
const express = require('express');
const router  = express.Router();


router.use(authApi.verifyToken);

/*
	*@api {post} /api/etapa/
	*@apiDescription Crea el registro de Etapa en la base de datos
	*@apiGroup Etapa
	*@apiName crearEtapa
	*@apiversion 0.2.0
	*@apiPermission Usuario | Admin
*/
router.post('/nuevo', authApi.verifyRol(['Admin']), controladorEtapa.crearEtapa);

/*
	*@api {get} /api/etapa/
	*@apiDescription Obtiene todas las etapas de la base de datos
	*@apiGroup Etapa
	*@apiName mostrarEtapa
	*@apiversion 0.2.0
	*@apiPermission Usuario | Admin | Personal
*/
router.get('/', authApi.verifyRol(['Personal']), controladorEtapa.mostrarEtapa);

/*
	*@api {put} /api/etapa/
	*@apiDescription Modifica el registro de Etapa en la base de datos
	*@apiGroup Etapa
	*@apiName editarEtapa
	*@apiversion 0.2.0
	*@apiPermission Usuario | Admin
*/
router.put('/:id', authApi.verifyRol(['Admin']), controladorEtapa.editarEtapa);

/*
	*@api {delete} /api/etapa/
	*@apiDescription Elimina el registro de Etapa en la base de datos
	*@apiGroup Etapa
	*@apiName eliminarEtapa
	*@apiversion 0.2.0
	*@apiPermission Usuario | Admin
*/
router.delete('/:id', authApi.verifyRol(['Admin']), controladorEtapa.eliminarEtapa);

//Asignar etapa
router.post('/asignar', controladorEtapa.asignarEtapa);


module.exports = router;