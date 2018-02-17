'use strict';

process.env.NODE_ENV = 'test';

let chai = require('chai');

let assert = chai.assert;
let should = chai.should();

let sequelize   		 = require('../../models/').sequelize
let ModeloGrupoEtapa = require('../../models/').GrupoEtapa;
let ModeloGrupo      = require('../../models/').Grupo;

/*
	VARIABLES GLOBALES
*/

let transaction;
let idGrupo = 2;
let idEtapa = 1;
let grupoObj = {
	nombre         : 'Grupo de prueba',
	tipo           : 'Formación',
	cantidadChicos : 0,
	numeroReuniones: 0,
	genero         : 'Procare Mujeres',
};

/*
		TESTS
*/

describe('GRUPO-ETAPA', () => {

	describe('crearGrupoEtapaT', () => {

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
			ModeloGrupoEtapa.crearGrupoEtapaT(idGrupo, idEtapa, transaction)
			.then( resultado => {
				const grupoCreado = resultado.dataValues;
				grupoCreado.should.be.json;
				transaction.rollback();
				done();
			})
			.catch( fail => {
				transaction.rollback();
				console.log('Esto no debería pasar...');
				done();
			});
		});

		it('CP2. idGrupo null', done => {
			ModeloGrupoEtapa.crearGrupoEtapaT(null, idEtapa, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del grupo', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP3. idGrupo < 0', done => {
			ModeloGrupoEtapa.crearGrupoEtapaT(-5, idEtapa, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id del grupo inválido', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP4. idEtapa null', done => {
			ModeloGrupoEtapa.crearGrupoEtapaT(idGrupo, null, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id de la etapa', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP5. idEtapa < 0', done => {
			ModeloGrupoEtapa.crearGrupoEtapaT(idGrupo, -5, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id de etapa inválido', 'Mensaje incorrecto');
				done();
			});
		});

	});

	describe('cambiarGrupoDeEtapaT', () => {
		let etapaAntigua = 1;
		let etapaNueva   = 2;

		beforeEach( () => {
			return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
		});

		it('CP1. Cambio exitoso', done => {
			ModeloGrupoEtapa.cambiarGrupoDeEtapaT(idGrupo, etapaAntigua, etapaNueva, transaction)
			.then( resultado => {
				resultado.should.be.array;
				assert.equal(resultado.get('EtapaId'), 2, 'Etapa incorrecta');
				transaction.rollback();
				done();
			})
			.catch( fail => {
				transaction.rollback();
				console.log('Esto no debería pasar...');
				done();
			});
		});

		it('CP2. idGrupo null', done => {
			ModeloGrupoEtapa.cambiarGrupoDeEtapaT(null, etapaAntigua, etapaNueva, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del grupo', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP3. idGrupo < 0', done => {
			ModeloGrupoEtapa.cambiarGrupoDeEtapaT(-5, etapaAntigua, etapaNueva, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id del grupo inválido', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP4. etapaAntigua null', done => {
			ModeloGrupoEtapa.cambiarGrupoDeEtapaT(idGrupo, null, etapaNueva, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id de la etapa antigua', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP5. etapaAntigua < 0', done => {
			ModeloGrupoEtapa.cambiarGrupoDeEtapaT(idGrupo, -5, etapaNueva, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id de etapa antigua inválido', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP6. etapaNueva null', done => {
			ModeloGrupoEtapa.cambiarGrupoDeEtapaT(idGrupo, etapaAntigua, null, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id de la etapa nueva', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP7. etapaNueva < 0', done => {
			ModeloGrupoEtapa.cambiarGrupoDeEtapaT(idGrupo, etapaAntigua, -5, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id de etapa nueva inválido', 'Mensaje incorrecto');
				done();
			});
		});

	});

	describe('eliminarRegistrosDeGrupoT', () => {
		beforeEach( () => {
			return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
		});

		it('CP1. Caso exitoso', done => {
			let idGrupo = 1;
			ModeloGrupoEtapa.eliminarRegistrosDeGrupoT(idGrupo, transaction)
			.then( resultado => {
				assert.equal(resultado, 1, 'Cantidad de registros incorrecta');
				transaction.rollback();
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP2. idGrupo es null', done => {
			let idGrupo = null;
			ModeloGrupoEtapa.eliminarRegistrosDeGrupoT(idGrupo, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del grupo', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP3. idGrupo es negativo', done => {
			let idGrupo = -5;
			ModeloGrupoEtapa.eliminarRegistrosDeGrupoT(idGrupo, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Id del grupo inválido', 'Mensaje de error incorrecto');
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
