let modelo = require('../models');

/*
	@Descripción:
		Añade un array de procarianos a un grupo
*/
module.exports.anadirProcarianosAGrupo = (req, res, next) => {
	let array = JSON.parse(req.body.integrantes.toString());
	modelo.ProcarianoGrupo.bulkCreate(array)
		.then( () => {
			return modelo.ProcarianoGrupo.findAll();
		}).then( pg => {
			console.log('Exito al ingresar')
			var jsonRespuesta = {
				status : true,
				mensaje : 'Éxito al ingresar',
				sequelizeStatus : pg
			}
			res.json(jsonRespuesta)
		}).catch( errorIngresar => {
			console.log('ERROR AL INGRESAR')
			var jsonRespuesta = {
				status : false,
				mensaje : 'ERROR AL INGRESAR',
				sequelizeStatus : errorIngresar
			}
			res.json(jsonRespuesta);
		}).catch( errorBuscar => {
			console.log('ERROR AL BUSCAR')
			var jsonRespuesta = {
				status : false,
				mensaje : 'ERROR AL BUSCAR',
				sequelizeStatus : errorBuscar
			}
			res.json(jsonRespuesta);
		});
};

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

	//Primero hay que poner una fecha final al registro del procariano en su antiguo grupo
	modelo.ProcarianoGrupo.update({
		fechaFin: Date.now()
	}, {
		where: {
			ProcarianoId : idProcariano,
			GrupoId: idPrevioGrupo
		}
	}).then( result1 => {
		//Luego se añade un nuevo registro del nuevo grupo del procariano
		modelo.ProcarianoGrupo.create({
			fechaInicio: Date.now(),
			fechaFin: null,
			GrupoId: idNuevoGrupo,
			ProcarianoId: idProcariano
		}).then( result2 => {
			//Si se pudo editar y crear
			let jsonRespuesta = {
				status: true,
				mensaje: 'Se pudo editar y crear el nuevo registro',
				statusCrear: result2,
				statusActualizar: result1
			};
			res.json(jsonRespuesta);
		}).catch( err2 => {
			//Se pudo editar pero no crear el nuevo registro
			let jsonRespuesta = {
				status: false,
				mensaje: 'Se pudo editar pero no crear el nuevo registro',
				statusCrear: err2,
				statusActualizar: result1
			};
			res.json(jsonRespuesta);
		});
	}).catch( err1 => {
		//No se pudo editar ni crear el nuevo registro
		let jsonRespuesta = {
			status: false,
			mensaje: 'No se pudo editar ni crear el nuevo registro',
			statusCrear: err1,
			statusActualizar: null
		};
		res.json(jsonRespuesta);
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
