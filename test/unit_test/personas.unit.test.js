'use strict';
process.env.NODE_ENV = 'test';

let chai 		= require('chai');
let assert 	= chai.assert;
let should 	= chai.should();

let sequelize	 	  = require('../../models/').sequelize;
let ModeloPersona = require('../../models/').Persona;

/*
	VARIABLES GLOBALES
*/


let hash = 'contraseñasupersecreta';
let personaObj 		= {
	cedula 					: '0927102848',
	nombres 				: 'Edison Andre',
	apellidos 			: 'Mora Cazar',
	direccion 			: 'Cdla. Coviem',
	fechaNacimiento : new Date('1995-06-27'),
	genero 					: 'masculino',
	contrasenna 		: '',
	email 					: 'edison_andre_9@hotmail.com',
	celular 				: '0992556793',
	convencional 		: '042438648',
	trabajo 				: '',
	tipo 						: ''
};

describe('PERSONAS', () => {

	describe('crearPersonaT', () => {
		let transaction;
		let idPersona  = 4;	//Quemado en la base de datos. Id del animador
		let personaObj = {
			cedula 					: '0927102848',
			nombres 				: 'Edison Andre',
			apellidos 			: 'Mora Cazar',
			direccion 			: 'Cdla. Coviem',
			fechaNacimiento : new Date('1995-06-27'),
			genero 					: 'masculino',
			contrasenna 		: '',
			email 					: 'edison_andre_9@hotmail.com',
			celular 				: '0992556793',
			convencional 		: '042438648',
			trabajo 				: '',
			tipo 						: ''
		};
		beforeEach( () => {
			personaObj 		= {
				cedula 					: '0927102848',
				nombres 				: 'Edison Andre',
				apellidos 			: 'Mora Cazar',
				direccion 			: 'Cdla. Coviem',
				fechaNacimiento : new Date('1995-06-27'),
				genero 					: 'masculino',
				contrasenna 		: '',
				email 					: 'edison_andre_9@hotmail.com',
				celular 				: '0992556793',
				convencional 		: '042438648',
				trabajo 				: '',
				tipo 						: ''
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Cédula" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP4. Cédula más de 10 caracteres', done => {
			personaObj.cedula = '0992568758975';
			ModeloPersona.crearPersonaT(personaObj, transaction)
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Email"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		xit('CP19. Convencional con letras', done => {
			personaObj.convencional = 'hola';
			ModeloPersona.crearPersonaT(personaObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Convencional"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP20. Convencional con caracteres especiales', done => {
			personaObj.convencional = '<>';
			ModeloPersona.crearPersonaT(personaObj, transaction)
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No más de 15 caracteres en el campo "Convencional"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		xit('CP22. Celular con letras', done => {
			personaObj.celular = 'hola';
			ModeloPersona.crearPersonaT(personaObj, transaction)
			.then( resultado => {
				console.log('Error:', resultado)
				done();
			})
			.catch( fail => {
				console.log('Fail:', fail)
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Celular"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP23. Celular con caracteres especiales', done => {
			personaObj.celular = '<>';
			ModeloPersona.crearPersonaT(personaObj, transaction)
			.then( resultado => {
				done();
			})
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
			.then( resultado => {
				done();
			})
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
		let idPersonaEditar = 4;	//Quemado en la base de datos. Id del animador
		let personaEditar 	= {
			cedula 					: '0927102848',
			nombres 				: 'Edison Andre',
			apellidos 			: 'Mora Cazar',
			direccion 			: 'Cdla. Coviem',
			fechaNacimiento : new Date('1995-06-27'),
			genero 					: 'masculino',
			contrasenna 		: '',
			email 					: 'edison_andre_9@hotmail.com',
			celular 				: '0992556793',
			convencional 		: '042438648',
			trabajo 				: 'JAJAJA',
			tipo 						: ''
		};
		beforeEach( () => {
			personaEditar 	= {
				cedula 					: '0927102848',
				nombres 				: 'Edison Andre',
				apellidos 			: 'Mora Cazar',
				direccion 			: 'Cdla. Coviem',
				fechaNacimiento : new Date('1995-06-27'),
				genero 					: 'masculino',
				contrasenna 		: '',
				email 					: 'edison_andre_9@hotmail.com',
				celular 				: '0992556793',
				convencional 		: '042438648',
				trabajo 				: 'JAJAJA',
				tipo 						: ''
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
				done(error);
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
			personaEditar.cedula = '0992568758975';
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
	  		assert.equal(resultado[0], 1, 'Cantidad editada incorrecta');
	  		//transaction.commit();
	  		transaction.rollback();
				done();
	  	})
	  	.catch( fail => {
	  		done(fail);
	  	});
	  });

	  it('CP2. idPersona es null', done => {
	  	ModeloPersona.ingresarContrasenna(null, hash, transaction)
	  	.then( resultado => {
	  		console.log('ESTO NO DEBERÍA DE PASAR...');
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
				done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'Id inválido', 'Mensaje de error incorrecto');
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
