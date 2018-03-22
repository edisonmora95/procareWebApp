'use strict';

process.env.NODE_ENV = 'test';

const app     = require('../../app')
const chai 		= require('chai');
const request = require('supertest');
const assert 	= chai.assert;
const expect 	= chai.expect;

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJQZXJzb25hbCJdLCJpZCI6MiwiaWF0IjoxNTEzODkwNzAxfQ.5OQlRcegbehBU2C9Lnwz59zgBPRyBLicpwnpigYllG0';

describe('PROCARIANOS', () => {
	
	describe('crearProcariano', () => {
		let req;

		beforeEach( () => {
			req = {
				cedula 					: '0927102846',
				nombres 				: 'Edison Andre',
				apellidos 			: 'Mora Cazar',
				direccion 			: 'Cdla. Coviem',
				fechaNacimiento : new Date('1995-06-27'),
				genero 					: 'masculino',
				contrasenna 		: '',
				email 					: 'edison_andre_99@hotmail.com',
				celular 				: '0992556793',
				convencional 		: '042438648',
				trabajo 				: '',
				colegio 				: 'Liceo Panamericano',
				universidad 		: 'Espol',
				parroquia 			: '',
				fechaOrdenacion : null,
				estado 					: 'inactivo',
				grupo						: 2,
				tipo						: 1
			};
		});

		it('CP1. Error Persona', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.nombres = '<>';
	    request(app)
	    	.post('/api/procarianos/')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Validation error');
					expect(res.body.error.mensaje).to.equal('No puede ingresar caracteres especiales en "Nombre"');
					done();
				});
		});

		it('CP2. Error Procariano', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.colegio = '<>';
	    request(app)
	    	.post('/api/procarianos/')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Validation error');
					expect(res.body.error.mensaje).to.equal('No puede ingresar caracteres especiales en "Colegio"');
					done();
				});
		});

		it('CP3. Error Grupo', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.grupo = 500;
	    request(app)
	    	.post('/api/procarianos/')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Foreign key constraint error');
					expect(res.body.error.mensaje).to.equal('ER_NO_REFERENCED_ROW_2: GrupoId');
					done();
				});
		});
		
		it('CP4. Error Tipo null', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.tipo = null;
	    request(app)
	    	.post('/api/procarianos/')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Foreign key constraint error');
					expect(res.body.error.mensaje).to.equal('No ingresó un tipo');
					done();
				});
		});
		
		it('CP5. Error Tipo no existente', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.tipo = 10;
	    request(app)
	    	.post('/api/procarianos/')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Foreign key constraint error');
					expect(res.body.error.mensaje).to.equal('ER_NO_REFERENCED_ROW_2: TipoId');
					done();
				});
		});

		it('CP6. Creación exitosa. Con grupo', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.post('/api/procarianos/')
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Procariano creado correctamente.');
					expect(res.body.datos).to.be.a('number');
					done();
				});
		});

		it('CP7. Creación sin grupo', function(done) {
			let req2 = {
				cedula 					: '0927102847',
				nombres 				: 'Procariano',
				apellidos 			: 'Sin Grupo',
				direccion 			: 'Cdla. Coviem',
				fechaNacimiento : new Date('1995-06-27'),
				genero 					: 'masculino',
				contrasenna 		: '',
				email 					: 'procariano_sin_grupo@hotmail.com',
				celular 				: '0992556793',
				convencional 		: '042438648',
				trabajo 				: '',
				colegio 				: 'Liceo Panamericano',
				universidad 		: 'Espol',
				parroquia 			: '',
				fechaOrdenacion : null,
				estado 					: 'inactivo',
				grupo						: null,
				tipo						: 1
			};
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.post('/api/procarianos/')
	    	.set('x-access-token', token)
				.send(req2)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Procariano creado correctamente.');
					expect(res.body.datos).to.be.a('number');
					done();
				});
		});
	});
	
	describe('buscarProcarianosActivos', () => {
		it('CP1. Búsqueda exitosa', function(done){
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.get('/api/procarianos/activos')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Búsqueda exitosa');
					expect(res.body.datos).to.be.an('array');
					expect(res.body.datos.length).to.equal(7);
					done();
				});
		});
	});
	
	describe('buscarChicosFormacionSinGrupo', () => {
		it('CP1. Búsqueda exitosa', function(done){
			this.timeout(15000);
	    setTimeout(done, 15000);

	    request(app)
	    	.get('/api/procarianos/formacion/sinGrupo')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Búsqueda exitosa');
					expect(res.body.datos).to.be.an('array');
					done();
				});
		});
	});
	
	describe('buscarProcarianoPorId', () => {
		let idPersona;
		it('CP1. Búsqueda exitosa. Con grupo y tipo actual', function(done){
			this.timeout(15000);
	    setTimeout(done, 15000);
	    idPersona = 18;
	    request(app)
	    	.get('/api/procarianos/' + idPersona)
	    	.set('x-access-token', token)
				.end( (err, res) => {
					console.log(res.body)
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Búsqueda exitosa');
					expect(res.body.datos.procariano.id).to.equal(11);
					const idTipo = res.body.datos.tipoActual.id;
					expect(idTipo).to.equal(1);
					const idGrupo = res.body.datos.grupoActual.id;
					expect(idGrupo).to.equal(2);
					done();
				});
		});
		
		it('CP2. Búsqueda exitosa. Sin grupo ni tipo actual', function(done){
			this.timeout(15000);
	    setTimeout(done, 15000);
	    idPersona = 4;
	    request(app)
	    	.get('/api/procarianos/' + idPersona)
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Búsqueda exitosa');
					expect(res.body.datos.procariano.id).to.equal(1);
					done();
				});
		});

		it('CP3. Registro no existente', function(done){
			this.timeout(15000);
	    setTimeout(done, 15000);
	    idPersona = 400;
	    request(app)
	    	.get('/api/procarianos/' + idPersona)
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Find error');
					expect(res.body.error.mensaje).to.equal('No se encontró registro del procariano');
					done();
				});
		});

		it('CP3. id inválido', function(done){
			this.timeout(15000);
	    setTimeout(done, 15000);
	    idPersona = 'hola';
	    request(app)
	    	.get('/api/procarianos/' + idPersona)
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Find error');
					expect(res.body.error.mensaje).to.equal('No se encontró registro del procariano');
					done();
				});
		});
	});
	
	describe('obtenerGrupoActualDeProcariano', () => {
		let idProcariano = 11;

		it('CP1. Búsqueda exitosa', function(done){
			this.timeout(15000);
	    setTimeout(done, 15000);
	    request(app)
	    	.get('/api/procarianos/grupo/' + idProcariano)
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Búsqueda exitosa');
					expect(res.body.datos.id).to.equal(2);
					done();
				});
		});

		it('CP2. Procariano sin grupo', function(done){
			this.timeout(15000);
	    setTimeout(done, 15000);
	    idProcariano = 1;
	    request(app)
	    	.get('/api/procarianos/grupo/' + idProcariano)
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.mensaje).to.equal('No se encontró el registro del grupo del Procariano');
					done();
				});
		});
	});
	
	describe('editarProcariano', () => {
		let req;
		let idPersona = 8;

		beforeEach( () => {
			req = {
				cedula 					: '0023254484',
				nombres 				: 'Chico',
				apellidos 			: 'Formación Editado',
				direccion 			: 'Urdesa',
				fechaNacimiento : new Date('2004-06-01'),
				genero 					: 'masculino',
				contrasenna 		: '',
				email 					: 'chico_formacion@gmail.com',
				celular 				: '0992556793',
				convencional 		: '042438648',
				trabajo 				: '',
				colegio 				: 'Liceo Panamericano',
				universidad 		: '',
				parroquia 			: '',
				fechaOrdenacion : null,
				estado 					: 'activo',
				tipoId					: 1,
				idProcariano    : 2
			};
		});
		
		it('CP1. Error Persona', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.nombres = null;
	    request(app)
	    	.put('/api/procarianos/' + idPersona)
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Validation error');
					expect(res.body.error.mensaje).to.equal('nombres cannot be null');
					done();
				});
		});

		it('CP2. Error Procariano', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.colegio = '<>';
	    request(app)
	    	.put('/api/procarianos/' + idPersona)
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(false);
					expect(res.body.mensaje).to.equal('Error en el servidor');
					expect(res.body.error.tipo).to.equal('Validation error');
					expect(res.body.error.mensaje).to.equal('No puede ingresar caracteres especiales en "Colegio"');
					done();
				});
		});
		
		it('CP3. Edición persona-procariano', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.tipoId = null;
	    request(app)
	    	.put('/api/procarianos/' + idPersona)
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Se modificó la información del procariano. No ingresó tipo para cambiar');
					setTimeout( function(){
						done();
					}, 1000);
					//done();
				});
		});
		
		it('CP4. Edición tipo igual al anterior', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.tipoId = 1;
	    request(app)
	    	.put('/api/procarianos/' + idPersona)
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Se modificó la información del procariano. No se cambió el tipo ya que era igual al anterior');
					setTimeout( function(){
						done();
					}, 1000);
				});
		});
		
		it('CP5. Edición tipo nuevo', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.tipoId = 2;
	    request(app)
	    	.put('/api/procarianos/' + idPersona)
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Se modificó la información del procariano. Incluyendo el tipo');
					setTimeout( function(){
						done();
					}, 2);
				});
		});

		it('CP6. Edición tipo cambio inválido', function(done) {
			req = {
				cedula 					: '0123456799',
				nombres 				: 'ANIMADOR',
				apellidos 			: 'CON ROL',
				direccion 			: 'Urdesa',
				fechaNacimiento : new Date('2004-06-01'),
				genero 					: 'masculino',
				contrasenna 		: '',
				email 					: 'animador_con_rol@gmail.com',
				celular 				: '0992556793',
				convencional 		: '042438648',
				trabajo 				: '',
				colegio 				: 'COLEGIO',
				universidad 		: 'UNIVERSIDAD',
				parroquia 			: '',
				fechaOrdenacion : null,
				estado 					: 'activo',
				tipoId					: 1,
				idProcariano    : 5
			};

			this.timeout(15000);
	    setTimeout(done, 15000);
	    request(app)
	    	.put('/api/procarianos/' + 11)
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal( 'Se modificó la información del procariano. No se permite cambiar el tipo a uno menor');
					setTimeout( function(){
						done();
					}, 2000);
				});
		});
		
		it('CP7. Edición correcta. Sin tipo previo', function(done) {
			this.timeout(15000);
	    setTimeout(done, 15000);
	    req.tipoId = 1;
	    req.idProcariano = 7;
	    req.email = 'animador_editar_grupo_con_rol@gmail.com';
	    req.cedula = '0123456700'
	    request(app)
	    	.put('/api/procarianos/' + 13)
	    	.set('x-access-token', token)
				.send(req)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal( 'Se modificó la información del procariano. Se añadió el tipo');
					done();
				});
		});
	});
});