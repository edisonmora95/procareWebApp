/*

@Descripcion: Api del login
@Autor: jose viteri
@FechaCreacion: 19/06/2017
@UltimaFechaModificacion: 28/06/2017 //agregado para obtener usuarios


*/


var express = require('express');
var router = express.Router();
var modelos = require('../../models');

router.get('/loginFalla', function(req,res,next){
	let objeto = {
		status : false,
		message : "algo paso"
	}
	res.json(objeto);
});

router.get('/usuarios', function(req, res, next){
	console.log("este es el usuario");
	console.log(req.user.nombres);
	console.log("estos son los usuarios");
	/*
	console.log(req.user.Rols);
  	var rols = req.user.Rols;
  	console.log(req.user.Rols[0].nombre)
  	var rolsJson = [];
  	for (i = 0 ; i< rols.length ; i++){
  		rolsJson.push(rols[i].nombre);
  	}
  	*/
  	var json = {
  		status : true,
  		nombre : req.user.nombres,
  		apellidos : req.user.apellidos,
  		correo : req.user.email/*, 
  		rols : rolsJson*/
  	}

  	res.json(json);
});

module.exports = router;