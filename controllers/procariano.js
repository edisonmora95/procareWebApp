/*
@Descripcion: Clase controladora de todos los procarianos
@Autor: Jose Viteri
@FechaCreacion: 26/06/2017
@UltimaFechaModificacion: 07/06/2017 @JoseViteri (cambios detallados abajo)
*/


var modelo = require('../models');
var utils = require('../utils/utils')
var ControladorGrupo = require('../controllers/grupo');


/*
Autor : JV
Creado : 26/06/2017
Modificado: 07/07/2017
Por: @edanmora95	separados en dos funciones para entender mejor
*/
const crearProcariano = (req, res, next) => {
	if(req.body.fechaNacimiento == ''){
		fechaNacimiento = null;
	}else{
		fechaNacimiento = new Date(req.body.fechaNacimiento);	
	}

	modelo.Persona.create({
		cedula : req.body.cedula,
		nombres : req.body.nombres,
		apellidos : req.body.apellidos,
		direccion : req.body.direccion,
		fechaNacimiento : fechaNacimiento,
		genero : req.body.genero,
		contrasenna : req.body.contrasenna,
		email : req.body.email,
		celular : req.body.celular,
		trabajo : req.body.trabajo,
		convencional : req.body.convencional
	}).then( persona => {
		ingresarProcariano(req, res, next, persona);
	}).catch( error => {
		var json1 = {
			status : false,
			mensaje : 'No se pudo crear esta persona',
			error : error
			}
		res.send(json1);
	});
}


/*
Autor : JV
Creado : 28/05/2017
Modificado: 07/07/2017
Por : Jv , agregado meyodo generar JsonProcariano
*/

const buscarProcariano = (req, res , next) => {

	var jsonModelo = utils.generarJsonProcariano(req.query);
	
	modelo.Procariano.findAll({
	    include: [{
	        model: modelo.Persona ,
	        where: jsonModelo.persona
	    }], where : jsonModelo.procariano//aqui va el where
	    
	}).then( procarianos => {
		const respuesta = procarianos.map( procariano => {

			return Object.assign(
				{},
				{
					personaId : procariano.Persona.id,
					procarianoID : procariano.id ,
					colegio : procariano.colegio ,
					universidad : procariano.universidad ,
					parroquia : procariano.parroquia ,
					fechaOrdenacion : procariano.fechaOrdenacion ,
					haceParticipacionEstudiantil : procariano.hace_participacion_estudiantil ,
					cedula : procariano.Persona.cedula ,
					nombres : procariano.Persona.nombres ,
					apellidos : procariano.Persona.apellidos ,
					direccion : procariano.Persona.fechaNacimiento ,
					genero : procariano.Persona.genero ,
					fechaNacimiento : procariano.Persona.fechaNacimiento ,
					convencional : procariano.Persona.convencional ,
					celular : procariano.Persona.celular ,
					trabajo : procariano.Persona.trabajo,
					email: procariano.Persona.email,
					estado: procariano.estado
				});
		});
		return res.json(respuesta);
	});
	
};


/*
Autor : JV
Creado : 28/05/2017
Modificad8: 07/07/2017
Por : JV , para que modifique por ID
*/

const buscarProcarianoPorId = (req, res, next) => {
	//tener cuidado xq cualquiera podra ver este id
	var id = req.params.id;

	modelo.Procariano.findAll({
	    include: [{
	        model: modelo.Persona ,
	        where: {
	        	id  : id
	         }
	    }],
	    where : {
	    	PersonaId : id
	    }  
	}).then( procarianos => {
		const respuesta = procarianos.map( procariano => {

			return Object.assign(
				{},
				{
					personaId : procariano.Persona.id,
					procarianoID : procariano.id ,
					colegio : procariano.colegio ,
					universidad : procariano.universidad ,
					parroquia : procariano.parroquia ,
					fechaOrdenacion : procariano.fecha_ordenacion ,
					haceParticipacionEstudiantil : procariano.hace_participacion_estudiantil ,
					cedula : procariano.Persona.cedula ,
					nombres : procariano.Persona.nombres ,
					apellidos : procariano.Persona.apellidos ,
					direccion : procariano.Persona.direccion ,
					genero : procariano.Persona.genero ,
					fechaNacimiento : procariano.Persona.fechaNacimiento ,
					convencional : procariano.Persona.convencional ,
					celular : procariano.Persona.celular ,
					trabajo : procariano.Persona.trabajo ,
					email: procariano.Persona.email,
					estado: procariano.estado
				});
		});
		return res.json(respuesta);
	});
};

/*
Autor : JV
Creado : 28/05/2017
Modificad8: 07/07/2017
por : JV , agregado date a datos date
*/

const editarProcariano = (req, res, next) => {
	var id = req.params.id;
	if(req.body.fechaOrdenacion == '' || req.body.fechaOrdenacion == null){
		fechaDeOrdenacion = null;
	}else{
		fechaDeOrdenacion = new Date(req.body.fechaOrdenacion);	
	}
	modelo.Persona.update({
		cedula : req.body.cedula,
		nombres : req.body.nombres,
		apellidos : req.body.apellidos,
		direccion :req.body.direccion,
		fechaNacimiento : new Date(req.body.fechaNacimiento),
		genero : req.body.genero,
		email :  req.body.email,
		celular : req.body.celular,
		trabajo : req.body.trabajo,
		convencional : req.body.convencional,
	  fechaOrdenacion : new Date(req.body.fechaOrdenacion),
	}, {
	  where: {
	    id : id
	  }
	}).then( result => {
		modelo.Procariano.update({
			colegio : req.body.colegio,
			universidad : req.body.universidad,
			parroquia : req.body.parroquia,
			fechaOrdenacion : fechaDeOrdenacion,
			haceParticipacionEstudiantil : req.body.haceParticipacionEstudiantil
		}, { 
			where : {
				PersonaId : id
			}
		}).then ( result2 => {
			asignarTipo(req,res,procariano);
			var status = true;
			var mensaje = 'se pudo actualizar correctamente'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : result2
			}
			res.json(jsonRespuesta)
		}).catch( err2 => {
			var status = false;
			var mensaje = 'no se pudo actualizar 2'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : err2
			}
			res.json(jsonRespuesta);
		});

	}).catch( err => {
			var status = false;
			var mensaje = 'no se pudo actualizar 1'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : err
			}
			res.json(jsonRespuesta);
	});
};

/*
Autor : JV
Creado : 28/05/2017
Modificad8: 07/07/2017
por : JV , agregado date a datos date
*/

const eliminarProcariano = (req, res, next) => {
	console.log('SE VA A ELIMINAR EL PROCARIANO');
	var id = req.params.id;
	console.log(id);
	modelo.Procariano.update({
		estado : 'inactivo'	  
	}, {
	  where: {
	    PersonaId : id
	  }
	}).then( result => {
			var status = true;
			var mensaje = 'eliminado correctamente'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : result
			}
			res.json(jsonRespuesta);
	}).catch( err => {
			var status = false;
			var mensaje = 'no se pudo eliminar'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				sequelizeStatus : err
			}
			res.json(jsonRespuesta);
	});
};


//FUNCIONES INTERNAS

/*
	@Autor: @edanmora95
	@FechaCreación: 14/07/2017
	@Descripción: Ingresa al procariano a la base de datos y luego lo ingresa al grupo indicado
*/
ingresarProcariano = (req, res, next, persona) => {
	if(req.body.fechaOrdenacion == ''){
		fechaOrdenacion = null;
	}else{
		fechaOrdenacion = new Date(req.body.fechaOrdenacion);	
	}

	modelo.Procariano.create({
		PersonaId : persona.get('id'),
		colegio : req.body.colegio,
		universidad : req.body.universidad,
		parroquia : req.body.parroquia,
		fechaOrdenacion : fechaOrdenacion,
		estado : req.body.estado,
		haceParticipacionEstudiantil : req.body.haceParticipacionEstudiantil
	}).then( procariano => {
		let grupoIngresado = (req.body.grupo !== '');
		if(grupoIngresado){
			ControladorGrupo.anadirProcarianoAGrupo(req, res, next, persona, procariano);
		}else{
			var status = true;
			var json1 = {
				status : status,
				mensaje : 'Se pudo crear correctamente',
				persona : persona,
				procariano : procariano,
			};
			res.json(json1);
		}
		asignarTipo(req,res,procariano);
	}).catch( error2 => {
		var json1 = {
			status : false,
			mensaje : 'No se pudo crear este procariano',
			error : error2
			}
		res.send(json1);

	});
}

asignarTipo = (req, res, procariano) => {
	modelo.ProcarianoTipo.findOne({
		where: {
			ProcarianoId: procariano.get('id')
		}
	}).then( respuesta =>{
		if(respuesta!=null){
			actualizarTipo(req,res,procariano)
		}else{
			agregarNuevoTipo(req,res,procariano)
		}
	}).catch( error => {
		var status = false;
		var mensaje = 'no existe asignacion'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error
		}
		res.json(jsonRespuesta);
	})
}

actualizarTipo = (req,res,procariano) => {
	modelo.ProcarianoTipo.update({
		fechaFin : new Date()
	},{
		where: {
			FechaFin : null,
			ProcarianoId: procariano.get('id')
		}
	}).then(Tipo => {
		agregarNuevoTipo(req,res)
	}).catch( error1 => {
		var status = false;
		var mensaje = 'no existe asignacion'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : error1
		}
		res.json(jsonRespuesta);
	});
}

agregarNuevoTipo = (req,res,procariano) => {
	modelo.ProcarianoTipo.create({
		TipoId : req.body.tipoId,
		ProcarianoId : procariano.get('id'),
		fechaInicio : new Date(),
		fechaFin : null
	}).then( repuesta => {
		var status = true;
		var mensaje = 'Asignado correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			sequelizeStatus : repuesta
		}
		res.json(jsonRespuesta)
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
}


module.exports = {
	crearProcariano,
	buscarProcariano,
	buscarProcarianoPorId,
	editarProcariano,
	eliminarProcariano
};

