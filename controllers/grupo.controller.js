/*
	@Descripcion: Clase para representar el concepto de Grupo
	@Autor: Gustavo Totoy
	@FechaCreacion: 31/05/2017
	@UltimaFechaModificacion: 13/09/2017 @edisonmora95 Cambiado a promesas y transacciones
*/

'use strict';

const respuesta 						= require('../utils/respuestas');
const co 										= require('co');
const utils									=	require('../utils/utils');

const modelo 								= require('../models');
const ModeloGrupo 					= require('../models/').Grupo;
const ModeloGrupoEtapa 			= require('../models/').GrupoEtapa;
const ModeloAnimador 				= require('../models/').Animador;
const ModeloProcariano 			= require('../models/').Procariano;
const ModeloPersona 			= require('../models/').Persona;
const ModeloPersonaRol 			= require('../models/').PersonaRol;
const ModeloProcarianoGrupo = require('../models/').ProcarianoGrupo;


/*
	@Autor: @GustavoTotoy
	@Descripción:
		Primero se crea el registro en la tabla Grupos
		Luego se lo añade al grupo a una etapa, se crea el registro en la tabla GrupoEtapa
		Luego se crea el registro de su animador en la tabla Animador
			Si el procariano ingresado como animador no consta en la base como uno, se lo añade en PersonaRol. Y se le envía el correo con la contraseña
	@ÚltimaModificación: 
		13/09/2017 @edisonmora95 Cambiado a promesas y transacciones
*/
module.exports.crearGrupo = (req, res) => {
	let grupoObj = {
		nombre 					: req.body.nombre,
		tipo 						: req.body.tipo,
		cantidadChicos 	: req.body.cantidadChicos,
		numeroReuniones	: req.body.numeroReuniones,
		genero 					: req.body.genero,
	};
	let idEtapa 				= req.body.etapa;
	let idAnimador 			= req.body.animador;
	let datosRespuesta 	= {};

	co(function* (){
		console.log('Entro al controller')
		let t 					= 	yield inicializarTransaccion();
    let grupo 			= 	yield ModeloGrupo.crearGrupoT(grupoObj, t);
    let idGrupo 		= 	grupo.get('id');
    let grupoetapa 	= 	yield ModeloGrupoEtapa.crearGrupoEtapaT(idGrupo, idEtapa, t);
  	let animador 		= 	yield ModeloAnimador.agregarAnimadorAGrupoT(idAnimador, idGrupo, t);
  	let procariano 	= 	yield ModeloProcariano.obtenerProcarianoPorIdP(idAnimador);
  	const persona 	= 	procariano.get('Persona');
  	const idPersona = 	persona.get('personaId');
  	let rolAsignado = 	yield ModeloPersonaRol.buscarRolDePersonaPorId(idPersona);
  	console.log('rolAsignado:', rolAsignado)
  	if( !rolAsignado ){
  		//Si no tiene asignado un rol en la base de datos, se le asigna
  		let rol = yield ModeloPersonaRol.asignarRolT(idPersona, 'Animador', t);
  		datosRespuesta.rol = rol;
  		//Luego se le genera la contraseña aleatoria
  		const password = utils.randomString();
  		console.log('password:', password);
  		const hash 		 = yield utils.generarHash(password);
  		console.log('hash:', hash);
  		const mensaje  = 'Ha sido añadido como Animador a la aplicación web de Procare. Su contraseña para ingresar es ' + password + " .\nPor favor proceda a cambiarla por motivos de seguridad . \n\nAtentamente \nFundación Procare"
  		const destinatario = persona.get('email');
  		console.log('destinatario:', destinatario)
  		const sujeto	 =	'ProcareWebApp';
  		//Se le envía el correo con su nueva contraseña
  		yield utils.generarCorreo(mensaje, destinatario, sujeto);
  		//Se guarda la contraseña del animador
  		yield ModeloPersona.ingresarContrasenna(idPersona, hash, t);
  	}
    t.commit();
    //t.rollback();
    datosRespuesta.grupo 			= grupo;
    datosRespuesta.grupoetapa = grupoetapa;
    datosRespuesta.animador 	= animador;
    return respuesta.okCreate(res, 'Grupo creado', datosRespuesta);
	}).catch( fail => {
		return respuesta.error(res, 'No se pudo crear el grupo', '', fail);
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
*/
module.exports.editarGrupo = (req, res) => {
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
	
	co(function* (){
		let t 								=	yield inicializarTransaccion();
		const grupoEditado		=	yield ModeloGrupo.editarGrupoT(grupo, t);	//Primero se edita la información general del grupo
		const cambioEtapa 		=	( grupo.etapaNueva !== '' && (grupo.etapaNueva !== grupo.etapaAntigua) && grupo.etapaNueva !== null && grupo.etapaAntigua !== null);
		const cambioAnimador 	= ( grupo.animadorNuevo !== '' && (grupo.animadorNuevo !== grupo.animadorAntiguo) && grupo.animadorNuevo !== null && grupo.animadorAntiguo !== null);
		let datosRespuesta 		= {};

		if( cambioEtapa ){
			const etapa 				= yield ModeloGrupoEtapa.cambiarGrupoDeEtapaT(grupo.id, grupo.etapaAntigua, grupo.etapaNueva, t);
			datosRespuesta.etapaNueva = etapa;
		}

		if( cambioAnimador ){
			const animador 	= yield ModeloAnimador.cambiarAnimadorDeGrupoT(grupo.id, grupo.animadorAntiguo, grupo.animadorNuevo, t);
			datosRespuesta.animadorNuevo = animador;
		}

		t.commit();
		datosRespuesta.grupoEditado = grupoEditado;
		return respuesta.okUpdate(res, 'Se editó el grupo correctamente.', datosRespuesta);		
	}).catch( fail => {
		return respuesta.error(res, 'No se pudo editar el grupo', '', fail);
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
	var id = req.params.id;
	let datosRespuesta = {};

	co(function* (){
		let t 								=	yield inicializarTransaccion();
		let registrosAnimDel	=	yield ModeloAnimador.eliminarRegistrosDeGrupoT(id, t);
		let registrosPGDel		= yield ModeloProcarianoGrupo.eliminarRegistrosDeGrupoT(id, t);
		let registrosEtapDel	= yield ModeloGrupoEtapa.eliminarRegistrosDeGrupoT(id, t);
		let registrosGrupoDel	=	yield ModeloGrupo.eliminarGrupoT(id, t);

		datosRespuesta.animador 		= registrosAnimDel;
		datosRespuesta.procarianos 	= registrosPGDel;
		datosRespuesta.etapa 				= registrosEtapDel;
		datosRespuesta.grupo 				= registrosGrupoDel;
		t.commit();
		return respuesta.okDelete(res, 'Todos los registros del grupo fueron eliminados', datosRespuesta);

	}).catch( fail => {
		return respuesta.error(res, 'No se pudo eliminar el grupo', '', fail);
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

module.exports.anadirProcarianoAGrupo = (req, res, next, persona, procariano) => {
	modelo.ProcarianoGrupo.create({
		GrupoId: req.body.grupo,
		ProcarianoId: procariano.get('id'),
		fechaInicio: procariano.get('createdAt')
	}).then( procarianogrupo => {
		var rjson = {
			status : true,
			mensaje : 'Se pudo añadir el Procariano correctamente al Grupo',
			persona : persona,
			procariano : procariano,
			procarianogrupo: procarianogrupo
		};
		res.json(rjson);
	}).catch( error => {
		var rjson = {
			status : false,
			mensaje : 'No se pudo añadir Procariano al grupo',
			error : error
			};
		res.json(rjson);
	});
}

/*
	@Autor: @GustavoTotoy
	@Descripción:
		Primero se obtiene la información del grupo
		Luego se obtiene la información del animador
		Luego la información completa del animador
		Finalmente los procarianos del grupo
	@ÚltimaModificación: 13/09/2017 @edisonmora95 Cambiado a promesas y transacciones
*/
module.exports.obtenerGrupoPorId = (req, res, next) => {
	let idGrupo = req.params.id_grupo;
	let datosRespuesta = {};

	co(function* (){
		let t 								=	yield inicializarTransaccion();
		let grupo 						= yield ModeloGrupo.obtenerGrupoPorIdP(idGrupo);
		console.log(grupo)
		let animador 					= yield ModeloAnimador.obtenerAnimadorDeGrupoP(idGrupo);
		let idProcariano			= animador.get('ProcarianoId');
		let infoAnimador 			= yield ModeloProcariano.obtenerProcarianoPorIdP(idProcariano);
		let procarianosGrupo 	= yield ModeloProcariano.obtenerProcarianosDeGrupoP(idGrupo);

		datosRespuesta.grupo 								= grupo;
		datosRespuesta.procarianos 					= procarianosGrupo;
		datosRespuesta.animador 						= animador;
		datosRespuesta.procarianoAnimador 	= infoAnimador;
		return respuesta.okGet(res, 'Información completa del grupo obtenida.', datosRespuesta);
	}).catch( fail => {
		return respuesta.error(res, 'No se pudo obtener el grupo', '', fail);
	});
};

////////////////////////////////////////////////////////////
//FUNCIONES INTERNAS
////////////////////////////////////////////////////////////
function inicializarTransaccion(){
	return new Promise( (resolve, reject) => {
		modelo.sequelize.transaction({
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
