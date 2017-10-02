'use strict';
process.env.NODE_ENV = 'test';

let chai = require('chai');
let assert = chai.assert;
let should = chai.should();
const co = require('co');

let sequelize = require('../../models/').sequelize
let ModeloGrupo = require('../../models/').Grupo;

let grupoObj = {
	nombre: 'Grupo de prueba',
	tipo: 'Formación',
	cantidadChicos: 0,
	numeroReuniones: 0,
	genero: 'Procare Mujeres',
};

let transaction;

describe('GRUPOS', () => {
	
	describe('crearGrupoT', () => {

		describe('Caso exitoso', () => {
			before(function() {
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
					nombre: 'Grupo de prueba',
					tipo: 'Formación',
					cantidadChicos: 0,
					numeroReuniones: 0,
					genero: 'Procare Mujeres',
				};
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
		});

		describe('Casos inválidos', () => {
			before(function() {
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
					nombre: 'Grupo de prueba',
					tipo: 'Formación',
					cantidadChicos: 0,
					numeroReuniones: 0,
					genero: 'Procare Mujeres',
				};
		  });

			it('CP2. Creación con nombre vacío.', done => {
				grupoObj.nombre = '';
				ModeloGrupo.crearGrupoT(grupoObj, transaction)
				.then( resultado => {
					done();
				})
				.catch( fail => {
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'Nombre del grupo no puede estar vacío.';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'Tipo del grupo no puede estar vacío.';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'Tipo no está dentro de los valores válidos.';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'Género no puede ser vacío.';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'Género puede ser Procare o Procare Mujeres solamente.';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'La cantidad de chicos no puede ser mayor a 30.';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'La cantidad de chicos no puede ser un número negativo.';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'La cantidad de chicos debe ser un número entero.';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'La cantidad de reuniones no puede ser mayor a 30.';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'La cantidad de reuniones no puede ser un número negativo.';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'La cantidad de reuniones debe ser un número entero.';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
					const error = fail.errors[0];
					const mensajeObtenido = error.message;
					const mensajeEsperado = 'nombre cannot be null';
					assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
					done();
				});
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
				const mensajeEsperado = 'No envió id de grupo';
				assert.equal(fail, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
				const mensajeEsperado = 'ID de grupo a buscar no puede ser negativo';
				assert.equal(fail, mensajeEsperado, 'Mensaje obtenido incorrecto');
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
