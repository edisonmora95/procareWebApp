const config 				= require('../config/config');
const co     				= require('co');
const bcrypt				= require('bcryptjs')
const ModeloPersona = require('../models').Persona;
const respuesta     = require('../utils/respuestas');
const jwt           = require('jsonwebtoken');

const authenticate = (req, res, next) => {
	const correo   = req.body.correo;
	const password = req.body.password;
	co(function* (){
		//Primero se verifica si el correo existe en la base
		let persona = yield ModeloPersona.buscarPersonaPorEmailP(correo);
		if( !persona ) {
			return respuesta.error(res, 'No se encontró el correo en la base de datos', '', null);
		}
		//Ahora se comparan las contraseñas
		if( !bcrypt.compareSync(password, persona.get('contrasenna')) ) {
			return respuesta.error(res, 'Contraseña no coincide', '', null);
		}
		//Obtengo los roles actuales del usuario
		let roles           = yield ModeloPersona.obtenerRolesP(persona.get('id'));
		const rolesActuales = obtenerRolesActuales(roles);
		//Genero el token
		const payload = { 
			roles : rolesActuales	,
			id    : persona.get('id')
		};
		const secret  = config[process.env.NODE_ENV].secret;
		const token   = jwt.sign(payload, secret);
		res.send({
      success: true,
      token  : token,
    });
	})
	.catch( fail => {
		res.status(500).send(fail);
	});
};

const verifyToken = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if( !token ){
		return respuesta.authError(res, 'Token no enviado');
	}
	
	const secret  = config[process.env.NODE_ENV].secret;
	jwt.verify(token, secret, (err, decoded) => {
		if ( err ) {
			return respuesta.authError(res, 'Token inválido');
		}
		req.decoded = decoded;
		next();
	});
};

const verifyRol = (req, res, next) => {
	let flag    = false;
	const roles = req.decoded.roles;
	for (let i = 0; i < roles.length; i++) {
		if ( req.rolesPermitidos.indexOf(roles[i]) > -1 ) {
			flag = true;
			break;
		}
	}
	req.rolesPermitidos = null;
	if ( flag ) {
		next();
	} else {
		return respuesta.authError(res, 'Usuario no autorizado');	
	}
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

module.exports = {
	authenticate,
	verifyToken,
	verifyRol,
}