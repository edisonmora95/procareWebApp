/*
@Descripcion: Controlador paro los tipos de procariano.
@Autor: Erick Pérez
@FechaCreacion: 17/07/2017
@UltimaFechaModificacion: 17/06/2017 @erialper
*/

var modelo = require('../models');

let jsonRespuesta = {};

let tiposPermitidos = ['Chico Formación', 'Caminante', 'Pescador', 'Pescador Consagrado', 'Sacerdote'];

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
		jsonRespuesta.mensaje = 'No se puede eliminar la etapa';
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

const mostrarTipo = (req,res,next) =>{
	modelo.Tipo.findAll({

	}).then( repuesta => {
		var status = true;
		var mensaje = 'Se obtuvieron las etapas correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : repuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'No se pudieron obtener las etapas'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
}

const asignarTipo = (req, res, next) => {
	modelo.ProcarinoTipo.findOne({
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

/*
	FUNCIONES DE VALIDACIÓN
*/
validarRequestCrearTipo = (req, res) => {
	//Validación etapa no enviada
	if(typeof req.body.nombre === 'undefined' || req.body.nombre == null){
		jsonRespuesta.status = false;
		jsonRespuesta.mensaje = 'Tipo no enviada';
		res.status(422).json(jsonRespuesta);
		return false;
	}
	//Validación etapa no aceptada
	if(!tiposPermitidos.includes(req.body.nombre)){
		jsonRespuesta.status = false;
		jsonRespuesta.mensaje = 'Tipo no aceptada';
		res.status(422).json(jsonRespuesta);
		return false;
	}
	return true;
}

actualizarTipo = (req, res) => {
	modelo.ProcarinoTipo.update({
		fechaFin : new Date()
	},{
		where: {
			ProcarianoId: req.body.procarianoId,
			fechaFin : null
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
				sequelizeStatus : repuesta2
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

module.exports = {
	crearTipo,
	eliminarTipo,
	editarTipo,
	mostrarTipo,
	asignarTipo
}
