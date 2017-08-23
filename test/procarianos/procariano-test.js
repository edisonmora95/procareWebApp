var chai = require('chai');
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Procarianos', function() {
    /*it('Prueba donde cedula es null, nombres y apellidos estan presentes', function(done) {
	  chai.request(server)

	    .post('/procarianos/nuevo')
	    .send({ 'apellidos': 'viteri cuenca' , 'nombres': 'jose antonio'})
	    .end(function(err, res){
 
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');

 
	    .post('/api/procarianos/')
	    .send({ 'apellidos': 'viteri cuenca' , 'nombres': 'jose antonio'})
	    .end(function(err, res){

	    	console.log(res.body);

	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');

	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');

	      res.body.SUCCESS.name.should.equal('Java');
	      res.body.SUCCESS.lastName.should.equal('Script');


	    	//console.log(res.body);
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.mensaje.should.equal('No se pudo crear esta persona');
	      res.body.status.should.equal(false);
	      //res.body.persona.should.have.property('apellidos');
	      //res.body.persona.should.have.property('nombres');
	      //res.body.persona.should.have.property('cedula');

	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');

	      done();
	    });
	});

	  it('Prueba donde nombres es null, cedula con longitud 10 y apellidos estan presentes' , function(done) {
	  chai.request(server)
	    .post('/procarianos/nuevo')

	  it('Prueba donde nombres es null, cedula y apellidos estan presentes' , function(done) {
	  chai.request(server)
	    .post('/api/procarianos/')

	    .send({ 'apellidos': 'viteri cuenca' , 'cedula': '0987654321'})
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');
	      assert.equal(req.body.persona.cedula.length, '10' , 'es igual')

	      /*
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');
	      assert.equal(req.body.persona.cedula.length, '10' , 'es igual')
	      res.body.mensaje.should.equal('No se pudo crear esta persona');
	      res.body.status.should.equal(false);

	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');
	      done();
	    });
	 });

	  it('Prueba donde apellidos es null, cedula con longitud 10 y nombres estan presentes' , function(done) {
	  chai.request(server)
	    .post('/procarianos/nuevo')

	  it('Prueba donde apellidos es null, cedula y nombres estan presentes' , function(done) {
	  chai.request(server)
	    .post('/api/procarianos/')

	    .send({ 'cedula': '0987654321' , 'nombres': 'jose antonio'})
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');
	      assert.equal(req.body.persona.cedula.length, '10' , 'es igual')

	      //console.log(res.body);
	      	      
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');
	      assert.equal(req.body.persona.cedula.length, '10' , 'es igual')
	      res.body.mensaje.should.equal('No se pudo crear esta persona');
	      res.body.status.should.equal(false);

	      //assert.equal(res.body.persona.cedula.length, '10' , 'es igual')

	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');
	      done();
	    });
	 });

	  it('Prueba donde cedula tiene longitud igual a 10, y nombres y apellidos son diferentes de null', function(done) {
	  chai.request(server)
	    .post('/procarianos/nuevo')
	    .send({ 'apellidos': 'viteri cuenca' , 'nombres': 'jose antonio' , 'cedula' : '0987654321'})

	  it('Prueba donde cedula , nombres y apellidos son diferentes de null y genero es masculino', function(done) {
	  chai.request(server)
	    .post('/api/procarianos/')
	    .send({ 'apellidos': 'viteri cuenca' , 'nombres': 'jose antonio' , 'cedula' : '0987659624' , 'genero' : 'masculino'})

	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');
	      assert.equal(res.body.persona.cedula.length, '10' , 'es igual')
	      res.body.mensaje.should.equal('Se pudo crear correctamente');
	      res.body.status.should.equal(true);
	      //res.body.persona.should.have.property('nombres');
	      //res.body.persona.should.have.property('cedula');
	     // res.body.persona.should.have.property('genero');
	      //assert.equal(res.body.persona.cedula.length, '10' , 'es igual')
	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');
	      done();
	    });
	 });

	  it('Prueba donde cedula tiene longitud diferente de 10, y nombres y apellidos son diferentes de null', function(done) {
	  chai.request(server)
	    .post('/procarianos/nuevo')
	    .send({ 'apellidos': 'viteri cuenca' , 'nombres': 'jose antonio' , 'cedula' : '098765432109'})

	  it('Prueba donde cedula tiene longitud igual de 10, y nombres y apellidos son diferentes de null y genero es diferente de masculino y femenino', function(done) {
	  chai.request(server)
	    .post('/api/procarianos/')
	    .send({ 'apellidos': 'viteri cuenca' , 'nombres': 'jose antonio' , 'cedula' : '098765432109', 'genero' : 'sfdf'})

	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');
	      assert.equal(req.body.persona.cedula.length, '10' , 'es igual')
	      res.body.mensaje.should.equal('No se pudo crear esta persona');
	      res.body.status.should.equal(false);
	      
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');
	      assert.equal(res.body.persona.cedula.length, '10' , 'es igual')
	      
	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');
	      done();
	    });
	  });*/
});