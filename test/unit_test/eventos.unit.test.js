'use strict';
process.env.NODE_ENV = 'test';

const chai = require('chai');
const co   = require('co');

const assert = chai.assert;
const should = chai.should();

const sequelize 	 = require('../../models/').sequelize;
const ModeloEvento = require('../../models/').Evento;


describe('EVENTOS', () => {
	describe('crearEventoP', () => {
		let evento = {
			nombre 					 : 'Prueba',
			fechaInicio 		 : new Date(),
			fechaFin 				 : new Date(),
			estado 					 : 1,
			descripcion 		 : 'Evento de prueba para hacer tests unitarios',
			lugar      			 : 'Casa Procare',
			tipo 						 : 'evento',
			responsable      : 4
		};
		afterEach( () => {
			evento = {
				nombre 					 : 'Prueba',
				fechaInicio 		 : new Date(),
				fechaFin 				 : new Date(),
				estado 					 : 1,
				descripcion 		 : 'Evento de prueba para hacer tests unitarios',
				lugar      			 : 'Casa Procare',
				tipo 						 : 'evento',
				responsable      : 4
			};
		});

		it('CP1. Creación exitosa', done => {
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				resultado.should.be.json;
				assert.equal(resultado.get('nombre'), evento.nombre, 'Nombre creado incorrecto');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});
		
		it('CP2. Nombre vacío', done => {
			evento.nombre = '';
			ModeloEvento.crearEventoP(evento)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Nombre" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP3. Nombre con caracteres especiales', done => {
			evento.nombre = '<>';
			ModeloEvento.crearEventoP(evento)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Nombre"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP4. Nombre es null', done => {
			evento.nombre = null;
			ModeloEvento.crearEventoP(evento)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'nombre cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP5. Fecha de inicio vacía', done => {
			evento.fechaInicio = '';
			ModeloEvento.crearEventoP(evento)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Fecha de inicio" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP6. Fecha de inicio pasada', done => {
			const today   = new Date();
			let yesterday = new Date();
			yesterday.setDate(today.getDate() - 1);
			evento.fechaInicio = yesterday;
			
			ModeloEvento.crearEventoP(evento)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar una fecha de inicio que ya pasó', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP7. Fecha de inicio null', done => {
			evento.fechaInicio = null;
			
			ModeloEvento.crearEventoP(evento)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'fechaInicio cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP8. Fecha fin null', done => {
			evento.fechaFin = null;
			
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				resultado.should.be.json;
				assert.equal(resultado.get('fechaFin'), null, 'Fecha fin ingresada incorrecta');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP9. Fecha fin pasada', done => {
			const today   = new Date();
			let yesterday = new Date();
			yesterday.setDate(today.getDate() - 1);
			evento.fechaFin = yesterday;
			
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar una fecha fin que ya pasó', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP10. Estado vacío', done => {
			evento.estado = '';
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Estado" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP11. Estado no es número', done => {
			evento.estado = 'holaaaa';
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Estado" debe ser número', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP12. Estado es un número inválido', done => {
			evento.estado = 10;
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Estado" debe ser 1, 2 ó 3', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP13. Estado null', done => {
			evento.estado = null;
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'estado cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP14. Descripción vacía', done => {
			evento.descripcion = '';
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Descripción" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP15. Descripción con caracteres especiales', done => {
			evento.descripcion = '<>';
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Descripción"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP16. Descripción null', done => {
			evento.descripcion = null;
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'descripcion cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP17. Lugar vacío', done => {
			evento.lugar = '';
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Lugar" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP18. Lugar con caracteres especiales', done => {
			evento.lugar = '<>';
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Lugar"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP19. Lugar null', done => {
			evento.lugar = null;
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'lugar cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP20. Id del organizador no enviado', done => {
			evento.responsable = null;
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje,  'Debe enviar el id del organizador', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP21. Id del organizador negativo', done => {
			evento.responsable = -5;
			ModeloEvento.crearEventoP(evento)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.json;
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje,  'El id del organizador debe ser mayor a 0', 'Mensaje obtenido incorrecto');
				done();
			});
		});
	});
	
	describe('obtenerTodosLosEventosP', () => {
		it('CP1. Caso exitoso', done => {
			ModeloEvento.obtenerTodosLosEventosP()
			.then( resultado => {
				resultado.should.be.array;
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});
	});

	describe('obtenerEventosDeUsuarioP', () => {
		let idOrganizador = 4;
		it('CP1. Caso exitoso', done => {
			ModeloEvento.obtenerEventosDeUsuarioP(idOrganizador)
			.then( resultado => {
				resultado.should.be.array;
				assert.equal(resultado[0].get('idOrganizador'), idOrganizador, 'Organizadores no coinciden');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP2. idOrganizador es null', done => {
			ModeloEvento.obtenerEventosDeUsuarioP(null)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Debe enviar el id del organizador', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP3. idOrganizador es negativo', done => {
			ModeloEvento.obtenerEventosDeUsuarioP(-5)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El id del organizador debe ser mayor a 0', 'Mensaje de error incorrecto');
				done();
			});
		});
	});

	describe('eliminarTareaT', () => {
		let transaction;
		let idEvento = 1;

		beforeEach( () => {
			return inicializarTransaccion()
			.then( t => {
				transaction = t;
			})
			.catch( fail => {
				console.log(fail);
			});
		});

		it('CP1. Eliminación exitosa', done => {
			ModeloEvento.eliminarEventoT(idEvento, transaction)
			.then( resultado => {
				transaction.rollback();
				assert.equal(resultado, 1, 'Cantidad eliminada incorrecta');
				done();
			})
			.catch( fail => {
				transaction.rollback();
				done(fail);
			});
		});

		it('CP2. Id es null', done => {
			ModeloEvento.eliminarEventoT(null, transaction)
			.then( resultado => {
				transaction.rollback();
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Debe enviar el id del evento', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP3. Id de evento inválido', done => {
			ModeloEvento.eliminarEventoT(-5, transaction)
			.then( resultado => {
				transaction.rollback();
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El id del evento debe ser mayor a 0', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP4. Id de evento inválido', done => {
			ModeloEvento.eliminarEventoT(500, transaction)
			.then( resultado => {
				transaction.rollback();
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Delete error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No se encontró evento con el id indicado', 'Mensaje de error incorrecto');
				done();
			});
		});
	});

	describe('cambiarEstadoP', () => {
		let estadoNuevo = 2;
		let idEvento     = 1;

		it('CP1. Cambio exitoso', done => {
			ModeloEvento.cambiarEstadoP(idEvento, estadoNuevo)
			.then( resultado => {
				assert.equal(resultado, 1, 'Cantidad de registros incorrecta');
				done();
			});
		});

		it('CP2. idEvento es null', done => {
			ModeloEvento.cambiarEstadoP(null, estadoNuevo)
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Debe enviar el id del evento', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP3. idEvento es negativo', done => {
			ModeloEvento.cambiarEstadoP(-5, estadoNuevo)
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El id del evento debe ser mayor a 0', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP4. Estado no enviado', done => {
			ModeloEvento.cambiarEstadoP(idEvento, null)
			.catch( fail => {
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'estado cannot be null', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP5. Estado inválido', done => {
			ModeloEvento.cambiarEstadoP(idEvento, 5)
			.catch( fail => {
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Estado" debe ser 1, 2 ó 3', 'Mensaje de error incorrecto');
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
