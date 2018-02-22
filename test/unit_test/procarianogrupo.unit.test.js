'use strict';
process.env.NODE_ENV = 'test';

let chai 		= require('chai');
let assert 	= chai.assert;
let should 	= chai.should();

let sequelize	 							= require('../../models/').sequelize;
let ModeloProcarianoGrupo 	= require('../../models/').ProcarianoGrupo;


describe('PROCARIANOGRUPO', () => {
	
	describe('anadirProcarianoAGrupoT', () => {
		let transaction;
		let idProcariano  = 1;
		let idGrupo 			= 1;

		beforeEach( () => {
			idProcariano  = 1;
			idGrupo 			= 1;
	    return inicializarTransaccion()
	    .then( t => {
	    	transaction = t;
	    })
	    .catch( error => {
	    	console.log('No se pudo crear la transacción');
	    });
	  });

	  it('CP1. Datos correctos', done => {
	  	ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, transaction)
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

	  it('CP2. idGrupo es null', done => {
	  	idGrupo = null;
	  	ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, transaction)
	  	.catch( fail => {
	  		transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del grupo',  'Mensaje recibido incorrecto');
				done();
			});
	  });

	  it('CP3. idGrupo es negativo', done => {
	  	idGrupo = -5;
	  	ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, transaction)
	  	.catch( fail => {
	  		transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'Id del grupo inválido',  'Mensaje recibido incorrecto');
				done();
			});
	  });

	  it('CP4. idProcariano es null', done => {
	  	idProcariano = null;
	  	ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, transaction)
	  	.catch( fail => {
	  		transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del procariano',  'Mensaje recibido incorrecto');
				done();
			});
	  });

	  it('CP5. idProcariano es negativo', done => {
	  	idProcariano = -5;
	  	ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, transaction)
	  	.catch( fail => {
	  		transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'Id del procariano inválido',  'Mensaje recibido incorrecto');
				done();
			});
	  });

	  it('CP6. Grupo no existe', done => {
	  	idGrupo = 100;
	  	ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, transaction)
	  	.catch( fail => {
	  		transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'ER_NO_REFERENCED_ROW_2: GrupoId',  'Mensaje recibido incorrecto');
				done();
			});
	  });

	  it('CP7. Procariano no existe', done => {
	  	idProcariano = 100;
	  	ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, transaction)
	  	.catch( fail => {
	  		transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error','Tipo de error recibido incorrecto');
				assert.equal(fail.mensaje, 'ER_NO_REFERENCED_ROW_2: ProcarianoId',  'Mensaje recibido incorrecto');
				done();
			});
	  });

	});
	
	describe('eliminarRegistrosDeGrupoT', () => {
		let transaction;
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

	  it('CP1. Caso exitoso', done => {
	  	ModeloProcarianoGrupo.eliminarRegistrosDeGrupoT(idGrupo, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		assert.equal(resultado, 1, 'Cantidad de registros incorrecta');
	  		done();
	  	})
	  	.catch( fail => {
	  		done(fail);
	  	});
	  });

	  it('CP2. idGrupo es null', done => {
	  	ModeloProcarianoGrupo.eliminarRegistrosDeGrupoT(null, transaction)
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

	  it('CP3. idGrupo es negativo', done => {
	  	ModeloProcarianoGrupo.eliminarRegistrosDeGrupoT(-5, transaction)
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

	  it('CP4. Registros no encontrados', done => {
	  	ModeloProcarianoGrupo.eliminarRegistrosDeGrupoT(100, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		assert.equal(resultado, 0, 'Cantidad de registros incorrecta');
	  		done();
	  	})
	  	.catch( fail => {
	  		done(fail);
	  	});
	  });
	});

	describe('obtenerGrupoActualDeProcarianoP', () => {
		let idProcariano = 2;
		
		it('CP1. Caso exitoso', done => {
			ModeloProcarianoGrupo.obtenerGrupoActualDeProcarianoP(idProcariano)
			.then( resultado => {
				resultado.should.be.json;
				assert.equal(resultado.get('ProcarianoId'), idProcariano, 'Ids no coinciden');
				assert.equal(resultado.get('GrupoId'), 1, 'Grupo incorrecto');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP2. idProcariano es null', done => {
			ModeloProcarianoGrupo.obtenerGrupoActualDeProcarianoP(null)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id del procariano', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP3. idProcariano es negativo', done => {
			ModeloProcarianoGrupo.obtenerGrupoActualDeProcarianoP(-5)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Id del procariano inválido', 'Mensaje de error incorrecto');
				done();
			});
		});
		
		it('CP4. Registro no encontrado', done => {
			ModeloProcarianoGrupo.obtenerGrupoActualDeProcarianoP(100)
			.then( resultado => {
				assert.equal(resultado, null, 'Se encontró un registro');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});
	});
	
	describe('anadirFechaFinT', () => {
		let idProcariano = 2;
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
	  	ModeloProcarianoGrupo.anadirFechaFinT(idProcariano, transaction)
	  	.then( resultado => {
	  		assert.equal(resultado, 1, 'Cantidad de registros incorrecta');
	  		transaction.rollback();
	  		done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		done(fail);
	  	});
	  });

	  it('CP2. idProcariano es null', done => {
	  	ModeloProcarianoGrupo.anadirFechaFinT(null, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'No ingresó el id del procariano', 'Tipo de mensaje incorrecto');
	  		done();
	  	});
	  });

	  it('CP3. idProcariano es negativo', done => {
	  	ModeloProcarianoGrupo.anadirFechaFinT(-5, transaction)
	  	.then( resultado => {
	  		transaction.rollback();
	  		done();
	  	})
	  	.catch( fail => {
	  		transaction.rollback();
	  		assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
	  		assert.equal(fail.mensaje, 'Id del procariano inválido', 'Tipo de mensaje incorrecto');
	  		done();
	  	});
	  });
	});

	describe('buscarProcarianosConGrupoP', () => {
		it('CP1. Búsqueda exitosa', done => {
			ModeloProcarianoGrupo.buscarProcarianosConGrupoP()
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
