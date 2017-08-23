var modelo = require('../models');

module.exports.crearReunion = (req, res, next) => {
        var grupoId = req.body.grupoId;
        var fecha = req.body.fecha;
        var horaInicio = req.body.horaInicio;
        var horaSalida = req.body.horaSalida;
        var descripcion = req.body.descripcion;

        modelo.Reunion.create({
            fecha: new Date(fechaInicio),
            horaInincio: new Date(horaInicio),
            horaSalida: new Date(horaSalida),
            descripcion: descripcion,
            GrupoId: grupoId
        }).then(reunion => {
            var rjson = {
                status: true,
                mensaje: 'Reunion creada exitosamente',
                sequelizeStatus: reunion
            }
            res.json(rjson)
        }).catch(error => {
            var rjson = {
                status: false,
                mensaje: 'No se pudo crear la reunion',
                sequelizeStatus: error
            }
            res.json(rjson);
        });
    }
    /*
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
    */