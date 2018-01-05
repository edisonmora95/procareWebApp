
var modelo = require('../models');

const co            = require('co');
const jwt           = require('jsonwebtoken');
const bcrypt        = require('bcryptjs');
const utils					= require('../utils/utils');

const ModeloPersona = require('../models').Persona;
const config        = require('../config/config');
let respuesta 		  = require('../utils/respuestas');

const cambioContrasenna = (req, res , next) => {
	const	email						 = req.body.correo;
	const viejaContrasenna = req.body.viejaContrasenna;
	const nuevaContrasenna = req.body.nuevaContrasenna;
	//Primero hay que verificar si la contraseña anterior coincide con la actual en la base
	ModeloPersona.buscarPersonaPorEmailP(email)
	.then( persona => {
		//Si el correo no existe en la base
		if( !persona ) return respuesta.error(res, 'Registro no encontrado', 'No hay un usuario con ese correo', null);
		//Ahora se comparan las contraseñas
    if( !bcrypt.compareSync(viejaContrasenna, persona.get('contrasenna')) ) return respuesta.error(res, 'Contraseña anterior no coincide', '', null);
    //Se genera la nueva contraseña en hash
    utils.generarHash(nuevaContrasenna)
    .then( hash => {
    	//Cambio la contraseña
    	ModeloPersona.cambiarContrasenna(email, hash)
	    .then( resultado => {
	    	if ( resultado < 1 ) return respuesta.error(res, 'No se encontró registro para hacer el cambio', '', null);
	    	return respuesta.okUpdate(res, 'Contraseña cambiada', resultado);
	    })
	    .catch( errorCambio => {
	    	return respuesta.error(res, 'Error al cambiar la contraseña', '', errorCambio);
	    });
    })
    .catch( errorHash => {
    	return respuesta.error(res, 'Error al crear el hash', '', errorHash);
    });
	})
	.catch( error => {
		return respuesta.error(res, 'Registro no encontrado', 'Error en la búsqueda', error);
	});

};

const login = (req, res, next) => {
	co(function* () {
		const id    = req.user.get('id');
		const roles 				= yield ModeloPersona.obtenerRolesP(id);
		const rolesActuales = obtenerRolesActuales(roles);
		//Genero el token
    const payload = { 
      roles : rolesActuales,
      id    : id
    };
    const secret  = config[process.env.NODE_ENV].secret;
    const token   = jwt.sign(payload, secret);
    return res.send({
      status: true,
      token  : token,
    });
	}).catch( fail => {
    return res.status(500).send(fail);
  });	
};

const getUsuario = (req, res, next) => {
	const usuario      = req.user[0];
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
    let actual = arrayRoles[i].get('PersonaRol');
    if( !actual.fechaFin ){
      array.push(actual.RolNombre);
    }
  }
  return array;
}
