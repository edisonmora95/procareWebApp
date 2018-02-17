'use strict';
process.env.NODE_ENV = 'test';

let chai 		= require('chai');
let assert 	= chai.assert;
let should 	= chai.should();

let sequelize	 				= require('../../models/').sequelize;
let ModeloProcariano 	= require('../../models/').Procariano;
let ModeloPersona 		= require('../../models/').Persona;

let transaction;
let procarianoObj = {
	colegio 				: 'Liceo Panamericano',
	universidad 		: 'Espol',
	parroquia 			: '',
	fechaOrdenacion : null,
	estado 					: 'activo',
	PersonaId 			: ''
};
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
let idPersona = '';

describe('PROCARIANOS', () => {
	
	describe.skip('crearProcarianoT', () => {
		before(function() {
	    return inicializarTransaccion()
	    .then( t => {

	    	console.log('Transacción creada');
	    	transaction = t;
	    	return ModeloPersona.crearPersonaT(personaObj, transaction)
				.then( persona => {
					console.log('Persona creada');
					idPersona = persona.get('id');
				})
				.catch( error => {
					console.log('No se pudo crear la persona');
				});

	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
	  });

		afterEach( () => {
			procarianoObj = {
				colegio 				: 'Liceo Panamericano',
				universidad 		: 'Espol',
				parroquia 			: '',
				fechaOrdenacion : null,
				estado 					: 'activo',
				PersonaId 			: ''
			};
		});

		beforeEach( () => {
			procarianoObj.PersonaId = idPersona;
		});
		/*
		it('CP1. Creación con datos correctos.', done => {
			ModeloProcariano.crearProcarianoT(procarianoObj, transaction)
			.then( resultado => {
				console.log('Exito');
				resultado.should.be.json;
				transaction.commit();
				done();
			})
			.catch( error => {
				console.log('Error');
				done();
			});
		});
		*/
		it('CP2. Colegio contiene caracteres especiales.', done => {
			procarianoObj.colegio = '<>';
			ModeloProcariano.crearProcarianoT(procarianoObj, transaction)
			.then( resultado => {
				console.log('Exito');
				done();
			})
			.catch( error => {
				const mensajeObtenido = error.errors[0].message;
				const mensajeEsperado = 'No puede ingresar caracteres especiales en "Colegio"';
				assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
				done();
			});
		});

		it('CP3. Universidad contiene caracteres especiales.', done => {
			procarianoObj.universidad = '<>';
			ModeloProcariano.crearProcarianoT(procarianoObj, transaction)
			.then( resultado => {
				console.log('Exito');
				done();
			})
			.catch( error => {
				const mensajeObtenido = error.errors[0].message;
				const mensajeEsperado = 'No puede ingresar caracteres especiales en "Universidad"';
				assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
				done();
			});
		});

		it('CP4. Parroquia contiene caracteres especiales.', done => {
			procarianoObj.parroquia = '<>';
			ModeloProcariano.crearProcarianoT(procarianoObj, transaction)
			.then( resultado => {
				console.log('Exito');
				done();
			})
			.catch( error => {
				const mensajeObtenido = error.errors[0].message;
				const mensajeEsperado = 'No puede ingresar caracteres especiales en "Parroquia"';
				assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
				done();
			});
		});

		it('CP5. Estado vacío.', done => {
			procarianoObj.estado = '';
			ModeloProcariano.crearProcarianoT(procarianoObj, transaction)
			.then( resultado => {
				console.log('Exito');
				done();
			})
			.catch( error => {
				const mensajeObtenido = error.errors[0].message;
				const mensajeEsperado = 'Estado del grupo no puede estar vacío.';
				assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
				done();
			});
		});

		it('CP6. Estado no válido.', done => {
			procarianoObj.estado = 'hola';
			ModeloProcariano.crearProcarianoT(procarianoObj, transaction)
			.then( resultado => {
				console.log('Exito');
				done();
			})
			.catch( error => {
				const mensajeObtenido = error.errors[0].message;
				const mensajeEsperado = 'Valor ingresado de "estado" no es válido';
				assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
				done();
			});
		});
	});
	
	describe('obtenerProcarianoPorIdP', () => {
		let idProcariano = 1;	//Quemado en la base de datos test

		it('CP1. Id válido', done => {
			ModeloProcariano.obtenerProcarianoPorIdP(idProcariano)
			.then( procariano => {
				const idObtenido = procariano.get('procarianoId');
				assert.equal(idObtenido, idProcariano, 'Id incorrecto');
				done();
			})
			.catch( error => {
				console.log('Error');
				done(error);
			});
		});

		it('CP2. ID no es enviado.', done => {
			ModeloProcariano.obtenerProcarianoPorIdP(null)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del procariano', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP3. ID es menor a 0.', done => {
			idProcariano = -5;
			ModeloProcariano.obtenerProcarianoPorIdP(idProcariano)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id del procariano inválido', 'Mensaje incorrecto');
				done();
			});
		});
	});
	
	describe('obtenerProcarianosDeGrupoP', () => {
		let idGrupo = 1;

		it('CP1. Id válido', done => {
			ModeloProcariano.obtenerProcarianosDeGrupoP(idGrupo)
			.then( procarianos => {
				procarianos.should.be.array;
				done();
			})
			.catch( error => {
				done(error);
			});
		});

		it('CP2. ID no es enviado.', done => {
			ModeloProcariano.obtenerProcarianosDeGrupoP(null)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del grupo',  'Mensaje recibido incorrecto');
				done();
			});
		});

		it('CP3. ID es menor a 0.', done => {
			idGrupo = -5;
			ModeloProcariano.obtenerProcarianosDeGrupoP(idGrupo)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'Id del grupo inválido',  'Mensaje recibido incorrecto');
				done();
			});
		});
	});

	describe.skip('obtenerProcarianoPorIdPersonaP', () => {
		let idPersona = 21;

		it('CP1. Id válido', done => {
			ModeloProcariano.obtenerProcarianoPorIdPersonaP(idPersona)
			.then( procariano => {
				const personaObtenida = procariano.get('Persona');
				const idPersonaObtenida = personaObtenida.get('id');
				assert.equal(idPersona, idPersonaObtenida, 'Ids incorrectos');
				done();
			})
			.catch( error => {
				done(error);
			});
		});

		it('CP2. ID no es enviado.', done => {
			ModeloProcariano.obtenerProcarianoPorIdPersonaP(null)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				const mensajeEsperado = 'No ingresó el id a buscar';
				assert.equal(fail, mensajeEsperado, 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP3. ID es menor a 0.', done => {
			idPersona = -5;
			ModeloProcariano.obtenerProcarianoPorIdPersonaP(idPersona)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				const mensajeEsperado = 'Ingresó un id negativo';
				assert.equal(fail, mensajeEsperado, 'Mensaje obtenido incorrecto');
				done();
			});
		});
	});

	describe.skip('obtenerProcarianosActivosP', () => {
		it('CP1. Devuelve a todos los procarianos activos', done => {
			ModeloProcariano.obtenerProcarianosActivosP()
			.then( procarianos => {
				for (var i = 0; i < procarianos.length; i++) {
					let estadoObtenido = procarianos[i].get('estado'); 
					assert.equal(estadoObtenido, 'activo', 'Estado incorrecto');
				}
				done();
			})
			.catch( error => {
				done(error);
			});
		});
	});
	
	describe.skip('editarProcarianoT', () => {
		let tEditar;
		let idPersonaEditar = 79;
		let procarianoEditar = {
			colegio 				: 'Liceo Panamericano',
			universidad 		: 'Espol111',
			parroquia 			: '',
			fechaOrdenacion : null,
			estado 					: 'activo'
		};
		before( () => {
	    return inicializarTransaccion()
	    .then( t => {
	    	console.log('Transacción creada');
	    	tEditar = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
	  });

		afterEach( () => {
			procarianoEditar = {
				colegio 				: 'Liceo Panamericano',
				universidad 		: 'Espol111',
				parroquia 			: '',
				fechaOrdenacion : null,
				estado 					: 'activo'
			};
		});
		/*
		it('CP1. Edición con datos correctos.', done => {
			ModeloProcariano.editarProcarianoT(idPersonaEditar, procarianoEditar, tEditar)
			.then( resultado => {
				console.log(resultado)
				console.log('Exito');
				resultado.should.be.json;
				tEditar.commit();
				done();
			})
			.catch( error => {
				done(error);
			});
		});
		*/
		it('CP2. Colegio contiene caracteres especiales.', done => {
			procarianoEditar.colegio = '<>';
			ModeloProcariano.editarProcarianoT(idPersonaEditar, procarianoEditar, tEditar)
			.then( resultado => {
				console.log('Exito');
				done();
			})
			.catch( error => {
				const mensajeObtenido = error.errors[0].message;
				const mensajeEsperado = 'No puede ingresar caracteres especiales en "Colegio"';
				assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
				//tEditar.rollback();
				done();
			});
		});
		
		it('CP3. Universidad contiene caracteres especiales.', done => {
			procarianoEditar.universidad = '<>';
			ModeloProcariano.editarProcarianoT(idPersonaEditar, procarianoEditar, tEditar)
			.then( resultado => {
				console.log('Exito');
				done();
			})
			.catch( error => {
				const mensajeObtenido = error.errors[0].message;
				const mensajeEsperado = 'No puede ingresar caracteres especiales en "Universidad"';
				assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
				//tEditar.rollback();
				done();
			});
		});

		it('CP4. Parroquia contiene caracteres especiales.', done => {
			procarianoEditar.parroquia = '<>';
			ModeloProcariano.editarProcarianoT(idPersonaEditar, procarianoEditar, tEditar)
			.then( resultado => {
				console.log('Exito');
				done();
			})
			.catch( error => {
				const mensajeObtenido = error.errors[0].message;
				const mensajeEsperado = 'No puede ingresar caracteres especiales en "Parroquia"';
				assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
				//tEditar.rollback();
				done();
			});
		});

		it('CP5. Estado vacío.', done => {
			procarianoEditar.estado = '';
			ModeloProcariano.editarProcarianoT(idPersonaEditar, procarianoEditar, tEditar)
			.then( resultado => {
				console.log('Exito');
				done();
			})
			.catch( error => {
				const mensajeObtenido = error.errors[0].message;
				const mensajeEsperado = 'Estado del grupo no puede estar vacío.';
				assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
				//tEditar.rollback();
				done();
			});
		});

		it('CP6. Estado no válido.', done => {
			procarianoEditar.estado = 'hola';
			ModeloProcariano.editarProcarianoT(idPersonaEditar, procarianoEditar, tEditar)
			.then( resultado => {
				console.log('Exito');
				done();
			})
			.catch( error => {
				const mensajeObtenido = error.errors[0].message;
				const mensajeEsperado = 'Valor ingresado de "estado" no es válido';
				assert.equal(mensajeEsperado, mensajeObtenido, 'Mensaje Incorrecto');
				//tEditar.rollback();
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
