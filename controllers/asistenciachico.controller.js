'use strict';
/*
	@Descripcion: Controller asistencia de chicos
	@Autor: @edisonmora95
	@FechaCreacion: 13/01/2018
	@UltimaFechaModificacion: --
*/

const respuesta = require('../utils/respuestas');
const co      	= require('co');

const ModeloAsistencia = require('../models/').AsistenciaChico;
const ModeloProcariano = require('../models/').Procariano;
/*
	@Autor : @edisonmora95
	@FechaCreacion : 13/01/2018
	@Descripción:
	@Modificado:
*/

const ingresarAsistencia = (req, res) => {
	const idChico = req.body.idChico;
	const idGrupo = req.body.idGrupo;
	const fecha 	= req.body.fecha;

	ModeloAsistencia.ingresarAsistencia(idChico, idGrupo, fecha)
	.then( result => {
		return respuesta.okCreate(res, 'Asistencia ingresada', result);
	})
	.catch( error => {
		return respuesta.error(res, 'No se pudo ingresar la asistencia', '', error);
	});
};

const obtenerAsistenciasGrupo = (req, res) => {
	const idGrupo = req.params.id_grupo;
	const fecha 	= req.params.fecha;
	Promise.all([
		ModeloAsistencia.obtenerAsistenciasGrupo(idGrupo),
		ModeloProcariano.obtenerProcarianosDeGrupoP(idGrupo)
	])
	.then( values => {
		let asistencias = values[0];
		let procarianos = values[1];
		let array 			= [];
		for (let i = 0; i < asistencias.length; i++) {
			let idChico = asistencias[i].get('ProcarianoId');
			for (let j = 0; j < procarianos.length; j++) {
				let idProcariano = procarianos[j].get('idProcariano');
				if ( idChico === idProcariano ) {
					let nombres   = procarianos[j].get('Persona').get('nombres');
					let apellidos = procarianos[j].get('Persona').get('apellidos');
					array.push({ idProcariano, nombres, apellidos });
					break;
				}
			}
		}
		return respuesta.okGet(res, 'Búsqueda exitosa', array);
	})
	.catch( fail => {
		return respuesta.error(res, 'Error en la búsqueda', null, fail);
	});
};

module.exports = {
	ingresarAsistencia,
	obtenerAsistenciasGrupo,
}