var modelo = require('../models');
let respuesta 		 = require('../utils/respuestas');
const ModeloTarea  = require('../models').Tarea;
const ModeloEvento = require('../models').Evento;
let co 						 = require('co');

/*
	@Modificaciones:
		25/02/2018	@edisonmora95	Cambiado a Promise.all()
*/
module.exports.mostrarCalendario = (req, res, next) => {
	Promise.all([
		ModeloTarea.obtenerTodasLasTareasP(),
		ModeloEvento.obtenerTodosLosEventosP()
	])
	.then( values => {
		let tareas  = values[0];
		let eventos = values[1];

		tareas  = asignarObjetos(tareas, 'tarea');
		eventos = asignarObjetos(eventos, 'evento');

		const datos = tareas.concat(eventos);
		 return respuesta.okGet(res, 'Búsqueda exitosa', datos);
	})
	.catch( fail => {
    return respuesta.ERROR_SERVIDOR(res, fail);
  });
};

function asignarObjetos(arrayT, tipo){
	return arrayT.map( tarea => {
		if( tarea.fechaFin == null ){
			tarea.allDay = true;
		}
		return Object.assign({}, {
			id 					: tarea.id,
			idUser 			: tarea.Persona.id,
			title 			: tarea.nombre,
			user 				: tarea.Persona.nombres + " " + tarea.Persona.apellidos,
			start 			: tarea.fechaInicio,
			end 				: tarea.fechaFin,
			description : tarea.descripcion,
			type 				: tipo,
			allDay 			: tarea.allDay
		})
	});
}

/*
	@Modificaciones:
		25/02/2018	@edisonmora95	Cambiado a Promise.all()
*/
module.exports.mostrarCalendarioUsuario = (req, res, next) => {
	const idResponsable = req.params.id_responsable;

	Promise.all([
		ModeloTarea.obtenerTareasDeUsuarioP(idResponsable),
		ModeloEvento.obtenerTodosLosEventosP()
	])
	.then( values => {
		let tareas  = values[0];
		let eventos = values[1];
		tareas  = asignarObjetos(tareas, 'tarea');
		eventos = asignarObjetos(eventos, 'evento');

		const datos = tareas.concat(eventos);
		 return respuesta.okGet(res, 'Búsqueda exitosa', datos);
	})
	.catch( fail => {
    return respuesta.ERROR_SERVIDOR(res, fail);
  });
};