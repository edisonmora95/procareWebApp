/*

@Descripcion: Ventanas del benfactor
@Autor: jose Alcivar
@FechaCreacion: 05/08/2017
@UltimaFechaModificacion: 05/08/2017 @JoseAlcivar (se lo puso bonito)


*/

/* jshint node: true */
'use strict';
var controladorBenefactor = require('../../controllers/benefactor');
var express = require('express');
var router = express.Router();

//Responde con la página de ingreso de benefactor
router.get('/nuevo', function(req, res) {
    res.render('benefactor/BenefactorPerfil');
});

//Responde con la página de búsqueda de Benefactor
router.get('/', function(req, res) {
    res.render('benefactor/Benefactor');
});

//Responde con la página de perfil del procariano
router.get('/perfil/:cedula', function(req, res) {
    res.render('benefactor/BenefactorPerfil');
});

module.exports = router;