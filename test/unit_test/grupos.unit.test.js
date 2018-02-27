'use strict';

process.env.NODE_ENV = 'test';

let chai = require('chai');
let co   = require('co');

let assert = chai.assert;
let should = chai.should();

let sequelize   = require('../../models/').sequelize;
let ModeloGrupo = require('../../models/').Grupo;

let grupoObj = {
	nombre         : 'Grupo de prueba',
	tipo           : 'Formación',
	cantidadChicos : 0,
	numeroReuniones: 0,
	genero         : 'Procare Mujeres',
};

let transaction;

describe('GRUPOS', () => {
	
	describe('crearGrupoT', () => {

		before( () => {
	    return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
	  });

		afterEach( () => {
	    grupoObj = {
				nombre         : 'Grupo de prueba',
				tipo           : 'Formación',
				cantidadChicos : 0,
				numeroReuniones: 0,
				genero         : 'Procare Mujeres',
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
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				const grupoCreado = resultado.dataValues;
				grupoCreado.should.be.json;
				transaction.commit();
				done();
			})
			.catch( fail => {
				console.log('Esto no debería pasar...');
				done();
			});
		});

		it('CP2. Creación con nombre vacío.', done => {
			grupoObj.nombre = '';
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Nombre del grupo no puede estar vacío.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP3. Creación con tipo vacío.', done => {
			grupoObj.tipo = '';
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tipo del grupo no puede estar vacío.', 'Mensaje obtenido incorrecto');
				done();
			});
		});
		
		it('CP4. Creación con tipo  = hola.', done => {
			grupoObj.tipo = 'hola';
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tipo no está dentro de los valores válidos.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP5. Creación con género vacío.', done => {
			grupoObj.genero = '';
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Género no puede ser vacío.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP6. Creación con género  = Procare Formación.', done => {
			grupoObj.genero = 'Procare Formación';
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Género puede ser Procare o Procare Mujeres solamente.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP7. Creación con número de chicos mayor al posible', done => {
			grupoObj.cantidadChicos = 31;
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de chicos no puede ser mayor a 30.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP8. Creación con número de chicos negativo', done => {
			grupoObj.cantidadChicos = -5;
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de chicos no puede ser un número negativo.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP9. Creación con número de chicos no número', done => {
			grupoObj.cantidadChicos = 'cinco';
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de chicos debe ser un número entero.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP10. Creación con número de reuniones mayor al posible', done => {
			grupoObj.numeroReuniones = 31;
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de reuniones no puede ser mayor a 30.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP11. Creación con número de reuniones negativo', done => {
			grupoObj.numeroReuniones = -5;
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de reuniones no puede ser un número negativo.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP12. Creación con número de reuniones no número', done => {
			grupoObj.numeroReuniones = 'cinco';
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de reuniones debe ser un número entero.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP13. Creación con nombre null.', done => {
			grupoObj.nombre = null;
			ModeloGrupo.crearGrupoT(grupoObj, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje,'nombre cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});
	});
	
	describe('obtenerGrupoPorIdP', () => {
		let idGrupo = 1;
		
		it('CP1. Id válido.', done => {
			ModeloGrupo.obtenerGrupoPorIdP(idGrupo)
			.then( resultado => {
				const grupo = resultado.dataValues;
				grupo.should.be.json;
				done();
			})
			.catch( fail => {
				console.log('Esto no debería pasar...');
				done(fail);
			});
		});

		it('CP2. ID no es enviado.', done => {
			ModeloGrupo.obtenerGrupoPorIdP(null)
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
			idGrupo = -5
			ModeloGrupo.obtenerGrupoPorIdP(idGrupo)
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

	describe('obtenerTodosLosGruposP', () => {
		it('CP1. Retorna todos los grupos.', done => {
			ModeloGrupo.obtenerTodosLosGruposP()
			.then( resultado => {
				resultado.should.be.array;
				done();
			})
			.catch( fail => {
				console.log('error')
				done(fail);
			});
		});
	});

	describe('editarGrupoT', () => {

		let grupoEditado = {
			id 						 : 1,
			nombre         : 'Grupo de prueba editado`',
			tipo           : 'Formación',
			cantidadChicos : 0,
			numeroReuniones: 0,
			genero         : 'Procare Mujeres',
		};

		before( () => {
	    return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
	  });

	  afterEach( () => {
	    grupoEditado = {
	    	id 						 : 1,
				nombre         : 'Grupo de prueba editado',
				tipo           : 'Formación',
				cantidadChicos : 0,
				numeroReuniones: 0,
				genero         : 'Procare Mujeres',
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
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				resultado.should.be.array;
				assert.equal(resultado[0], 1, 'Cantidad editada incorrecta');
				transaction.commit();
				done();
			})
			.catch( fail => {
				console.log('Esto no debería pasar...');
				done(fail);
			});
		});

		it('CP2. Edición con nombre vacío.', done => {
			grupoEditado.nombre = '';
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Nombre del grupo no puede estar vacío.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP3. Edición con tipo vacío.', done => {
			grupoEditado.tipo = '';
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tipo del grupo no puede estar vacío.', 'Mensaje obtenido incorrecto');
				done();
			});
		});
		
		it('CP4. Edición con tipo  = hola.', done => {
			grupoEditado.tipo = 'hola';
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tipo no está dentro de los valores válidos.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP5. Edición con género vacío.', done => {
			grupoEditado.genero = '';
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Género no puede ser vacío.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP6. Edición con género  = Procare Formación.', done => {
			grupoEditado.genero = 'Procare Formación';
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Género puede ser Procare o Procare Mujeres solamente.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP7. Edición con número de chicos mayor al posible', done => {
			grupoEditado.cantidadChicos = 31;
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de chicos no puede ser mayor a 30.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP8. Edición con número de chicos negativo', done => {
			grupoEditado.cantidadChicos = -5;
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de chicos no puede ser un número negativo.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP9. Edición con número de chicos no número', done => {
			grupoEditado.cantidadChicos = 'cinco';
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de chicos debe ser un número entero.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP10. Edición con número de reuniones mayor al posible', done => {
			grupoEditado.numeroReuniones = 31;
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de reuniones no puede ser mayor a 30.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP11. Edición con número de reuniones negativo', done => {
			grupoEditado.numeroReuniones = -5;
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de reuniones no puede ser un número negativo.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP12. Edición con número de reuniones no número', done => {
			grupoEditado.numeroReuniones = 'cinco';
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'La cantidad de reuniones debe ser un número entero.', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP13. Edición con nombre null.', done => {
			grupoEditado.nombre = null;
			ModeloGrupo.editarGrupoT(grupoEditado, grupoEditado.id, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje,'nombre cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});
	});

	describe('eliminarGrupoT', () => {
		let idGrupo = 1;
		beforeEach( () => {
			return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
	  });
		
		it('CP1. Id válido.', done => {
			ModeloGrupo.eliminarGrupoT(idGrupo, transaction)
			.then( resultado => {
				transaction.rollback();
				assert.equal(resultado, 1, 'Cantidad equivocada');
				done();
			})
			.catch( fail => {
				console.log('Esto no debería pasar...');
				done(fail);
			});
		});

		it('CP2. ID no es enviado.', done => {
			ModeloGrupo.eliminarGrupoT(null, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del grupo',  'Mensaje recibido incorrecto');
				done();
			});
		});
		
		it('CP3. ID es menor a 0.', done => {
			idGrupo = -5
			ModeloGrupo.eliminarGrupoT(idGrupo, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'Id del grupo inválido',  'Mensaje recibido incorrecto');
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
