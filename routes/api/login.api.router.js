/*
@Descripcion: Api del login
@Autor: jose viteri
@FechaCreacion: 19/06/2017
@UltimaFechaModificacion: 15/07/2017 //agregado post cambio contrasenna
<<<<<<< HEAD


=======
>>>>>>> 80fe19d967516cabda64d1f10399c9d18e51f594
*/
var express = require('express');
var router = express.Router();
var modelos = require('../../models');
var controladorLogin = require('../../controllers/login.controller');
var utils = require('../../utils/utils');




router.get('/loginFalla', function(req, res, next) {
    let objeto = {
        status: false,
        message: "algo paso"
    }
    res.json(objeto);

});

router.get('/usuarios', function(req, res, next) {
    var rolesTemp = req.user[0].dataValues.Rols;
    var lista = [];
    for (var i = 0; i < rolesTemp.length; i++) {
        lista.push(rolesTemp[i].dataValues.nombre);
    }
    var json = {
        status: true,
        id: req.user[0].dataValues.id,
        nombre: req.user[0].dataValues.nombres,
        apellidos: req.user[0].dataValues.apellidos,
        genero: req.user[0].dataValues.genero,
        correo: req.user[0].dataValues.email,
        roles: lista
    }

    //console.log('\n\neste es genero ' + json.genero);

    res.json(json);
});

router.post('/', utils.generarHashNuevaContrasenna, controladorLogin.cambioContrasenna);


module.exports = router;