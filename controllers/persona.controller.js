/*
	@Descripcion: Controller de Persona
	@Autor: @edisonmora95
	@FechaCreacion: 18/02/2018
	@UltimaFechaModificacion:
*/
'use strict';

const respuesta = require('../utils/respuestas');

const sequelize	 		= require('../models/').sequelize;
const ModeloPersona	= require('../models/').Persona;



/*
	@Autor : @edisonmora95
	@FechaCreacion : 18/02/2018
	@Descripción:
		*	Se crea el registro de Persona
		*	Se pasa al siguiente controlador
	@Modificado: 
*/
module.exports.crearPersona = (req, res, next) => {
	let fechaNacimiento = ( req.body.fechaNacimiento === '' ) ? null : new Date(req.body.fechaNacimiento);
	let persona 				= {
		cedula 					: req.body.cedula,
		nombres 				: req.body.nombres,
		apellidos 			: req.body.apellidos,
		direccion 			: req.body.direccion,
		fechaNacimiento : fechaNacimiento,
		genero 					: req.body.genero,
		email 					: req.body.email,
		celular 				: req.body.celular,
		trabajo 				: req.body.trabajo,
		convencional 		: req.body.convencional,
		imagenUrl       : res.locals.imagenUrl
	};
	inicializarTransaccion()
	.then( t => {
		ModeloPersona.crearPersonaT(persona, t)
		.then( personaCreada => {
			res.locals.t 				 = t;
			res.locals.idPersona = personaCreada.get('id');
			next();
		})
		.catch( fail => {
			t.rollback();
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};

module.exports.crearEmpresa = (req, res, next) => {
	inicializarTransaccion()
	.then( t => {
		ModeloPersona.crearEmpresaT(req.body, t)
		.then( empresa => {
			res.locals.t = t;
			res.locals.idPersona = empresa.get('id');
			next();
		})
		.catch( fail => {
			t.rollback();
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};

module.exports.editarPersona = (req, res, next) => {
	const idPersona 			= req.params.id_persona;
	const fechaNacimiento = (req.body.fechaNacimiento === '') ? null : new Date(req.body.fechaNacimiento);
	const persona 				= {
		cedula 					: req.body.cedula,
		nombres 				: req.body.nombres,
		apellidos 			: req.body.apellidos,
		direccion 			: req.body.direccion,
		fechaNacimiento : fechaNacimiento,
		genero 					: req.body.genero,
		email 					: req.body.email,
		celular 				: req.body.celular,
		trabajo 				: req.body.trabajo,
		convencional 		: req.body.convencional
	};
	inicializarTransaccion()
	.then( t => {
		ModeloPersona.editarPersonaT(idPersona, persona, t)
		.then( resultado => {
			res.locals.t = t;
			next();
		})
		.catch( fail => {
			t.rollback();
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};

/*
	@Autor: @edisonmora95
	@FechaCreacion : 05/03/2018
	@Descripcion:
		*	Busca en la base de datos si existe un registro de Persona con esa cédula
			*	Si existe, entonces se pasa el control al siguiente Controller de Crear Benefactor
			*	Si no existe, se pasa el control a Crear Persona y luego a Crear Benefactor
*/
module.exports.buscarPorCedula = (req, res, next) => {
	const identificacion = ( req.body.tipo === 'persona' ) ? req.body.cedula : ( req.body.tipo === 'empresa') ? req.body.ruc : null;
	ModeloPersona.buscarPersonaPorCedulaP(identificacion)
	.then( registro => {
		if( !registro ) {
			if( req.body.tipo === 'persona' ) {
				this.crearPersona(req, res, next);	
			} else if ( req.body.tipo === 'empresa' ) {
				this.crearEmpresa(req, res, next);
			} else {
				return respuesta.ERROR_SERVIDOR(res, { mensaje : 'Tipo de benefactor incorrecto' } );
			}
		} else {
			inicializarTransaccion()
			.then( t => {
				res.locals.t = t;
				res.locals.idPersona = registro.get('id');
				next();
			})
			.catch( fail => {
				return respuesta.ERROR_SERVIDOR(res, fail);
			});
		}
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};

function inicializarTransaccion(){
	return new Promise( (resolve, reject) => {
		sequelize.transaction({
			autocommit: false,
		})
		.then( result => {
			return resolve(result);
		})
		.catch( fail => {
			return reject(fail);
		});
	});
}
