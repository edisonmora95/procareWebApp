'use strict';
process.env.NODE_ENV = 'test';

let chai    = require('chai');
let assert  = chai.assert;
let should  = chai.should();

const sequelize     = require('../../models/').sequelize;
const ModeloPersona = require('../../models/').Persona;
const Mocks         = require('./mocks');

/*
  VARIABLES GLOBALES
*/


let hash = 'contraseñasupersecreta';
let personaObj    = {
  cedula          : '0927102848',
  nombres         : 'Edison Andre',
  apellidos       : 'Mora Cazar',
  direccion       : 'Cdla. Coviem',
  fechaNacimiento : new Date('1995-06-27'),
  genero          : 'masculino',
  contrasenna     : '',
  email           : 'edison_andre_9@hotmail.com',
  celular         : '0992556793',
  convencional    : '042438648',
  trabajo         : '',
  tipo            : ''
};

describe('PERSONAS', () => {
  
  describe('crearPersonaT', () => {
    let transaction;
    let personaObj = {
      cedula          : '0927102848',
      nombres         : 'Edison Andre',
      apellidos       : 'Mora Cazar',
      direccion       : 'Cdla. Coviem',
      fechaNacimiento : new Date('1995-06-27'),
      genero          : 'masculino',
      contrasenna     : '',
      email           : 'edison_andre_9@hotmail.com',
      celular         : '0992556793',
      convencional    : '042438648',
      trabajo         : '',
      tipo            : ''
    };
    beforeEach( () => {
      personaObj    = {
        cedula          : '0927102848',
        nombres         : 'Edison Andre',
        apellidos       : 'Mora Cazar',
        direccion       : 'Cdla. Coviem',
        fechaNacimiento : new Date('1995-06-27'),
        genero          : 'masculino',
        contrasenna     : '',
        email           : 'edison_andre_9@hotmail.com',
        celular         : '0992556793',
        convencional    : '042438648',
        trabajo         : '',
        tipo            : ''
      };
      return inicializarTransaccion()
      .then( t => {
        transaction = t;
      })
      .catch( error => {
        console.log('No se pudo crear la transacción');
      });
    });

    it('CP1. Datos correctos', done => {
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .then( resultado => {
        resultado.should.be.json;
        transaction.rollback();
        done();
      })
      .catch( error => {
        transaction.rollback();
        done(error);
      });
    });

    it('CP2. Cédula con letras', done => {
      personaObj.cedula = 'hola';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'La cédula solo puede contener números', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP3. Cédula vacía', done => {
      personaObj.cedula = '';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Cédula" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP4. Cédula más de 10 caracteres', done => {
      personaObj.cedula = '0992568758975555555';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'La cédula debe tener 10 caracteres', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP5. Nombre vacío', done => {
      personaObj.nombres = '';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Nombres" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });
    
    it('CP6. Nombre con caracteres especiales', done => {
      personaObj.nombres = '<>';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Nombre"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP7. Apellido vacío', done => {
      personaObj.apellidos = '';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Apellidos" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP8. Apellido con caracteres especiales', done => {
      personaObj.apellidos = '<>';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Apellidos"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP9. Dirección vacía', done => {
      personaObj.direccion = '';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Dirección" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP10. Dirección con caracteres especiales', done => {
      personaObj.direccion = '<>';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Dirección"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP11. Fecha de nacimiento vacía', done => {
      personaObj.fechaNacimiento = '';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Fecha de nacimiento" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });
    
    it('CP13. Fecha de nacimiento futura', done => {
      personaObj.fechaNacimiento = new Date('2020-06-27');
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar una fecha de nacimiento futura', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP14. Género vacío', done => {
      personaObj.genero = '';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Género" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP15. Género no válido', done => {
      personaObj.genero = 'hola';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El género ingresado debe ser "masculino" o "femenino"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP16. Email vacío', done => {
      personaObj.email = '';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Email" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP17. No es email', done => {
      personaObj.email = 'hola';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Email" debe contener un email válido', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP18. Email con caracteres especiales', done => {
      personaObj.email = 'hola<script>@hotmail.com';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Email"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP20. Convencional con caracteres especiales', done => {
      personaObj.convencional = '<>';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Convencional"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP21. Convencional > 15 caracteres', done => {
      personaObj.convencional = '04234851588888858';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No más de 15 caracteres en el campo "Convencional"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP23. Celular con caracteres especiales', done => {
      personaObj.celular = '<>';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Celular"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP24. Celular > 15 caracteres', done => {
      personaObj.celular = '04234851588888858';
      ModeloPersona.crearPersonaT(personaObj, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No más de 15 caracteres en el campo "Celular"', 'Mensaje obtenido incorrecto');
        done();
      });
    });
  });
  
  describe('editarPersonaT', () => {
    let transactionEditar;
    let idPersonaEditar = 4;  //Quemado en la base de datos. Id del animador
    let personaEditar   = {
      cedula          : '0927102848',
      nombres         : 'Edison Andre',
      apellidos       : 'Mora Cazar',
      direccion       : 'Cdla. Coviem',
      fechaNacimiento : new Date('1995-06-27'),
      genero          : 'masculino',
      contrasenna     : '',
      email           : 'edison_andre_9@hotmail.com',
      celular         : '0992556793',
      convencional    : '042438648',
      trabajo         : 'JAJAJA',
      tipo            : ''
    };
    beforeEach( () => {
      personaEditar   = {
        cedula          : '0927102848',
        nombres         : 'Edison Andre',
        apellidos       : 'Mora Cazar',
        direccion       : 'Cdla. Coviem',
        fechaNacimiento : new Date('1995-06-27'),
        genero          : 'masculino',
        contrasenna     : '',
        email           : 'edison_andre_9@hotmail.com',
        celular         : '0992556793',
        convencional    : '042438648',
        trabajo         : 'JAJAJA',
        tipo            : ''
      };
      return inicializarTransaccion()
      .then( t => {
        transactionEditar = t;
      })
      .catch( error => {
        console.log('No se pudo crear la transacción');
      });
    });

    it('CP1. Datos correctos', done => {
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        assert.equal(resultado, 1, 'Cantidad de registros incorrecta');
        transactionEditar.rollback();
        done();
      })
      .catch( error => {
        transactionEditar.rollback();
        done();
      });
    });
    
    it('CP2. Cédula con letras', done => {
      personaEditar.cedula = 'hola';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'La cédula solo puede contener números', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP3. Cédula vacía', done => {
      personaEditar.cedula = '';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Cédula" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP4. Cédula más de 10 caracteres', done => {
      personaEditar.cedula = '09925687589755555';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'La cédula debe tener 10 caracteres', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP5. Nombre vacío', done => {
      personaEditar.nombres = '';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Nombres" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP6. Nombre con caracteres especiales', done => {
      personaEditar.nombres = '<>';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        console.log(resultado)
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Nombre"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP7. Apellido vacío', done => {
      personaEditar.apellidos = '';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Apellidos" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP8. Apellido con caracteres especiales', done => {
      personaEditar.apellidos = '<>';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        console.log(resultado)
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Apellidos"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP9. Dirección vacía', done => {
      personaEditar.direccion = '';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Dirección" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP10. Dirección con caracteres especiales', done => {
      personaEditar.direccion = '<>';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        console.log(resultado)
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Dirección"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP11. Fecha de nacimiento vacía', done => {
      personaEditar.fechaNacimiento = '';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Fecha de nacimiento" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });
    
    it('CP13. Fecha de nacimiento futura', done => {
      personaEditar.fechaNacimiento = new Date('2020-06-27');
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        console.log(resultado)
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar una fecha de nacimiento futura', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP14. Género vacío', done => {
      personaEditar.genero = '';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Género" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP15. Género no válido', done => {
      personaEditar.genero = 'hola';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        console.log(resultado)
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El género ingresado debe ser "masculino" o "femenino"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP16. Email vacío', done => {
      personaEditar.email = '';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Email" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP17. No es email', done => {
      personaEditar.email = 'hola';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        console.log(resultado)
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Email" debe contener un email válido', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP18. Email con caracteres especiales', done => {
      personaEditar.email = 'hola<script>@hotmail.com';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        console.log(resultado)
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Email"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    xit('CP19. Convencional con letras', done => {
      personaEditar.convencional = 'hola';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Convencional"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP20. Convencional con caracteres especiales', done => {
      personaEditar.convencional = '<>';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        console.log(resultado)
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Convencional"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP21. Convencional > 15 caracteres', done => {
      personaEditar.convencional = '04234851588888858';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        console.log(resultado)
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No más de 15 caracteres en el campo "Convencional"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    xit('CP22. Celular con letras', done => {
      personaEditar.celular = 'hola';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Celular"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP23. Celular con caracteres especiales', done => {
      personaEditar.celular = '<>';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        console.log(resultado)
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Celular"', 'Mensaje obtenido incorrecto');
        done();
      });
    });
    
    it('CP24. Celular > 15 caracteres', done => {
      personaEditar.celular = '04234851588888858';
      ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
      .then( resultado => {
        console.log('Error');
        console.log(resultado)
        done();
      })
      .catch( fail => {
        transactionEditar.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No más de 15 caracteres en el campo "Celular"', 'Mensaje obtenido incorrecto');
        done();
      });
    });
  });
  
  describe('ingresarContrasenna', () => {
    let idPersona = 4;
    let transaction;
    beforeEach( () => {
      return inicializarTransaccion()
      .then( t => {
        transaction = t;
      })
      .catch( error => {
        console.log('No se pudo crear la transacción');
      });
    });

    it('CP1. Ingreso exitoso', done => {
      ModeloPersona.ingresarContrasenna(idPersona, hash, transaction)
      .then( resultado => {
        resultado.should.be.array;
        assert.equal(resultado, 1, 'Cantidad editada incorrecta');
        transaction.rollback();
        done();
      })
      .catch( fail => {
        transaction.rollback();
        done(fail);
      });
    });

    it('CP2. idPersona es null', done => {
      ModeloPersona.ingresarContrasenna(null, hash, transaction)
      .then( resultado => {
        console.log('ESTO NO DEBERÍA DE PASAR...');
        transaction.rollback();
        done();
      })
      .catch( fail => {
        transaction.rollback();
        assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No ingresó el id', 'Mensaje de error incorrecto');
        done();
      });
    });

    it('CP3. idPersona es negativo', done => {
      ModeloPersona.ingresarContrasenna(-5, hash, transaction)
      .then( resultado => {
        console.log('ESTO NO DEBERÍA DE PASAR...');
        transaction.rollback();
        done();
      })
      .catch( fail => {
        transaction.rollback();
        assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'Id inválido', 'Mensaje de error incorrecto');
        done();
      });
    });

    it('CP4. Registro no encontrado', done => {
      ModeloPersona.ingresarContrasenna(500, hash, transaction)
      .then( resultado => {
        console.log('ESTO NO DEBERÍA DE PASAR...');
        transaction.rollback();
        done();
      })
      .catch( fail => {
        transaction.rollback();
        assert.equal(fail.tipo, 'Edit error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No se encontró el registro de la persona para editar', 'Mensaje de error incorrecto');
        done();
      });
    });
  });
  
  describe('buscarPersonaPorEmailP', () => {
    let email = 'personal@gmail.com';

    it('CP1. Caso exitoso', done => {
      ModeloPersona.buscarPersonaPorEmailP(email)
      .then( resultado => {
        resultado.should.be.json;
        assert.equal(resultado.get('nombres'), 'Personal', 'Nombre incorrecto');
        done();
      });
    });

    it('CP2. Email no enviado', done => {
      ModeloPersona.buscarPersonaPorEmailP(null)
      .catch( fail => {
        assert.equal(fail.mensaje, 'No ingresó el email', 'Mensaje de error incorrecto');
        done();
      });
    });

    it('CP3. Email vacío', done => {
      ModeloPersona.buscarPersonaPorEmailP('')
      .catch( fail => {
        assert.equal(fail.mensaje, 'No ingresó el email', 'Mensaje de error incorrecto');
        done();
      });
    });

    it('CP4. Email no encontrado', done => {
      let emailFalso = 'email_falso@gmail.com'
      ModeloPersona.buscarPersonaPorEmailP(emailFalso)
      .then( resultado => {
        assert.equal(resultado, null, 'Resultado incorrecto');
        done();
      });
    });
  });
  
  describe('deserializarUsuario', () => {
    let idPersonal = 2;
    let idDirectorEjecutivo = 1;
    let idChicoFormacion = 8;

    it('CP1. Deserializar Animador', done => {
      ModeloPersona.deserializarUsuario(idPersonal)
      .then( resultado => {
        resultado.should.be.json;
        assert.equal(resultado.get('id'), idPersonal, 'Ids no coinciden');
        assert.equal(resultado.get('nombres'), 'Personal', 'Nombres no coinciden');
        assert.equal(resultado.get('email'), 'personal@gmail.com', 'Emails no coinciden');
        const Rols = resultado.get('Rols');
        assert.equal(Rols[0].get('nombre'), 'Personal', 'Rol incorrecto');
        const nombreRol = Rols[0].get('PersonaRol').get('RolNombre');
        assert.equal(nombreRol, 'Personal', 'Rol incorrecto');
        done();
      });
    });

    it('CP2. Deserializar usuario con varios roles', done => {
      ModeloPersona.deserializarUsuario(idDirectorEjecutivo)
      .then( resultado => {
        resultado.should.be.json;
        assert.equal(resultado.get('id'), idDirectorEjecutivo, 'Ids no coinciden');
        assert.equal(resultado.get('nombres'), 'FUNDACION', 'Nombres no coinciden');
        assert.equal(resultado.get('email'), 'procarewebapp@gmail.com', 'Emails no coinciden');
        const Rols = resultado.get('Rols');
        let nombreRol = '';
        // Primer rol
        assert.equal(Rols[0].get('nombre'), 'Animador', 'Rol incorrecto');
        nombreRol = Rols[0].get('PersonaRol').get('RolNombre');
        assert.equal(nombreRol, 'Animador', 'Rol incorrecto');
        // Segundo rol
        assert.equal(Rols[1].get('nombre'), 'Director Ejecutivo', 'Rol incorrecto');
        nombreRol = Rols[1].get('PersonaRol').get('RolNombre');
        assert.equal(nombreRol, 'Director Ejecutivo', 'Rol incorrecto');
        done();
      });
    });

    it('CP3. Deserializar usuario sin roles', done => {
      ModeloPersona.deserializarUsuario(idChicoFormacion)
      .then( resultado => {
        resultado.should.be.json;
        assert.equal(resultado.get('id'), idChicoFormacion, 'Ids no coinciden');
        assert.equal(resultado.get('nombres'), 'Chico', 'Nombres no coinciden');
        assert.equal(resultado.get('email'), 'chico_formacion@gmail.com', 'Emails no coinciden');
        assert.equal(resultado.get('Rols').length, 0, 'Array de roles no está vacío');
        done();
      });
    });

    it('CP4. Id no enviado', done => {
      ModeloPersona.deserializarUsuario(null)
      .catch( fail => {
        assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No ingresó el id de la persona', 'Tipo de error incorrecto');
        done();
      });
    });

    it('CP5. Id no válido', done => {
      ModeloPersona.deserializarUsuario(-5)
      .catch( fail => {
        assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'Id de la persona inválido', 'Tipo de error incorrecto');
        done();
      });
    });

    it('CP6. Persona no encontrada', done => {
      ModeloPersona.deserializarUsuario(800)
      .then( resultado => {
        assert.equal(resultado, null, 'Se encontró un registro');
        done();
      });
    });
  });

  describe('buscarPersonaPorCedulaP', () => {
    let cedula;
    beforeEach( () => {
      cedula = '0123456789';
    });

    it('CP1. Búsqueda exitosa. Registro encontrado', done => {
      ModeloPersona.buscarPersonaPorCedulaP(cedula)
      .then( registro => {
        assert.equal(registro.get('cedula'), cedula, 'Cédulas no coinciden');
        done();
      });
    });

    it('CP2. Búsqueda exitosa. Registro no encontrado', done => {
      cedula = '6666666666';
      ModeloPersona.buscarPersonaPorCedulaP(cedula)
      .then( registro => {
        assert.equal(registro, null, 'Si se encontró un registro');
        done();
      });
    });

    it('CP3. Cédula no enviada', done => {
      cedula = null;
      ModeloPersona.buscarPersonaPorCedulaP(cedula)
      .catch( fail => {
        assert.equal(fail.tipo, 'Find error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No ingresó la cédula a buscar', 'Mensaje de error incorrecto');
        done();
      });
    });

    it('CP4. Cédula vacía', done => {
      cedula = '';
      ModeloPersona.buscarPersonaPorCedulaP(cedula)
      .catch( fail => {
        assert.equal(fail.tipo, 'Find error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No ingresó la cédula a buscar', 'Mensaje de error incorrecto');
        done();
      });
    });
  });
  
  describe('crearEmpresaT', () => {
    let empresa;
    let transaction;

    beforeEach( () => {
      empresa = {
        ruc         : '12345678999',
        razonSocial : 'Empresa 123',
        direccion   : 'Sur',
        email       : 'email_empresa_procare@gmail.com',
        convencional: '042348555',
        celular     : '0992556791'
      };
      return inicializarTransaccion()
      .then( t => {
        transaction = t;
      })
      .catch( error => {
        console.log('No se pudo crear la transacción');
      });
    });

    it('CP1. Creación exitosa', done => {
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .then( resultado => {
        transaction.rollback();
        resultado.should.be.json;
        done();
      });
    });

    it('CP2. RUC con letras', done => {
      empresa.ruc = 'hola';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'La cédula solo puede contener números', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP3. RUC vacío', done => {
      empresa.ruc = '';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Cédula" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP4. RUC más de 11 caracteres', done => {
      empresa.ruc = '999999999999999999999999999999999999999';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'La cédula debe tener 10 caracteres', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP5. Razón Social con caracteres especiales', done => {
      empresa.razonSocial = '<>';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Razón Social"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP6. Razón Social null', done => {
      empresa.razonSocial = null;
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Razón Social" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP7. Dirección vacía', done => {
      empresa.direccion = '';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Dirección" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP8. Dirección con caracteres especiales', done => {
      empresa.direccion = '<>';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Dirección"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP9. Email vacío', done => {
      empresa.email = '';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Email" no puede estar vacío', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP10. No es email', done => {
      empresa.email = 'hola';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'El campo "Email" debe contener un email válido', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP11. Email con caracteres especiales', done => {
      empresa.email = 'hola<script>@hotmail.com';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Email"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP12. Convencional con caracteres especiales', done => {
      empresa.convencional = '<>';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Convencional"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP13. Convencional > 15 caracteres', done => {
      empresa.convencional = '04234851588888858';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No más de 15 caracteres en el campo "Convencional"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP14. Celular con caracteres especiales', done => {
      empresa.celular = '<>';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Celular"', 'Mensaje obtenido incorrecto');
        done();
      });
    });

    it('CP15. Celular > 15 caracteres', done => {
      empresa.celular = '04234851588888858';
      ModeloPersona.crearEmpresaT(empresa, transaction)
      .catch( fail => {
        transaction.rollback();
        fail.should.be.json;
        assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
        assert.equal(fail.mensaje, 'No más de 15 caracteres en el campo "Celular"', 'Mensaje obtenido incorrecto');
        done();
      });
    });
  });

});

function inicializarTransaccion(){
  return new Promise( (resolve, reject) => {
    sequelize.transaction({
      autocommit: false,
    })
    .then( result => {
      return resolve(result);
    })
    .catch( fail => {
      return reject(fail);
    });
  });
}
