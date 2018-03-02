let modelo = require('../models');
let respuesta = require('../utils/respuestas');

/*
	@Descripción:
		Obtiene el grupo de un procariano a partir del id
		Se muestra el grupo que tiene fechaFin = null ya que ese debe ser el actual
*/
module.exports.obtenerGrupoDeProcariano = (req, res, next) => {
	let id = req.params.id_procariano;
	modelo.ProcarianoGrupo.find({
		where: {
			ProcarianoId : parseInt(id),
			fechaFin: null
		}
	}).then( registro => {
		obtenerGrupoPorId(registro, res);
	});
}

/*
	@Descripción:
		Cambia a un procariano de un grupo a otro
		Pone fechaFin al registro del grupo antiguo de ese procariano
		Ingresa un nuevo registro del grupo nuevo del procariano
	@Return:
		Http response
*/
module.exports.cambiarDeGrupo = (req, res, next) => {
	let idProcariano = req.params.id_procariano;
	let idNuevoGrupo = req.body.idGrupoNuevo;
	let idPrevioGrupo = req.body.idGrupoPrev;
	//Primero pongo una fecha fin al registro del procariano en su grupo anterior
	modelo.ProcarianoGrupo.eliminarProcarianoDeGrupo(idProcariano, idPrevioGrupo, (successUpdate) => {
		//Luego añado un nuevo registro del nuevo grupo del procariano
		modelo.ProcarianoGrupo.anadirProcarianoAGrupo(idNuevoGrupo, idProcariano, new Date(), (successCrear) => {
			return respuesta.okCreate(res, 'Procariano cambiado de grupo.', successCrear);
		}, (errorCrear) => {
			return respuesta.error(res, 'No se pudo añadir al nuevo grupo.', '', errorCrear);
		});
	}, (errorEliminar) => {
		return respuesta.error(res, 'No se pudo quitar del grupo anterior.', '' , errorEliminar);
	});
}

/*
	@Descripción:
		Añade un procariano a un grupo indicado
*/
module.exports.anadirProcarianoAGrupo = (req, res, next) => {
	const idGrupo = req.body.idGrupo;
	const idProcariano = req.body.idProcariano;
	const fechaInicio = new Date();
	modelo.ProcarianoGrupo.anadirProcarianoAGrupo(idGrupo, idProcariano, fechaInicio, (sucess) => {
		return respuesta.okCreate(res, 'Procariano añadido a grupo.', sucess);
	}, (error) => {
		return respuesta.error(res, 'No se pudo añadir a grupo', '', error);
	});
}

/*
	@Descripción:
		Saca a un procariano de un grupo indicado
*/
module.exports.eliminarProcarianoDeGrupo = (req, res, next) => {
	const idGrupo = req.body.idGrupo;
	const idProcariano = req.params.id_procariano;
	modelo.ProcarianoGrupo.eliminarProcarianoDeGrupo(idProcariano, idGrupo, (sucess) => {
		return respuesta.okUpdate(res, 'Procariano quitado de grupo', sucess);
	}, (error) => {
		return respuesta.error(res, 'No se pudo quitar al procariano del grupo', '', error);
	});
}

//FUNCIONES
/*
	@Descripción: 
		Dado un id del grupo se obtiene toda su información.
	@Return:
		Http response
*/
obtenerGrupoPorId = (registro, res) => {
	modelo.Grupo.find({
		where: {
			id: registro.GrupoId
		}
	}).then( grupo => {
		let jsonRespuesta = {
			status: true,
			mensaje: 'Registro encontrado',
			procarianogrupo: registro,
			grupo: grupo
		};
		res.json(jsonRespuesta);
	});
}
