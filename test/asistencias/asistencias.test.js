process.env.NODE_ENV = 'test';

let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

let reunion = {
	fecha: 2017-09-14,
	horaInicio: null,
	horaSalida:null,
	descripcion: 'Procare Formación',
	GrupoId: 2
};

let asistencia = {
	generoSel: 'Procare',
	grupos: '',
	gruposAux: '',
    	chicos: 0,
    	asistencias: 0,
    	faltas: 0,
    	justificadas: 0
};


describe('Asistencias', () => {

	describe('Subir Asistencias', () => {
		afterEach(function() {
	    reunion = {
				fecha: 2017-09-14,
				horaInicio: null,
				horaSalida:null,
				descripcion: 'Procare Formación',
				GrupoId: 2
			};
	
	  });
		
		it('CP1. Fecha en que se reunió un grupo', (done) => {
			chai.request(server)
				.post('/api/reuniones/formacion')
				.send(asistencia)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(201);
					assert.equal(res.body.estado, true, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'Se inicio la reunion', 'Mensaje incorrecto');
					done();
				});
		});
		it('CP2. fecha ingresada no se reune ningún grupo', (done) => {
			reunion.fecha = 2017-08-03;
			chai.request(server)
				.post('/api/reuniones/formacion')
				.send(reunion)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear la reunion', 'Mensaje incorrecto');
					done();
				});
		});
		it('CP3. fecha ingresada es incorrecta', (done) => {
			reunion.fecha = '';
			chai.request(server)
				.post('/api/reuniones/formacion')
				.send(reunion)
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(400);
					assert.equal(res.body.estado, false, 'Estado incorrecto');
					assert.equal(res.body.mensaje, 'No se pudo crear la reunion', 'Mensaje incorrecto');
					done();
				});
		});


	});

	describe('Ver Asistencias', () => {
		it('CP1. Devuelve todas las asistencias', (done) => {
			chai.request(server)
				.get('/api/reuniones/')
				.end( (err, res) => {
					res.should.be.json;
					res.should.have.status(200);
					assert.equal(res.body.estado, true, 'Estado incorrecto');
					done();
				});
		});
	});

});
