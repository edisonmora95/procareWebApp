'use strict';

process.env.NODE_ENV = 'test';
console.log('Environment: ' + process.env.NODE_ENV);

var chai = require('chai');
var assert = require('chai').assert;
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

let tareadId = 1;
let tarea = {
    responsable: 1
        //nombre: 'P',
        //prioridad: 'baja',
        //estado: 'activa',
        //categoria: 'crack'
};

describe('Tareas', function() {
    describe('Crear tarea', () => {
        afterEach(function() {
            tarea = {
                responsable: 1
                    //nombre: 'P',
                    //prioridad: 'baja',
                    //estado: 'activa',
                    //categoria: 'crack'
            };
        })

        it('Prueba con datos correctos', function(done) {
            chai.request(server)
                .post('/api/tarea/')
                .send(tarea)
                .end((err, res) => {
                    //res.should.be.json;
                    res.should.have.status(201);
                    //res.body.should.be.a('object');
                    assert.equal(res.status, 201, 'Status correcto');
                    assert.equal(res.body.mensaje, 'No se pudo crear', 'Mensaje incorrecto');
                    assert.equal(res.body.estado, false, 'Status incorrecto');
                    done();
                });
        });
        it('Prueba ingreso de etapa duplicada', function(done) {
            chai.request(server)
                .post('/api/tarea/')
                .send(tarea)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    assert.equal(res.status, 404, 'Status incorrecto');
                    assert.equal(res.body.mensaje, 'No se pudo crear', 'Mensaje incorrecto');
                    assert.equal(res.body.estado, false, 'Status incorrecto');
                    assert.equal(res.body.mensajeError, 'nombre must be unique', 'Mensaje de error incorrecto.');
                    done();
                });
        });
    });
    describe('DELETE', () => {
        it('CP2. Id no enviado', function(done) {
            chai.request(server)
                .delete('/api/tarea/')
                .end((err, res) => {
                    assert.equal(res.status, 404, 'Status incorrecto');
                    done();
                });
        });
        it('CP3. Id es un número negativo', function(done) {
            chai.request(server)
                .delete('/api/tarea/-5')
                .end((err, res) => {
                    assert.equal(res.status, 404, 'Status incorrecto');
                    done();
                });
        });
        it('CP4. Id es Hola', function(done) {
            chai.request(server)
                .delete('/api/tarea/Hola')
                .end((err, res) => {
                    assert.equal(res.status, 404, 'Status incorrecto');
                    done();
                });
        });
    });
    describe('GET', () => {
        it('Debería devolver todas las etapas', (done) => {
            chai.request(server)
                .get('/api/tarea/')
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    assert.equal(res.status, 200, 'Status correcto');
                    //assert.equal(res.body.estado, true, 'Estado incorrecto');
                    //assert.equal(res.body.mensaje, 'Se obtuvieron las etapas correctamente', 'Mensaje incorrecto');
                    res.body.datos.should.be.a('array');
                    done();
                });
        });
    });
    describe('GET', () => {
        it('Debería devolver la tarea requerida', (done) => {
            tareadId = 1;
            chai.request(server)
                .get('/api/tarea/' + tareaId)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    assert.equal(res.status, 200, 'Status correcto');
                    //assert.equal(res.body.mensaje, 'Se obtuvieron las tareas correctamente', 'Mensaje incorrecto');
                    //res.body.datos.should.be.a('array');
                    done();
                });
        });
    });
});