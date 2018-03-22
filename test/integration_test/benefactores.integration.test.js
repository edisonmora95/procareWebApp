'use strict';

process.env.NODE_ENV = 'test';

const reqs    = require('../requests');
const app     = require('../../app')
const chai    = require('chai');
const request = require('supertest');
const assert  = chai.assert;
const expect  = chai.expect;

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJQZXJzb25hbCJdLCJpZCI6MiwiaWF0IjoxNTEzODkwNzAxfQ.5OQlRcegbehBU2C9Lnwz59zgBPRyBLicpwnpigYllG0';

describe('BENEFACTORES', () => {
  describe('crearBenefactor', () => {
    let benefactor;
      
    it('CP1. Crear benefactor - Empresa', function(done){
      request(app)
        .post('/api/benefactores/')
        .set('x-access-token', token)
        .send(reqs.benefactorEmpresa)
        .end( (err, res) => {
          expect(res.body.estado).to.equal(true);
          expect(res.body.mensaje).to.equal('Benefactor creado correctamente');
          expect(res.body.datos).to.equal(2);
          done();
        });
    });

    it('CP2. Crear benefactor - Persona no existente', function(done){
      request(app)
        .post('/api/benefactores/')
        .set('x-access-token', token)
        .send(reqs.benefactorPersonaNueva)
        .end( (err, res) => {
          expect(res.body.estado).to.equal(true);
          expect(res.body.mensaje).to.equal('Benefactor creado correctamente');
          expect(res.body.datos).to.equal(3);
          done();
        });
    });

    it('CP3. Crear benefactor - Persona ya existente', function(done){
      request(app)
        .post('/api/benefactores/')
        .set('x-access-token', token)
        .send(reqs.benefactorPersonaExistente)
        .end( (err, res) => {
          expect(res.body.estado).to.equal(true);
          expect(res.body.mensaje).to.equal('Benefactor creado correctamente');
          expect(res.body.datos).to.equal(4);
          done();
        });
    });
  });
});