'use strict';

process.env.NODE_ENV = 'test';

let chai = require('chai');

let assert = chai.assert;
let should = chai.should();

let sequelize   		 = require('../../models/').sequelize
let ModeloPersonaRol = require('../../models/').PersonaRol;


/*
	VARIABLES GLOBALES
*/

let transaction;
let idPersona = 4;	//Quemado en la base. Id del animador
let rol = 'Animador';

describe('PERSONA-ROL', () => {
	
	describe('buscarRolesDePersonaPorId', () => {
		const idAnimador = 4;
		const idPersonal = 2;
		const idChicoFormacion   = 8;
		const idDirectorAnimador = 1;

		it('CP1. Búsqueda exitosa Animador', done => {
			ModeloPersonaRol.buscarRolesDePersonaPorId(idAnimador)
			.then( resultado => {
				resultado.should.be.array;
				assert.equal(resultado[0].get('PersonaId'), idAnimador, 'Id incorrecto');
				assert.equal(resultado[0].get('RolNombre'), 'Animador', 'Rol incorrecto');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP2. Búsqueda exitosa Personal', done => {
			ModeloPersonaRol.buscarRolesDePersonaPorId(idPersonal)
			.then( resultado => {
				resultado.should.be.array;
				assert.equal(resultado[0].get('PersonaId'), idPersonal, 'Id incorrecto');
				assert.equal(resultado[0].get('RolNombre'), 'Personal', 'Rol incorrecto');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP3. Persona con varios roles', done => {
			ModeloPersonaRol.buscarRolesDePersonaPorId(idDirectorAnimador)
			.then( resultado => {
				resultado.should.be.array;
				for (let i = 0; i < resultado.length; i++) {
					assert.equal(resultado[i].get('PersonaId'), idDirectorAnimador, 'Id incorrecto');
				}
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP4. Persona sin rol', done => {
			ModeloPersonaRol.buscarRolesDePersonaPorId(idChicoFormacion)
			.then( resultado => {
				resultado.should.be.array;
				assert.equal(resultado.length, 0, 'Se encontraron roles');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP5. idPersona es null', done => {
			ModeloPersonaRol.buscarRolesDePersonaPorId(null)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP6. idPersona es negativo', done => {
			ModeloPersonaRol.buscarRolesDePersonaPorId(-5)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id inválido', 'Mensaje incorrecto');
				done();
			});
		});
	});
	
	describe('asignarRolT', () => {
		
		beforeEach( () => {
			return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
		});

		it('CP1. Creación exitosa', done => {
			ModeloPersonaRol.asignarRolT(9, rol, transaction)
			.then( resultado => {
				resultado.should.be.json
				transaction.rollback();
				done();
			})
			.catch( fail => {	
				done(fail);
			});
		});

		it('CP2. idPersona es null', done => {
			ModeloPersonaRol.asignarRolT(null, rol, transaction)
			.then( resultado => {
				console.log('Esto no debería pasar...');
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP3. idPersona es negativo', done => {
			ModeloPersonaRol.asignarRolT(-5, rol, transaction)
			.then( resultado => {
				console.log('Esto no debería pasar...');
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id inválido', 'Mensaje incorrecto');
				done();
			});
		});
	});
	
	describe('personaTieneRolActualmente', () => {
		const idAnimador = 4;
		const idDirectorAnimador = 1;

		it('CP1. Búsqueda exitosa Animador', done => {
			ModeloPersonaRol.personaTieneRolActualmente(idAnimador, 'Animador')
			.then( resultado => {
				assert.equal(resultado, true, 'No tiene ese rol');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP2. Búsqueda exitosa persona con varios roles: Animador', done => {
			ModeloPersonaRol.personaTieneRolActualmente(idDirectorAnimador, 'Animador')
			.then( resultado => {
				assert.equal(resultado, true, 'No tiene ese rol');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP3. Búsqueda exitosa persona con varios roles: Director Ejecutivo', done => {
			ModeloPersonaRol.personaTieneRolActualmente(idDirectorAnimador, 'Director Ejecutivo')
			.then( resultado => {
				assert.equal(resultado, true, 'No tiene ese rol');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP4. Persona sin rol especificado', done => {
			ModeloPersonaRol.personaTieneRolActualmente(idAnimador, 'Director Ejecutivo')
			.then( resultado => {
				resultado.should.be.array;
				assert.equal(resultado, false, 'Si tiene ese rol');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP5. idPersona es null', done => {
			ModeloPersonaRol.personaTieneRolActualmente(null, 'Animador')
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP6. idPersona es negativo', done => {
			ModeloPersonaRol.personaTieneRolActualmente(-5, 'Animador')
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id inválido', 'Mensaje incorrecto');
				done();
			});
		});
	});

});

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
