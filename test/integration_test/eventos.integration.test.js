'use strict';

process.env.NODE_ENV = 'test';

const app     = require('../../app')
const chai 		= require('chai');
const request = require('supertest');
const assert 	= chai.assert;
const expect 	= chai.expect;

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJQZXJzb25hbCJdLCJpZCI6MiwiaWF0IjoxNTEzODkwNzAxfQ.5OQlRcegbehBU2C9Lnwz59zgBPRyBLicpwnpigYllG0';

describe('EVENTOS', () => {

	describe('crearEvento', () => {
		const today  = new Date();
		let tomorrow = new Date();
		tomorrow.setDate(today.getDate() + 1);
		let  req;
		beforeEach( () => {
			req = {
				nombre 					 : 'Tarea integration test',
				descripcion 		 : 'Este evento fue creada en el integration tes. Para el animador',
				fechaInicio      : today,
				fechaFin         : tomorrow,
				lugar       		 : 'Casa Procare',
				estado					 : 1,
				responsable   	 : 4
			};
		});
		
		it('CP1. Creación exitosa', function(done){
			request(app)
				.post('/api/eventos/')
				.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Evento creado correctamente');
					expect(res.body.datos).to.be.a('number');
					done();
				});
		});

		it('CP2. Id de responsable no enviado', function(done){
			req.responsable = null;
			request(app)
				.post('/api/eventos/')
				.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Foreign key constraint error');
					expect(res.body.error.mensaje).to.equal('Debe enviar el id del organizador');
					done();
				});
		});

		it('CP3. Id de responsable inválido', function(done){
			req.responsable = 1500;
			request(app)
				.post('/api/eventos/')
				.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Foreign key constraint error');
					expect(res.body.error.mensaje).to.equal('ER_NO_REFERENCED_ROW_2: idOrganizador');
					done();
				});
		});

		it('CP4. Evento sin nombre', function(done){
			req.nombre = null;
			request(app)
				.post('/api/eventos/')
				.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Validation error');
					expect(res.body.error.mensaje).to.equal('nombre cannot be null');
					done();
				});
		});
	});
	
	describe('mostrarEventos', () => {
		it('CP1. Búsqueda exitosa', function(done) {
	    request(app)
	    	.get('/api/eventos/')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Búsqueda exitosa');
					expect(res.body.datos).to.be.an('array');
					done();
				});
		});
	});
	
	describe('cambiarEstado', () => {
		it('CP1. Cambio exitoso', function(done) {
	    request(app)
	    	.put('/api/eventos/cambiarEstado/1')
	    	.set('x-access-token', token)
	    	.send({ estadoNuevo : 2 })
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Evento cambiado de estado');
					done();
				});
		});
	});

	describe.skip('eliminarEvento', () => {
		it('CP1. Eliminación exitosa', function(done) {

	    request(app)
	    	.delete('/api/eventos/1')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Evento eliminado correctamente');
					done();
				});
		});

		it('CP2. Id no enviado', function(done) {

	    request(app)
	    	.delete('/api/eventos/')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.status).to.equal(404);
					done();
				});
		});

		it('CP3. Id inválido', function(done) {

	    request(app)
	    	.delete('/api/eventos/2000')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Delete error');
					expect(res.body.error.mensaje).to.equal('No se encontró evento con el id indicado');
					done();
				});
		});
	});
	
});