/*
	@Descripcion: Creacion de Tareas.
	@Autor: Jose Alcivar Garcia
	@FechaCreacion: 17/06/2017
	@UltimaFechaModificacion: 17/06/2017 @josealcivar
*/
'use strict';

const ModeloTarea = require('../models').Tarea;
let respuesta 		= require('../utils/respuestas');
let co 						= require('co');
let sequelize	 		= require('../models/').sequelize;

/*
	@Autor: Jose Alcivar
	@Descripción:
		* Crea el registro de tarea
	@ÚltimaModificación:
		17/11/2017 @edisonmora95  Cambiado a Promesas
		24/02/2018 @edisonmora95	Modificada respuesta
*/
const crearTarea = (req, res) => {
	let fechaFin = null;
	if( req.body.fechaFin != '' ){
		fechaFin = req.body.fechaFin;
	}
	const tarea = {
		nombre 					 : req.body.nombre,
		fechaPublicacion : req.body.fechaPublicacion,
		fechaInicio 		 : req.body.fechaInicio,
		fechaFin 				 : fechaFin,
		prioridad 			 : req.body.prioridad,
		estado 					 : req.body.estado,
		descripcion 		 : req.body.descripcion,
		categoria 			 : req.body.categoria,
		idResponsable 	 : parseInt(req.body.responsable),
		tipo 						 : 'tarea'
	};
	ModeloTarea.crearTareaP(tarea)
	.then( datos => {
		return respuesta.okCreate(res, 'Tarea creada correctamente', datos.get('id'));
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
}

/*
	@Autor: Jose Alcivar
	@Descripción:
		* Elimina el registro de tarea
	@ÚltimaModificación:
		17/11/2017 @edisonmora95 Cambiado a Promesas
		24/02/2018  @edisonmora95 Modificado orden de funciones
*/
const eliminarTarea = (req, res, next) => {
	const idTarea = req.params.id;
	inicializarTransaccion()
	.then( t => {
		ModeloTarea.eliminarTareaT(idTarea, t)
		.then( resultado => {
			t.commit();
			return respuesta.okDelete(res, 'Tarea eliminada correctamente', resultado);
		})
		.catch( fail => {
			t.rollback();
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
}

const editarTarea = (req, res, next) => {
		ModeloTarea.update({
			id_responsable: req.body.nombre,
			nombre: req.body.nombre,
			fecha_publicacion: req.body.fecha_publicacion,
			fecha_limite: req.body.fecha_limite,
			prioridad: req.body.prioridad,
			estado: req.body.estado,
			descripcion: req.body.descripcion,
			categoria: req.body.categoria

		}, {
			where: {
				id: req.params.id
			}
		}).then(repuesta => {
			var status = true;
			var mensaje = 'se pudo editar correctamente'
			var jsonRespuesta = {
				status: status,
				mensaje: mensaje,
				sequelizeStatus: repuesta
			}
			res.json(jsonRespuesta)
		}).catch(error => {
			var status = false;
			var mensaje = 'no se pudo eliminar'
			var jsonRespuesta = {
				status: status,
				mensaje: mensaje,
				sequelizeStatus: error
			}
			res.json(jsonRespuesta);
		});
}

/*
  @UltimaModificacion:
    24/02/2018  @edisonmora95 Modificado formato de respuesta
*/
const mostrarTareaPorUsuario = (req, res) => {
	const idResponsable = req.params.id;
	ModeloTarea.obtenerTareasDeUsuarioP(idResponsable)
	.then( tareas => {
		const datos = tareas.map(tarea => {
			return Object.assign({}, {
				id 					: tarea.id,
				idUser 			: tarea.Persona.id,
				title 			: tarea.titulo,
				user 				: tarea.Persona.nombres + " " + tarea.Persona.apellidos,
				start 			: tarea.fecha_publicacion,
				end 				: tarea.fecha_limite,
				description : tarea.descripcion,
				type 				: "tarea"
			});
		});
		return respuesta.okGet(res, 'Búsqueda exitosa', datos);
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
}

/*
  @UltimaModificacion:
    24/02/2018  @edisonmora95 Modificado formato de respuesta
*/
const mostrarTareas = (req, res, next) => {
	ModeloTarea.obtenerTodasLasTareasP()
	.then( tareas => {
		const datos = tareas.map(tarea => {
			return Object.assign({}, {
				id 					: tarea.id,
				idUser 			: tarea.Persona.id,
				title 			: tarea.titulo,
				user 				: tarea.Persona.nombres + " " + tarea.Persona.apellidos,
				start 			: tarea.fechaInicio,
				end 				: tarea.fechaFin,
				description : tarea.descripcion,
				type 				: "tarea"
			});
		});
		return respuesta.okGet(res, 'Búsqueda exitosa', datos);
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
}

const cambiarEstado = (req, res, next) => {
  const idTarea     = req.params.id;
  const estadoNuevo = req.body.estadoNuevo;

  ModeloTarea.cambiarEstadoP(idTarea, estadoNuevo)
  .then( success => {
  	return respuesta.okUpdate(res, 'Tarea cambiada de estado', success);  
  })
  .catch( fail => {
  	return respuesta.ERROR_SERVIDOR(res, fail);
  });
};


module.exports = {
  crearTarea,
  eliminarTarea,
  editarTarea,
  mostrarTareaPorUsuario,
  mostrarTareas,
  cambiarEstado
}


function inicializarTransaccion(){
	return new Promise( (resolve, reject) => {
		sequelize.transaction({
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