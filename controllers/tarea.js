/*
	@Descripcion: Creacion de Tareas.
	@Autor: Jose Alcivar Garcia
	@FechaCreacion: 17/06/2017
	@UltimaFechaModificacion: 17/06/2017 @josealcivar
*/
'use strict';

let modelo    = require('../models');
const ModeloTarea = require('../models').Tarea;
let respuesta 		= require('../utils/respuestas');
let co 						= require('co');
let sequelize	 		= require('../models/').sequelize;

/*
	@Autor: Jose Alcivar
	@Descripción:
		* Crea el registro de tarea
	@ÚltimaModificación:
		17/11/2017 @edisonmora95 Cambiado a Promesas
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
		return respuesta.okCreate(res, 'Tarea creada correctamente', datos);
	})
	.catch( fail => {
		const mensajeError = fail.errors[0].message;
		return respuesta.error(res, 'No se pudo crear la tarea', mensajeError, fail);
	});
}

/*
	@Autor: Jose Alcivar
	@Descripción:
		* Elimina el registro de tarea
	@ÚltimaModificación:
		17/11/2017 @edisonmora95 Cambiado a Promesas
*/
const eliminarTarea = (req, res, next) => {
	const idTarea = req.params.id;
	let mensaje   = 'Tarea eliminada correctamente';
	co(function* (){
		let t =	yield inicializarTransaccion();
		yield ModeloTarea.eliminarTareaT(idTarea, t);
		t.commit();
		return respuesta.okDelete(res, mensaje, null);
	})
	.catch(error => {
		const mensajeError = error.errors[0].message;
		return respuesta.error(res, 'No se pudo eliminar la tarea', mensajeError, error);
	});
}

const editarTarea = (req, res, next) => {
		modelo.Tarea.update({
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
	.catch( error => {
		const mensajeError = error.errors[0].message;
		return respuesta.error(res, 'No se pudieron obtener las tareas', mensajeError, error);
	});
}

const mostrarTareas = (req, res, next) => {
	ModeloTarea.obtenerTodasLasTareasP()
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
	.catch( error => {
		const mensajeError = error.errors[0].message;
		return respuesta.error(res, 'No se pudieron obtener las tareas', mensajeError, error);
	});
}

const cambiarEstado = (req, res, next) => {
  const idTarea = req.params.id;
  const estadoNuevo = req.body.estadoNuevo;
  let Tarea = modelo.Tarea;

  Tarea.cambiarEstado(idTarea, estadoNuevo, (success) => {
	
	const cantidadRegistrosCambiados = parseInt(success);
	
	if(cantidadRegistrosCambiados === 1){
	  return respuesta.okUpdate(res, 'Tarea cambiada de estado', success);  
	}else if( cantidadRegistrosCambiados > 1){
	  return respuesta.error(res, 'Se cambió de estado a ' + success + ' tareas', '', success);
	}else if( cantidadRegistrosCambiados < 1){
	  return respuesta.error(res, 'Error al intentar cambiar de estado', '', success);
	}

  }, (error) => {
	return respuesta.error(res, 'Error al intentar cambiar de estado', '', error);
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