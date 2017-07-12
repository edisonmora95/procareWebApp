var modelo = require('../models');

module.exports.crearAnimadorAPartirDeProcariano = (req,res,next) => {
	var procarianoId = req.procarianoId;
	var fechaInicio = req.fechaInicio;
	var fechaFin = req.fechaFin;

	modelo.Animador.create({
		ProcarianoId : procarianoId,
		fechaInicio : new Date(fechaInicio),
		fechaFin : new Date(fechaFin)
	}).then(animador => {
		var rjson = {
			status : true,
			mensaje : 'Animador creado exitosamente',
			sequelizeStatus : animador
		}
		res.json(rjson)
	}).catch( error => {
		var rjson = {
			status : false,
			mensaje : 'No se pudo crear el animador',
			sequelizeStatus : error
		}
		res.json(rjson);
	});
}

module.exports.mostrarAnimadores = (req,res,next) => {
	modelo.Animador.findAll().then( animadores => {
		var rjson = {
			status : true,
			mensaje : 'Se obtuvieron los Animadores correctamente',
			sequelizeStatus : animadores
		}
		res.json(rjson)
	}).catch( error => {
		var rjson = {
			status : false,
			mensaje : 'No se pudieron obtener los Animadores',
			sequelizeStatus : error
		}
		res.json(rjson);
	});
}

module.exports.agregarAnimadorAGrupo = (req,res,next) => {
	var animadorId = req.animadorId;
	var grupoId = req.grupoId;

	modelo.Animador.update({
		GrupoId : grupoId
	}, {
	  where: {
	    id : animadorId
	  }
	}).then(animador => {
		var rjson = {
			status : true,
			mensaje : 'Animador agregado a grupo correctamente',
			sequelizeStatus : animador
		}
		res.json(rjson)
	}).catch( error => {
		var rjson = {
			status : false,
			mensaje : 'No se pudo agregar Animador al grupo',
			sequelizeStatus : error
		}
		res.json(rjson);
	});
}

