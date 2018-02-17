'use strict';

process.env.NODE_ENV = 'test';

const app   = require('../../app')
let chai 			= require('chai');
let request   = require('supertest');
let assert 		= chai.assert;
let expect 		= chai.expect;



let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJQZXJzb25hbCJdLCJpZCI6MiwiaWF0IjoxNTEzODkwNzAxfQ.5OQlRcegbehBU2C9Lnwz59zgBPRyBLicpwnpigYllG0';

describe('GRUPOS', () => {

	describe('crearGrupo', () => {

		let req = {
			nombre  			 : 'Grupo de prueba',
			tipo    			 : 'Formación',
			cantidadChicos : 0,
			numeroReuniones: 0,
			genero         : 'Procare',
			animador			 : 1,						//Dato quemado en la base
			etapa 				 : 1						//Dato quemado en la base
		};

		afterEach( () => {
			req = {
				nombre  			 : 'Grupo de prueba',
				tipo    			 : 'Formación',
				cantidadChicos : 0,
				numeroReuniones: 0,
				genero         : 'Procare',
				animador			 : 1,						//Dato quemado en la base
				etapa 				 : 1						//Dato quemado en la base
			};
		});

		it('CP1. Creación exitosa', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.post('/api/grupos/')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Grupo creado');
					expect(res.body.datos).to.be.a('number');
					done();
				});
		});

		it('CP2. Error creación grupo', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.nombre = null;

	    request(app)
	    	.post('/api/grupos/')
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

		it('CP3. Error etapa no enviada', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.etapa = null;

	    request(app)
	    	.post('/api/grupos/')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Foreign key constraint error');
					expect(res.body.error.mensaje).to.equal('No ingresó el id de la etapa');
					done();
				});
		});

		it('CP4. Error animador no enviado', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.animador = null;

	    request(app)
	    	.post('/api/grupos/')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Foreign key constraint error');
					expect(res.body.error.mensaje).to.equal('No ingresó el id del animador');
					done();
				});
		});
	});

	describe('mostrarGrupos', () => {
		it('CP1. Búsqueda exitosa', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.get('/api/grupos/')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Se obtuvieron los grupos');
					expect(res.body.datos).to.be.an('array');
					done();
				});
		});
	});

	describe('obtenerGrupoPorId', () => {
		it('CP1. Búsqueda exitosa', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.get('/api/grupos/1')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Información completa del grupo obtenida.');
					expect(res.body.datos.grupo.id).to.equal(1);
					done();
				});
		});
	});

	describe('editarGrupo', () => {
		let reqEdit = {
			nombre  			 : 'Grupo de prueba editado integration',
			tipo    			 : 'Formación',
			cantidadChicos : 10,
			numeroReuniones: 20,
			genero         : 'Procare',
			animadorAntiguo: 1,						//Dato quemado en la base
			etapaAntigua	 : 1,						//Dato quemado en la base
			etapaNueva     : 2,
			animadorNuevo  : 2
		};
		afterEach( () => {
			reqEdit = {
				nombre  			 : 'Grupo de prueba editado integration',
				tipo    			 : 'Formación',
				cantidadChicos : 10,
				numeroReuniones: 20,
				genero         : 'Procare',
				animadorAntiguo: 1,						//Dato quemado en la base
				etapaAntigua	 : 1,						//Dato quemado en la base
				etapaNueva     : 2,
				animadorNuevo  : 2
			};
		});

		it('CP1. Edición de grupo', function(done){
			reqEdit.etapaNueva    = null;
			reqEdit.animadorNuevo = null;
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.put('/api/grupos/1')
	    	.set('x-access-token', token)
	    	.send(reqEdit)
	    	.end( (err, res) => {
	    		expect(res.body.estado).to.equal(true);
	    		expect(res.body.mensaje).to.equal('Se editó el grupo correctamente.');
	    		expect(res.body.datos).to.have.property('grupoEditado');
	    		expect(res.body.datos.grupoEditado).to.be.an('array').that.includes(1);
	    		done();
	    	});
		});

		it('CP2. Cambio de etapa', function(done){
			reqEdit.nombre        = 'Grupo de prueba. Cambio de etapa. Integration'
			reqEdit.etapaNueva    = 2;
			reqEdit.animadorNuevo = null;
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.put('/api/grupos/1')
	    	.set('x-access-token', token)
	    	.send(reqEdit)
	    	.end( (err, res) => {
	    		expect(res.body.estado).to.equal(true);
	    		expect(res.body.mensaje).to.equal('Se editó el grupo correctamente.');
	    		expect(res.body.datos).to.have.property('grupoEditado');
	    		expect(res.body.datos.grupoEditado).to.be.an('array').that.includes(1);
	    		expect(res.body.datos).to.have.property('etapaNueva');
	    		expect(res.body.datos.etapaNueva).to.have.property('EtapaId');
	    		expect(res.body.datos.etapaNueva.EtapaId).to.equal(2);
	    		done();
	    	});
		});

		it('CP3. Cambio de animador', function(done){
			reqEdit.nombre        = 'Grupo de prueba. Cambio de animador. Integration'
			reqEdit.etapaNueva    = null;
			reqEdit.animadorNuevo = 3;
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.put('/api/grupos/1')
	    	.set('x-access-token', token)
	    	.send(reqEdit)
	    	.end( (err, res) => {
	    		expect(res.body.estado).to.equal(true);
	    		expect(res.body.mensaje).to.equal('Se editó el grupo correctamente.');
	    		expect(res.body.datos).to.have.property('grupoEditado');
	    		expect(res.body.datos.grupoEditado).to.be.an('array').that.includes(1);
	    		expect(res.body.datos).to.have.property('animadorNuevo');
	    		expect(res.body.datos.animadorNuevo).to.have.property('ProcarianoId');
	    		expect(res.body.datos.animadorNuevo.ProcarianoId).to.equal(3);
	    		done();
	    	});
		});

		it('CP4. Cambio de animador y etapa', function(done){
			reqEdit.nombre        = 'Grupo de prueba. Cambio de animador y etapa. Integration'
			reqEdit.etapaNueva    = 3;
			reqEdit.animadorNuevo = 2;
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.put('/api/grupos/1')
	    	.set('x-access-token', token)
	    	.send(reqEdit)
	    	.end( (err, res) => {
	    		expect(res.body.estado).to.equal(true);
	    		expect(res.body.mensaje).to.equal('Se editó el grupo correctamente.');
	    		expect(res.body.datos).to.have.property('grupoEditado');
	    		expect(res.body.datos.grupoEditado).to.be.an('array').that.includes(1);
	    		expect(res.body.datos).to.have.property('animadorNuevo');
	    		expect(res.body.datos.animadorNuevo).to.have.property('ProcarianoId');
	    		expect(res.body.datos.animadorNuevo.ProcarianoId).to.equal(2);
	    		expect(res.body.datos).to.have.property('etapaNueva');
	    		expect(res.body.datos.etapaNueva).to.have.property('EtapaId');
	    		expect(res.body.datos.etapaNueva.EtapaId).to.equal(3);
	    		done();
	    	});
		});

		it('CP5. Error grupo. Id inválido', function(done){
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.put('/api/grupos/-5')
	    	.set('x-access-token', token)
	    	.send(reqEdit)
	    	.end( (err, res) => {
	    		expect(res.body.estado).to.equal(false);
	    		expect(res.body.mensaje).to.equal('Error en el servidor');
	    		expect(res.body).to.have.property('error');
	    		expect(res.body.error).to.have.property('tipo');
	    		expect(res.body.error.tipo).to.equal('Foreign key constraint error');
	    		expect(res.body.error).to.have.property('mensaje');
	    		expect(res.body.error.mensaje).to.equal('Id del grupo inválido');
	    		done();
	    	});
		});

		it('CP6. Error etapa. Id inválido', function(done){
			this.timeout(15000);
	    setTimeout(done, 15000);

	    reqEdit.etapaNueva    = -5;

	    request(app)
	    	.put('/api/grupos/1')
	    	.set('x-access-token', token)
	    	.send(reqEdit)
	    	.end( (err, res) => {
	    		expect(res.body.estado).to.equal(false);
	    		expect(res.body.mensaje).to.equal('Error en el servidor');
	    		expect(res.body).to.have.property('error');
	    		expect(res.body.error).to.have.property('tipo');
	    		expect(res.body.error.tipo).to.equal('Foreign key constraint error');
	    		expect(res.body.error).to.have.property('mensaje');
	    		expect(res.body.error.mensaje).to.equal('Id de etapa nueva inválido');
	    		done();
	    	});
		});

		it('CP7. Error animador. Id inválido', function(done){
			this.timeout(15000);
	    setTimeout(done, 15000);

	    reqEdit.animadorNuevo  = -5;

	    request(app)
	    	.put('/api/grupos/1')
	    	.set('x-access-token', token)
	    	.send(reqEdit)
	    	.end( (err, res) => {
	    		expect(res.body.estado).to.equal(false);
	    		expect(res.body.mensaje).to.equal('Error en el servidor');
	    		expect(res.body).to.have.property('error');
	    		expect(res.body.error).to.have.property('tipo');
	    		expect(res.body.error).to.have.property('mensaje');
	    		done();
	    	});
		});
	});

	describe.skip('eliminarGrupo', () => {
		it('CP1. Eliminación exitosa', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.delete('/api/grupos/1')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Información completa del grupo obtenida.');
					expect(res.body.datos.grupo.id).to.equal(3);
					done();
				});
		});

		it('CP2. idGrupo no enviado en ruta', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.delete('/api/grupos/')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					assert.equal(res.status, 404, 'Estado incorrecto');
					done();
				});
		});

		it('CP3. idGrupo inválido', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.delete('/api/grupos/-5')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					assert.equal(res.status, 500, 'Status incorrecto');
					assert.equal(res.body.estado, false, 'Estado recibido incorrecto');
					assert.equal(res.body.mensaje, 'Error en el servidor', 'Mensaje recibido incorrecto');
					done();
				});
		});
	});

});