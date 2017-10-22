'use strict';
process.env.NODE_ENV = 'test';

let chai 		= require('chai');
let assert 	= chai.assert;
let should 	= chai.should();

let sequelize	 				= require('../../models/').sequelize;
let ModeloPersona 		= require('../../models/').Persona;

let transaction;
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
		/*
		describe('Caso exitoso', () => {
			before( () => {
		    return inicializarTransaccion()
		    .then( t => {
		    	console.log('Transacción creada');
		    	transaction = t;
		    })
		    .catch( error => {
		    	console.log('No se pudo crear la transacción');
		    });
		  });

			afterEach( () => {
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
			});

			it('CP1. Datos correctos', done => {
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Exito');
					resultado.should.be.json;
					transaction.commit();
					done();
				})
				.catch( error => {
					transaction.rollback();
					done(error);
				});
			});
		});
		*/
		
		describe('Casos inválidos', () => {
			before( () => {
		    return inicializarTransaccion()
		    .then( t => {
		    	console.log('Transacción creada');
		    	transaction = t;
		    })
		    .catch( error => {
		    	console.log('No se pudo crear la transacción');
		    });
		  });

			afterEach( () => {
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
			});

			it('CP2. Cédula con letras', done => {
				personaObj.cedula = 'hola';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'La cédula solo puede contener números';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP3. Cédula vacía', done => {
				personaObj.cedula = '';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Cédula" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP4. Cédula más de 10 caracteres', done => {
				personaObj.cedula = '0992568758975';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'La cédula debe tener 10 caracteres';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP5. Nombre vacío', done => {
				personaObj.nombres = '';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Nombres" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP6. Nombre con caracteres especiales', done => {
				personaObj.nombres = '<>';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					console.log(resultado)
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No puede ingresar caracteres especiales en "Nombre"';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP7. Apellido vacío', done => {
				personaObj.apellidos = '';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Apellidos" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP8. Apellido con caracteres especiales', done => {
				personaObj.apellidos = '<>';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					console.log(resultado)
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No puede ingresar caracteres especiales en "Apellidos"';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP9. Dirección vacía', done => {
				personaObj.direccion = '';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Dirección" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP10. Dirección con caracteres especiales', done => {
				personaObj.direccion = '<>';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					console.log(resultado)
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No puede ingresar caracteres especiales en "Dirección"';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP11. Fecha de nacimiento vacía', done => {
				personaObj.fechaNacimiento = '';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Fecha de nacimiento" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});
			
			it('CP13. Fecha de nacimiento futura', done => {
				personaObj.fechaNacimiento = new Date('2020-06-27');
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					console.log(resultado)
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No puede ingresar una fecha de nacimiento futura';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP14. Género vacío', done => {
				personaObj.genero = '';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Género" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP15. Género no válido', done => {
				personaObj.genero = 'hola';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					console.log(resultado)
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El género ingresado debe ser "masculino" o "femenino"';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP16. Email vacío', done => {
				personaObj.email = '';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Email" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP17. No es email', done => {
				personaObj.email = 'hola';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					console.log(resultado)
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Email" debe contener un email válido';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP18. Email con caracteres especiales', done => {
				personaObj.email = 'hola<script>@hotmail.com';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					console.log(resultado)
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No puede ingresar caracteres especiales en "Email"';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP19. Convencional con letras', done => {
				personaObj.convencional = 'hola';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El teléfono solo puede contener números';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP20. Convencional con caracteres especiales', done => {
				personaObj.convencional = '<>';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					console.log(resultado)
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El teléfono solo puede contener números';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP21. Convencional > 15 caracteres', done => {
				personaObj.convencional = '04234851588888858';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					console.log(resultado)
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No más de 15 caracteres';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP22. Celular con letras', done => {
				personaObj.celular = 'hola';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El celular solo puede contener números';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP23. Celular con caracteres especiales', done => {
				personaObj.celular = '<>';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					console.log(resultado)
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El celular solo puede contener números';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP24. Celular > 15 caracteres', done => {
				personaObj.celular = '04234851588888858';
				ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( resultado => {
					console.log('Error');
					console.log(resultado)
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No más de 15 caracteres';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});
		});
		
	});
	
	describe('editarPersonaT', () => {
		let transactionEditar;
		let idPersonaEditar = 79;
		let personaEditar 		= {
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
		/*
		describe('Caso exitoso', () => {
			before( () => {
		    return inicializarTransaccion()
		    .then( t => {
		    	console.log('Transacción creada');
		    	transactionEditar = t;
		    })
		    .catch( error => {
		    	console.log('No se pudo crear la transacción');
		    });
		  });

			afterEach( () => {
				personaEditar 		= {
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
			});

			it('CP1. Datos correctos', done => {
				ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
				.then( resultado => {
					console.log('Exito');
					resultado.should.be.json;
					transactionEditar.commit();
					done();
				})
				.catch( error => {
					transactionEditar.rollback();
					done(error);
				});
			});
		});
		*/
		
		describe('Casos inválidos', () => {
			before( () => {
		    return inicializarTransaccion()
		    .then( t => {
		    	console.log('Transacción creada');
		    	transactionEditar = t;
		    })
		    .catch( error => {
		    	console.log('No se pudo crear la transacción');
		    });
		  });

			afterEach( () => {
				personaEditar 		= {
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
			});
			
			it('CP2. Cédula con letras', done => {
				personaEditar.cedula = 'hola';
				ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'La cédula solo puede contener números';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Cédula" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'La cédula debe tener 10 caracteres';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Nombres" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No puede ingresar caracteres especiales en "Nombre"';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Apellidos" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No puede ingresar caracteres especiales en "Apellidos"';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Dirección" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No puede ingresar caracteres especiales en "Dirección"';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Fecha de nacimiento" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No puede ingresar una fecha de nacimiento futura';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Género" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El género ingresado debe ser "masculino" o "femenino"';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Email" no puede estar vacío';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El campo "Email" debe contener un email válido';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No puede ingresar caracteres especiales en "Email"';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP19. Convencional con letras', done => {
				personaEditar.convencional = 'hola';
				ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El teléfono solo puede contener números';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El teléfono solo puede contener números';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No más de 15 caracteres';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
			});

			it('CP22. Celular con letras', done => {
				personaEditar.celular = 'hola';
				ModeloPersona.editarPersonaT(idPersonaEditar, personaEditar, transactionEditar)
				.then( resultado => {
					console.log('Error');
					done();
				})
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El celular solo puede contener números';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'El celular solo puede contener números';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
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
				.catch( error => {
					const mensajeObtenido = error.errors[0].message;
					const mensajeEsperado = 'No más de 15 caracteres';
					assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
					done();
				});
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
