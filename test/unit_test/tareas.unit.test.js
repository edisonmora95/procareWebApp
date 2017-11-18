'use strict';
process.env.NODE_ENV = 'test';

let chai 	 = require('chai');
let assert = chai.assert;
let should = chai.should();
let co 		 = require('co');

let sequelize 	= require('../../models/').sequelize
let ModeloTarea = require('../../models/').Tarea;

let tarea = {
	nombre 					 : 'Prueba',
	fechaPublicacion : new Date(),
	fechaInicio 		 : new Date(),
	fechaFin 				 : new Date(),
	prioridad 			 : 1,
	estado 					 : 1,
	descripcion 		 : 'Tarea de prueba para hacer tests unitarios',
	categoria 			 : 1,
	tipo 						 : 'tarea'
};


let transaction;

describe('TAREAS', () => {
	describe('crearTareaP', () => {

		afterEach( () => {
			tarea = {
				nombre 					 : 'Prueba',
				fechaPublicacion : new Date(),
				fechaInicio 		 : new Date(),
				fechaFin 				 : new Date(),
				prioridad 			 : 1,
				estado 					 : 1,
				descripcion 		 : 'Tarea de prueba para hacer tests unitarios',
				categoria 			 : 1,
				tipo 						 : 'tarea'
			};
		});

		it('CP1. Creación exitosa', done => {
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				const tareaCreada = resultado.dataValues;
				tareaCreada.should.be.json;
				done();
			})
		});
		it('CP2. Nombre vacío', done => {
			tarea.nombre = '';
			ModeloTarea.crearTareaP(tarea)
			.then( res => {
				done();
			})
			.catch( fail => {
				const error 					= fail.errors[0];
				const mensajeObtenido = error.message;
				const mensajeEsperado = 'El campo "Nombre" no puede estar vacío';
				assert.equal(mensajeObtenido, mensajeEsperado, 'Mensaje obtenido incorrecto');
				done();
			})
		});
	});
	describe('obtenerTodasLasTareasP', () => {

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
