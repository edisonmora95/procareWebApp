/*
Autor : erialper
Creado : 21/06/2017
Modificado: 21/06/2017
Por: erialper , controlador de los cargos del sistema, asigna el director de formación
*/

var modelo = require('../models');
var utils = require('../utils/utils')

const obtenerUsuarios = (req, res, next) => {
	modelo.Persona.findAll({
		include:[{
			model: modelo.Rol,
			attributes:['nombre'],
			through:{
				attributes:[],
				where: {fechaFin:null}
			}
		}],
		attributes:['nombres','apellidos','email'],
		where: {contrasenna:{$ne: null}}
	}).then( respuesta => {
		var status = true;
		var mensaje = 'Usuarios encontrados'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			usuarios : respuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'No se pudo realizar la busquedad'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			obtenerUsuarios : error
		}
		res.json(jsonRespuesta);
	})
}

const obtenerDirectoresFormación = (req, res, next) => {
	modelo.Persona.findAll({
		include:[{
			model: modelo.Rol,
			attributes:[],
			through:{
				attributes:[],
				where: {RolNombre:'Director Procare Formacion',fechaFin:null}
			},
			where: {nombre:'Director Procare Formacion'}
		}],
		attributes:['nombres','apellidos','email','genero'],
		where: {contrasenna:{$ne: null}}
	}).then( respuesta => {
		var status = true;
		var mensaje = 'Usuarios encontrados'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			usuarios : respuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'No se pudo realizar la busquedad'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			obtenerUsuarios : error
		}
		res.json(jsonRespuesta);
	})
}


const obtenerCandidatoDirectores = (req, res, next) => {
	modelo.Procariano.findAll({
		include:[{
			model: modelo.Tipo,
			attributes:[],
			through:{
				attributes:[],
				where: {fechaFin:{$ne:null}}
			},
			where: {nombre:{$not:'Chico Formación'}}
		},{
			model: modelo.Persona,
			attributes:['nombres','apellidos','email','genero']	
		}],
		attributes:[]
	}).then( respuesta => {
		var status = true;
		var mensaje = 'Usuarios encontrados'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			usuarios : respuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'No se pudo realizar la busquedad'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			obtenerUsuarios : error
		}
		res.json(jsonRespuesta);
	})
}


const asignarDirectorFormacion = (req, res, next) => {
	modelo.PersonaRol.findOne({
		where: {
			PersonaId : req.body.anteriorPersonaId,
			fechaFin : null,
			RolNombre : 'Director Procare Formacion'
		}
	}).then( respuesta =>{
		if(respuesta!=null){
			actualizarDirectorFormacion(req,res)
		}else{
			nuevoDirectorFormacion(req,res)
		}
	}).catch( error => {
		var status = false;
		var mensaje = 'error en la asignacion'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			director : error
		}
		res.json(jsonRespuesta);
	})
}

actualizarDirectorFormacion = (req, res) => {
	modelo.PersonaRol.update({
		fechaFin : new Date()
	},{
		where: {
			PersonaId : req.body.anteriorPersonaId,
			RolNombre: 'Director Procare Formacion'
		}
	}).then(respuesta1 => {
		nuevoDirectorFormacion(req,res)
	}).catch( error1 => {
		var status = false;
		var mensaje = 'no existe asignacion'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			actualizarDirector : error1
		}
		res.json(jsonRespuesta);
	});
}

nuevoDirectorFormacion = (req,res) => {
	modelo.PersonaRol.create({
		fechaInicio : new Date(),
		fechaFin : null,
		PersonaId : req.body.nuevoPersonaId,
		RolNombre: 'Director Procare Formacion'
	}).then( repuesta2 => {
		var status = true;
		var mensaje = 'Asignado correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			director : repuesta2
		}
		res.json(jsonRespuesta)
	}).catch( error2 => {
		var status = false;
		var mensaje = 'no se pudo asignar'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			nuevoDirector : error2
		}
		res.json(jsonRespuesta);
	});
}

module.exports = {
	obtenerUsuarios,
	asignarDirectorFormacion,
	obtenerDirectoresFormación,
	obtenerCandidatoDirectores
};