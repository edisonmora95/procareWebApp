
/*
@Descripcion: esta es la ventana del login , implementa passport para hacerlo
@Autor: jose viteri
@FechaCreacion: 14/06/2017
@UltimaFechaModificacion: 16/06/2017 @JoseViteri
*/

var controladorLogin = require('../../controllers/login.controller')
var utils = require('../../utils/utils');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var modelos = require('../../models');


//estartegia local, compara contraseña y usuario, ademas genera el req.user
passport.use(new LocalStrategy({
  usernameField : 'correo',
  passwordField : 'password'
},
function(correo, password, done) {
  console.log('entra aqui passport \n\n');
  modelos.Persona.find({
      attributes: ['id','contrasenna','nombres','apellidos','email','genero'],
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
    console.log('entra aqui 2.0');
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
        attributes: ['id', 'nombres', 'apellidos', 'email', 'genero'],
        where: {
            id: id
        },
        include: [{
            model: modelos.Rol,
            through: {
                attributes: ['RolNombre'],
            }
        }]
    }).then(persona => {

        done(null, persona);
    }).catch(err => {
        done(err, null);
    })
});


//post del login, manda un json si la autenticacion fue correcta o incorrecta
router.post('/',
    passport.authenticate('local', {
        failureRedirect: '/api/login/loginFalla',
        failureFlash: true,
        successFlash: true
    }),
    function(req, res) {

        var rols = req.user.Rols;
        console.log(req.user.Rols[0].nombre)
        var rolsJson = [];
        for (i = 0; i < rols.length; i++) {
            rolsJson.push(rols[i].nombre);
        }
        var json = {
            status: true,
            nombre: req.user.nombres,
            apellidos: req.user.apellidos,
            correo: req.user.email,
            rols: rolsJson
        }

        let objeto = {
            status: true,
            message: "logueado correcto",
            objeto: json
        }



        console.log(json);
        res.json(objeto);


        /*
        res.render("procariano/verProcariano", json)
        */
    });

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
router.get('/logout', function(req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/');
});

module.exports = router;