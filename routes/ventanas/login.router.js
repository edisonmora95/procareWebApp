/*
modificado : 14/06/2017
por: Jose Viteri
desc: ventana del login y autenticacion usando passport
*/


var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var modelos = require('../../models');



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
		return done(null, false, {message : "usuario no existe"});
	})
 }));


passport.serializeUser(function(persona, done) {
  done(null, persona.id);
});



/*
passport.deserializeUser(function(id, done) {
  modelos.Persona.find({
  	where : {
  		id : id
  	}
  }).then( persona => {
  	modelos
  	done(null, persona);
  }).catch( err => {
  	done(err, null);
  })
});


passport.deserializeUser(function(id, done) {
  modelos.Persona.findAll({
  	where : {
  		id : id
  	}
  }).then( persona => {
  	modelos.PersonaRol.findAll({
  		attributes: ['RolNombre'],
  		where : {
  			PersonaId : id
  		}
  	}).then( roles => {
  		var json = {
  			persona : persona,
  			rol : roles
  		};
  		const respuesta = persona.map( per => {

			return Object.assign(
				{},
				{
					id : per.id,
					nombres : per.nombres ,
					apellidos : per.apellidos ,
					correo : per.correo ,
				});
		});
  		
  	}).catch( err2 => {
  		done(err2,null);
  	})
  }).catch( err => {
  	done(err, null);
  })
});

*/
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


router.post('/',
  passport.authenticate('local', {failureRedirect:'/',failureFlash: true}),
  function(req, res) {
  	var rols = req.user.Rols;
  	console.log(req.user.Rols[0].nombre)
  	var rolsJson = [];
  	for (i = 0 ; i< rols.length ; i++){
  		rolsJson.push(rols[i].nombre);
  	}
  	var json = {
  		nombre : req.user.nombres,
  		apellidos : req.user.apellidos,
  		correo : req.user.email, 
  		rols : rolsJson
  	}


  	console.log(json);
  	res.render("procariano/verProcariano", json)
});

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login');
});








  // loggedin
router.get("/loggedin", function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});


//logout
router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/');
});


/*


//cambio password
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
module.exports = router;