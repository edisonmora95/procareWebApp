/*
@Descripcion: Controlador de las etapas.
@Autor: Erick Pérez
@FechaCreacion: 17/06/2017
<<<<<<< HEAD
@UltimaFechaModificacion: 17/06/2017 @erialper
=======
@UltimaFechaModificacion: 24/06/2017 @edanmora
>>>>>>> 74ea86c0eb4652d1ea655c43da1477291cca8bdb
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

let jsonRespuesta = {};

let etapasPermitidas = ["Iniciación", "Primera etapa", "Segunda etapa", "Tercera etapa", "Cuarta etapa", "Quinta etapa"];

const crearEtapa = (req, res, next) => {
	/*
		@ÚltimaModificación: 23/06/2017 @edanmora
		@Razón: Añadidas validaciones de backend y status en respuestas
	*/
	let nombre = req.body.nombre;
	if(validarRequestCrearEtapa(req, res)){
		modelo.Etapa.create({
			nombre : nombre,
			programas : ""
		}).then( respuesta => {
			jsonRespuesta.status = true;
			jsonRespuesta.mensaje = 'Se pudo crear correctamente';
			jsonRespuesta.sequelizeStatus = respuesta;
			res.status(200).json(jsonRespuesta)
		}).catch( error => {
			jsonRespuesta.status = false;
			jsonRespuesta.mensaje = 'No se pudo crear';
			jsonRespuesta.sequelizeStatus = error;
			res.status(422).json(jsonRespuesta);
		});
	}
}

const eliminarEtapa = (req, res, next) => {
	/*
		@ÚltimaModificación: 24/06/2017 @edanmora
		@Razón: Modificados mensajes de respuestas
	*/

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

	}).then( respuesta => {
		jsonRespuesta.status = true;
		jsonRespuesta.mensaje = 'Se pudo eliminar correctamente';
		jsonRespuesta.sequelizeStatus = respuesta;
		res.status(200).json(jsonRespuesta);
	}).catch( error => {
		jsonRespuesta.status = false;
		jsonRespuesta.mensaje = 'No se puede eliminar la etapa';
		jsonRespuesta.sequelizeStatus = error;
		res.status(404).send(jsonRespuesta);

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

	/*
		@ÚltimaModificación: 24/06/2017 @edanmora
		@Razón: Modificados mensajes de respuestas
	*/

	modelo.Etapa.findAll({

	}).then( repuesta => {
		var status = true;

		var mensaje = 'se pudo actualizar correctamente'

		var mensaje = 'Se obtuvieron las etapas correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : repuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;

		var mensaje = 'no se pudo eliminar'

		var mensaje = 'No se pudieron obtener las etapas'

		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
}


/*
	FUNCIONES DE VALIDACIÓN
*/
validarRequestCrearEtapa = (req, res) => {
	//Validación etapa no enviada
	if(typeof req.body.nombre === 'undefined' || req.body.nombre == null){
		jsonRespuesta.status = false;
		jsonRespuesta.mensaje = 'Etapa no enviada';
		res.status(422).json(jsonRespuesta);
		return false;
	}
	//Validación etapa no aceptada
	if(!etapasPermitidas.includes(req.body.nombre)){
		jsonRespuesta.status = false;
		jsonRespuesta.mensaje = 'Etapa no aceptada';
		res.status(422).json(jsonRespuesta);
		return false;
	}
	return true;
}

module.exports = {
	crearEtapa,
	eliminarEtapa,
	editarEtapa,
	mostrarEtapa
}