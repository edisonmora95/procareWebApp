/*
@Descripcion: Clase para representar el concepto de Grupo
@Autor: Gustavo Totoy
@FechaCreacion: 31/05/2017
@UltimaFechaModificacion: 31/05/2017 @GustavoTotoy
*/

var modelo = require('../models');

module.exports.crearGrupo = (req, res, next) => {
	nombre = req.body.nombre
	tipo = req.body.tipo
	cantidadChicos = req.body.cantidadChicos
	numeroReuniones = req.body.numeroReuniones
	genero = req.body.genero

	modelo.Grupo.create({
		nombre : nombre,
		tipo : tipo,
		cantidadChicos : cantidadChicos,
		numeroReuniones : numeroReuniones,
		genero : genero
	}).then( grupo => {
		var rjson = {
			status : true,
			mensaje : 'Grupo creado exitosamente',
			sequelizeStatus : grupo
		}
		res.json(rjson);
	}).catch( error => {
		var rjson = {
			status : false,
			mensaje : 'No se pudo crear grupo',
			sequelizeStatus : error
		}
		res.json(rjson);
	});
}

module.exports.editarGrupo = (req, res, next) => {
	var id = req.body.id;
	modelo.Grupo.update({
		nombre : req.body.nombre,
		tipo : req.body.tipo,
		cantidadChicos : req.body.cantidadChicos,
		numeroReuniones : req.body.numeroReuniones,
		genero : req.body.genero
	}, {
	  where: {
	    id : id
	  }
	}).then( grupo => {
		var rjson = {
			status : true,
			mensaje : 'Grupo actualizado exitosamente',
			sequelizeStatus : grupo
		}
		res.json(rjson)
	}).catch( err => {
		var rjson = {
			status : false,
			mensaje : 'No se pudo actualizar el Grupo',
			sequelizeStatus : error
		}
		res.json(rjson);
	});
};

module.exports.eliminarGrupo = (req, res, next) => {
	var id = req.body.id;
	modelo.Grupo.destroy({
	  	where: {
	    	id : id
	  	}
	}).then( resultado => {
		var rjson = {
			status : true,
			mensaje : 'Grupo eliminado exitosamente',
			sequelizeStatus : resultado
		}
		res.json(rjson)
	}).catch( err => {
		var rjson = {
			status : false,
			mensaje : 'No se pudo eliminar el Grupo',
			sequelizeStatus : error
		}
		res.json(rjson);
	});
};

module.exports.mostrarGrupos = (req, res, next) => {
	modelo.Grupo.findAll().then( grupos => {
		var status = true;
		var mensaje = 'Se obtuvieron los grupos correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : grupos
		}
		res.json(jsonRespuesta)
	}).catch( error => {
		var status = false;
		var mensaje = 'No se pudieron obtener los grupos'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	});
};