/*
@Descripcion: Clase para representar el concepto de Grupo
@Autor: Gustavo Totoy
@FechaCreacion: 31/05/2017
@UltimaFechaModificacion: 31/05/2017 @GustavoTotoy
*/

var modelo = require('../models');

const crearGrupo = (req, res, next) => {

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


	modelo.Grupo.create({
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


	}).then( grupo => {
		console.log("se creo una grupo");
		modelo.Grupo.create({
			GrupoId : grupo.get('id'),
			colegio : colegio,
			universidad : universidad,
			parroquia : parroquia,
			fechaOrdenacion : fechaOrdenacion,
			estado : estado,
			haceParticipacionEstudiantil : haceParticipacionEstudiantil
		}).then( grupo => {
			var json1 = {
				grupo : grupo,
				grupo : grupo,
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
	crearGrupo
}