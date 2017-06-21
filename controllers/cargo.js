var modelo = require('../models');
var utils = require('../utils/utils')

/*
Autor : erialper
Creado : 21/06/2017
Modificado: 21/06/2017
Por: erialper , agregados campos convencional y fecha date

*/

const crearCargoFundacion = (req, res, next) => {
	modelo.CargoFundacion.create({
		nombre : req.body.nombre,
		descripcion : req.body.descripcion,
		sueldo : req.body.sueldo
	}).then( repuesta => {
		modelo.Rol.create({
			nombre : req.body.nombre,
			descripcion : req.body.descripcion,
		}).then( repuesta => {
			var status = true;
			var mensaje = 'se pudo crear correctamente'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : repuesta
			}
			res.json(jsonRespuesta)
		}).catch( error => {
			var status = false;
			var mensaje = 'no se pudo crear'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : error
			}
			res.json(jsonRespuesta);
		});
	}).catch( error => {
		var status = false;
		var mensaje = 'no se pudo crearx2'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
}

const crearCargoFormacion = (req, res, next) => {
	modelo.CargoFormacion.create({
		nombre : req.body.nombre,
		descripcion : req.body.descripcion,
	}).then( repuesta => {
		modelo.Rol.create({
			nombre : req.body.nombre,
			descripcion : req.body.descripcion,
		}).then( repuesta => {
			var status = true;
			var mensaje = 'se pudo crear correctamente'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : repuesta
			}
			res.json(jsonRespuesta)
		}).catch( error => {
			var status = false;
			var mensaje = 'no se pudo crear'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : error
			}
			res.json(jsonRespuesta);
		});
	}).catch( error => {
		var status = false;
		var mensaje = 'no se pudo crear'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
}

const asignarCargoFormacion = (req, res, next) => {
	modelo.CargoFormacion.findOne({
		where: {
			nombre: req.body.nombre
		}
	}).then(CargoFormacion => {
		modelo.ProcarianoCargoFormacion.create({
			CargoFormacionId : CargoFormacion.get('id'),
			ProcarianoId : req.body.procarianoId,
			fechaInicio : new Date(),
			fechaFin : null
		}).then( repuesta => {
			var status = true;
			/*
			modelo.personaRol.create({
				PersonaId : req.body.procarianoId,
				RolNombre : req.body.nombre,
			}).then( repuesta2 => {
				var status = true;
				var mensaje = 'se pudo crear correctamente'
				var jsonRespuesta = {
					status : status,
					mensaje : mensaje,
					sequelizeStatus : repuesta2
				}
				res.json(jsonRespuesta)
			}).catch( error4 => {
				var status = false;
				var mensaje = 'no se pudo crear'
				var jsonRespuesta = {
					status : status,
					mensaje : mensaje,
					sequelizeStatus : error4
				}
				res.json(jsonRespuesta);
			});
			*/

		}).catch( error2 => {
			var status = false;
			var mensaje = 'no se pudo asignar'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : error2
			}
			res.json(jsonRespuesta);
		});
	}).catch( error1 => {
		var status = false;
		var mensaje = 'no existe cargo'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error1
		}
		res.json(jsonRespuesta);
	});
}

module.exports = {
	crearCargoFundacion,
	crearCargoFormacion,
	asignarCargoFormacion
};

