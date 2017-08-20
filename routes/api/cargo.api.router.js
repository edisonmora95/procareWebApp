/*
@Descripcion: Rutas para comunicarse con el controlador de Cargos
@Autor: erialper
@FechaCreacion: 29/07/2017
@UltimaFechaModificacion: @erialper 12/08/2017 Se eliman rutas a cargosFormación y cargosFundación
*/
var controladorCargo = require('../../controllers/cargo.controller')
var express = require('express');
var router = express.Router();

//Post Director de Formacion
router.post('/directorF', controladorCargo.asignarDirectorFormacion);

//Devuelve todos los usuarios del sistema
router.get('/usuarios',controladorCargo.obtenerUsuarios);

//Devuelve los directores actuales de Formación
router.get('/directorF',controladorCargo.obtenerDirectoresFormación);

//Devuelve los candidatos a director
router.get('/candidatoDirector',controladorCargo.obtenerCandidatoDirectores);


module.exports = router;
