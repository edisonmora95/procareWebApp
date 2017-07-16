/*

@Descripcion: Api del login
@Autor: jose viteri
@FechaCreacion: 19/06/2017
<<<<<<< HEAD
<<<<<<< HEAD
@UltimaFechaModificacion: --
=======
@UltimaFechaModificacion: 03/07/2017 //solucionado problema sesiones

=======
@UltimaFechaModificacion: 03/07/2017 //solucionado problema sesiones
>>>>>>> d1aba19f25bbe92b0dbcbd0f516fa2bc7511a9d5


*/


var express = require('express');
var router = express.Router();
var modelos = require('../../models');



router.get('/api/loginFalla', function(req,res,next){
router.get('/loginFalla', function(req,res,next){


router.get('/loginFalla', function(req,res,next){

	let objeto = {
		status : false,
		message : "algo paso"
	}
	res.json(objeto);


})


});


});


router.get('/usuarios', function(req, res, next){
  var rolesTemp = req.user[0].dataValues.Rols;
  var lista = [];
  for ( var i = 0 ; i < rolesTemp.length ; i++){
    lista.push(rolesTemp[i].dataValues.nombre);
  }
  	var json = {
  		status : true,
  		nombre : req.user[0].dataValues.nombres,
  		apellidos : req.user[0].dataValues.apellidos,
  		correo : req.user[0].dataValues.email, 
  		roles : lista
  	}

  	res.json(json);
});


module.exports = router;


module.exports = router;

