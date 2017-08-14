/*
@Descripcion: Clase para representar el concepto de Grupo
@Autor: Gustavo Totoy
@FechaCreacion: 31/05/2017
@UltimaFechaModificacion: 31/05/2017 @GustavoTotoy
*/
'use strict';
var modelo = require('../models');
let respuesta = require('../utils/respuestas');


module.exports.crearGrupo = (req, res, next) => {
	let grupoObj = {
		nombre : req.body.nombre,
		tipo : req.body.tipo,
		cantidadChicos : req.body.cantidadChicos,
		numeroReuniones:  req.body.numeroReuniones,
		genero : req.body.genero,
	};
	let idEtapa = req.body.etapa;
	let idAnimador = req.body.animador;
	
	modelo.Grupo.crearGrupo(grupoObj, (grupo) => {
		let idGrupo = grupo.get('id');
		modelo.GrupoEtapa.crearGrupoEtapa(idGrupo, idEtapa, (grupoEtapa) => {
			modelo.Animador.agregarAnimadorAGrupo(idAnimador, idGrupo, (animador) => {
				let datos = {
					grupo : grupo,
					grupoEtapa: grupoEtapa,
					animador: animador
				};
				return respuesta.okCreate(res, 'Grupo creado exitosamente', datos);
			}, (errorAnimador) => {
				let datos = {
					grupo : grupo,
					grupoEtapa: grupoEtapa,
					errorAnimador: errorAnimador
				};
				return respuesta.error(res, 'No se pudo añadir el animador', datos);
			});
		}, (errorGrupoEtapa) => {
			let datos = {
				grupo: grupo,
				errorGrupoEtapa : errorGrupoEtapa
			};
			return respuesta.error(res, 'No se pudo añadir a la etapa', datos);
		});
	}, (errorGrupo) => {
		let mensajeError = errorGrupo.errors[0].message;
		return respuesta.error(res, 'No se pudo crear el grupo', mensajeError, errorGrupo);
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
	var id = req.body.id;
	modelo.Grupo.destroy({
	  	where: {
	    	id : id
	  	}
	}).then( resultado => {
		var rjson = {
			status : true,
			mensaje : 'Grupo eliminado exitosamente',
			sequelizeStatus : resultado
		}
		res.json(rjson)
	}).catch( err => {
		var rjson = {
			status : false,
			mensaje : 'No se pudo eliminar el Grupo',
			sequelizeStatus : error
		}
		res.json(rjson);
	});
};
/*
	@Descripción: Devuelve todos los grupos de la base de datos. Con su etapa.
*/
module.exports.mostrarGrupos = (req, res, next) => {
	modelo.Grupo.obtenerTodosLosGrupos((success) => {
		return respuesta.okGet(res, 'Se obtuvieron los grupos', success);
	}, (error) => {
		return respuesta.error(res, 'No se pudieron obtener los grupos', error);
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


//FUNCIONES INTERNAS
/*
cambiarAnimadorDeGrupo(){

}*/