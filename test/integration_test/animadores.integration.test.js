'use strict';

process.env.NODE_ENV = 'test';

const app     = require('../../app')
const chai 		= require('chai');
const request = require('supertest');
const assert 	= chai.assert;
const expect 	= chai.expect;

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJQZXJzb25hbCJdLCJpZCI6MiwiaWF0IjoxNTEzODkwNzAxfQ.5OQlRcegbehBU2C9Lnwz59zgBPRyBLicpwnpigYllG0';

describe('ANIMADORES', () => {
	describe('posiblesAnimadores', () => {
		it('CP1. Caso exitoso', function(done){
			request(app)
	    	.get('/api/animadores/posibles/')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Búsqueda exitosa');
					expect(res.body.datos.length).to.equal(1);
					expect(res.body.datos[0].procarianoId).to.equal(5);
					done();
				});
		});
	});
});