const jwt = require('jsonwebtoken');

const respuesta = require('./respuestas');
const config    = require('../config/config.json');

/*
	Verifica el token enviado por el cliente en la llamada a la api
	De encontrarlo, lo decodifica y pasa al siguiente middleware
	De no encontrarlo envía un error
*/
const verifyToken = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if( !token ){
		return respuesta.apiAuthError(res, 'Token no enviado');
	}
	
	const secret  = config[process.env.NODE_ENV].secret;
	jwt.verify(token, secret, (err, decoded) => {
		if ( err ) {
			return respuesta.apiAuthError(res, 'Token inválido');
		}
		req.decoded = decoded;
		next();
	});
};

/*
	Verifica si el rol del usuario loggeado le permite acceso a la ruta de la api
	Los roles del usuario los saca del token enviado
	@Params:
		arrayRoles : Array de los roles permitidos para la ruta

*/
const verifyRol = (arrayRoles) => {
	return (req, res, next) => {
		let flag    			 = false;
		const rolesUsuario = req.decoded.roles;
		for (let i = 0; i < rolesUsuario.length; i++) {
			if ( arrayRoles.indexOf(rolesUsuario[i]) > -1 ) {
				flag = true;
				break;
			}
		}
		if ( flag ) {
			next();
		} else {
			return respuesta.apiAuthError(res, 'Usuario no autorizado');	
		}
	}
};

module.exports = {
	verifyToken, 
	verifyRol,
}

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