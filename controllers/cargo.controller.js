/*
Autor : erialper
Creado : 21/06/2017
Modificado: 21/06/2017
Por: erialper , controlador de los cargos del sistema, asigna el director de formación
*/

var modelo = require('../models');
var utils = require('../utils/utils')
var respuestas = require('../utils/respuestas.js')

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
	}).then( usuarios => {
		return respuestas.okGet(res, 'Usuarios encontrados', usuarios);
	}).catch( error => {
		return respuestas.error(res, 'No se pudo realizar la busquedad', '', error);
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
		attributes:['id','nombres','apellidos','email','genero'],
		where: {contrasenna:{$ne: null}}
	}).then( director => {
		return respuestas.okGet(res, 'Usuarios encontrados', director);
	}).catch( error => {
		return respuestas.error(res, 'No se pudo realizar la busquedad', '', error);
	})
}

const obtenerCandidatoDirectores = (req, res, next) => {
	modelo.Procariano.findAll({
		include:[{
			model: modelo.Tipo,
			attributes:[],
			where: {nombre:{$not:'Chico Formación'}}
		},{
			model: modelo.Persona,
			attributes:['id','nombres','apellidos','email','genero']	
		}],
		attributes:[]
	}).then( candidato => {
		return respuestas.okGet(res, 'Usuarios encontrados', candidato);
	}).catch( error => {
		return respuestas.error(res, 'No se pudo realizar la busquedad', '', error);
	})
}

const asignarDirectorFormacion = (req, res, next) => {
	if(req.body.anteriorPersonaId == req.body.nuevoPersonaId){
		return respuestas.errorUpdate(res, 'No se modifica');
	}
	modelo.PersonaRol.findOne({
		where: {
			fechaFin : null,
			PersonaId : req.body.anteriorPersonaId,
			RolNombre : 'Director Procare Formacion'
		}
	}).then( director => {
		if(director!=null){
			actualizarDirectorFormacion(req,res);
		}else{
			nuevoDirectorFormacion(req,res);
		}
	}).catch( error => {
		return respuestas.error(res, 'algo sucedio', '', error);
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
		return respuestas.error(res, 'Error en la anterior asignación', '', error1);
	});
}

nuevoDirectorFormacion = (req, res) => {
	modelo.PersonaRol.create({
		fechaInicio : new Date(),
		fechaFin : null,
		PersonaId : req.body.nuevoPersonaId,
		RolNombre: 'Director Procare Formacion'
	}).then( repuesta2 => {
		return respuestas.okCreate(res, 'Asignado correctamente', repuesta2);
	}).catch( error2 => {
		return respuestas.error(res, 'Error en la nueva asignación', '', error2);
	});
}

const asignarAnimador = (req, res, next) => {
	modelo.Procariano.findOne({
		where:{id : req.body.procarianoId}
	}).then( procariano => {
		modelo.PersonaRol.findOne({
			where: {
				fechaFin : null,
				PersonaId : procariano.get('PersonaId'),
				RolNombre : 'Animador'
			}
		}).then( animador => {
			if(animador!=null){
				return respuestas.errorUpdate(res, 'No se modifica');
			}else{
				modelo.PersonaRol.create({
					fechaInicio : new Date(),
					fechaFin : null,
					PersonaId : procariano.get('PersonaId'),
					RolNombre: 'Animador'
				}).then( repuesta2 => {
					return respuestas.okCreate(res, 'Asignado correctamente', repuesta2);
				}).catch( error2 => {
					return respuestas.error(res, 'Error en la nueva asignación', '', error2);
				});
			}
		}).catch( error1 => {
			return respuestas.error(res, 'algo sucedio', '', error1);
		})
	}).catch( error => {
		return respuestas.error(res, 'Algo sucedio en busquedad', '', error);
	})
}

module.exports = {
	obtenerUsuarios,
	asignarDirectorFormacion,
	obtenerDirectoresFormación,
	obtenerCandidatoDirectores,
	asignarAnimador
};