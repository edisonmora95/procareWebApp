/*
	@Descripcion: Clase para representar el concepto de Grupo
	@Autor: Gustavo Totoy
	@FechaCreacion: 31/05/2017
	@UltimaFechaModificacion: 13/09/2017 @edisonmora95 Cambiado a promesas y transacciones
*/

'use strict';

const respuesta 						= require('../utils/respuestas');
const co 										= require('co');

const modelo 								= require('../models');
const ModeloGrupo 					= require('../models/').Grupo;
const ModeloGrupoEtapa 			= require('../models/').GrupoEtapa;
const ModeloAnimador 				= require('../models/').Animador;
const ModeloProcariano 			= require('../models/').Procariano;
const ModeloProcarianoGrupo = require('../models/').ProcarianoGrupo;
const ModeloProcarianoTipo  = require('../models/').ProcarianoTipo;

/* FECHAS DE REUNIONES PROCARE */
const fechasP = ["2018-01-25", "2018-02-01", "2018-02-08", "2018-02-15", "2018-02-22", "2018-03-01", "2018-03-08", "2018-03-15", "2018-03-22", "2018-03-29", "2018-04-05", "2018-04-12", "2018-04-19", "2018-04-26", "2018-05-03", "2018-05-10", "2018-05-17", "2018-05-24", "2018-05-31", "2018-06-07", "2018-06-14", "2018-06-21", "2018-06-28", "2018-07-05", "2018-07-12", "2018-07-19", "2018-07-26", "2018-08-02", "2018-08-09", "2018-08-16", "2018-08-23", "2018-08-30", "2018-09-06", "2018-09-13", "2018-09-20", "2018-09-27", "2018-10-04", "2018-10-11", "2018-10-18", "2018-10-25", "2018-11-01", "2018-11-08", "2018-11-15", "2018-11-22", "2018-11-29", "2018-12-06", "2018-12-13", "2018-12-20", "2018-12-27"];
/* FECHAS DE REUNIONES PROCARE MUJERES */
const fechasPM = ["2018-01-30", "2018-02-06", "2018-02-13", "2018-02-20", "2018-02-27", "2018-03-06", "2018-03-13", "2018-03-20", "2018-03-27", "2018-04-03", "2018-04-10", "2018-04-17", "2018-04-24", "2018-05-01", "2018-05-08", "2018-05-15", "2018-05-22", "2018-05-29", "2018-06-05", "2018-06-12", "2018-06-19", "2018-06-26", "2018-07-03", "2018-07-10", "2018-07-17", "2018-07-24", "2018-07-31", "2018-08-07", "2018-08-14", "2018-08-21", "2018-08-28", "2018-09-04", "2018-09-11", "2018-09-18", "2018-09-25", "2018-10-02", "2018-10-09", "2018-10-16", "2018-10-23", "2018-10-30", "2018-11-06", "2018-11-13", "2018-11-20", "2018-11-27", "2018-12-04", "2018-12-11", "2018-12-18", "2018-12-25"];

/*
	@Autor: @GustavoTotoy
	@Descripción:
		Primero se crea el registro en la tabla Grupos
		Luego se lo añade al grupo a una etapa, se crea el registro en la tabla GrupoEtapa
		Se pasa el control al siguiente middleware que es el de Animador
	@ÚltimaModificación: 
		13/09/2017 @edisonmora95 Cambiado a promesas y transacciones
		11/02/2018 @edisonmora95 Cambiado a varios middlewares
*/
module.exports.crearGrupo = (req, res, next) => {
	let grupoObj = {
		nombre 					: req.body.nombre,
		tipo 						: req.body.tipo,
		cantidadChicos 	: req.body.cantidadChicos,
		numeroReuniones	: req.body.numeroReuniones,
		genero 					: req.body.genero,
	};
	let idEtapa  = req.body.etapa;
	inicializarTransaccion()
	.then( t => {
		co( function*() {
			let grupo 		 = yield ModeloGrupo.crearGrupoT(grupoObj, t);
			const idGrupo  = grupo.get('id');
			yield ModeloGrupoEtapa.crearGrupoEtapaT(idGrupo, idEtapa, t);
			res.locals.t       = t;
			res.locals.idGrupo = idGrupo;
			next();
		})
		.catch( fail => {
			t.rollback();
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};

/*
	@Autor: @GustavoTotoy
	@Descripción:
		Primero se edita la información general del grupo
		Luego se cambia de etapa, si el usuario ingresó una etapa nueva
		Luego se cambia al animador, si el usuario ingresó un animador nuevo.
			Queda por revisar lo siguiente:
			Si el nuevo animador no está registrado como usuario, debe registrarse
	@ÚltimaModificación: 
		13/09/2017 @edisonmora95 Cambiado a promesas y transacciones
		26/02/2018	@edisonmora95	Añadidos controllers nuevos
*/
module.exports.editarGrupo = (req, res, next) => {
	let grupo = {
		id 							: req.params.id_grupo,
		nombre					: req.body.nombre,
  	tipo						: req.body.tipo,
  	cantidadChicos	: req.body.cantidadChicos,
  	numeroReuniones	: req.body.numeroReuniones,
  	genero					: req.body.genero,
  	etapaAntigua		: req.body.etapaAntigua,
  	etapaNueva			: req.body.etapaNueva,
  	animadorAntiguo	: req.body.animadorAntiguo,
  	animadorNuevo		: req.body.animadorNuevo
	};
	res.locals.datos = {};
	inicializarTransaccion()
	.then( t => {
		co(function*() {
			const grupoEditado   = yield ModeloGrupo.editarGrupoT(grupo, grupo.id, t);	//Primero se edita la información general del grupo
			const cambioEtapa    = ( grupo.etapaNueva !== NaN && grupo.etapaNueva !== '' && (grupo.etapaNueva !== grupo.etapaAntigua) && grupo.etapaNueva !== null && grupo.etapaAntigua !== null);
			const cambioAnimador = ( grupo.animadorNuevo !== NaN && grupo.animadorNuevo !== '' && (grupo.animadorNuevo !== grupo.animadorAntiguo) && grupo.animadorNuevo !== null && grupo.animadorAntiguo !== null);
			res.locals.datos.grupoEditado = grupoEditado;
			if( cambioEtapa ){
				const etapa 				= yield ModeloGrupoEtapa.cambiarGrupoDeEtapaT(grupo.id, grupo.etapaAntigua, grupo.etapaNueva, t);
				res.locals.datos.etapaNueva = etapa;
			}
			if( cambioAnimador ){
				res.locals.grupo = grupo;
				res.locals.t     = t;
				next();
			}else{
				t.commit();				
				return respuesta.okUpdate(res, 'Se editó el grupo correctamente.', res.locals.datos);	
			}
		})
		.catch( fail => {
			t.rollback();
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};

/*
	@Autor: @GustavoTotoy
	@Descripción:
		Primero se eliminan todos los registros del grupo de la tabla de Animadores
		Luego se eliminan todos los registros del grupo de la tabla de ProcarianoGRupo
		Luego se eliminan todos los registros del grupo de la tabla EtapaGrupo
		Finalmente se elimina el grupo
	@ÚltimaModificación: 
		13/09/2017 @edisonmora95 Cambiado a promesas y transacciones
*/
module.exports.eliminarGrupo = (req, res) => {
	let id = req.params.id_grupo;

	inicializarTransaccion()
	.then( t => {
		Promise.all([
			ModeloAnimador.eliminarRegistrosDeGrupoT(id, t),
			ModeloProcarianoGrupo.eliminarRegistrosDeGrupoT(id, t),
			ModeloGrupoEtapa.eliminarRegistrosDeGrupoT(id, t),
			ModeloGrupo.eliminarGrupoT(id, t)
		])
		.then( values => {
			t.commit();
			return respuesta.okDelete(res, 'Todos los registros del grupo fueron eliminados', id);
		})
		.catch( fail => {
			t.rollback();
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};

/*
	@Autor: @GustavoTotoy
	@ÚltimaModificación: 
*/
module.exports.mostrarGrupos = (req, res) => {
	ModeloGrupo.obtenerTodosLosGruposP()
	.then( grupos => {
		return respuesta.okGet(res, 'Se obtuvieron los grupos', grupos);
	})
	.catch( error => {
		return respuesta.error(res, 'No se pudieron obtener los grupos', '', error);
	});
};

module.exports.anadirProcarianoAGrupo = (req, res) => {
	const idGrupo 		 = req.params.id_grupo;
	const idProcariano = req.body.idProcariano;

	ModeloProcarianoTipo.obtenerTipoActualDeProcarianoP(idProcariano)
	.then( registro => {
		if ( registro.get('TipoId') === 1 ) {
			inicializarTransaccion()
			.then( t => {
				return ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, t)
				.then( result => {
					t.commit();
					return respuesta.okCreate(res, 'Procariano añadido a grupo.', result);
				})
				.catch( fail => {
					t.rollback();
					return respuesta.ERROR_SERVIDOR(res, fail);
				});
			})
			.catch( fail => {
				return respuesta.ERROR_SERVIDOR(res, fail);
			});
		} else {
			return respuesta.ERROR_SERVIDOR(res, { mensaje : 'El procariano debe ser de Formación' });
		}
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};

module.exports.anadirProcarianosAGrupo = (req, res) => {
	let arrayProcarianos = JSON.parse(req.body.integrantes.toString());
	inicializarTransaccion()
	.then( t => {
		ModeloProcarianoGrupo.anadirProcarianosBulk(arrayProcarianos, t)
		.then( resultado => {
			console.log('resultado:', resultado)
			t.commit();
			return respuesta.okCreate(res, 'Procarianos añadidos al grupo.', null);
		})
		.catch( fail => {
			console.log('fail:', fail);
			t.rollback();
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};

/*
	@Autor: @GustavoTotoy
	@Descripción:
		Primero se obtiene la información del grupo, el animador y los procarianos del grupo
		Luego la información completa del animador
	@ÚltimaModificación: 
		13/09/2017 @edisonmora95 Cambiado a promesas y transacciones
		11/02/2018	@edisonmora95	Promise.all
*/
module.exports.obtenerGrupoPorId = (req, res) => {
	let idGrupo = req.params.id_grupo;
	let datosRespuesta = {};

	Promise.all([
		ModeloGrupo.obtenerGrupoPorIdP(idGrupo),
		ModeloAnimador.obtenerAnimadorDeGrupoP(idGrupo),
		ModeloProcariano.obtenerProcarianosDeGrupoP(idGrupo)
	]).then( values => {
		let grupo       = values[0];
		let animador    = values[1];
		let procarianos = values[2];

		let idProcariano = animador.get('ProcarianoId');
		ModeloProcariano.obtenerProcarianoPorIdP(idProcariano)
		.then( infoAnimador => {
			datosRespuesta.grupo 							= grupo;
			datosRespuesta.procarianos 				= procarianos;
			datosRespuesta.animador 					= animador;
			datosRespuesta.procarianoAnimador = infoAnimador;
			return respuesta.okGet(res, 'Información completa del grupo obtenida.', datosRespuesta);
		})
		.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
	})
	.catch( fail => {
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};


////////////////////////////////////////////////////////////
//FUNCIONES INTERNAS
////////////////////////////////////////////////////////////
function inicializarTransaccion(){
	return new Promise( (resolve, reject) => {
		return modelo.sequelize.transaction({
			autocommit: false,
		})
		.then( result => {
			return resolve(result);
		})
		.catch( fail => {
			const mensaje = 'No se pudo crear la transacción';
			const tipo    = 'Transaction error';
			const error   = { mensaje, tipo };
			return reject(error);
		});
	});
}

