/*
@Descripcion: Clase para representar el concepto de Grupo
@Autor: Gustavo Totoy
@FechaCreacion: 31/05/2017
@UltimaFechaModificacion: 31/05/2017 @GustavoTotoy
*/

var modelo = require('../models');

module.exports.crearGrupo = (req, res, next) => {
	nombre = req.body.nombre;
	tipo = req.body.tipo;
	cantidadChicos = req.body.cantidadChicos;
	numeroReuniones = req.body.numeroReuniones;
	genero = req.body.genero;
	idEtapa = req.body.etapa;
	idAnimador = req.body.animador;
	
	modelo.Grupo.crearGrupo(nombre, tipo, cantidadChicos, numeroReuniones, genero, (grupo) => {
		let idGrupo = grupo.get('id');
		modelo.GrupoEtapa.crearGrupoEtapa(idGrupo, idEtapa, (grupoEtapa) => {
			modelo.Animador.agregarAnimadorAGrupo(idAnimador, idGrupo, (animador) => {
				var rjson = {
					status : true,
					mensaje : 'Grupo creado exitosamente',
					grupo : grupo,
					grupoEtapa: grupoEtapa,
					animador: animador
				}
				res.json(rjson);	
			}, (errorAnimador) => {
				var rjson = {
					status : false,
					mensaje : 'No se pudo añadir el animador',
					grupo : grupo,
					grupoEtapa: grupoEtapa,
					errorAnimador: errorAnimador
				}
				res.json(rjson);	
			});
			
		}, (errorGrupoEtapa) => {
			var rjson = {
				status : false,
				mensaje : 'No se pudo añadir a etapa indicada',
				grupo: grupo,
				errorGrupoEtapa : errorGrupoEtapa
			}
			res.json(rjson);
		});
		
	}, (errorGrupo) => {
		var rjson = {
			status : false,
			mensaje : 'No se pudo crear grupo',
			errorGrupo : errorGrupo
		}
		res.json(rjson);
	});

}

module.exports.editarGrupo = (req, res, next) => {
	var id = req.body.id;
	modelo.Grupo.update({
		nombre : req.body.nombre,
		tipo : req.body.tipo,
		cantidadChicos : req.body.cantidadChicos,
		numeroReuniones : req.body.numeroReuniones,
		genero : req.body.genero
	}, {
	  where: {
	    id : id
	  }
	}).then( grupo => {
		var rjson = {
			status : true,
			mensaje : 'Grupo actualizado exitosamente',
			sequelizeStatus : grupo
		}
		res.json(rjson)
	}).catch( err => {
		var rjson = {
			status : false,
			mensaje : 'No se pudo actualizar el Grupo',
			sequelizeStatus : error
		}
		res.json(rjson);
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

module.exports.mostrarGrupos = (req, res, next) => {
	modelo.Grupo.findAll().then( grupos => {
		var status = true;
		var mensaje = 'Se obtuvieron los grupos correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : grupos
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'No se pudieron obtener los grupos'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
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
