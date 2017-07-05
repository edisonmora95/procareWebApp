
/*
@Descripcion: esta es la ventana del login , implementa passport para hacerlo
@Autor: jose viteri
@FechaCreacion: 14/06/2017
@UltimaFechaModificacion: 16/06/2017 @JoseViteri

*/

<<<<<<< HEAD

=======
var controladorLogin = require('../../controllers/login.controller')
var utils = require('../../utils/utils');
>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var modelos = require('../../models');


<<<<<<< HEAD
//estrategia local, compara contraseña y usuario, ademas genera el req.user
=======
//estartegia local, compara contraseña y usuario, ademas genera el req.user
>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149
passport.use(new LocalStrategy({
	usernameField : 'correo',
	passwordField : 'password'
},
function(correo, password, done) {
	console.log('entra aqui passport');
	modelos.Persona.find({
  	  attributes: ['id','contrasenna','nombres','apellidos','email'],
  	  where : {
  	  	email : correo
  	  },
	  include: [{
	    model: modelos.Rol,
	    through: {
	      attributes: ['RolNombre'],
	    }
	  }]
	}).then( persona => {
		var roles = persona.Rols
		console.log({
			estaPersona : persona,
			roles : roles
		})
		isMatch = modelos.Persona.compararContrasenna(password, persona.contrasenna, done , persona);
	}).catch( err => {
		console.log('no existe usuario')
		console.log(err);
		return done(null, false, { status : false , message : "usuario no existe"});
	})
 }));


//serializador de passport
passport.serializeUser(function(persona, done) {
  done(null, persona.id);
});


//desarializador de passport
passport.deserializeUser(function(id, done) {
  modelos.Persona.findAll({
  	  attributes: ['id','nombres','apellidos','email'],
  	  where : {
  	  	id : id
  	  },
	  include: [{
	    model: modelos.Rol,
	    through: {
	      attributes: ['RolNombre'],
	    }
	  }]
  }).then( persona => {

  	done(null, persona);
  }).catch( err => {
  	done(err, null);
  })
});


//post del login, manda un json si la autenticacion fue correcta o incorrecta
router.post('/',
<<<<<<< HEAD
  passport.authenticate('local', {failureRedirect:'/api/loginFalla',failureFlash: true, successFlash : true}),
  function(req, res) {
  	let objeto = {
  		status : true , 
  		message : "logueado correcto"
  	}
  	res.json(objeto);
  	/*
  	var rols = req.user.Rols;
  	console.log(req.user.Rols[0].nombre)
  	var rolsJson = [];
  	for (i = 0 ; i< rols.length ; i++){
  		rolsJson.push(rols[i].nombre);
  	}
  	var json = {
  		status : true,
  		nombre : req.user.nombres,
  		apellidos : req.user.apellidos,
  		correo : req.user.email, 
  		rols : rolsJson
  	}


  	console.log(json);
=======
  passport.authenticate('local', {failureRedirect:'/api/login/loginFalla',failureFlash: true, successFlash : true}),
  function(req, res) {

    var rols = req.user.Rols;
    console.log(req.user.Rols[0].nombre)
    var rolsJson = [];
    for (i = 0 ; i< rols.length ; i++){
      rolsJson.push(rols[i].nombre);
    }
    var json = {
      status : true,
      nombre : req.user.nombres,
      apellidos : req.user.apellidos,
      correo : req.user.email, 
      rols : rolsJson
    }

  	let objeto = {
  		status : true , 
  		message : "logueado correcto",
      objeto : json
  	}



    console.log(json);
  	res.json(objeto);
  	

    /*
>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149
  	res.render("procariano/verProcariano", json)
  	*/
});

<<<<<<< HEAD
//api get para cuando falla la autenticacion (deberia moverese a login.api.router)
router.get('/api/loginFalla', function(req,res,next){
	let objeto = {
		status : false,
		message : "algo paso"
	}
	res.json(objeto);
})
=======

>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login');
});








  // loggedin
  //revisa si esta autenticadno
router.get("/loggedin", function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});


//logout
//deslogea la sesion
router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/');
});


<<<<<<< HEAD
/*


//cambio password, no implemnetado del todo
router.post('/cambio', function(req, res){

  Usuario.getUsuarioByCorreo(req.body.correo, function(err, user){
    if(err) throw err;
    if(!user){
      var data = { type : "error" , message : "usuario no existe" };
      res.json(data);
      
    }

    Usuario.comparePassword(req.body.oldPassword, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        var id = user._id;
        Usuario.cambiarPassword(id, req.body.newPassword, function(err){
          if (err) throw err;
          var data = {type : "success" , message : "cambio Contraseña exitoso"};
          res.json(data);
        })
        
      } else {
        var data = {type : "error" , message : "Contraseña no valida"};
        res.json(data);
      }
    });
   });

});

*/
=======




router.post('/cambioContrasenna', utils.generarHashNuevaContrasenna, controladorLogin.cambioContrasenna);



>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149
module.exports = router;