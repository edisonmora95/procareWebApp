/*
@Descripcion: Controlador de Club por Ti.
@Autor: Luis Lainez
@FechaCreacion: 14/07/2017
@UltimaFechaModificacion: 29/07/2017 LuisBSC15
						  02/08/2017 erialper
*/
var modelo = require('../models');

let jsonRespuesta = {};

const crearTicket = (req, res, next) => {	
	modelo.Ticket.create({
		ProcarianoId : req.body.procarianoId,
		fechaCompra : new Date(req.body.fechaCompra),
		valor : req.body.valor,
		esGanador : req.body.esGanador
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

const eliminarTicket = (req, res, next) => {
	modelo.Ticket.destroy({
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

const editarTicket = (req, res, next) => {
	modelo.Ticket.update({
		fechaCompra : new Date(req.body.fechaCompra),
		valor : req.body.valor,
		esGanador : req.body.esGanador
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

const mostrarTicketProcariano = (req, res, next) =>{
	var id = req.params.id;
	modelo.Ticket.findAll({
	    where : {
	    	ProcarianoId : id
	    }
	}).then( repuesta => {
		var status = true;
		var mensaje = 'Se obtuvieron los tickets correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : repuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'No se pudieron obtener los tickets'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
}

const eliminarNoGanadores = (req, res, next) =>{
	modelo.Ticket.destroy({
		where:{
			esGanador: "no"
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

const mostrarGanadores = (req, res, next) =>{
	modelo.Ticket.findAll({
	    where : {
			esGanador: "si"
	    }
	}).then( repuesta => {
		var status = true;
		var mensaje = 'Se obtuvieron los tickets correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : repuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'No se pudieron obtener los tickets'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
}

module.exports = {
	crearTicket,
	eliminarTicket,
	editarTicket,
	mostrarTicketProcariano,
	eliminarNoGanadores,
	mostrarGanadores
}