'use strict';
process.env.NODE_ENV = 'test';

let chai 		= require('chai');
let assert 	= chai.assert;
let should 	= chai.should();

let sequelize	 							= require('../../models/').sequelize;
let ModeloProcarianoGrupo 	= require('../../models/').ProcarianoGrupo;


describe('PROCARIANOGRUPO0', () => {

	describe('anadirProcarianoAGrupoT', () => {
		let transaction;
		let idProcariano  = 41;
		let idGrupo 			= 1;

		before( () => {
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
				//transaction.commit();
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
	  		const mensajeObtenido = error.errors[0].message;
	  		const mensajeEsperado = 'Id de grupo no puede ser negativo.';
	  		assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje incorrecto');
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
