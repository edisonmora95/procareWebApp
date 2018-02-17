'use strict';
process.env.NODE_ENV = 'test';

let chai 		= require('chai');
let assert 	= chai.assert;
let should 	= chai.should();

let sequelize	 							= require('../../models/').sequelize;
let ModeloProcarianoTipo	 	= require('../../models/').ProcarianoTipo;

describe('PROCARIANOTIPO', () => {

	describe.skip('obtenerTipoActualDeProcarianoP', () => {
		let idProcariano;

		it('CP1. Id válido', done => {
			idProcariano = 40;
			ModeloProcarianoTipo.obtenerTipoActualDeProcarianoP(idProcariano)
			.then( resultado => {
				const idObtenido = resultado.get('ProcarianoId');
				assert.equal(idObtenido, idProcariano, 'Ids no coinciden');
				done();
			});
		});

		it('CP2. Id null', done => {
			idProcariano = null;
			ModeloProcarianoTipo.obtenerTipoActualDeProcarianoP(idProcariano)
			.catch( error => {
				console.log(error)
				//const idObtenido = resultado.get('ProcarianoId');
				//assert.equal(idObtenido, idProcariano, 'Ids no coinciden');
				done();
			});
		});
	});

});