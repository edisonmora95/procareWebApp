'use strict';
process.env.NODE_ENV = 'test';

let chai 		= require('chai');
let assert 	= chai.assert;
let should 	= chai.should();

let sequelize	 							= require('../../models/').sequelize;
let ModeloProcarianoTipo	 	= require('../../models/').ProcarianoTipo;

describe('PROCARIANOTIPO', () => {
	/*
	describe('obtenerTipoActualDeProcarianoP', () => {
		let idProcariano = 2;

		it('CP1. Id válido', done => {
			ModeloProcarianoTipo.obtenerTipoActualDeProcarianoP(idProcariano)
			.then( resultado => {
				const idObtenido = resultado.get('ProcarianoId');
				assert.equal(idObtenido, idProcariano, 'Ids no coinciden');
				done();
			});
		});

		it('CP2. Id null', done => {
			ModeloProcarianoTipo.obtenerTipoActualDeProcarianoP(null)
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'No ingresó un procariano', 'Tipo de error incorrecto');
	  		done();
			});
		});

		it('CP3. Id negativo', done => {
			ModeloProcarianoTipo.obtenerTipoActualDeProcarianoP(-5)
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'Id de procariano inválido', 'Tipo de error incorrecto');
	  		done();
			});
		});
	});

	describe('anadirTipoProcarianoT', () => {
		let idTipo 			 = 2;	//Caminante
		let idProcariano = 1;	//Animador sin Rol
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
	  it('CP1. Caso exitoso.', done => {
	  	ModeloProcarianoTipo.anadirTipoProcarianoT(idTipo, idProcariano, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		resultado.should.be.json;
	  		assert.equal(resultado.get('TipoId'), idTipo, 'Tipo creado incorrecto');
	  		done()
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		done(fail);
	  	});
	  });

	  it('CP2. idTipo es null.', done => {
	  	ModeloProcarianoTipo.anadirTipoProcarianoT(null, idProcariano, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done()
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'No ingresó un tipo', 'Tipo de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP3. idTipo es negativo.', done => {
	  	ModeloProcarianoTipo.anadirTipoProcarianoT(-5, idProcariano, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done()
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'Id de tipo inválido', 'Tipo de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP4. idProcariano es null.', done => {
	  	ModeloProcarianoTipo.anadirTipoProcarianoT(idTipo, null, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done()
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'No ingresó un procariano', 'Tipo de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP5. idProcariano es negativo.', done => {
	  	ModeloProcarianoTipo.anadirTipoProcarianoT(idTipo, -5, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done()
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'Id de procariano inválido', 'Tipo de error incorrecto');
	  		done();
	  	});
	  });
	});

	describe('cambiarTipoDeProcarianoT', () => {
		let transaction;
		let idProcariano = 2;
		let tipoActual   = 1;
		let tipoNuevo    = 2;
		
		beforeEach( () => {
			return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
	  });

	  it('CP1. Cambio exitoso', done => {
	  	ModeloProcarianoTipo.cambiarTipoDeProcarianoT(idProcariano, tipoActual, tipoNuevo, transaction)
	  	.then( resultado => {
	  		resultado.should.be.json;
	  		assert.equal(resultado.get('TipoId'), tipoNuevo, 'Tipo nuevo incorrecto');
	  		transaction.rollback();
	  		done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		done(fail);
	  	});
	  });

	  it('CP2. tipoActual es null.', done => {
	  	ModeloProcarianoTipo.cambiarTipoDeProcarianoT(idProcariano, null, tipoNuevo, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done()
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'No ingresó el tipo actual', 'Tipo de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP3. tipoActual es negativo.', done => {
	  	ModeloProcarianoTipo.cambiarTipoDeProcarianoT(idProcariano, -5, tipoNuevo, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done()
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'Id de tipo actual inválido', 'Tipo de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP4. idProcariano es null.', done => {
	  	ModeloProcarianoTipo.cambiarTipoDeProcarianoT(null, tipoActual, tipoNuevo, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done()
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'No ingresó un procariano', 'Tipo de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP5. idProcariano es negativo.', done => {
	  	ModeloProcarianoTipo.cambiarTipoDeProcarianoT(-5, tipoActual, tipoNuevo, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done()
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'Id de procariano inválido', 'Tipo de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP6. tipoNuevo es null.', done => {
	  	ModeloProcarianoTipo.cambiarTipoDeProcarianoT(idProcariano, tipoActual, null, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done()
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'No ingresó el tipo nuevo', 'Tipo de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP3. tipoNuevo es negativo.', done => {
	  	ModeloProcarianoTipo.cambiarTipoDeProcarianoT(idProcariano, tipoActual, -5, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done()
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'Id de tipo nuevo inválido', 'Tipo de error incorrecto');
	  		done();
	  	});
	  });
	});*/

	describe('anadirFechaFinT', () => {
		let idProcariano = 2;
		let idTipo       = 1;
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

	  it('CP1. Caso exitoso', done => {
	  	ModeloProcarianoTipo.anadirFechaFinT(idProcariano, idTipo, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		assert.equal(resultado, 1, 'Cantidad de registros incorracta');
	  		done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		done(fail);
	  	});
	  });

	  it('CP2. idProcariano es null', done => {
	  	ModeloProcarianoTipo.anadirFechaFinT(null, idTipo, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'No ingresó un procariano', 'Mensaje de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP3. idProcariano es negativo', done => {
	  	ModeloProcarianoTipo.anadirFechaFinT(-5, idTipo, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'Id de procariano inválido', 'Mensaje de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP4. idTipo es null', done => {
	  	ModeloProcarianoTipo.anadirFechaFinT(idProcariano, null, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'No ingresó un tipo', 'Mensaje de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP5. idTipo es negativo', done => {
	  	ModeloProcarianoTipo.anadirFechaFinT(idProcariano, -5, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'Id de tipo inválido', 'Mensaje de error incorrecto');
	  		done();
	  	});
	  });

	  it('CP6. No se encuentran registros', done => {
	  	ModeloProcarianoTipo.anadirFechaFinT(5, idTipo, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Update error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'No se encontró el registro. Se cancela la edición', 'Mensaje de error incorrecto');
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
