'use strict';

process.env.NODE_ENV = 'test';

let chai = require('chai');
let co   = require('co');

let assert = chai.assert;
let should = chai.should();

let sequelize   = require('../../models/').sequelize;
let ModeloEtapa = require('../../models/').Etapa;

describe('ETAPAS', () => {
	describe('mostrarEtapas', () => {
		it('CP1. Búsqueda exitosa', done => {
			ModeloEtapa.obtenerEtapas()
			.then( resultado => {
				resultado.should.be.array;
				assert.equal(resultado.length, 6, 'Cantidad de etapas incorrecta');
				done();
			});
		});
	});
});