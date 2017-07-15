let modelo = require('../models');

module.exports.anadirProcarianosAGrupo = (req, res, next) => {
	modelo.Procarianogrupo.bulkCreate([req.grupos])
		.then(() => {
			return Procarianogrupo.findAll();
		}).then( pg => {
			var json1 = {
			status : true,
			mensaje : 'Se pudo añadir correctamente',
			procarianogrupo: pg
		};
		res.json(json1);
		});

/*
	modelo.Procarianogrupo.bulkCreate({
		GrupoId: req.body.grupo,
		ProcarianoId: req.body.procariano,
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
			error : errorIngresarGrupo
			}
		res.send(json1);
	})
	*/
};

