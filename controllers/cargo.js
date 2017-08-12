var modelo = require('../models');
var utils = require('../utils/utils')

/*
Autor : erialper
Creado : 21/06/2017
Modificado: 21/06/2017
Por: erialper , agregados campos convencional y fecha date

*/

const asignarDirectorFormacion = (req, res, next) => {
	modelo.Rol.findOne({
		where: {
			nombre: req.body.nombre
		}
	}).then(Rol => {
		modelo.PersonaRol.create({
			PersonaId : req.body.personaId,
			RolNombre : req.body.nombre,
			fechaInicio : new Date(),
			fechaFin : null
		}).then( repuesta2 => {
			var status = true;
			var mensaje = 'se pudo crear correctamente'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				PersonaRol : repuesta2,
				Rol: rol
			}
			res.json(jsonRespuesta)
		}).catch( error4 => {
			var status = false;
			var mensaje = 'no se pudo crear'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				PersonaRol : error4
			}
			res.json(jsonRespuesta);
		});
	}).catch( error1 => {
		var status = false;
		var mensaje = 'no existe cargo'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			Rol : error1
		}
		res.json(jsonRespuesta);
	});
}

module.exports = {
	asignarDirectorFormacion
};