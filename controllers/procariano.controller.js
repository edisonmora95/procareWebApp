/*
	@Descripcion: Clase controladora de todos los procarianos
	@Autor: Jose Viteri
	@FechaCreacion: 26/06/2017
*/
'use strict';

let utils 		= require('../utils/utils');
let respuesta = require('../utils/respuestas');
let co 				= require('co');

let sequelize	 							= require('../models/').sequelize;
const ModeloPersona					= require('../models/').Persona;
const ModeloProcariano 			= require('../models/').Procariano;
const ModeloProcarianoGrupo = require('../models/').ProcarianoGrupo;
const ModeloProcarianoTipo 	= require('../models/').ProcarianoTipo;
const ModeloTipo 						= require('../models/').Tipo;
const ModeloGrupo 					= require('../models/').Grupo;

/*
	@Autor : JV
	@FechaCreacion : 26/06/2017
	@Descripción:
		* Primero se crea el registro de persona
		* Luego se crea el registro de procariano
		* Si el usuario ingresó un grupo, se crea su registro en ProcarianoGrupo
		* Si el usuario ingresó un tipo, se crea su registro en ProcarianoTipo
		* Es obligatorio que ingrese un tipo. Si no se ingresa, no se crea el Procariano.
	@Modificado: 21/07/2017 @edisonmora95	promesas y transacciones
*/
const crearProcariano = (req, res) => {
	const options       = {
		public_id : req.body.nombres + ' ' + req.body.apellidos + ' ' + Date.now()
	};
	let datos 					= {};
	let fechaNacimiento = ( req.body.fechaNacimiento === '' ) ? null : new Date(req.body.fechaNacimiento);
	let persona 				= {
		cedula 					: req.body.cedula,
		nombres 				: req.body.nombres,
		apellidos 			: req.body.apellidos,
		direccion 			: req.body.direccion,
		fechaNacimiento : fechaNacimiento,
		genero 					: req.body.genero,
		email 					: req.body.email,
		celular 				: req.body.celular,
		trabajo 				: req.body.trabajo,
		convencional 		: req.body.convencional,
		imagenUrl       : null
	};
	let fechaOrdenacion = ( req.body.fechaOrdenacion === '' ) ? null : new Date(req.body.fechaOrdenacion);
	let procariano 			= {
		colegio 				: req.body.colegio,
		universidad 		: req.body.universidad,
		parroquia 			: req.body.parroquia,
		fechaOrdenacion : fechaOrdenacion,
		estado 					: req.body.estado,
	};
	const idGrupo 			= req.body.grupo;
	const idTipo 				= req.body.tipo;
	let mensaje 				=	'Procariano creado correctamente.';

	co(function* (){
		let t 										=	yield inicializarTransaccion();
		if ( req.body.imagenUrl ) {
			let imagenUrl							= yield utils.subirImagenCloudinary(req.body.imagenUrl, options);	
			persona.imagenUrl         = imagenUrl.secure_url;
		}
		//Creación de Persona
		let personaCreada 				=	yield ModeloPersona.crearPersonaT(persona, t);
		//Creación de Procariano
		procariano.PersonaId 			= personaCreada.get('id');
		let procarianoCreado 			= yield ModeloProcariano.crearProcarianoT(procariano, t);
		let idProcariano 					= procarianoCreado.get('id');
		//Añadir Grupo
		const ingresoIdGrupo 			= ( idGrupo !== '' && idGrupo !== null && typeof idGrupo !== 'undefined' && idGrupo > 0 );
		if( ingresoIdGrupo ){
			const grupoExiste				=	yield ModeloGrupo.obtenerGrupoPorIdP(idGrupo);
			if( grupoExiste ){
				datos.procarianogrupo = yield ModeloProcarianoGrupo.anadirProcarianoAGrupoT(idGrupo, idProcariano, t);
			}else{
				mensaje += ' Grupo ingresado no existe.';
			}
		}
		//Si no escogió grupo no hay problema, no es obligatorio
		//Añadir Tipo
		const ingresoIdTipo				= ( idTipo !== '' && idTipo !== null && typeof idTipo !== 'undefined' );
		if( ingresoIdTipo ){
			const tipoExiste 				=	( idTipo > 0 && idTipo < 7 );
			if( tipoExiste ){
				datos.procarianotipo 	= yield ModeloProcarianoTipo.anadirTipoProcarianoT(idTipo, idProcariano, t);			
			}else{
				t.rollback();
				return respuesta.error(res, 'No se pudo crear procariano', 'Tipo ingresado no existe', null);
			}
		}else{
			//Si no escogió grupo, no se debe crear el registro
			t.rollback();
			return respuesta.error(res, 'No se pudo crear procariano', 'No ingresó tipo', null);
		}
		//Se hace commit y se envíá su respuesta
		datos.persona 		= personaCreada;
		datos.procariano 	= procarianoCreado;
		t.commit();
		return respuesta.okCreate(res, mensaje, datos);
	}).catch( fail => {
		const mensajeError = fail.errors[0].message;
		return respuesta.error(res, 'No se pudo crear al procariano', mensajeError, fail);
	});
};

/*
	@Autor : JV
	@FechaCreacion : 28/05/2017
	@Modificado: 
		07/07/2017 @Jv , agregado metodo generar JsonProcariano
		21/07/2017 @erialper, agrego la excepción de busquedad
*/
const buscarProcariano = (req, res) => {

	var jsonModelo = utils.generarJsonProcariano(req.query);
	
	ModeloProcariano.findAll({
	    include: [{
	        model: ModeloPersona ,
	        where: jsonModelo.persona
	    }], where : jsonModelo.procariano//aqui va el where
	    
	}).then( procarianos => {
		const registro = procarianos.map( procariano => {
			return Object.assign(
				{},
				{
					personaId 			: 	procariano.Persona.id,
					procarianoID 		: 	procariano.id ,
					colegio 				: 	procariano.colegio ,
					universidad 		: 	procariano.universidad ,
					parroquia 			: 	procariano.parroquia ,
					fechaOrdenacion : 	procariano.fechaOrdenacion ,
					cedula 					: 	procariano.Persona.cedula ,
					nombres 				: 	procariano.Persona.nombres ,
					apellidos 			: 	procariano.Persona.apellidos ,
					direccion 			: 	procariano.Persona.fechaNacimiento ,
					genero 					: 	procariano.Persona.genero ,
					fechaNacimiento : 	procariano.Persona.fechaNacimiento ,
					convencional 		: 	procariano.Persona.convencional ,
					celular 				: 	procariano.Persona.celular ,
					trabajo 				: 	procariano.Persona.trabajo,
					email						: 	procariano.Persona.email,
					estado					: 	procariano.estado
				});
		});

		return respuesta.okGet(res, 'Búsqueda exitosa', registro);
	}).catch( error => {
		return respuesta.error(res, 'No se obtuvieron procarianos', '', error);
	});
};

/*
	@Autor: Erick Perez
	@Modificado: 	
		22/08/2017 	@edisonmora95,	Cambio de nombre de función
																Pasada función a modelo.
		16/09/2017	@edisonmora95,	Cambiado a promesas. Una sola función en ModeloProcariano
*/
const buscarProcarianosActivos = (req, res) => {
	ModeloProcariano.obtenerProcarianosActivosP()
	.then( procarianos => {
		return respuesta.okGet(res, 'Búsqueda exitosa', procarianos);
	})
	.catch( error => {
		return respuesta.error(res, 'Error en la búsqueda', '', error);
	});
};

/*
	@Autor : JV
	@FechaCreacion : 28/05/2017
	@Descripción:
		Devuelve la información de Persona, Procariano, ProcarianoGrupo y ProcarianoTipo
	@Modificado: 
		07/07/2017 @JV , 						para que modifique por ID
		21/07/2017 @erialper , 			para que devuelva el tipo de procariano, agrego la excepción de busquedad	
		23/07/2017 @edisonmora95 , 	luego de obtener el id del tipo, también obtiene el nombre del tipo
		15/09/2017 @edisonmora95 , 	cambiado a promesas. Una sola función en ModeloProariano
*/
const buscarProcarianoPorId = (req, res) => {
	const idPersona = req.params.id;
	let datos 			= {};

	co(function* (){
		let procariano 		= yield ModeloProcariano.obtenerProcarianoPorIdPersonaP(idPersona);
		datos.procariano 	= procariano;
		//Solo devuelve el tipo actual
		let tipoActual 		= obtenerTipoActual(procariano.get('Tipos'));
		datos.tipoActual 	= tipoActual;
		procariano.set('Tipos', null);
		//Solo devuelve el grupo actual
		let grupoActual 	= obtenergrupoActual(procariano.get('Grupos'));
		datos.grupoActual = grupoActual;
		procariano.set('Grupos', null);

		return respuesta.okGet(res, 'Procariano encontrado', datos);
	}).catch( fail => {
		return respuesta.error(res, 'Error en la búsqueda', '', fail);
	});
};

/*
	@Autor : JV
	@FechaCreacion : 28/05/2017
	@Descripción:
		*	Primero actualiza la información de la Persona
		*	Luego actualiza la información del Procariano
	@Modificado: 
		07/07/2017 @JV , agregado date a datos date
		22/07/2017 @erialper, agregado el cambio de tipo
		16/09/2017 @edisonmora95 , 	cambiado a promesas.
*/
const editarProcariano = (req, res) => {
	const idPersona 			= req.params.id;
	console.log('idPersona:', idPersona);
	const fechaNacimiento = (req.body.fechaNacimiento === '') ? null : new Date(req.body.fechaNacimiento);
	const persona 				= {
		cedula 					: req.body.cedula,
		nombres 				: req.body.nombres,
		apellidos 			: req.body.apellidos,
		direccion 			: req.body.direccion,
		fechaNacimiento : fechaNacimiento,
		genero 					: req.body.genero,
		email 					: req.body.email,
		celular 				: req.body.celular,
		trabajo 				: req.body.trabajo,
		convencional 		: req.body.convencional
	};
	const fechaOrdenacion = (req.body.fechaOrdenacion === '') ? null : new Date(req.body.fechaOrdenacion);
	const procariano 			= {
		colegio 				: req.body.colegio,
		universidad 		: req.body.universidad,
		parroquia 			: req.body.parroquia,
		fechaOrdenacion : fechaOrdenacion,
		estado 					: req.body.estado,
	};
	const idTipoNuevo 		= req.body.tipoId;
	const idProcariano 		= req.body.idProcariano;
	console.log('idProcariano:', idProcariano);
	let datos 						= {};
	let mensaje 					= '';
	
	co( function* (){
		let t 									=	yield inicializarTransaccion();
		//Edito campos de Persona
		const personaEditada 		= yield ModeloPersona.editarPersonaT(idPersona, persona, t);
		//Edito campos de Procariano
		const procarianoEditado	= yield ModeloProcariano.editarProcarianoT(idPersona, procariano, t);
		//Edito tipo de Procariano
		const ingresoTipo 		=	( idTipoNuevo !== null && idTipoNuevo !== '' && typeof idTipoNuevo !== 'undefined' );
		if( ingresoTipo ){
			const tipoActual  	=	yield ModeloProcarianoTipo.obtenerTipoActualDeProcarianoP(idProcariano);
			if ( tipoActual === null ) {
				yield ModeloProcarianoTipo.anadirTipoProcarianoT(idTipoNuevo, idProcariano, t);
				mensaje = 'Se modificó la información del procariano. Se añadió el tipo';
			}else{
				const idTipoActual = tipoActual.get('TipoId');
				if( idTipoActual != idTipoNuevo ){
					const cambioDeTipoValido = ( idTipoNuevo == 6 || ( idTipoActual == idTipoNuevo-1 && idTipoNuevo != 5 ) );	
					if( cambioDeTipoValido ){
						yield ModeloProcarianoTipo.cambiarTipoDeProcarianoT(idProcariano, idTipoActual, idTipoNuevo, t);
						mensaje	= 'Se modificó la información del procariano. Incluyendo el tipo';
					}else{
						mensaje = 'Se modificó la información del procariano. No se permite cambiar el tipo a uno menor';
					}
				}else{
					mensaje 	= 'Se modificó la información del procariano. No se cambió el tipo ya que era igual al anterior';
				}
			}
		}else{
			mensaje = 'Se modificó la información del procariano. No ingresó tipo para cambiar';
		}
		//Respuesta
		datos.persona 		= personaEditada;
		datos.procariano 	= procarianoEditado;
		t.commit();
		return respuesta.okUpdate(res, mensaje, datos);
	}).catch( fail => {
		const mensajeError = fail.errors[0].message;
		return respuesta.error(res, 'Error al editar procariano', mensajeError, fail);
	});
};

/*
	@Autor : JV
	@FechaCreacion : 28/05/2017
	@Descripción:
		*	Primero cambio el estado
		*	Luego, pongo fechaFin al tipo del procariano
		*	Luego, pongo fechaFin al grupo del procariano
	@Modificado: 
		21/07/2017 @erialper , agrega eliminar el tipo y el grupo
		16/09/2017 @edisonmora95 , 	cambiado a promesas.
*/
const eliminarProcariano = (req, res) => {
	var idPersona = req.params.id;
	
	co(function* (){
		let t 							=	yield inicializarTransaccion();
		const procarianoDel	=	yield ModeloProcariano.eliminarProcarianoT(idPersona, t);

		if( procarianoDel === 1 ){
			//Caso exitoso, se eliminó solo a 1 Procariano
			const procariano 		= yield ModeloProcariano.obtenerProcarianoPorIdPersonaP(idPersona);
			const idProcariano 	= procariano.get('id');
			
			//Elimino sus registros de tipo
			const tipoActual 		= yield ModeloProcarianoTipo.obtenerTipoActualDeProcarianoP(idProcariano);
			if( tipoActual != null ){
				const idTipoActual 	= tipoActual.get('TipoId');
				yield ModeloProcarianoTipo.anadirFechaFinT(idProcariano, idTipoActual,t);	
			}
			
			//Elimino sus registros de grupo
			const grupoActual = yield ModeloProcarianoGrupo.obtenerGrupoActualDeProcarianoP(idProcariano);
			if( grupoActual != null ){
				yield ModeloProcarianoGrupo.anadirFechaFinT(idProcariano, t);
			}

			return respuesta.okDelete(res, 'Procariano eliminado.', null);

		}else if( procarianoDel === 0 ){
			//Si no se eliminó a ningún Procariano
			t.rollback();
			return respuesta.errorDelete(res, 'No hay un procariano con ese Id para eliminar.', null);
		}else{
			//Error...
			t.rollback();
			return respuesta.errorDelete(res, 'Ocurrió un error al tratar de eliminar al Procariano', null);
		}
		
	}).catch( fail => {
		return respuesta.error(res, 'No se pudo eliminar al procariano', '', fail);
	});
};

/*
	@Autor : @edisonmora95
	@Descripción:
		Primero busca a todos los chicos de Procare Formación
		Luego busca a los que estan en grupo
		Filtra los que no tienen grupo actualmente
	@Modificado: 
		21/07/2017 @erialper , agrega eliminar el tipo y el grupo
		16/09/2017 @edisonmora95 , 	cambiado a promesas.
*/
const buscarChicosFormacionSinGrupo = (req, res) => {
	co(function* (){
		let chicosFormacion 							= yield ModeloProcariano.buscarChicosFormacionP();
		let procarianosEnGrupo 						=	yield ModeloProcarianoGrupo.buscarProcarianosConGrupoP();
		let arrayChicosFormacionSinGrupo 	= [];
		chicosFormacion.forEach( chico => {
			if( !chicoEnGrupo(chico.dataValues, procarianosEnGrupo) ){
				arrayChicosFormacionSinGrupo.push(chico);
			}
		});
		return respuesta.okGet(res, 'Búsqueda exitosa', arrayChicosFormacionSinGrupo);
	}).catch( fail => {
		return respuesta.error(res, 'Error en la búsqueda', '', fail);
	});
};

/*
	@Autor : @edisonmora95
	@Modificado: 
		21/07/2017 @erialper , agrega eliminar el tipo y el grupo
		16/09/2017 @edisonmora95 , 	cambiado a promesas.
*/
const obtenerGrupoActualDeProcariano = (req, res) => {
	const idProcariano = req.params.id;
	co(function* (){
		let procarianogrupo = yield ModeloProcarianoGrupo.obtenerGrupoActualDeProcarianoP(idProcariano);
		const idGrupo 			=	procarianogrupo.get('GrupoId');
		let grupoActual 		=	yield ModeloGrupo.obtenerGrupoPorIdP(idGrupo);
		return respuesta.okGet(res, 'Búsqueda exitosa', grupo);
	}).catch( fail => {
		return respuesta.error(res, 'Error en la búsqueda', '', fail);
	});
};

module.exports = {
	crearProcariano,
	buscarProcariano,
	buscarProcarianosActivos,
	buscarProcarianoPorId,
	editarProcariano,
	eliminarProcariano,
	buscarChicosFormacionSinGrupo,
	obtenerGrupoActualDeProcariano
};

////////////////////////////////////////////////////////////
//FUNCIONES INTERNAS
////////////////////////////////////////////////////////////

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

/*
	@Descripción:
		Recorre el array de chicosEnGrupo.
		Si el chico indicado tiene el mismo id que cualquier chico del array entonces retorna true
*/
const chicoEnGrupo = (chico, array) => {
	let chicoEnGrupo = {};
	let flag = false;
	for (let i = 0; i < array.length; i++) {
		chicoEnGrupo = array[i];
		if(chico.procarianoId === chicoEnGrupo.ProcarianoId){	
			flag = true;
			break;
		}
	}
	return flag;
}

const obtenerTipoActual = (arrayTipos) => {
	let tipoActual = {};
	if( arrayTipos && arrayTipos.length > 0 ){
		for( var i = 0; i < arrayTipos.length; i++ ) {
			let tipo 						= arrayTipos[i];
			let procarianotipo 	= arrayTipos[i].get('ProcarianoTipo');
			let fechaFin 				= procarianotipo.get('fechaFin');
			if( !fechaFin ){
				tipoActual = tipo;
			}
		}
	}
	return tipoActual;
}

const obtenergrupoActual = (arrayGrupos) => {
	let grupoActual = {};
	if( arrayGrupos && arrayGrupos.length > 0 ){
		for( var i = 0; i < arrayGrupos.length; i++ ) {
			let grupo 						= arrayGrupos[i];
			let procarianogrupo = arrayGrupos[i].get('ProcarianoGrupo');
			let fechaFin 				= procarianogrupo.get('fechaFin');
			if( !fechaFin ){
				grupoActual = grupo;
			}
		}
	}
	return grupoActual;
}