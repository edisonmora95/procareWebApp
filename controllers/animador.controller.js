var modelo = require('../models');
const respuesta        = require('../utils/respuestas');
const ModeloProcariano = require('../models/').Procariano;
const ModeloAnimador 	 = require('../models/').Animador;
const ModeloPersonaRol = require('../models/').PersonaRol;

const crearAnimadorAPartirDeProcariano = (procarianoId,fechaInicio,fechaFin) => {
	modelo.Animador.create({
		ProcarianoId : procarianoId,
		fechaInicio : new Date(fechaInicio),
		fechaFin : new Date(fechaFin)
	}).then(animador => {
		return [true, animador];
	}).catch( error => {
		return [false, error];
	});
}

const agregarAnimadorAGrupo = (animadorId,grupoId) => {
	modelo.Animador.update({
		GrupoId : grupoId
	}, {
	  where: {
	    id : animadorId
	  }
	}).then(animador => {
		return true;
	}).catch( error => {
		return false;
	});
}

/*
	@Autor: @edisonmora95
	@FechaCreación: 02/11/2018
	@Descripción:
		Se crea el registro de animador al grupo creado
		Se busca si es la primera vez que la persona es animador
			*	De ser así, se pasa el control al siguiente middleware
			* De no ser así, se termina la creación y se envía la respuesta al cliente
	@ÚltimaModificación: 
*/
module.exports.agregarAnimador = (req, res, next) => {
	let idAnimador = req.body.animador;	//ESTE ES EL ID DEL PROCARIANO
	let t 			= res.locals.t;
	let idGrupo = res.locals.idGrupo;

	Promise.all([
		ModeloAnimador.agregarAnimadorAGrupoT(idAnimador, idGrupo, t),
		ModeloProcariano.obtenerProcarianoPorIdP(idAnimador),
	])
	.then( values => {
		let animador   = values[0];
		let procariano = values[1];
		const persona 	= procariano.get('Persona');
		const idPersona = persona.get('personaId');

		ModeloPersonaRol.buscarRolDePersonaPorId(idPersona)
		.then( rolAsignado => {
			if ( !rolAsignado ) {
				res.locals.idPersona = idPersona;
				res.locals.email     = persona.get('email');
				next();
			} else {
				t.commit();
				return respuesta.okCreate(res, 'Grupo creado', idGrupo);
			}
		})
		.catch( fail => {
			t.rollback();
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	})
	.catch( fail => {
		t.rollback();
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};


module.exports.crearAnimadorAPartirDeProcarianoYAgregarAGrupo = (req,res,next) => {
	procarianoId = req.body.procarianoId;
	fechaInicio = req.body.fechaInicio;
	fechaFin = req.body.fechaFin;
	var rAnimador = crearAnimadorAPartirDeProcariano(procarianoId, fechaInicio, fechaFin);
	var exito = rAnimador[0];
	var rjson;
	if (exito) {
		var animador = rAnimador[1];
		grupoId = req.body.grupoId;
		exito = agregarAnimadorAGrupo(animador.id, grupoId);
		if (exito) {
			rjson = {
				status : true,
				mensaje : 'Animador creado y agregado a grupo correctamente',
				sequelizeStatus : animador
			}
		} else {
			rjson = {
				status : false,
				mensaje : 'Animador creado pero No agregado al grupo',
				sequelizeStatus : error
			}
		}
	} else {
		error = rAnimador[1];
		rjson = {
			status : false,
			mensaje : 'No se pudo crear el animador',
			sequelizeStatus : error
		}
	}
	res.json(rjson)
}

module.exports.mostrarAnimadores = (req,res,next) => {
	modelo.Animador.findAll().then( animadores => {
		var rjson = {
			status : true,
			mensaje : 'Se obtuvieron los Animadores correctamente',
			sequelizeStatus : animadores
		}
		res.json(rjson)
	}).catch( error => {
		var rjson = {
			status : false,
			mensaje : 'No se pudieron obtener los Animadores',
			sequelizeStatus : error
		}
		res.json(rjson);
	});
}
/*
	@Descripción:
		Devuelve a todos los procarianos que no sean Chico de Formación
*/
module.exports.posiblesAnimadores = (req,res,next) => {
	ModeloProcariano.obtenerPosiblesAnimadoresP()
	.then( resutado => {
		return respuesta.okGet(res, 'Búsqueda exitosa', resutado);
	})
	.catch( error => {
		return respuesta.serverError(res, 'Error en la búsqueda', error);
	})
}

module.exports.obtenerGrupoDeAnimador = (req, res, next) => {
	const idAnimador = req.params.id_animador;
	modelo.Animador.obtenerGrupoDeAnimador(idAnimador, (success) => {
		return respuesta.okGet(res, 'Búsqueda exitosa', success);
	}, (error) => {
		return respuesta.error(res, 'Error en la búsqueda', '', error);
	});
}
