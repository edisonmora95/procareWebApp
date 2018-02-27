'use strict';

process.env.NODE_ENV = 'test';

const app     = require('../../app');
const chai 		= require('chai');
const request = require('supertest');
const expect 	= chai.expect;

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJQZXJzb25hbCJdLCJpZCI6MiwiaWF0IjoxNTEzODkwNzAxfQ.5OQlRcegbehBU2C9Lnwz59zgBPRyBLicpwnpigYllG0';

describe('LOGIN', () => {
	describe('login', () => {
		let req;

		it('CP1. Login exitoso de Personal', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req = { correo : 'personal@gmail.com', password : 'posi'};
	    request(app)
	    	.post('/api/login/')
				.send(req)
				.end( (err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.status).to.equal(true);
					expect(res.body).to.have.property('token');
					done();
				});
		});

		it('CP2. Usuario con varios roles', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req = { correo : 'procarewebapp@gmail.com', password : 'posi'};
	    request(app)
	    	.post('/api/login/')
				.send(req)
				.end( (err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.status).to.equal(true);
					expect(res.body).to.have.property('token');
					done();
				});
		});

		it('CP3. Usuario sin roles', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req = { correo : 'asesor@gmail.com', password : 'posi'};
	    request(app)
	    	.post('/api/login/')
				.send(req)
				.end( (err, res) => {
					expect(res.status).to.equal(403);
					done();
				});
		});

		it('CP4. Correo no enviado', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req = { correo : null, password : 'posi'};
	    request(app)
	    	.post('/api/login/')
				.send(req)
				.end( (err, res) => {
					expect(res.status).to.equal(400);
					done();
				});
		});

		it('CP5. Contraseña no enviada', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req = { correo : 'personal@gmail.com', password : null};
	    request(app)
	    	.post('/api/login/')
				.send(req)
				.end( (err, res) => {
					expect(res.status).to.equal(400);
					done();
				});
		});

		it('CP6. Credenciales incorrectas', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req = { correo : 'personal@gmail.com', password : '1234'};
	    request(app)
	    	.post('/api/login/')
				.send(req)
				.end( (err, res) => {
					expect(res.status).to.equal(401);
					done();
				});
		});

		it('CP7. Correo no existe', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req = { correo : 'correo_falso@gmail.com', password : 'posi'};
	    request(app)
	    	.post('/api/login/')
				.send(req)
				.end( (err, res) => {
					expect(res.status).to.equal(401);
					done();
				});
		});
	});

	describe('cambioContrasenna', () => {
		let req;

		beforeEach( () => {
			req = {
				correo           : 'director.centro@gmail.com',
				viejaContrasenna : 'posi',
				nuevaContrasenna : 'posi2'
			};
		});

		it('CP1. Cambio exitoso de Director de Centro', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    request(app)
	    	.post('/api/login/cambiar')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Contraseña cambiada');
					expect(res.body.datos).to.equal(1);
					done();
				});
		});

		it('CP2. Correo no enviado', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.correo = null;
	    request(app)
	    	.post('/api/login/cambiar')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.status).to.equal(500);
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.mensaje).to.equal('No ingresó el email');
					done();
				});
		});

		it('CP3. Registro no encontrado con el correo', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.correo = 'correo_falso@gmail.com';
	    request(app)
	    	.post('/api/login/cambiar')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.status).to.equal(500);
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.mensaje).to.equal('Registro no encontrado');
					done();
				});
		});

		it('CP4. Contraseñas anteriores no coinciden', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.correo = 'procarewebapp@gmail.com';
	    req.viejaContrasenna = 'abcde';
	    request(app)
	    	.post('/api/login/cambiar')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.status).to.equal(500);
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.mensaje).to.equal('Contraseña anterior no coincide');
					done();
				});
		});

		
	});

});