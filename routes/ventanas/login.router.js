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
	modelos.Persona.find(
	{
		where : {
			email : correo
		}
	}).then( persona => {
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




passport.deserializeUser(function(id, done) {
  modelos.Persona.find({
  	where : {
  		id : id
  	}
  }).then( persona => {
  	done(null, persona);
  }).catch( err => {
  	done(err, null);
  })
});

router.post('/',
  passport.authenticate('local', {failureRedirect:'/',failureFlash: true}),
  function(req, res) {
  	console.log(req.user);
  	res.redirect("/procarianos/")
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