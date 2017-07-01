/*
@Descripcion: Controlador de las etapas.
@Autor: Erick Pérez
@FechaCreacion: 17/06/2017
@UltimaFechaModificacion: 17/06/2017 @erialper
*/

var modelo = require('../models');

const crearEtapa = (req, res, next) => {
	modelo.Etapa.create({
		nombre : req.body.nombre,
		programas : ""
	}).then( repuesta => {
		var status = true;
		var mensaje = 'se pudo crear correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : repuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'no se pudo eliminar'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
}

const eliminarEtapa = (req, res, next) => {
	modelo.Etapa.destroy({
		where:{
			id: req.params.id
		}
	}).then( repuesta => {
		var status = true;
		var mensaje = 'se pudo eliminar correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : repuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var json1 = {
			status : false,
			mensaje: 'No se puede eliminar la etapa',
			error : error
			}
		res.send(json1);
	});
}

const editarEtapa = (req, res, next) => {
	modelo.Etapa.update({
		nombre : req.body.nombre,
		programa : ""
	},{
		where:{
			id: req.params.id
		}
	}).then( repuesta => {
		var status = true;
		var mensaje = 'se pudo editar correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : repuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'no se pudo eliminar'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
}

const mostrarEtapa = (req,res,next) =>{
	modelo.Etapa.findAll({

	}).then( repuesta => {
		var status = true;
		var mensaje = 'se pudo actualizar correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : repuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'no se pudo eliminar'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
}

module.exports = {
	crearEtapa,
	eliminarEtapa,
	editarEtapa,
	mostrarEtapa
}