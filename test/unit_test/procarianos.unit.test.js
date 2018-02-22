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
	
	describe('crearProcarianoT', () => {
		beforeEach(function() {
			procarianoObj = {
				colegio 				: 'Liceo Panamericano',
				universidad 		: 'Espol',
				parroquia 			: '',
				fechaOrdenacion : null,
				estado 					: 'activo',
				PersonaId 			: 7
			};
	    return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
	  });

		it('CP1. Creación con datos correctos.', done => {
			ModeloProcariano.crearProcarianoT(procarianoObj, transaction)
			.then( resultado => {
				resultado.should.be.json;
				transaction.rollback();
				done();
			})
			.catch( fail => {
				transaction.rollback();
				done(fail);
			});
		});
		
		it('CP2. Colegio contiene caracteres especiales.', done => {
			procarianoObj.colegio = '<>';
			ModeloProcariano.crearProcarianoT(procarianoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Colegio"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP3. Universidad contiene caracteres especiales.', done => {
			procarianoObj.universidad = '<>';
			ModeloProcariano.crearProcarianoT(procarianoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Universidad"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP4. Parroquia contiene caracteres especiales.', done => {
			procarianoObj.parroquia = '<>';
			ModeloProcariano.crearProcarianoT(procarianoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Parroquia"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP5. Estado vacío.', done => {
			procarianoObj.estado = '';
			ModeloProcariano.crearProcarianoT(procarianoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Estado del grupo no puede estar vacío.', 'Mensaje obtenido incorrecto');
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
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Valor ingresado de "estado" no es válido', 'Mensaje obtenido incorrecto');
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

		it('CP4. Procariano no encontrado.', done => {
			idProcariano = 10;
			ModeloProcariano.obtenerProcarianoPorIdP(idProcariano)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Find error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'No se encontró registro del procariano',  'Mensaje recibido incorrecto');
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

	describe('obtenerProcarianoPorIdPersonaP', () => {
		let idPersona = 4;	//Animador

		it('CP1. Id válido', done => {
			ModeloProcariano.obtenerProcarianoPorIdPersonaP(idPersona)
			.then( procariano => {
				const personaObtenida   = procariano.get('Persona');
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
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del procariano',  'Mensaje recibido incorrecto');
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
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'Id del procariano inválido',  'Mensaje recibido incorrecto');
				done();
			});
		});

		it('CP4. Procariano no encontrado.', done => {
			idPersona = 10;
			ModeloProcariano.obtenerProcarianoPorIdPersonaP(idPersona)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Find error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'No se encontró registro del procariano',  'Mensaje recibido incorrecto');
				done();
			});
		});
	});

	describe('obtenerProcarianosActivosP', () => {
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
	
	describe('editarProcarianoT', () => {
		let tEditar;
		let idPersonaEditar = 4;
		let procarianoEditar = {
			colegio 				: 'Liceo Panamericano',
			universidad 		: 'Espol111',
			parroquia 			: '',
			fechaOrdenacion : null,
			estado 					: 'activo'
		};
		beforeEach( () => {
			procarianoEditar = {
				colegio 				: 'Liceo Panamericano',
				universidad 		: 'Espol111',
				parroquia 			: '',
				fechaOrdenacion : null,
				estado 					: 'activo'
			};
	    return inicializarTransaccion()
	    .then( t => {
	    	tEditar = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
	  });

		
		it('CP1. Edición con datos correctos.', done => {
			ModeloProcariano.editarProcarianoT(idPersonaEditar, procarianoEditar, tEditar)
			.then( resultado => {
				assert.equal(resultado, 1, 'Cantidad de registros incorrecta');
				tEditar.rollback();
				done();
			})
			.catch( error => {
				done(error);
			});
		});
		
		it('CP2. Colegio contiene caracteres especiales.', done => {
			procarianoEditar.colegio = '<>';
			ModeloProcariano.editarProcarianoT(idPersonaEditar, procarianoEditar, tEditar)
			.then( resultado => {
				console.log('Exito');
				done();
			})
			.catch( fail => {
				tEditar.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Colegio"', 'Mensaje obtenido incorrecto');
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
			.catch( fail => {
				tEditar.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Universidad"', 'Mensaje obtenido incorrecto');
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
			.catch( fail => {
				tEditar.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Parroquia"', 'Mensaje obtenido incorrecto');
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
			.catch( fail => {
				tEditar.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Estado del grupo no puede estar vacío.', 'Mensaje obtenido incorrecto');
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
			.catch( fail => {
				tEditar.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Valor ingresado de "estado" no es válido', 'Mensaje obtenido incorrecto');
				done();
			});
		});
	});

	describe('eliminarProcarianoT', () => {
		let tEliminar;
		let idPersonaEliminar = 4;

		beforeEach( () => {
			return inicializarTransaccion()
	    .then( t => {
	    	tEliminar = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
		});

		it('CP1. Eliminación exitosa', done => {
			ModeloProcariano.eliminarProcarianoT(idPersonaEliminar, tEliminar)
			.then( resultado => {
				tEliminar.rollback();
				assert.equal(resultado, 1, 'Cantidad de registros incorrecta');
				done();
			})
			.catch( fail => {
				tEliminar.rollback();
				done(fail);
			});
		});

		it('CP2. idProcariano es null', done => {
			ModeloProcariano.eliminarProcarianoT(null, tEliminar)
			.then( resultado => {
				tEliminar.rollback();
				done();
			})
			.catch( fail => {
				tEliminar.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id de la persona', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP3. idProcariano es negativo', done => {
			ModeloProcariano.eliminarProcarianoT(-5, tEliminar)
			.then( resultado => {
				tEliminar.rollback();
				done();
			})
			.catch( fail => {
				tEliminar.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Id de la persona inválido', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP4. Procariano no encontrado', done => {
			ModeloProcariano.eliminarProcarianoT(100, tEliminar)
			.then( resultado => {
				tEliminar.rollback();
				done();
			})
			.catch( fail => {
				tEliminar.rollback();
				assert.equal(fail.tipo, 'Delete error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No se encontró el registro del procariano para eliminar', 'Mensaje de error incorrecto');
				done();
			});
		});
	});

	describe('buscarChicosFormacionP', () => {
		it('CP1. Búsqueda exitosa', done => {
			ModeloProcariano.buscarChicosFormacionP()
			.then( resultado => {
				resultado.should.be.array;
				done();
			})
			.catch( fail => {
				done(fail);
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
