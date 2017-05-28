var modelo = require('../models');

const crearProcariano = (req, res, next) => {

	/*
	cedula = '0990218506';
	nombres = 'Jose Antonio'
	apellidos = 'Viteri Cuenca'
	direccion = 'esta es una direccion'
	fechaNacimiento = '25-08-1995'
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
	apellidos = req.body.apellidos
	direccion = req.body.direccion
	fechaNacimiento = req.body.fechaNacimiento
	genero = req.body.genero
	contrasenna = req.body.contrasenna
	email =  req.body.email
	celular = req.body.celular
	trabajo = req.body.trabajo

	colegio = req.body.colegio
	universidad = req.body.universidad
	parroquia = req.body.parroquia
	fechaOrdenacion = req.body.fechaOrdenacion
	estado = req.body.estado
	haceParticipacionEstudiantil = req.body.haceParticipacionEstudiantil


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
		trabajo : trabajo


	}).then( persona => {
		console.log("se creo una persona");
		modelo.Procariano.create({
			PersonaId : persona.get('id'),
			colegio : colegio,
			universidad : universidad,
			parroquia : parroquia,
			fechaOrdenacion : fechaOrdenacion,
			estado : estado,
			haceParticipacionEstudiantil : haceParticipacionEstudiantil
		}).then( procariano => {
			var json1 = {
				persona : persona,
				procariano : procariano,
				mensaje : 'exito'
			}

			res.json(json1);
		});
	}).catch( error => {
		var json1 = {
			esteEsElError : error,
			esteEsElbody : req.body
		}
		res.send(json1);
	});
}

module.exports = {
	crearProcariano
}