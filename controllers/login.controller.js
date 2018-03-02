'use strict';

const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const utils	 = require('../utils/utils');

const ModeloPersona    = require('../models').Persona;
const ModeloPersonaRol = require('../models').PersonaRol;

const config    = require('../config/config');
const respuesta = require('../utils/respuestas');

const cambioContrasenna = (req, res) => {
	const	email						 = req.body.correo;
	const viejaContrasenna = req.body.viejaContrasenna;
	const nuevaContrasenna = req.body.nuevaContrasenna;
	//Primero hay que verificar si la contraseña anterior coincide con la actual en la base
	ModeloPersona.buscarPersonaPorEmailP(email)
	.then( persona => {
		//Si el correo no existe en la base
		if( !persona ) { return respuesta.ERROR_SERVIDOR(res, { mensaje : 'Registro no encontrado' }); }
		//Ahora se comparan las contraseñas
    if( !bcrypt.compareSync(viejaContrasenna, persona.get('contrasenna')) ) {
    	return respuesta.ERROR_SERVIDOR(res, { mensaje : 'Contraseña anterior no coincide' });
    }
    //Se genera la nueva contraseña en hash
    utils.generarHash(nuevaContrasenna)
    .then( hash => {
    	//Cambio la contraseña
    	ModeloPersona.cambiarContrasenna(email, hash)
	    .then( resultado => {
	    	return respuesta.okUpdate(res, 'Contraseña cambiada', resultado);
	    })
	    .catch( fail => {
				return respuesta.ERROR_SERVIDOR(res, fail);
			});
    })
    .catch( fail => {
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});

};

const login = (req, res) => {
	const idPersona = req.user.get('id');
	ModeloPersonaRol.buscarRolesDePersonaPorId(idPersona)
	.then( roles => {
		roles = obtenerRolesActuales(roles);
		if ( roles === undefined || roles.length === 0 ) {
			return respuesta.viewsUnauthorized(res);
		}else{
			const payload = { 
	      roles : roles,
	      id    : idPersona
	    };
	    const secret = config[process.env.NODE_ENV].secret;
	    const token  = jwt.sign(payload, secret);
	    return res.send({
	      status : true,
	      token  : token,
	    });	
		}
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};

const getUsuario = (req, res) => {
	const usuario      = req.user;
	const rolesUsuario = usuario.get('Rols');
	let lista	= [];
	for (let i = 0; i < rolesUsuario.length; i++) {
		lista.push(rolesUsuario[i].get('nombre'));
	}
	const datos = {
		id 				: usuario.get('id'),
		nombre 		: usuario.get('nombres'),
		apellidos : usuario.get('apellidos'),
		genero    : usuario.get('genero'),
		correo		: usuario.get('correo'),
		roles 		: lista
	};
	return respuesta.okGet(res, 'Usuario obtenido', datos);
};

module.exports = {
	cambioContrasenna,
	login,
	getUsuario,
};

function obtenerRolesActuales(arrayRoles){
  let array = [];
  for (let i = 0; i < arrayRoles.length; i++) {
    let actual = arrayRoles[i];
    if( !actual.get('fechaFin') ){
      array.push(actual.get('RolNombre'));
    }
  }
  return array;
}
