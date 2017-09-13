/*
@Descripcion: Clase para representar el concepto de Grupo
@Autor: Gustavo Totoy
@FechaCreacion: 31/05/2017
@UltimaFechaModificacion: 31/05/2017 @GustavoTotoy
*/
'use strict';
//const sequelize = require('sequelize');
var modelo = require('../models');
const ModeloGrupo = require('../models/').Grupo;
const ModeloGrupoEtapa = require('../models/').GrupoEtapa;
const ModeloAnimador = require('../models/').Animador;
const ModeloProcariano = require('../models/').Procariano;
const ModeloPersonaRol = require('../models/').PersonaRol;
const respuesta = require('../utils/respuestas');
const co = require('co');

module.exports.crearGrupo = (req, res) => {
	let grupoObj = {
		nombre : req.body.nombre,
		tipo : req.body.tipo,
		cantidadChicos : req.body.cantidadChicos,
		numeroReuniones:  req.body.numeroReuniones,
		genero : req.body.genero,
	};
	let idEtapa = req.body.etapa;
	let idAnimador = req.body.animador;
	let datosRespuesta = {};

	co(function* (){
		let t 					= 	yield inicializarTransaccion();
    let grupo 			= 	yield ModeloGrupo.crearGrupoT(grupoObj, t);
    let idGrupo 		= 	grupo.get('id');
    let grupoetapa 	= 	yield ModeloGrupoEtapa.crearGrupoEtapaT(idGrupo, idEtapa, t);
  	let animador 		= 	yield ModeloAnimador.agregarAnimadorAGrupoT(idAnimador, idGrupo, t);
  	let procariano 	= 	yield ModeloProcariano.buscarProcarianoPorId(idAnimador);
  	const idPersona = 	procariano.get('PersonaId');
  	let rolAsignado = 	yield ModeloPersonaRol.buscarRolDePersonaPorId(idPersona);

  	if(rolAsignado === null){
  		let rol = yield ModeloPersonaRol.asignarRolT(idPersona, 'Animador', t);
  		datosRespuesta.rol = rol;
  	}

    t.commit();
    datosRespuesta.grupo = grupo;
    datosRespuesta.grupoetapa = grupoetapa;
    datosRespuesta.animador = animador;
    return respuesta.okCreate(res, datosRespuesta);

	}).catch( fail => {
		return respuesta.error(res, 'No se pudo crear el grupo', '', fail);
	});
};

module.exports.editarGrupo = (req, res, next) => {
	let grupo = {
		id: req.params.id_grupo,
		nombre: req.body.nombre,
    	tipo: req.body.tipo,
    	cantidadChicos: req.body.cantidadChicos,
    	numeroReuniones: req.body.numeroReuniones,
    	genero: req.body.genero,
    	etapaAntigua: req.body.etapaAntigua,
    	etapaNueva: req.body.etapaNueva,
    	animadorAntiguo: req.body.animadorAntiguo,
    	animadorNuevo: req.body.animadorNuevo
	};
	modelo.Grupo.editarGrupo(grupo, (successGrupo) => {
		let cambioEtapa = ( grupo.etapaNueva !== '' && grupo.etapaNueva !== grupo.etapaAntigua && grupo.etapaNueva !== null && grupo.etapaAntigua !== null);
		let cambioAnimador = ( grupo.animadorNuevo !== '' && grupo.animadorNuevo !== grupo.animadorAntiguo && grupo.animadorNuevo !== null && grupo.animadorAntiguo !== null);
		if(cambioEtapa){
			modelo.GrupoEtapa.cambiarGrupoDeEtapa(grupo.id, grupo.etapaAntigua, grupo.etapaNueva, (successCambioEtapa) => {
				//Se pudo cambiar al grupo de etapa
				if(cambioAnimador){
					modelo.Animador.cambiarAnimadorDeGrupo(grupo.id, grupo.animadorAntiguo, grupo.animadorNuevo, (successCambioAnimador) => {
						//Se pudo cambiar al animador
						return res.status(200).json({estado : true, datos : successCambioAnimador, mensaje: 'Se pudo editar el grupo y cambiar la etapa y el animador'});
					}, (errorUA) => {
						//Error al ponerle fechaFin al registro de animador
						return res.status(400).json({estado : false, datos : errorUA, mensaje: 'Se pudo editar el grupo y cambiar la etapa, no se pudo eliminar el registro antiguo del animador.'});
					}, (errorCA) => {
						//Error al crear el registro de animador
						return res.status(400).json({estado : false, datos : errorCA, mensaje: 'Se pudo editar el grupo, cambiar la etapa y eliminar el registro antiguo de animador, no se pudo crear el registro nuevo del animador.'});
					});
				}else{
					//Se pudo editar el grupo, cambiar la etapa. No se quiso cambiar el animador
					return res.status(200).json({estado : true, datos : successCambioEtapa, mensaje: 'Se pudo editar el grupo y cambiar la etapa'});
				}
			}, (errorUE) => {
				//Error al ponerle fechaFin al registro de grupoEtapa
				return res.status(400).json({estado : false, datos : errorUE, mensaje: 'Se pudo editar el grupo, no se pudo eliminar el registro antiguo de la etapa.'});
			}, (errorCE) => {
				//Error al crear el registro de grupoetapa
				return res.status(400).json({estado : false, datos : errorCE, mensaje: 'Se pudo editar el grupo y eliminar el registro antiguo de etapa, no se pudo crear el registro nuevo de la etapa.'});
			});
		}else{
			if(cambioAnimador){
				modelo.Animador.cambiarAnimadorDeGrupo(grupo.id, grupo.animadorAntiguo, grupo.animadorNuevo, (successCambioAnimador) => {
					//Se pudo editar el grupo y se pudo cambiar al animador. No se quiso cambiar de etapa
					return res.status(200).json({estado : true, datos : successCambioAnimador, mensaje: 'Se pudo editar el grupo y cambiar el animador.'});
				}, (errorUA) => {
					//Error al ponerle fechaFin al registro de animador
					return res.status(400).json({estado : false, datos : errorUA, mensaje: 'Se pudo editar el grupo, no se pudo eliminar el registro antiguo del animador.'});
				}, (errorCA) => {
					//Error al crear el registro de animador
					return res.status(400).json({estado : false, datos : errorCA, mensaje: 'Se pudo editar el grupo y eliminar el registro antiguo de animador, no se pudo crear el registro nuevo del animador.'});
				});
			}else{
				//Se pudo editar el grupo, no se quiso cambiar de etapa ni de animador
				return res.status(200).json({estado : true, datos : successGrupo, mensaje: 'Se pudo editar el grupo.'});
			}	
		}
	}, (errorGrupo) => {
		//No se pudo editar el grupo
		return res.status(400).json({estado : false, datos : errorGrupo, mensaje: 'No se pudo editar el grupo.'});
	});
};

module.exports.eliminarGrupo = (req, res, next) => {
	var id = req.params.id;

	modelo.Animador.destroy({
	  	where: {
	    	GrupoId : id
	  	}
	}).then( borrarAnimador => {

		modelo.ProcarianoGrupo.destroy({
		  	where: {
		    	GrupoId : id
		  	}
		}).then( borrarProcarianos => {

			modelo.GrupoEtapa.destroy({
			  	where: {
			    	GrupoId : id
			  	}
			}).then( borrarEtapa => {
				
				modelo.Grupo.destroy({
				  	where: {
				    	id : id
				  	}
				}).then( borrarGrupo => {
					
					let datos = {
						grupo: borrarGrupo,
						etapa: borrarEtapa,
						procarianos: borrarProcarianos,
						animador: borrarAnimador
					};
					return respuesta.okDelete(res, 'Eliminado exitosamente', datos);

				}).catch( errorGrupo => {
					return respuestas.errorDelete(res, 'un problema ocurrio', errorGrupo);
				})
				
			}).catch( errorEtapa => {
				return respuestas.errorDelete(res, 'un problema ocurrio', errorEtapa);
			})

		}).catch( errorProcariano => {
			return respuestas.errorDelete(res, 'un problema ocurrio', errorProcariano);
		})

	}).catch( errorAnimador => {
		return respuestas.errorDelete(res, 'un problema ocurrio', errorAnimador);
	})

}

/*
	@Descripción: Devuelve todos los grupos de la base de datos. Con su etapa.
*/
module.exports.mostrarGrupos = (req, res, next) => {
	modelo.Grupo.obtenerTodosLosGrupos((success) => {
		return respuesta.okGet(res, 'Se obtuvieron los grupos', success);
	}, (error) => {
		return respuesta.error(res, 'No se pudieron obtener los grupos', '', error);
	});
};

module.exports.anadirProcarianoAGrupo = (req, res, next, persona, procariano) => {
	modelo.ProcarianoGrupo.create({
		GrupoId: req.body.grupo,
		ProcarianoId: procariano.get('id'),
		fechaInicio: procariano.get('createdAt')
	}).then( procarianogrupo => {
		var rjson = {
			status : true,
			mensaje : 'Se pudo añadir el Procariano correctamente al Grupo',
			persona : persona,
			procariano : procariano,
			procarianogrupo: procarianogrupo
		};
		res.json(rjson);
	}).catch( error => {
		var rjson = {
			status : false,
			mensaje : 'No se pudo añadir Procariano al grupo',
			error : error
			}
		res.json(rjson);
	});
}

module.exports.obtenerGrupoPorId = (req, res, next) => {
	let idGrupo = req.params.id_grupo;
	modelo.Grupo.obtenerGrupoPorId(idGrupo, (grupo) => {
		
		modelo.Procariano.obtenerProcarianosDeGrupo(idGrupo, (procarianos) => {

			modelo.Animador.obtenerAnimadorDeGrupo(idGrupo, (animador) => {

				let idProcariano = animador.get('ProcarianoId');
				modelo.Procariano.obtenerProcarianoPorId(idProcariano, (procarianoAnimador) => {
					return res.status(200).json({status: true, grupo: grupo, procarianos: procarianos, animador: animador, procarianoAnimador: procarianoAnimador});
				}, (errorProcarianoAnimador) => {
					return res.status(400).json({status: false, procarianos: procarianos, animador: animador, error: errorProcarianoAnimador});
				});
				
			}, (errorAnimador) => {
				return res.status(400).json({status: false, procarianos: procarianos, error: errorAnimador});
			});			
			
		}, (errorProcarianos) => {
			return res.status(400).json({status: false, error: errorProcarianos});
		});
		
	}, (errorGrupo) => {
		return res.status(400).json({status: false, error: errorGrupo});
	});
};

////////////////////////////////////////////////////////////
//FUNCIONES INTERNAS
////////////////////////////////////////////////////////////
function inicializarTransaccion(){
	return new Promise( (resolve, reject) => {
		modelo.sequelize.transaction({
			autocommit: false,
		})
		.then( result => {
			return resolve(result);
		})
		.catch( fail => {
			return reject(fail);
		});
	});
}
