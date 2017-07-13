var modelo = require('../models');
var utils = require('../utils/utils')

const crearProcariano = (req, res, next) => {
	//formato fechas : YYYY-MM-DD

	/*
	cedula = '0990218506';
	nombres = 'Jose Antonio'
	apellidos = 'Viteri Cuenca'
	direccion = 'esta es una direccion'
	fechaNacimiento = '1995-06-27'
	genero = 'masculino'
	contrasenna = '12345'
	email = 'jose@hotmail.com'
	celular = '0951698554'
	trabajo = 'no te importa'

	colegio = 'esto es colegio'
	universidad = 'ESPOL'
	parroquia = 'Ximena'
	fechaOrdenacion = '23-04-2000'
	estado = false
	haceParticipacionEstudiantil = true
	*/
	cedula = req.body.cedula;
	nombres = req.body.nombres;
	apellidos = req.body.apellidos;
	direccion = req.body.direccion;
	fechaNacimiento = new Date(req.body.fechaNacimiento);
	contrasenna = req.body.contrasenna;
	email =  req.body.email;
	celular = req.body.celular;
	trabajo = req.body.trabajo;
	convencional = req.body.convencional;
	genero = req.body.genero;



	colegio = req.body.colegio;
	universidad = req.body.universidad;
	parroquia = req.body.parroquia;
	if(req.body.fechaOrdenacion == ''){
		fechaOrdenacion = null;
	}else{
		fechaOrdenacion = new Date(req.body.fechaOrdenacion);	
	}
	estado = 'activo';
	haceParticipacionEstudiantil = req.body.haceParticipacionEstudiantil;

	modelo.Persona.create({
		cedula : cedula,
		nombres : nombres,
		apellidos : apellidos,
		direccion : direccion,
		fechaNacimiento : fechaNacimiento,
		genero : genero,
		contrasenna : contrasenna,
		email : email,
		celular : celular,
		trabajo : trabajo,
		convencional : convencional


	}).then( persona => {
		modelo.Procariano.create({
			PersonaId : persona.get('id'),
			colegio : colegio,
			universidad : universidad,
			parroquia : parroquia,
			//fechaOrdenacion : fechaOrdenacion,
			estado : estado,
			haceParticipacionEstudiantil : haceParticipacionEstudiantil
		}).then( procariano => {
			var status = true;
			var json1 = {
				status : status,
				mensaje : 'Se pudo crear correctamente',
				//para motivos de debug
				persona : persona,
				procariano : procariano
			};

			res.json(json1);
		}).catch( error2 => {
			var json1 = {
			status : false,
			mensaje : 'No se pudo crear este procariano',
			error : error2
			}
		res.send(json1);

		});
	}).catch( error => {
		var json1 = {
			status : false,
			mensaje : 'No se pudo crear esta persona',
			error : error
			}
		res.send(json1);
	});
}




const buscarProcariano = (req, res , next) => {

	//no puede haber objetos vacios
	console.log('sadfsdafasdfdsaf')
	console.log(req.query)
	console.log(req.query.cedula + "\n")
	console.log(req.query);
	var jsonModelo = utils.generarJsonProcariano(req.query);
	console.log(jsonModelo);
	
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
					fechaOrdenacion : procariano.fecha_ordenacion ,
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




module.exports = {
	crearProcariano,
	buscarProcariano,
	buscarProcarianoPorId,
	editarProcariano,
	eliminarProcariano
};

