'use strict';

process.env.NODE_ENV = 'test';
console.log('Environment: ' + process.env.NODE_ENV);

var chai = require('chai');
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Etapas', function() {
	describe('POST', () => {
		it('Prueba donde nombre es null', function(done){
			chai.request(server)
				.post('/api/etapa/nuevo')
				.send({})
				.end((err, res) => {
					res.should.be.json;
					res.should.have.status(422);
					res.body.should.be.a('object');
					assert.equal(res.body.mensaje, 'Etapa no enviada', 'Mensaje incorrecto' );
					assert.equal(res.body.status, false, 'Status incorrecto');
					done();
				});
		});
		it('Prueba donde nombre es HOLA', function(done){
			chai.request(server)
				.post('/api/etapa/nuevo')
				.send({'nombre': 'HOLA'})
				.end((err, res) => {
					res.should.be.json;
					res.should.have.status(422);
					res.body.should.be.a('object');
					assert.equal(res.body.mensaje, 'Etapa no aceptada', 'Mensaje incorrecto' );
					assert.equal(res.body.status, false, 'Status incorrecto');
					done();
				});
		});
		it('Prueba donde nombre es Iniciación', function(done){
			chai.request(server)
				.post('/api/etapa/nuevo')
				.send({'nombre': 'Iniciación'})
				.end((err, res) => {
					res.should.be.json;
					res.should.have.status(200);
					res.body.should.be.a('object');
					assert.equal(res.body.mensaje, 'Se pudo crear correctamente', 'Mensaje incorrecto' );
					assert.equal(res.body.status, true, 'Status incorrecto');
					done();
				});
		});
		it('Prueba ingreso de etapa duplicada. Nombre es iniciación otra vez', function(done){
			chai.request(server)
				.post('/api/etapa/nuevo')
				.send({'nombre': 'Iniciación'})
				.end((err, res) => {
					res.should.be.json;
					res.should.have.status(422);
					res.body.should.be.a('object');
					assert.equal(res.body.mensaje, 'No se pudo crear', 'Mensaje incorrecto' );
					assert.equal(res.body.status, false, 'Status incorrecto');
					done();
				});
		});
	});
	describe('DELETE', () => {
		it('Id no enviado', function(done){
			chai.request(server)
				.delete('/api/etapa/')
				.end((err, res) => {
					assert.equal(res.status, 404, 'Status incorrecto');
					done();
				});
		});
		/*it('Prueba DELETE. Id no encontrado', function(done){
			//TODO	
		});*/
	});
	describe('GET', () => {
		it('Debería devolver todas las etapas', (done) => {
			chai.request(server)
				.get('/api/etapa/')
				.end((err, res) => {
					//console.log(res.body);
					res.should.be.json;
					res.should.have.status(200);
					assert.equal(res.body.status, true, 'Status incorrecto');
					assert.equal(res.body.mensaje, 'Se obtuvieron las etapas correctamente', 'Mensaje incorrecto');
					res.body.sequelizeStatus.should.be.a('array');
					done();
				});
		});
	});
});