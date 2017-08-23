process.env.NODE_ENV = 'test';

let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

//Por default, id de animador es 3 y 4
let paralelo = {
    nombre: 'Grupo de prueba',
    tipo: 'Formación'

};



describe('Personal', () => {

    describe('Crear paralelo', () => {
        //Volver a inicializar el objeto de grupo después de cada test
        afterEach(function() {
            paralelo = {
                nombre: 'Grupo de prueba',
                tipo: 'Formación'
            };
        });

        it('CP1. Creación con datos correctos. Creación de paralelo', (done) => {
            chai.request(server)
                .post('/api/paralelo/')
                .send(paralelo)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(201);
                    assert.equal(res.body.estado, true, 'Estado incorrecto');
                    assert.equal(res.body.mensaje, 'Grupo creado exitosamente', 'Mensaje incorrecto');
                    done();
                });
        });
        it('CP2. Id de etapa ingresada es incorrecto', (done) => {
            paralelo.etapa = 100;
            chai.request(server)
                .post('/api/paralelo/')
                .send(paralelo)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(400);
                    assert.equal(res.body.estado, false, 'Estado incorrecto');
                    assert.equal(res.body.mensaje, 'No se pudo añadir a la etapa', 'Mensaje incorrecto');
                    done();
                });
        });

    });

});