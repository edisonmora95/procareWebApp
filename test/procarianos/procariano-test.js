var chai = require('chai');
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Procarianos', function() {
	 it('Prueba donde cedula es null, nombres y apellidos estan presentes', function(done) {
	  chai.request(server)
	    .post('/api/procarianos/')
	    .send({ 'apellidos': 'viteri cuenca' , 'nombres': 'jose antonio'})
	    .end(function(err, res){
	    	console.log(res.body);
	      //res.should.have.status(200);
	      //res.should.be.json;
	      //res.body.should.be.a('object');
	      //res.body.persona.should.have.property('apellidos');
	      //res.body.persona.should.have.property('nombres');
	      //res.body.persona.should.have.property('cedula');
	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');
	      done();
	    });
	});/*
	  it('Prueba donde nombres es null, cedula con longitud 10 y apellidos estan presentes' , function(done) {
	  chai.request(server)
	    .post('/procarianos/nuevo')
	    .send({ 'apellidos': 'viteri cuenca' , 'cedula': '0987654321'})
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');
	      assert.equal(req.body.persona.cedula.length, '10' , 'es igual')
	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');
	      done();
	    });
	 });
	  it('Prueba donde apellidos es null, cedula con longitud 10 y nombres estan presentes' , function(done) {
	  chai.request(server)
	    .post('/procarianos/nuevo')
	    .send({ 'cedula': '0987654321' , 'nombres': 'jose antonio'})
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');
	      assert.equal(req.body.persona.cedula.length, '10' , 'es igual')
	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');
	      done();
	    });
	 });
	  it('Prueba donde cedula tiene longitud igual a 10, y nombres y apellidos son diferentes de null', function(done) {
	  chai.request(server)
	    .post('/procarianos/nuevo')
	    .send({ 'apellidos': 'viteri cuenca' , 'nombres': 'jose antonio' , 'cedula' : '0987654321'})
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');
	      assert.equal(res.body.persona.cedula.length, '10' , 'es igual')
	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');
	      done();
	    });
	 });
	  it('Prueba donde cedula tiene longitud diferente de 10, y nombres y apellidos son diferentes de null', function(done) {
	  chai.request(server)
	    .post('/procarianos/nuevo')
	    .send({ 'apellidos': 'viteri cuenca' , 'nombres': 'jose antonio' , 'cedula' : '098765432109'})
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.persona.should.have.property('apellidos');
	      res.body.persona.should.have.property('nombres');
	      res.body.persona.should.have.property('cedula');
	      assert.equal(req.body.persona.cedula.length, '10' , 'es igual')
	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');
	      done();
	    });
	  });*/
	});

