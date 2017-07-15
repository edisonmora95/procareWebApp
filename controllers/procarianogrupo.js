let modelo = require('../models');


module.exports.anadirProcarianoAGrupo = (req, res, next) => {
	let array = JSON.parse(req.body.integrantes.toString());
	console.log(array);
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
			//console.log(errorBuscar)
		}).catch( errorBuscar => {
			console.log('ERROR AL BUSCAR')
			var jsonRespuesta = {
				status : false,
				mensaje : 'ERROR AL BUSCAR',
				sequelizeStatus : errorBuscar
			}
			res.json(jsonRespuesta);
		})
	/*modelo.ProcarianoGrupo.create({
		GrupoId: req.body.GrupoId,
		ProcarianoId: req.body.ProcarianoId,
		fechaInicio: req.body.fechaInicio,
		fechaFin: null
	}).then( procarianogrupo => {
		var json1 = {
			status : true,
			mensaje : 'Se pudo añadir correctamente',
			procarianogrupo: procarianogrupo
		};
		res.json(json1);
	}).catch( error => {
		var json1 = {
			status : false,
			mensaje : 'No se pudo añadir al grupo',
			error : error
			}
		res.send(json1);
	})*/

};

