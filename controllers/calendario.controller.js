var modelo = require('../models');
let respuesta 		 = require('../utils/respuestas');
const ModeloTarea  = require('../models').Tarea;
const ModeloEvento = require('../models').Evento;
let co 						 = require('co');


module.exports.mostrarCalendario = (req, res, next) => {
	co(function *(){
		let tareas  = yield ModeloTarea.obtenerTodasLasTareasP();
		let eventos = yield ModeloEvento.obtenerTodosLosEventosP();

		tareas  = asignarObjetos(tareas, 'tarea');
		eventos = asignarObjetos(eventos, 'evento');

		const datos = tareas.concat(eventos);
		 return respuesta.okGet(res, 'Tareas y eventos obtenidos exitosamente', datos);
	})
	.catch( fail => {
		return respuesta.error(res, 'No se pudieron obtener las tareas', '', fail);
	});
}

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


module.exports.mostrarCalendarioUsuario = (req, res, next) => {
	const idResponsable = req.params.id_responsable;

	modelo.Tarea.obtenerTareasDeUsuario(idResponsable, (tareas) => {

		modelo.Evento.obtenerTodosLosEventos( (eventos) => {

			const tareasEventos = tareas.concat(eventos);
	    const aux = tareasEventos.map( elemento => {
	    	return Object.assign(
        {},
        {
          id : elemento.id,
	        title : elemento.nombre,         
	        start : elemento.fechaInicio ,
	        end : elemento.fechaFin ,
	        description : elemento.descripcion, 
	        estado: elemento.estado,
	        categoria: elemento.categoria,
	        prioridad: elemento.prioridad,
	        type: elemento.tipo,
	        idResponsable: elemento.idResponsable,
	        idOrganizador: elemento.idOrganizador
		    });
      });
      return respuesta.okGet(res, 'Tareas y eventos obtenidos exitosamente', aux);
		}, (errorEvento) => {
			return respuesta.error(res, 'No se pudieron obtener los eventos', '', errorEvento);
		});
	}, (errorTarea) => {
		return respuesta.error(res, 'No se pudieron obtener las tareas', '', errorTarea);
	});
};