process.env.NODE_ENV = 'test';

let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

//Por default, id de animador es 3 y 4
let grupo = {
	nombre: 'Grupo de prueba',
	tipo: 'Formación',
	cantidadChicos: 0,
	numeroReuniones: 0,
	genero: 'Procare Mujeres',
	animador: 1,
	etapa: 1
};



describe('Grupos', () => {

	describe('Crear grupo', () => {
		//Volver a inicializar el objeto de grupo después de cada test
		afterEach(function() {
	    grupo = {
				nombre: 'Grupo de prueba',
				tipo: 'Formación',
				cantidadChicos: 0,
				numeroReuniones: 0,
				genero: 'Procare Mujeres',
				animador: 3,
				etapa: 1
			};
	  });
		
		it('CP1. Creación con datos correctos. Creación de grupo con animador y etapa', (done) => {
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(201);
					assert.equal(res.body.estado, true, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'Grupo creado exitosamente', 'Mensaje incorrecto');
					done();
				});
		});
		it('CP2. Id de etapa ingresada es incorrecto', (done) => {
			grupo.etapa = 100;
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo añadir a la etapa', 'Mensaje incorrecto');
					done();
				});
		});
		/*it('CP3. Animador es animador de otro grupo', (done) => {
			grupo.animador = ;
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					done();
				});
		});
		it('CP4. Animador es Chico de Formación', (done) => {
			grupo.animador = ;
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					done();
				});
		});*/
		/*it('CP5. Animador no es procariano', (done) => {
			grupo.animador = 1000;
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo añadir el animador', 'Mensaje incorrecto');
					done();
				});
		});*/
		it('CP6. Número de reuniones mayor al posible', (done) => {
			grupo.numeroReuniones = 31;
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					assert.equal(res.body.mensajeError, 'La cantidad de reuniones no puede ser mayor a 30.', 'Mensaje de error incorrecto');
					done();
				});
		});
		it('CP7. Número de reuniones es negativo', (done) => {
			grupo.numeroReuniones = -5;
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					assert.equal(res.body.mensajeError, 'La cantidad de reuniones no puede ser un número negativo.', 'Mensaje de error incorrecto');
					done();
				});
		});
		it('CP8. Número de reuniones no es número', (done) => {
			grupo.numeroReuniones = 'cinco';
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					assert.equal(res.body.mensajeError, 'La cantidad de reuniones debe ser un número entero.', 'Mensaje de error incorrecto');
					done();
				});
		});
		it('CP9. Número de chicos mayor al posible', (done) => {
			grupo.cantidadChicos = 31;
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					assert.equal(res.body.mensajeError, 'La cantidad de chicos no puede ser mayor a 30.', 'Mensaje de error incorrecto');
					done();
				});
		});
		it('CP10. Número de chicos negativo', (done) => {
			grupo.cantidadChicos = -5;
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					assert.equal(res.body.mensajeError, 'La cantidad de chicos no puede ser un número negativo.', 'Mensaje de error incorrecto');
					done();
				});
		});
		it('CP11. Número de chicos no número', (done) => {
			grupo.cantidadChicos = 'cinco'
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					assert.equal(res.body.mensajeError, 'La cantidad de chicos debe ser un número entero.', 'Mensaje de error incorrecto');
					done();
				});
		});
		it('CP12. Género = Procare Formación', (done) => {
			grupo.genero = 'Procare Formación';
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					assert.equal(res.body.mensajeError, 'Género puede ser Procare o Procare Mujeres solamente.', 'Mensaje de error incorrecto');
					done();
				});
		});
		it('CP13. Género vacío', (done) => {
			grupo.genero = '';
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					assert.equal(res.body.mensajeError, 'Género no puede ser vacío.', 'Mensaje de error incorrecto');
					done();
				});
		});
		it('CP14. Tipo = hola', (done) => {
			grupo.tipo = 'hola'
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					assert.equal(res.body.mensajeError, 'Tipo no está dentro de los valores válidos.', 'Mensaje de error incorrecto');
					done();
				});
		});
		it('CP15. Tipo vacío', (done) => {
			grupo.tipo = '';
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					assert.equal(res.body.mensajeError, 'Tipo no puede ser vacío.', 'Mensaje de error incorrecto');
					done();
				});
		});
		it('CP16. Nombre vacío', (done) => {
			grupo.nombre = '';
			chai.request(server)
				.post('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear el grupo', 'Mensaje incorrecto');
					done();
				});
		});
	});

	describe('Mostrar grupos', () => {
		it('CP1. Devuelve todos los grupos', (done) => {
			chai.request(server)
				.get('/api/grupos/')
				.send(grupo)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(200);
					assert.equal(res.body.estado, true, 'Estado incorrecto');
					done();
				});
		});
	});

	describe('Mostrar grupos', () => {
		it('CP1. Devuelve todos los grupos', (done) => {
			chai.request(server)
				.get('/api/grupos/')
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(200);
					assert.equal(res.body.estado, true, 'Estado incorrecto');
					done();
				});
		});
	});

	describe('Obtener grupo por id', () => {
		let grupoId = 12;
		it('CP1. Devuelve el grupo requerido', (done) => {
			chai.request(server)
				.get('/api/grupos/' + grupoId)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(200);
					assert.equal(res.body.status, true, 'Estado incorrecto');
					done();
				});
		});
	});

});
