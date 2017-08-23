var modelo = require('../models');
let respuesta = require('../utils/respuestas');


module.exports.mostrarCalendario = (req, res, next) => {

	modelo.Tarea.obtenerTodasLasTareas( (tareas) => {

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