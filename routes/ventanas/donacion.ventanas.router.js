/*

@Descripcion: Ventanas del Donacion
@Autor: jose ALcivar
@FechaCreacion: 20/05/2017
@UltimaFechaModificacion: 05/06/2017 @EdisonMora (se lo puso bonito)


*/

/* jshint node: true */
'use strict';
var controladorDonacion = require('../../controllers/donacion');
var express = require('express');
var router = express.Router();

//Responde con la página de ingreso de procarianos
router.get('/nuevo', function(req, res) {
    res.render('donacion/Donacion');
});

//Responde con la página de donaciones
router.get('/', function(req, res) {
    res.render('donacion/Donacion');
});

//Responde con la página de perfil del procariano
router.get('/:id', function(req, res) {
    res.render('procariano/Donacion');
});

module.exports = router;