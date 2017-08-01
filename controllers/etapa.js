/*
@Descripcion: Controlador de las etapas.
@Autor: Erick Pérez
@FechaCreacion: 17/06/2017
@UltimaFechaModificacion: 24/06/2017 @edanmora
*/

let modelo = require('../models');
let respuesta = require('../utils/respuestas');

let jsonRespuesta = {};

let etapasPermitidas = ["Iniciación", "Primera etapa", "Segunda etapa", "Tercera etapa", "Cuarta etapa", "Quinta etapa"];

const crearEtapa = (req, res, next) => {
	/*
		@ÚltimaModificación: 23/06/2017 @edanmora
		@Razón: Añadidas validaciones de backend y status en respuestas
	*/
	let nombre = req.body.nombre;
	modelo.Etapa.crearEtapa(nombre, (etapa) => {
		return respuesta.okCreate(res, 'Etapa creada correctamente', etapa);
	}, (err) => {
		let mensajeError = err.errors[0].message;
		return respuesta.error(res, 'No se pudo crear la etapa', mensajeError, err);
	});
}

const eliminarEtapa = (req, res, next) => {
	/*
		@ÚltimaModificación: 30/07/2017 @edanmora
		@Razón: Modificados mensajes de respuestas
	*/
	modelo.Etapa.eliminarEtapa(req.params.id, (success) => {
		if(success === 1){
			return respuesta.okDelete(res, 'Se pudo eliminar correctamente.', success);	
		}else if(success > 1){
			return respuesta.errorDelete(res, 'Error! Se eliminaron más etapas de las deseadas.', success);
		}else if(success === 0){
			return respuesta.errorDelete(res, 'No se encontraron etapas con el id indicado.', success);
		}
	}, (error) => {
		return respuesta.errorDelete(res, 'No se puede eliminar la etapa', error);
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
		var mensaje = 'no se pudo editar'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
}

/*
	@ÚltimaModificación: 24/06/2017 @edanmora
	@Razón: Modificados mensajes de respuestas
*/
const mostrarEtapa = (req,res,next) =>{
	modelo.Etapa.obtenerEtapas( (etapas) => {
		return respuesta.okGet(res, 'Se obtuvieron las etapas correctamente', etapas);
	}, (error) => {
		return respuesta.error(res, 'No se pudieron obtener las etapas', '', error);
	});
}

const asignarEtapa = (req, res, next) => {
	modelo.GrupoEtapa.findOne({
		where: {
			GrupoId: req.body.grupoId
		}
	}).then( respuesta =>{
		if(respuesta!=null){
			actualizarEtapa(req,res)
		}else{
			agregarNuevaEtapa(req,res)
		}
	}).catch( error => {
		var status = false;
		var mensaje = 'error en la asignacion'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	})
}

actualizarEtapa = (req, res) => {
	modelo.GrupoEtapa.update({
		fechaFin : new Date()
	},{
		where: {
			FechaFin : null,
			GrupoId: req.body.grupoId
		}
	}).then(respuesta1 => {
		agregarNuevaEtapa(req,res)
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


const asignarEtapa = (req, res, next) => {
	modelo.GrupoEtapa.findOne({
		where: {
			GrupoId: req.body.grupoId
		}
	}).then( respuesta =>{
		if(respuesta!=null){
			actualizarEtapa(req,res)
		}else{
			agregarNuevaEtapa(req,res)
		}
	}).catch( error => {
		var status = false;
		var mensaje = 'error en la asignacion'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	})
}

actualizarEtapa = (req, res) => {
	modelo.GrupoEtapa.update({
		fechaFin : new Date()
	},{
		where: {
			FechaFin : null,
			GrupoId: req.body.grupoId
		}
	}).then(respuesta1 => {
		agregarNuevaEtapa(req,res)
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


agregarNuevaEtapa = (req,res) => {
	modelo.Etapa.findOne({
		where: {
			nombre: req.body.nombre
		}
	}).then(Tipo => {
		modelo.GrupoEtapa.create({
			EtapaId : Tipo.get('id'),
			GrupoId : req.body.grupoId,
			fechaInicio : new Date(),
			fechaFin : null
		}).then( repuesta2 => {
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
		var mensaje = 'no existe Etapa'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error1
		}
		res.json(jsonRespuesta);
	});
}

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
	mostrarEtapa,
	asignarEtapa
}