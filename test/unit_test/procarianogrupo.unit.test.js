'use strict';
process.env.NODE_ENV = 'test';

let chai 		= require('chai');
let assert 	= chai.assert;
let should 	= chai.should();

let sequelize	 							= require('../../models/').sequelize;
let ModeloProcarianoGrupo 	= require('../../models/').ProcarianoGrupo;


describe('PROCARIANOGRUPO0', () => {

	describe.skip('anadirProcarianoAGrupoT', () => {
		let transaction;
		let idProcariano  = 41;
		let idGrupo 			= 1;

		beforeEach( () => {
	    return inicializarTransaccion()
	    .then( t => {
	    	console.log('Transacción creada');
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
	  });

	  it('CP1. Datos correctos', done => {
	  	ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, transaction)
	  	.then( resultado => {
	  		console.log('Exito');
				resultado.should.be.json;
				transaction.rollback();
				done();
	  	})
	  	.catch( error => {
	  		done(error);
	  	});
	  });

	  it('CP2. idGrupo es null', done => {
	  	idGrupo = null;
	  	ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, transaction)
	  	.catch( error => {
	  		transaction.rollback();
	  		const mensajeObtenido = error.errors[0].message;
	  		const mensajeEsperado = 'No envió id del grupo';
	  		assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje incorrecto');
	  		done();
	  	});
	  });

	  it('CP3. idGrupo es negativo', done => {
	  	idGrupo = -5;
	  	ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, transaction)
	  	.catch( error => {
	  		transaction.rollback();
	  		const mensajeObtenido = error.errors[0].message;
	  		const mensajeEsperado = 'Id de grupo no puede ser negativo.';
	  		assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje incorrecto');
	  		done();
	  	});
	  });

	});

	describe('eliminarRegistrosDeGrupoT', () => {
		let transaction;
		let idGrupo = 1;

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
	  	ModeloProcarianoGrupo.eliminarRegistrosDeGrupoT(idGrupo, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		assert.equal(resultado, 1, 'Cantidad de registros incorrecta');
	  		done();
	  	})
	  	.catch( fail => {
	  		done(fail);
	  	});
	  });

	  it('CP2. idGrupo es null', done => {
	  	ModeloProcarianoGrupo.eliminarRegistrosDeGrupoT(null, transaction)
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
	  	ModeloProcarianoGrupo.eliminarRegistrosDeGrupoT(-5, transaction)
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
