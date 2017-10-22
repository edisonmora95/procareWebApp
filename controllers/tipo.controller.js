/*
@Descripcion: Controlador paro los tipos de procariano.
@Autor: Erick Pérez
@FechaCreacion: 17/07/2017
@UltimaFechaModificacion: 17/06/2017 @erialper
*/
var modelo = require('../models');
const ModeloTipo 	= require('../models/').Tipo;
const respuesta 	= require('../utils/respuestas');



let jsonRespuesta = {};

let tiposPermitidos = ['Chico Formación', 'Caminante', 'Pescador', 'Pescador Consagrado', 'Sacerdote', 'Mayor'];

const crearTipo = (req, res, next) => {
	let nombre = req.body.nombre;
	if(validarRequestCrearTipo(req, res)){
		modelo.Tipo.create({
			nombre : nombre
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

const eliminarTipo = (req, res, next) => {
	modelo.Tipo.destroy({
		where:{
			id: req.params.id
		}
	}).then( respuesta => {
		jsonRespuesta.status = true;
		jsonRespuesta.mensaje = 'Se pudo eliminar correctamente';
		jsonRespuesta.sequelizeStatus = respuesta;
		res.status(200).json(jsonRespuesta);
	}).catch( error => {
		jsonRespuesta.status = false;
		jsonRespuesta.mensaje = 'No se puede eliminar el tipo';
		jsonRespuesta.sequelizeStatus = error;
		res.status(404).send(jsonRespuesta);
	});
}

const editarTipo = (req, res, next) => {
	modelo.Tipo.update({
		nombre : req.body.nombre
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
/*
	@Autor : Erick Perez
	@api {get} /api/tipo/
	@apiDescription
		Devuelve todos los tipos de la base de datos
	@apiGroup Tipo
	@apiName mostrarTipo
	@apiversion 0.1.2
	@Modificado: 
		24/09/2017 @edisonmora95	promesas
*/
const mostrarTipo = (req,res,next) =>{
	ModeloTipo.obtenerTodosLosTiposP()
	.then( resultado => {
		return respuesta.okGet(res, 'Búsqueda exitosa', resultado);
	})
	.catch( error => {
		return respuesta.error(res, 'Error en la búsqueda', '', error);
	});
}

/*
const asignarTipo = (req, res, next) => {
	modelo.ProcarianoTipo.findOne({
		where: {
			ProcarianoId: req.body.procarianoId
		}
	}).then( respuesta =>{
		if(respuesta!=null){
			actualizarTipo(req,res)
		}else{
			agregarNuevoTipo(req,res)
		}
	}).catch( error => {
		var status = false;
		var mensaje = 'no existe asignacion'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	})
}
*/

/*
	FUNCIONES DE VALIDACIÓN
*/
validarRequestCrearTipo = (req, res) => {
	//Validación tipo no enviada
	if(typeof req.body.nombre === 'undefined' || req.body.nombre == null){
		jsonRespuesta.status = false;
		jsonRespuesta.mensaje = 'Tipo no enviado';
		res.status(422).json(jsonRespuesta);
		return false;
	}
	//Validación tipo no aceptada
	if(!tiposPermitidos.includes(req.body.nombre)){
		jsonRespuesta.status = false;
		jsonRespuesta.mensaje = 'Tipo no aceptado';
		res.status(422).json(jsonRespuesta);
		return false;
	}
	return true;
}
/*
actualizarTipo = (req, res) => {
	modelo.ProcarianoTipo.update({
		fechaFin : new Date()
	},{
		where: {
			FechaFin : null,
			ProcarianoId: req.body.procarianoId
		}
	}).then(Tipo => {
		agregarNuevoTipo(req,res)
	}).catch( error1 => {
		var status = false;
		var mensaje = 'no existe asignacion'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error1
		}
		res.json(jsonRespuesta);
	});
}

agregarNuevoTipo = (req,res) => {
	modelo.Tipo.findOne({
		where: {
			nombre: req.body.nombre
		}
	}).then(Tipo => {
		modelo.ProcarianoTipo.create({
			TipoId : Tipo.get('id'),
			ProcarianoId : req.body.procarianoId,
			fechaInicio : new Date(),
			fechaFin : null
		}).then( repuesta => {
			var status = true;
			var mensaje = 'Asignado correctamente'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : repuesta
			}
			res.json(jsonRespuesta)
		}).catch( error2 => {
			var status = false;
			var mensaje = 'no se pudo asignar'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : error2
			}
			res.json(jsonRespuesta);
		});
	}).catch( error1 => {
		var status = false;
		var mensaje = 'no existe tipo'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error1
		}
		res.json(jsonRespuesta);
	});
}
*/

module.exports = {
	crearTipo,
	eliminarTipo,
	editarTipo,
	mostrarTipo
}