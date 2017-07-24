var modelo = require('../models');

const crearAnimadorAPartirDeProcariano = (procarianoId,fechaInicio,fechaFin) => {
	modelo.Animador.create({
		ProcarianoId : procarianoId,
		fechaInicio : new Date(fechaInicio),
		fechaFin : new Date(fechaFin)
	}).then(animador => {
		return [true, animador];
	}).catch( error => {
		return [false, error];
	});
}

const agregarAnimadorAGrupo = (animadorId,grupoId) => {
	modelo.Animador.update({
		GrupoId : grupoId
	}, {
	  where: {
	    id : animadorId
	  }
	}).then(animador => {
		return true;
	}).catch( error => {
		return false;
	});
}

module.exports.crearAnimadorAPartirDeProcarianoYAgregarAGrupo = (req,res,next) => {
	procarianoId = req.body.procarianoId;
	fechaInicio = req.body.fechaInicio;
	fechaFin = req.body.fechaFin;
	var rAnimador = crearAnimadorAPartirDeProcariano(procarianoId, fechaInicio, fechaFin);
	var exito = rAnimador[0];
	var rjson;
	if (exito) {
		var animador = rAnimador[1];
		grupoId = req.body.grupoId;
		exito = agregarAnimadorAGrupo(animador.id, grupoId);
		if (exito) {
			rjson = {
				status : true,
				mensaje : 'Animador creado y agregado a grupo correctamente',
				sequelizeStatus : animador
			}
		} else {
			rjson = {
				status : false,
				mensaje : 'Animador creado pero No agregado al grupo',
				sequelizeStatus : error
			}
		}
	} else {
		error = rAnimador[1];
		rjson = {
			status : false,
			mensaje : 'No se pudo crear el animador',
			sequelizeStatus : error
		}
	}
	res.json(rjson)
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

module.exports.mostrarProcarianosPosiblesAnimadores = (req,res,next) => {
	modelo.Tipo.findOne({
		where: {nombre: 'Chico Formación'}
	}).then(tipo => {
		modelo.ProcarianoTipo.findAll({
			include : [{
        model: modelo.Procariano,
        required : true/*
        include : [{
	        model: modelo.Persona			        
		    }]*/
	    }],
		    where : {
		    	TipoId : { $not: tipo.id }
		    }
		}).then(result => {
			var rjson = {
				status : true,
				mensaje : 'Se obtuvieron los Posibles Animadores correctamente',
				sequelizeStatus : result
			}
			res.json(rjson)
		}).catch( error => {
			var rjson = {
				status : false,
				mensaje : 'No se pudieron obtener los Posibles Animadores',
				sequelizeStatus : error
			}
			res.json(rjson);
		});
	});
}