/*
  @Descripcion: Api del login
  @Autor: jose viteri
  @FechaCreacion: 19/06/2017
  @UltimaFechaModificacion: 
    15/07/2017 //agregado post cambio contrasenna
    22/12/2017  @edisonmora95 añadida ruta para login con passport
*/
const co            = require('co');
const bcrypt        = require('bcryptjs');
const express       = require('express');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let router          = express.Router();

var modelos           = require('../../models');
var controladorLogin  = require('../../controllers/login.controller');
var utils             = require('../../utils/utils');
const ModeloPersona   = require('../../models').Persona;
const ModeloRol       = require('../../models').Rol;
const authentication  = require('../../middleware/authentication');
const authApi         = require('../../utils/authentication.api');

//LOCAL STRATEGY
const strategy = new LocalStrategy({
  usernameField : 'correo',
  passwordField : 'password'
 }, function(correo, password, done){
  co(function* (){
    //Primero se verifica si el correo existe en la base
    let persona = yield ModeloPersona.buscarPersonaPorEmailP(correo);
    if( !persona ) {
      return done(null, false);
    }
    //Ahora se comparan las contraseñas
    if( !bcrypt.compareSync(password, persona.get('contrasenna')) ) {
      return done(null, false);
    }
    //Obtengo los roles actuales del usuario
    return done(null, persona, { status : true, message : 'Logueado correctamente' });
  })
  .catch( err => {
    return done(err);
  });
});

passport.use(strategy);

passport.serializeUser(function(persona, done) {
  done(null, persona.get('id'));
});

passport.deserializeUser(function(id, done) {
  ModeloPersona.findAll({
    attributes: ['id', 'nombres', 'apellidos', 'email', 'genero'],
    where     : {
      id: id
    },
    include   : [{
      model  : ModeloRol,
      through: {
        attributes: ['RolNombre'],
      }
    }]
  }).then(persona => {
      done(null, persona);
  }).catch(err => {
      done(err, null);
  });
});

/*
  @api {post} /api/login/
  @apiDescription Valida los datos del formulario y autoriza el ingreso a la aplicación
  @apiGroup Login
  @apiName login
  @apiversion 0.2.0
*/
router.post('/', passport.authenticate('local'), controladorLogin.login);


router.get('/loginFalla', function(req, res, next) {
    let objeto = {
        status: false,
        message: "algo paso"
    }
    res.json(objeto);

});

/*
  @api {get} /api/login/usuarios
  @apiDescription Obtiene los datos del usuario conectado
  @apiGroup Login
  @apiName login
  @apiversion 0.2.0
*/
router.get('/usuarios', authApi.verifyToken, controladorLogin.getUsuario);

router.post('/cambiar', authApi.verifyToken, controladorLogin.cambioContrasenna);

router.post('/authenticate', authentication.authenticate);

module.exports = router;