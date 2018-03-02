/*
	@Descripcion: Controller de Roles
	@Autor: Edison Mora
	@FechaCreacion: 10/02/2018
	@UltimaFechaModificacion:
*/

'use strict';

const respuesta	= require('../utils/respuestas');
const utils			=	require('../utils/utils');

const ModeloPersonaRol = require('../models/').PersonaRol;
const ModeloPersona 	 = require('../models/').Persona;

/*
	@Autor: @edisonmora95
	@FechaCreación: 02/11/2018
	@Descripción:
		Se crea el registro del nuevo rol de la persona
		Se genera la contraseña y se la envía al cliente por correo
	@ÚltimaModificación: 
*/
module.exports.asignarRol = (req, res, next) => {
	let t         = res.locals.t;
	let idPersona = res.locals.idPersona;
	let email     = res.locals.email;

	const password     = utils.randomString();
	const mensaje      = 'Ha sido añadido como Animador a la aplicación web de Procare. Su contraseña para ingresar es ' + password + " .\nPor favor proceda a cambiarla por motivos de seguridad . \n\nAtentamente \nFundación Procare";
	const destinatario = email;
	const sujeto	     = 'ProcareWebApp';

	Promise.all([
		ModeloPersonaRol.asignarRolT(idPersona, 'Animador', t),
		utils.generarHash(password)
	])
	.then( values => {
		let hash = values[1];

		ModeloPersona.ingresarContrasenna(idPersona, hash, t)
		.then( result => {
			utils.generarCorreo(mensaje, destinatario, sujeto)
			.then( result => {
				t.commit();
				return respuesta.okCreate(res, res.locals.mensaje, res.locals.datos);
			})
			// GENERAR CORREO FAIL
			.catch( fail => {
				t.rollback();
				return respuesta.ERROR_SERVIDOR(res, fail);
			});
		})
		// INGRESAR CONTRASEÑA FAIL
		.catch( fail => {
			t.rollback();
			return respuesta.ERROR_SERVIDOR(res, fail);
		});

	})
	.catch( fail => {
		t.rollback();
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};