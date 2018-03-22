'use strict';
process.env.NODE_ENV = 'test';

let chai 		= require('chai');
let assert 	= chai.assert;
let should 	= chai.should();

const sequelize	 	     = require('../../models/').sequelize;
const ModeloPersona    = require('../../models').Persona;
const ModeloBenefactor = require('../../models/').Benefactor;

describe('BENEFACTORES', () => {
	describe('crearBenefactorT', () => {
		let benefactor;
		let transaction;
		let personaId;
		
		// Se crea el registro de persona
		before( () => {
			let persona = {
				nombres         : 'Benefactor A',
				apellidos       : 'Benefactor A',
				cedula          : '0921054566',
				razonSocial     : 'Razón Social',
				direccion       : 'Centro de la ciudad',
				fechaNacimiento : '1995-06-27',
				genero          : 'masculino',
				email           : 'benefactor_1@gmail.com',
			}
			return inicializarTransaccion()
			.then( t => {
				return ModeloPersona.crearPersonaT(persona, t)
				.then( registro => {
					personaId = parseInt(registro.get('id'));
					console.log('Se creó el registro de Persona con id:', personaId);
					t.commit();
					// SE INICIALIZAN LAS VARIABLES GLOBALES
					benefactor = {
						PersonaId         : personaId,
		        valorContribucion : 500.50,
		        diaCobro          : 15,
		        tarjetaCredito    : '4027-4930-1234-2012',
		        tipoDonacion      : 'mensual',
		        estado            : 'activo',
		        nombreGestor      : 'Fernando Icaza',
		        relacion          : 'Amigo',
		        observacion       : ''
					};
					return inicializarTransaccion()
						.then( t => {
							transaction = t;
						})
						.catch( fail => {
							console.log('FAIL:', fail);
						});
				})
				.catch( fail => {
					console.log('ModeloPersona fail');
					console.log(fail);
					t.rollback();
				});
			})
			.catch( fail => {
				console.log(fail);
			});
		});
		// Se 'encera' el objeto de Benefactor y se vuelve a crear una transacción
		afterEach(() => {
			benefactor = {
				PersonaId         : personaId,
        valorContribucion : 500.50,
        diaCobro          : 15,
        tarjetaCredito    : '4027-4930-1234-2012',
        tipoDonacion      : 'mensual',
        estado            : 'activo',
        nombreGestor      : 'Fernando Icaza',
        relacion          : 'Amigo',
        observacion       : ''
			};
			return inicializarTransaccion()
				.then( t => {
					transaction = t;
				})
				.catch( fail => {
					console.log('FAIL:', fail);
				});
		});

		it('CP1. Creación exitosa', function(done){
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.then( registro => {
				registro.should.be.json;
				assert.equal(registro.get('PersonaId'), personaId, 'Ids no coinciden');
				transaction.rollback();
				done();
			})
		});
		
		it('CP2. valorContribucion vacío', function(done) {
			benefactor.valorContribucion = '';
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El valor de la contribución no puede estar vacío.', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP3. valorContribucion null', function(done) {
			benefactor.valorContribucion = null;
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'valorContribucion cannot be null', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP4. valorContribucion es menor a 0', function(done){
			benefactor.valorContribucion = -50;
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El valor de la contribución no puede ser menor a 0.', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP5. diaCobro vacío', function(done) {
			benefactor.diaCobro = '';
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo día de cobro no puede estar vacío', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP6. diaCobro null', function(done) {
			benefactor.diaCobro = null;
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'diaCobro cannot be null', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP7. diaCobro es menor a 0', function(done){
			benefactor.diaCobro = -50;
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El valor de día de cobro no puede ser menor a 0.', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP8. diaCobro es mayor a 31', function(done){
			benefactor.diaCobro = 50;
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El valor de día de cobro no puede ser mayor a 31.', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP9. tipoDonacion contiene caracteres especiales', function(done){
			benefactor.tipoDonacion = '<>';
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Tipo de donación"', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP10. estado está vacío', function(done){
			benefactor.estado = '';
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El valor de estado no puede estar vacío.', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP11. estado es null', function(done){
			benefactor.estado = null;
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'estado cannot be null', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP12. estado no tiene los valores permitidos', function(done){
			benefactor.estado = 'hola';
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El estado debe ser activo o inactivo', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP13. nombreGestor contiene caracteres especiales', function(done){
			benefactor.nombreGestor = '<>';
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Nombre de gestor"', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP14. relacion contiene caracteres especiales', function(done){
			benefactor.relacion = '<>';
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Relación"', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP15. observacion contiene caracteres especiales', function(done){
			benefactor.observacion = '<>';
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Observación"', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP16. Id de Persona no enviado', function(done){
			benefactor.PersonaId = null;
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No ingresó el id de la Persona', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP17. Id de Persona inválido', function(done){
			benefactor.PersonaId = -50;
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Id de la Persona inválido', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP18. Id de Persona es string', function(done){
			benefactor.PersonaId = 'hola';
			ModeloBenefactor.crearBenefactorT(benefactor, transaction)
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Type error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El id del benefactor debe ser número', 'Mensaje de error incorrecto');
				done();
			});
		});
		
		// Al finalizar, elimina el registro de la persona creada
		after( () => {
			return inicializarTransaccion()
			.then( t => {
				return ModeloPersona.eliminarPersonaT(personaId, t)
				.then( registro => {
					console.log('Se elimina el registro creado de la Persona');
					t.commit();
				})
				.catch( fail => {
					console.log('ModeloPersona fail');
					console.log(fail);
					t.rollback();
				});
			})
			.catch( fail => {
				console.log(fail);
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
