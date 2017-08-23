'use strict';

/* process.env.NODE_ENV = 'test';
console.log('Environment: ' + process.env.NODE_ENV);
*/
var chai = require('chai');
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Centros', function() {
    describe('Crear centro', () => {
        it('Prueba donde nombre es null', function(done) {
            chai.request(server)
                .post('/api/centro/nuevo')
                .send({})
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    assert.equal(res.body.mensaje, 'No se pudo crear la centro', 'Mensaje incorrecto');
                    assert.equal(res.body.estado, false, 'Status incorrecto');
                    done();
                });
        });
        it('Prueba donde nombre es HOLA', function(done) {
            chai.request(server)
                .post('/api/centro/nuevo')
                .send({
                    'nombre': 'HOLA'
                })
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    assert.equal(res.body.mensaje, 'No se pudo crear la centro', 'Mensaje incorrecto');
                    assert.equal(res.body.estado, false, 'Status incorrecto');
                    assert.equal(res.body.mensajeError, 'Valor ingresado como nombre de centro no es válido.', 'Mensaje de error incorrecto.');
                    done();
                });
        });
        /*it('Prueba donde nombre es Iniciación', function(done){
        	chai.request(server)
        		.post('/api/nivel/nuevo')
        		.send({'nombre': 'Iniciación'})
        		.end((err, res) => {
        			res.should.be.json;
        			res.should.have.status(200);
        			res.body.should.be.a('object');
        			assert.equal(res.body.mensaje, 'Se pudo crear correctamente', 'Mensaje incorrecto' );
        			assert.equal(res.body.estado, true, 'Status incorrecto');
        			done();
        		});
        });*/
        it('Prueba ingreso de centro duplicada. Nombre es iniciación otra vez', function(done) {
            chai.request(server)
                .post('/api/centro/nuevo')
                .send({
                    'nombre': 'Centro'
                })
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    assert.equal(res.body.mensaje, 'No se pudo crear centro', 'Mensaje incorrecto');
                    assert.equal(res.body.estado, false, 'Status incorrecto');
                    assert.equal(res.body.mensajeError, 'nombre must be unique', 'Mensaje de error incorrecto.');
                    done();
                });
        });
    });
    describe('DELETE', () => {
        it('CP2. Id no enviado', function(done) {
            chai.request(server)
                .delete('/api/centro/')
                .end((err, res) => {
                    assert.equal(res.status, 404, 'Status incorrecto');
                    done();
                });
        });
        it('CP3. Id es un número negativo', function(done) {
            chai.request(server)
                .delete('/api/centro/-5')
                .end((err, res) => {
                    assert.equal(res.body.estado, false, 'Estado incorrecto');
                    assert.equal(res.body.mensajeError, 'No se encontraron centro con el id indicado.', 'Mensaje incorrecto');
                    done();
                });
        });
        it('CP4. Id es Hola', function(done) {
            chai.request(server)
                .delete('/api/centro/Hola')
                .end((err, res) => {
                    assert.equal(res.body.estado, false, 'Estado incorrecto');
                    assert.equal(res.body.mensajeError, 'No se encontraron centro con el id indicado.', 'Mensaje incorrecto');
                    done();
                });
        });
    });
    /*
    describe('GET', () => {
        it('Debería devolver todas los centros', (done) => {
            chai.request(server)
                .get('/api/centro/')
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    //assert.equal(res.body.estado, true, 'Estado incorrecto');
                    assert.equal(res.body.mensaje, 'Se obtuvieron los centro correctamente', 'Mensaje incorrecto');
                    res.body.datos.should.be.a('array');
                    done();
                });
        });
    });*/
});