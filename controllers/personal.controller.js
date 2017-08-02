/*
@Descripcion: Clase controladora de todos los miembros del personal
@Autor: Jose Viteri
@FechaCreacion: 30/07/2017
*/

var modelo = require('../models');
var utils = require('../utils/utils');



/*
Autor : JV
Creado : 26/06/2017
Modificado: 30
*/
const crearPersonal = (req, res, next) => {


	if(req.body.fechaNacimiento == ''){
		fechaNacimiento = null;
	}else{
		fechaNacimiento = new Date(req.body.fechaNacimiento);	
	}
	
	let persona = {
		cedula : req.body.cedula,
		nombres : req.body.nombres,
		apellidos : req.body.apellidos,
		direccion : req.body.direccion,
		fechaNacimiento : fechaNacimiento,
		genero : req.body.genero,
		contrasenna : req.body.contrasenna,
		email : req.body.email,
		celular : req.body.celular,
		trabajo : 'personal procare',
		convencional : req.body.convencional,
		sueldo : req.body.sueldo
	};
	modelo.Persona.crearPersona(persona, (persona) => {
		console.log(persona);

		modelo.PersonaRol.create({
			RolNombre : 'Personal',
			PersonaId : persona.id
		}).then( personaConRol => {
			console.log('se creo correctamente');
			return res.status(200).json({
				status: true,
				msg : 'Se agrego una persona correctamente'
			})

		}).catch(error => {
				return res.status(400).json({
					status: false,
					error: error
				});
		})


	}, (errorPersona) => {
		return res.status(400).json({
					status: false,
					error: error
				});
	});
}

const obtenerTablaPersonal = (req,res,next) =>{
	modelo.Persona.findAll({
		include : [{
			model : modelo.Rol,
			where : {
				nombre : 'Personal'
			}
		}]
	}).then( personal => {
		console.log(personal);
		return res.status(200).json({
			status: true,
			personal: personal
		})

	}).catch( error => {
		console.log(error);
		return res.status(400).json({
			status : false,
			error : error
		})
	})
}

module.exports = {
	obtenerTablaPersonal,
	crearPersonal
}