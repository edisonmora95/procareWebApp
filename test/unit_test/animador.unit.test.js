'use strict';

process.env.NODE_ENV = 'test';

let chai = require('chai');

let assert = chai.assert;
let should = chai.should();

let sequelize   		 = require('../../models/').sequelize;
let ModeloAnimador   = require('../../models/').Animador;
let ModeloGrupo      = require('../../models/').Grupo;

/*
	VARIABLES GLOBALES
*/
let transaction;
let idGrupo    = 2; //Está quemado en la base de datos de test
let idAnimador = 1;	//Está quemado en la base de datos de test
let grupoObj   = {
	nombre         : 'Grupo de prueba',
	tipo           : 'Formación',
	cantidadChicos : 0,
	numeroReuniones: 0,
	genero         : 'Procare Mujeres',
};

describe('ANIMADOR', () => {

	describe('animadorTieneGrupoActualmente', () => {
		let idAnimadorConGrupo = 1;
		it('CP1. Animador si tiene un grupo actualmente', done => {
			ModeloAnimador.animadorTieneGrupoActualmente(idAnimador)
			.then( resultado => {
				assert.equal(resultado, true, 'Error. No encontró registro del grupo');
				done();
			});
		});

		it('CP2. Animador no tiene un grupo actualmente', done => {
			ModeloAnimador.animadorTieneGrupoActualmente(2)
			.then( resultado => {
				assert.equal(resultado, false, 'Error. Se encontró registro del grupo');
				done();
			});
		});

		it('CP3. idAnimador es null', done => {
			ModeloAnimador.animadorTieneGrupoActualmente(null)
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del animador', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP4. idAnimador es negativo', done => {
			ModeloAnimador.animadorTieneGrupoActualmente(-5)
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Id del animador inválido', 'Mensaje de error incorrecto');
				done();
			});
		});

	});

	describe('agregarAnimadorAGrupoT', () => {

		beforeEach( () => {
			return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
		});

	  it('CP1. Creación exitosa', done => {
	  	ModeloAnimador.agregarAnimadorAGrupoT(3, idGrupo, transaction)
	  	.then( resultado => {
	  		resultado.should.be.json;
				assert.equal(resultado.get('ProcarianoId'), 3, 'Animador incorrecto');
				assert.equal(resultado.get('GrupoId'), idGrupo, 'Grupo incorrecto');
				transaction.rollback();
				done();
	  	})
	  	.catch( fail => {
	  		done(fail);
	  	});
	  });
	  
	  it('CP2. idAnimador es null', done => {
	  	ModeloAnimador.agregarAnimadorAGrupoT(null, idGrupo, transaction)
	  	.then( resultado => {
				done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del animador', 'Mensaje incorrecto');
	  		done();
	  	});
	  });

		it('CP3. idAnimador es negativo', done => {
	  	ModeloAnimador.agregarAnimadorAGrupoT(-5, idGrupo, transaction)
	  	.then( resultado => {
				done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id del animador inválido', 'Mensaje incorrecto');
	  		done();
	  	});
	  });

	  it('CP4. idGrupo es null', done => {
	  	ModeloAnimador.agregarAnimadorAGrupoT(idAnimador, null, transaction)
	  	.then( resultado => {
				done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del grupo', 'Mensaje incorrecto');
	  		done();
	  	});
	  });

	  it('CP5. idGrupo es negativo', done => {
	  	ModeloAnimador.agregarAnimadorAGrupoT(idAnimador, -5, transaction)
	  	.then( resultado => {
				done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id del grupo inválido', 'Mensaje incorrecto');
	  		done();
	  	});
	  });	

	});
	
	describe('obtenerAnimadorDeGrupoP', () => {
		it('CP1. Búsqueda exitosa', done => {
			ModeloAnimador.obtenerAnimadorDeGrupoP(1)
			.then( resultado => {
				resultado.should.be.json;
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP2. idGrupo es null', done => {
			ModeloAnimador.obtenerAnimadorDeGrupoP(null)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del grupo', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP3. idGrupo es negativo', done => {
			ModeloAnimador.obtenerAnimadorDeGrupoP(-5)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id del grupo inválido', 'Mensaje incorrecto');
				done();
			});
		});

		it('CP4. Registro no encontrado', done => {
			ModeloAnimador.obtenerAnimadorDeGrupoP(1500)
			.then( resultado => {
				assert.equal(resultado, null, 'Se encontró un registro');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});
		
	});

	describe('cambiarAnimadorDeGrupoT', () => {
		let idGrupoCambio 		= 1;
		let idAnimadorAntiguo = 1;
		let idAnimadorNuevo 	= 3;
		beforeEach( () => {
			idGrupoCambio 		= 1;
			idAnimadorAntiguo = 1;
			idAnimadorNuevo 	= 3;
			return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
		});

		it('CP1. Cambio exitoso', done => {
	  	ModeloAnimador.cambiarAnimadorDeGrupoT(idGrupoCambio, idAnimadorAntiguo, idAnimadorNuevo, transaction)
	  	.then( resultado => {
				resultado.should.be.json;
				transaction.rollback();
				done();
	  	})
	  	.catch( fail => {
	  		done(fail);
	  	});
	  });

	  it('CP2. idGrupo es null', done => {
	  	idGrupoCambio = null;
	  	ModeloAnimador.cambiarAnimadorDeGrupoT(idGrupoCambio, idAnimadorAntiguo, idAnimadorNuevo, transaction)
	  	.then( resultado => {
				done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del grupo', 'Mensaje incorrecto');
	  		done();
	  	});
	  });

	  it('CP3. idGrupo es negativo', done => {
	  	idGrupoCambio = -5;
	  	ModeloAnimador.cambiarAnimadorDeGrupoT(idGrupoCambio, idAnimadorAntiguo, idAnimadorNuevo, transaction)
	  	.then( resultado => {
				done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id del grupo inválido', 'Mensaje incorrecto');
	  		done();
	  	});
	  });

	  it('CP4. idAnimadorAntiguo es null', done => {
	  	idAnimadorAntiguo = null;
	  	ModeloAnimador.cambiarAnimadorDeGrupoT(idGrupoCambio, idAnimadorAntiguo, idAnimadorNuevo, transaction)
	  	.then( resultado => {
				done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del animador antiguo', 'Mensaje incorrecto');
	  		done();
	  	});
	  });

	  it('CP5. idAnimadorAntiguo es negativo', done => {
	  	idAnimadorAntiguo = -5;
	  	ModeloAnimador.cambiarAnimadorDeGrupoT(idGrupoCambio, idAnimadorAntiguo, idAnimadorNuevo, transaction)
	  	.then( resultado => {
				done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id del animador antiguo inválido', 'Mensaje incorrecto');
	  		done();
	  	});
	  });

	  it('CP6. idAnimadorNuevo es null', done => {
	  	idAnimadorNuevo = null;
	  	ModeloAnimador.cambiarAnimadorDeGrupoT(idGrupoCambio, idAnimadorAntiguo, idAnimadorNuevo, transaction)
	  	.then( resultado => {
				done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del animador nuevo', 'Mensaje incorrecto');
	  		done();
	  	});
	  });

	  it('CP7. idAnimadorNuevo es negativo', done => {
	  	idAnimadorNuevo = -5;
	  	ModeloAnimador.cambiarAnimadorDeGrupoT(idGrupoCambio, idAnimadorAntiguo, idAnimadorNuevo, transaction)
	  	.then( resultado => {
				done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo incorrecto');
				assert.equal(fail.mensaje, 'Id del animador nuevo inválido', 'Mensaje incorrecto');
	  		done();
	  	});
	  });

	});

	describe('eliminarRegistrosDeGrupoT', () => {
		beforeEach( () => {
			return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
		});

		it('CP1. Caso exitoso', done => {
			let idGrupo = 1;
			ModeloAnimador.eliminarRegistrosDeGrupoT(idGrupo, transaction)
			.then( resultado => {
				assert.equal(resultado, 1, 'Cantidad de registros incorrecta');
				transaction.rollback();
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP2. idGrupo es null', done => {
			let idGrupo = null;
			ModeloAnimador.eliminarRegistrosDeGrupoT(idGrupo, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del grupo', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP2. idGrupo es negativo', done => {
			let idGrupo = -5;
			ModeloAnimador.eliminarRegistrosDeGrupoT(idGrupo, transaction)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Id del grupo inválido', 'Mensaje de error incorrecto');
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
