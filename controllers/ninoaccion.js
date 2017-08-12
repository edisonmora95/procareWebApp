/*
@Descripcion: Controlador de Nino Accion.
@Autor: Luis Lainez
@FechaCreacion: 29/07/2017
@UltimaFechaModificacion: 29/07/2017 
*/

var modelo = require('../models');

let jsonRespuesta = {};

const crearNinoAccion = (req, res, next) => {
	if(req.body.fechaNacimiento == ''){
		fechaNacimiento = null;
	}else{
		fechaNacimiento = new Date(req.body.fechaNacimiento);	
	}
	let persona = {
		cedula : req.body.cedula,
		nombres : req.body.nombres,
		apellidos : req.body.apellidos,
		direccion : req.body.direccion,
		fechaNacimiento : fechaNacimiento,
		genero : req.body.genero,
		contrasenna : null,
		email : req.body.email,
		celular : req.body.celular,
		trabajo : req.body.trabajo,
		convencional : req.body.convencional,
		sueldo : 0
	};
	modelo.Persona.crearPersona(persona, (persona) => {
		let ninoaccion = {
			PersonaId : persona.get('id'),
			nombreRep : req.body.nombreRep,
			apellidoRep : req.body.apellidoRep,
			telefonoRep : req.body.telefonoRep,
			escuela: req.body.escuela,
			esBautizado: req.body.esBautizado,
			estado : 'activo'
		};
		modelo.NinoAccion.crearNinoAccion(ninoaccion, (ninoaccion) => {
			return res.status(200).json({
				estado: true,
				persona: persona,
				ninoaccion: ninoaccion
			});
		},(errorNinoAccion) => {
			return res.status(400).json({
				estado: false,
				errorNinoAccion: errorNinoAccion
			});
		});
	}, (errorPersona) => {
		return res.status(400).json({
			estado: false,
			errorPersona: errorPersona
		});
	});
}

const buscarNinoAccion = (req, res , next) => {
	var jsonModelo = utils.generarJsonNinoAccion(req.query);
	modelo.NinoAccion.findAll({
	    include: [{
	        model: modelo.Persona ,
	        where: jsonModelo.persona
	    }], where : jsonModelo.ninoaccion  
	}).then(ninoaccion => {
		const respuesta = ninoaccion => {
			return Object.assign(
				{},
				{
					personaId : ninoaccion.Persona.id,
					ninoaccionID : ninoaccion.id ,
					nombreRep : ninoaccion.nombreRep,
					apellidoRep : ninoaccion.apellidoRep,
					telefonoRep : ninoaccion.telefonoRep,
					escuela: ninoaccion.escuela,
					esBautizado: ninoaccion.esBautizado,
					estado : ninoaccion.estado
				});
		};
		return res.json(respuesta);
	}).catch( error => {
		var status = false;
		var mensaje = 'No se obtuvieron resultados'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			errorNinoAccion : error
		}
		res.json(jsonRespuesta);
	});
};

const buscarNinoAccionPorId = (req,res,next) =>{
	var id = req.params.id;
	modelo.NinoAccion.findAll({
	    include: [{
	        model: modelo.Persona ,
	        where: {
	        	id  : id
	        }
	    }],
	    where : {
	    	PersonaId : id
	    }  
	}).then( repuesta => {
		var status = true;
		var mensaje = 'Se obtuvieron los niños de Accion correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : repuesta
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'No se pudieron obtener los niños de Accion'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
}

const editarNinoAccion = (req, res, next) => {
	var id = req.params.id;
	if(req.body.fechaNacimiento == ''){
		fechaNacimiento = null;
	}else{
		fechaNacimiento = new Date(req.body.fechaNacimiento);	
	}
	modelo.Persona.update({
		cedula : req.body.cedula,
		nombres : req.body.nombres,
		apellidos : req.body.apellidos,
		direccion :req.body.direccion,
		fechaNacimiento : new Date(req.body.fechaNacimiento),
		genero : req.body.genero,
		email :  req.body.email,
		celular : req.body.celular,
		trabajo : req.body.trabajo,
		convencional : req.body.convencional
	}, {
	  where: {
	    id : id
	  }
	}).then( result => {
		modelo.NinoAccion.update({
			nombreRep : req.body.nombreRep,
			apellidoRep : req.body.apellidoRep,
			telefonoRep : req.body.telefonoRep,
			escuela: req.body.escuela,
			esBautizado: req.body.esBautizado
		}, { 
			where : {
				PersonaId : id
			}
		}).then( repuesta => {
			var status = true;
			var mensaje = 'Se pudo editar correctamente'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : repuesta
		}
		res.json(jsonRespuesta)
		}).catch( error => {
			var status = false;
			var mensaje = 'No se pudo editar'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : error
			}
			res.json(jsonRespuesta);
		});
	});
};

const eliminarNinoAccion = (req, res, next) => {
	var id = req.params.id;
	modelo.NinoAccion.update({
		estado : 'inactivo'	  
	}, {
	  where: {
	    PersonaId : id
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


module.exports = {
	crearNinoAccion,
	buscarNinoAccion,
	buscarNinoAccionPorId,
	editarNinoAccion,
	eliminarNinoAccion
}
