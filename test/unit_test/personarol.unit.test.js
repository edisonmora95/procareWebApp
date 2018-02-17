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

	describe('buscarRolDePersonaPorId', () => {

		it('CP1. Búsqueda exitosa', done => {
			ModeloPersonaRol.buscarRolDePersonaPorId(idPersona)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP2. idPersona es null', done => {
			ModeloPersonaRol.buscarRolDePersonaPorId(null)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP3. idPersona es negativo', done => {
			ModeloPersonaRol.buscarRolDePersonaPorId(-5)
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
