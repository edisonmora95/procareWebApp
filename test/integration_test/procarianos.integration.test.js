'use strict';

process.env.NODE_ENV = 'test';

let chai 			= require('chai');
let assert 		= require('chai').assert;
let chaiHttp 	= require('chai-http');
let server 		= require('../../app');
let should 		= chai.should();

chai.use(chaiHttp);



describe('PROCARIANOS', () => {
	
	describe.skip('crearProcariano', () => {
		let obj = {
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
			estado 					: 'activo',
			grupo						: 1,
			tipo						: 1
		};

		afterEach( () => {
			obj = {
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
				tipo 						: '',
				colegio 				: 'Liceo Panamericano',
				universidad 		: 'Espol',
				parroquia 			: '',
				fechaOrdenacion : null,
				estado 					: 'activo',
				grupo						: 1,
				tipo						: 1
			};
		});

		xit('CP1. Creación exitosa. Con grupo', done => {
			chai.request(server)
			.post('/api/procarianos/')
			.send(obj)
			.end( (err, res) => {
				const estadoObtenido = res.body.estado;
				const estadoEsperado = true;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');
				const mensajeObtenido = res.body.mensaje;
				const mensajeEsperado = 'Procariano creado correctamente.';
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');
				done()
			});
		});

		xit('CP2. Creación exitosa. Sin grupo', done => {
			obj.grupo = 0;
			chai.request(server)
			.post('/api/procarianos/')
			.send(obj)
			.end( (err, res) => {
				//console.log(res.body)
				const estadoObtenido = res.body.estado;
				const estadoEsperado = true;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');
				const mensajeObtenido = res.body.mensaje;
				const mensajeEsperado = 'Procariano creado correctamente.';
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');
				done()
			});
		});

		xit('CP3. Datos erróneos Persona', done => {
			obj.cedula	= '0927102845';
			obj.email 	=	'edison2@hotmail.com';
			obj.nombres = "<>";
			chai.request(server)
			.post('/api/procarianos/')
			.send(obj)
			.end( (err, res) => {
				const estadoObtenido = res.body.estado;
				const estadoEsperado = false;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');
				const mensajeObtenido = res.body.mensajeError;
				const mensajeEsperado = "No puede ingresar caracteres especiales en \"Nombre\"";
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');
				done()
			});
		});

		xit('CP4. Datos erróneos Procariano', done => {
			obj.cedula	= '0927102845';
			obj.email 	=	'edison2@hotmail.com';
			obj.colegio = "<>";
			chai.request(server)
			.post('/api/procarianos/')
			.send(obj)
			.end( (err, res) => {
				const estadoObtenido = res.body.estado;
				const estadoEsperado = false;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');
				const mensajeObtenido = res.body.mensajeError;
				const mensajeEsperado = "No puede ingresar caracteres especiales en \"Colegio\"";
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');
				done()
			});
		});

		xit('CP5. Grupo no existe', done => {
			obj.grupo = 500;
			chai.request(server)
			.post('/api/procarianos/')
			.send(obj)
			.end( (err, res) => {
				//console.log(res.body)
				const estadoObtenido = res.body.estado;
				const estadoEsperado = true;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');
				const mensajeObtenido = res.body.mensaje;
				const mensajeEsperado = "Procariano creado correctamente. Grupo ingresado no existe.";
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');
				done();
			});
		});

		xit('CP6. Tipo no ingresado', done => {
			obj.tipo = null;
			chai.request(server)
			.post('/api/procarianos/')
			.send(obj)
			.end( (err, res) => {
				const estadoObtenido = res.body.estado;
				const estadoEsperado = false;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');

				const mensajeObtenido = res.body.mensaje;
				const mensajeEsperado = 'No se pudo crear procariano';
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');

				const mensajeErrorObtenido = res.body.mensajeError;
				const mensajeErrorEsperado = 'No ingresó tipo';
				assert.equal(mensajeErrorObtenido, mensajeErrorEsperado, 'Mensaje incorrecto');
				done();
			});
		});

		it('CP7. Tipo no existe', done => {
			obj.tipo = 10;
			chai.request(server)
			.post('/api/procarianos/')
			.send(obj)
			.end( (err, res) => {
				const estadoObtenido = res.body.estado;
				const estadoEsperado = false;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');

				const mensajeObtenido = res.body.mensaje;
				const mensajeEsperado = 'No se pudo crear procariano';
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');

				const mensajeErrorObtenido = res.body.mensajeError;
				const mensajeErrorEsperado = 'Tipo ingresado no existe';
				assert.equal(mensajeErrorObtenido, mensajeErrorEsperado, 'Mensaje incorrecto');
				done();
			});
		});
	});
	

	describe('editarProcariano', () => {

		let obj = {
			cedula 					: '0927102847',
			nombres 				: 'Edison Andre',
			apellidos 			: 'Mora Cazar',
			direccion 			: 'Cdla. Coviem',
			fechaNacimiento : new Date('1995-06-27'),
			genero 					: 'masculino',
			contrasenna 		: '',
			email 					: 'edison_andre_10@hotmail.com',
			celular 				: '0992556793',
			convencional 		: '042438648',
			trabajo 				: '',
			tipo 						: '',
			colegio 				: 'Liceo Panamericano1',
			universidad 		: 'Espol',
			parroquia 			: '',
			fechaOrdenacion : null,
			estado 					: 'activo',
			idProcariano		: 41
		};
		let idPersona = 79;

		afterEach( () => {
			obj = {
				cedula 					: '0927102847',
				nombres 				: 'Edison Andre',
				apellidos 			: 'Mora Cazar',
				direccion 			: 'Cdla. Coviem',
				fechaNacimiento : new Date('1995-06-27'),
				genero 					: 'masculino',
				contrasenna 		: '',
				email 					: 'edison_andre_10@hotmail.com',
				celular 				: '0992556793',
				convencional 		: '042438648',
				trabajo 				: '',
				tipo 						: '',
				colegio 				: 'Liceo Panamericano1',
				universidad 		: 'Espol',
				parroquia 			: '',
				fechaOrdenacion : null,
				estado 					: 'activo',
				idProcariano		: 41
			};
		});
		it('CP1. Edición exitosa sin cambiar tipo', done => {
			chai.request(server)
			.put('/api/procarianos/' + idPersona)
			.send(obj)
			.end( (err, res) => {
				const estadoObtenido = res.body.estado;
				const estadoEsperado = true;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');
				const mensajeObtenido = res.body.mensaje;
				const mensajeEsperado = 'Se modificó la información del procariano. No ingresó tipo para cambiar';
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');
				done()
			});
		});
		it('CP2. Edición exitosa, tipo igual al anterior', done => {
			obj.tipoId = 2;
			chai.request(server)
			.put('/api/procarianos/' + idPersona)
			.send(obj)
			.end( (err, res) => {
				const estadoObtenido = res.body.estado;
				const estadoEsperado = true;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');
				const mensajeObtenido = res.body.mensaje;
				const mensajeEsperado = 'Se modificó la información del procariano. No se cambió el tipo ya que era igual al anterior';
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');
				done()
			});
		});
		it('CP3. Edición exitosa, cambio de tipo', done => {
			obj.tipoId = 3;
			chai.request(server)
			.put('/api/procarianos/' + idPersona)
			.send(obj)
			.end( (err, res) => {
				const estadoObtenido = res.body.estado;
				const estadoEsperado = true;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');
				const mensajeObtenido = res.body.mensaje;
				const mensajeEsperado = 'Se modificó la información del procariano. Incluyendo el tipo';
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');
				done()
			});
		});
		it('CP4. Edición con errores en Persona', done => {
			obj.nombres = "<>";
			chai.request(server)
			.post('/api/procarianos/')
			.send(obj)
			.end( (err, res) => {
				const estadoObtenido = res.body.estado;
				const estadoEsperado = false;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');
				const mensajeObtenido = res.body.mensajeError;
				const mensajeEsperado = "No puede ingresar caracteres especiales en \"Nombre\"";
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');
				done()
			});
		});
		it('CP5. Edición con errores en Procariano', done => {
			obj.cedula = "0927102849"
			obj.colegio = "<>";
			chai.request(server)
			.post('/api/procarianos/')
			.send(obj)
			.end( (err, res) => {
				const estadoObtenido = res.body.estado;
				const estadoEsperado = false;
				assert.equal(estadoObtenido, estadoEsperado, 'Estado incorrecto');
				console.log(res.body)
				const mensajeObtenido = res.body.mensajeError;
				const mensajeEsperado = "No puede ingresar caracteres especiales en \"Colegio\"";
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje incorrecto');
				done()
			});
		});
	});

});