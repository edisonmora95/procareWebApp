/*
@Descripcion: Clase controladora de todos los procarianos
@Autor: Jose Viteri
@FechaCreacion: 26/06/2017
*/

var modelo = require('../models');
var utils = require('../utils/utils')
var ControladorGrupo = require('../controllers/grupo');


/*
Autor : JV
Creado : 26/06/2017
Modificado: 21/07/2017 @edanmora95	agrega un procariano a un grupo y se coloca su tipo
*/
const crearProcariano = (req, res, next) => {
	if(req.body.fechaNacimiento == ''){
		fechaNacimiento = null;
	}else{
		fechaNacimiento = new Date(req.body.fechaNacimiento);	
	}
	
	let persona = {
		cedula : req.body.cedula,
		nombres : req.body.nombres,
		apellidos : req.body.apellidos,
		direccion : req.body.direccion,
		fechaNacimiento : fechaNacimiento,
		genero : req.body.genero,
		contrasenna : req.body.contrasenna,
		email : req.body.email,
		celular : req.body.celular,
		trabajo : req.body.trabajo,
		convencional : req.body.convencional
	};
	modelo.Persona.crearPersona(persona, (persona) => {
		if(req.body.fechaOrdenacion == ''){
			fechaOrdenacion = null;
		}else{
			fechaOrdenacion = new Date(req.body.fechaOrdenacion);	
		}
		let procariano = {
			PersonaId : persona.get('id'),
			colegio : req.body.colegio,
			universidad : req.body.universidad,
			parroquia : req.body.parroquia,
			fechaOrdenacion : fechaOrdenacion,
			estado : req.body.estado,
			haceParticipacionEstudiantil : req.body.haceParticipacionEstudiantil
		}
		modelo.Procariano.crearProcariano1(procariano, (procariano) => {
			let grupo = req.body.grupo;
			let tipo = req.body.tipo;
			if(grupo !== ''){									//SI SE INGRESÓ UN GRUPO
				modelo.ProcarianoGrupo.anadirProcarianoAGrupo(req.body.grupo, procariano.get('id'), procariano.get('createdAt'), (procarianoGrupo) => {
					if(tipo !== ''){							//SI SE INGRESÓ UN TIPO
						modelo.ProcarianoTipo.anadirTipoProcariano(req.body.tipo, procariano.get('id'), procariano.get('createdAt'), (procarianoTipo) => {
							return res.status(200).json({
								estado: true,
								persona: persona,
								procariano: procariano,
								procarianoGrupo: procarianoGrupo,
								procarianoTipo: procarianoTipo
							});
						}, (errorProcarianoTipo) => {
							return res.status(400).json({
								estado: false,
								errorProcarianoTipo: errorProcarianoTipo
							});
						});
					}else{												//SI SE INGRESÓ GRUPO PERO NO TIPO
						//Se crea persona, procariano y procarianogrupo
						return res.status(200).json({
							status: true,
							persona: persona,
							procariano: procariano,
							procarianogrupo: procarianogrupo
						});
					}
					
				}, (errorProcarianoGrupo) => {
					return res.status(400).json({
						estado: false,
						errorProcarianoGrupo: errorProcarianoGrupo
					});
				});
			}else if(tipo !== ''){						//SI NO SE INGRESÓ UN GRUPO PERO SE INGRESÓ UN TIPO
				modelo.ProcarianoTipo.anadirTipoProcariano(req.body.tipo, procariano.get('id'), procariano.get('createdAt'), (procarianoTipo) => {
					return res.status(200).json({
						estado: true,
						persona: persona,
						procariano: procariano,
						procarianoTipo: procarianoTipo
					});
				}, (errorProcarianoTipo) => {
					return res.status(400).json({
						estado: false,
						errorProcarianoTipo: errorProcarianoTipo
					});
				});
			}
			else{															//SI NO SE INGRESÓ NI TIPO NI GRUPO
				return res.status(200).json({
					status: true,
					persona: persona,
					procariano: procariano,
				});
			}
			
		}, (errorProcariano) => {
			return res.status(400).json({
					estado: false,
					errorProcariano: errorProcariano
				});
		});
	}, (errorPersona) => {
		return res.status(400).json({
					estado: false,
					errorPersona: errorPersona
				});
	});
}


/*
Autor : JV
Creado : 28/05/2017
Modificado: 07/07/2017 @Jv , agregado metodo generar JsonProcariano
			21/07/2017 @erialper, agrego la excepción de busquedad
*/

const buscarProcariano = (req, res , next) => {

	var jsonModelo = utils.generarJsonProcariano(req.query);
	
	modelo.Procariano.findAll({
	    include: [{
	        model: modelo.Persona ,
	        where: jsonModelo.persona
	    }], where : jsonModelo.procariano//aqui va el where
	    
	}).then( procarianos => {
		const respuesta = procarianos.map( procariano => {

			return Object.assign(
				{},
				{
					personaId : procariano.Persona.id,
					procarianoID : procariano.id ,
					colegio : procariano.colegio ,
					universidad : procariano.universidad ,
					parroquia : procariano.parroquia ,
					fechaOrdenacion : procariano.fechaOrdenacion ,
					haceParticipacionEstudiantil : procariano.hace_participacion_estudiantil ,
					cedula : procariano.Persona.cedula ,
					nombres : procariano.Persona.nombres ,
					apellidos : procariano.Persona.apellidos ,
					direccion : procariano.Persona.fechaNacimiento ,
					genero : procariano.Persona.genero ,
					fechaNacimiento : procariano.Persona.fechaNacimiento ,
					convencional : procariano.Persona.convencional ,
					celular : procariano.Persona.celular ,
					trabajo : procariano.Persona.trabajo,
					email: procariano.Persona.email,
					estado: procariano.estado
				});
		});
		return res.json(respuesta);
	}).catch( error => {
		var status = false;
		var mensaje = 'No se obtuvieron procarianos'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			errorProcariano : error
		}
		res.json(jsonRespuesta);
	});
};


/*
Autor : JV
Creado : 28/05/2017
Modificado: 07/07/2017 @JV , para que modifique por ID
			21/07/2017 @erialper , para que devuelva el tipo de procariano, agrego la excepción de busquedad	
			23/07/2017 @edanmora , luego de obtener el id del tipo, también obtiene el nombre del tipo
*/

const buscarProcarianoPorId = (req, res, next) => {
	//tener cuidado xq cualquiera podra ver este id
	var id = req.params.id;

	modelo.Procariano.findAll({
	    include: [{
	        model: modelo.Persona ,
	        where: {
	        	id  : id
	        }
	    }],
	    where : {
	    	PersonaId : id
	    }  
	}).then( procarianos => {
		modelo.ProcarianoTipo.findOne({
			where: {
				fechaFin: null,
				ProcarianoId : procarianos[0].id
			}
		}).then( tipoProcariano =>{
			if(tipoProcariano == null){
				const respuesta = procarianos.map( procariano => {
					return Object.assign(
						{},
						{
							personaId : procariano.Persona.id,
							procarianoID : procariano.id ,
							colegio : procariano.colegio ,
							universidad : procariano.universidad ,
							parroquia : procariano.parroquia ,
							fechaOrdenacion : procariano.fecha_ordenacion ,
							haceParticipacionEstudiantil : procariano.hace_participacion_estudiantil ,
							cedula : procariano.Persona.cedula ,
							nombres : procariano.Persona.nombres ,
							apellidos : procariano.Persona.apellidos ,
							direccion : procariano.Persona.direccion ,
							genero : procariano.Persona.genero ,
							fechaNacimiento : procariano.Persona.fechaNacimiento ,
							convencional : procariano.Persona.convencional ,
							celular : procariano.Persona.celular ,
							trabajo : procariano.Persona.trabajo ,
							email : procariano.Persona.email,
							estado : procariano.estado
						});
				});
				return res.json(respuesta);
			}else{
				//Una vez obtenido el id del tipo del procariano, se obtiene el nombre del tipo
				modelo.Tipo.obtenerTipoPorId(tipoProcariano.TipoId, (tipo) => {
					const respuesta = procarianos.map( procariano => {
						return Object.assign(
							{},
							{
								personaId : procariano.Persona.id,
								procarianoID : procariano.id ,
								colegio : procariano.colegio ,
								universidad : procariano.universidad ,
								parroquia : procariano.parroquia ,
								fechaOrdenacion : procariano.fecha_ordenacion ,
								haceParticipacionEstudiantil : procariano.hace_participacion_estudiantil ,
								cedula : procariano.Persona.cedula ,
								nombres : procariano.Persona.nombres ,
								apellidos : procariano.Persona.apellidos ,
								direccion : procariano.Persona.direccion ,
								genero : procariano.Persona.genero ,
								fechaNacimiento : procariano.Persona.fechaNacimiento ,
								convencional : procariano.Persona.convencional ,
								celular : procariano.Persona.celular ,
								trabajo : procariano.Persona.trabajo ,
								email : procariano.Persona.email,
								estado : procariano.estado,
								tipoId : tipoProcariano.TipoId,
								tipoNombre: tipo.nombre
							}
						);
				});
				return res.json(respuesta);
				});
			}
		});
	}).catch( error => {
		var status = false;
		var mensaje = 'No se obtuvieron procarianos'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			errorProcariano : error
		}
		res.json(jsonRespuesta);
	});
};

/*
Autor : JV
Creado : 28/05/2017
Modificado: 07/07/2017 @JV , agregado date a datos date
			22/07/2017 @erialper, agregado el cambio de tipo
*/

const editarProcariano = (req, res, next) => {
	var id = req.params.id;
	if(req.body.fechaOrdenacion == '' || req.body.fechaOrdenacion == null){
		fechaDeOrdenacion = null;
	}else{
		fechaDeOrdenacion = new Date(req.body.fechaOrdenacion);	
	}
	modelo.Persona.update({
		cedula : req.body.cedula,
		nombres : req.body.nombres,
		apellidos : req.body.apellidos,
		direccion :req.body.direccion,
		fechaNacimiento : new Date(req.body.fechaNacimiento),
		genero : req.body.genero,
		email :  req.body.email,
		celular : req.body.celular,
		trabajo : req.body.trabajo,
		convencional : req.body.convencional
	}, {
	  where: {
	    id : id
	  }
	}).then( result => {
		modelo.Procariano.update({
			colegio : req.body.colegio,
			universidad : req.body.universidad,
			parroquia : req.body.parroquia,
			fechaOrdenacion : fechaDeOrdenacion,
			haceParticipacionEstudiantil : req.body.haceParticipacionEstudiantil
		}, { 
			where : {
				PersonaId : id
			}
		}).then ( result2 => {
			//cambiar tipo
			modelo.Procariano.findOne({where:{PersonaId : id}}).then(procariano =>{
				modelo.ProcarianoTipo.findOne({
					where: {
						fechaFin : null,
						ProcarianoId: procariano.get('id')
					}
				}).then( respuesta =>{
					if(respuesta!=null){
						var tipoActual = respuesta.TipoId
						var tipoNuevo = parseInt(req.body.tipoId)
						if(tipoNuevo == 6 || (tipoActual==tipoNuevo-1 && tipoNuevo!=5)){
							//Asigna como sacerdote o Asciende un nivel, menos a tipo mayor
							actualizarTipo(req,res,procariano)
						}else{
							//Salto de tipo
							var status = true;
							var mensaje = 'Se modifico la información del procariano, no se permite cambiar el tipo'
							var jsonRespuesta = {
								status : status,
								mensaje : mensaje,
								persona : result,
								procariano : result2
							}
							res.json(jsonRespuesta);
						}
					}else{
						//Si no tiene ningun tipo asignado
						agregarNuevoTipo(req,res,procariano)
					}
				}).catch( error => {
					var status = false;
					var mensaje = 'no se realizo la busquedad'
					var jsonRespuesta = {
						status : status,
						mensaje : mensaje,
						errorProcariano : error
					}
					res.json(jsonRespuesta);
				})
			})
		}).catch( error2 => {
			var status = false;
			var mensaje = 'no se pudo actualizar 2'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				persona : result,
				errorProcariano : error2
			}
			res.json(jsonRespuesta);
		});

	}).catch( error1 => {
			var status = false;
			var mensaje = 'no se pudo actualizar 1'
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				errorPersona : error1
			}
			res.json(jsonRespuesta);
	});
};

/*
Autor : JV
Creado : 28/05/2017
Modificado: 21/07/2017 @erialper , agrega eliminar el tipo y el grupo
*/

const eliminarProcariano = (req, res, next) => {
	console.log('SE VA A ELIMINAR EL PROCARIANO');
	var id = req.params.id;
	console.log(id);
	modelo.Procariano.update({
		estado : 'inactivo'	  
	}, {
	  where: {
	    PersonaId : id
	  }
	}).then( result => {
		modelo.Procariano.findOne({
			where: {
				PersonaId : id
			}
		}).then( procariano =>{
			modelo.ProcarianoTipo.update({
				fechaFin : new Date()
			},{
				where: {
					fechaFin : null,
					ProcarianoId: procariano.get('id')
				}
			}).then(tipo => {
				modelo.ProcarianoGrupo.update({
					fechaFin : new Date()
				},{
					where: {
						fechaFin : null,
						ProcarianoId: procariano.get('id')
					}
				}).then(grupo => {
					var status = true;
					var mensaje = 'eliminado correctamente';
					var jsonRespuesta = {
						status : status,
						mensaje : mensaje,
						procariano : result,
						tipo : tipo,
						grupo : grupo
					}
					res.json(jsonRespuesta);
				}).catch( error2 => {
					var status = true;
					var mensaje = 'Elimino procariano no esta en un grupo';
					var jsonRespuesta = {
						status : status,
						mensaje : mensaje,
						procariano : result,
						tipo : tipo,
						errorgrupo : error2
					}
					res.json(jsonRespuesta);
				});
			}).catch( error1 => {
				var status = true;
				var mensaje = 'Elimino procariano no tiene un tipo';
				var jsonRespuesta = {
					status : status,
					mensaje : mensaje,
					procariano: result,
					errortipo : error1
				}
				res.json(jsonRespuesta);
			});
		});
	}).catch( error => {
			var status = false;
			var mensaje = 'no se pudo eliminar';
			var jsonRespuesta = {
				status : status,
				mensaje : mensaje,
				errorProcariano : error
			}
			res.json(jsonRespuesta);
	});
};


//FUNCIONES INTERNAS
/*
	@Autor: @erialper
	@FechaCreación: 22/07/2017
	@Descripción: Cierra el periodo que tuvo dentro de su actual tipo y asigna uno nuevo.
*/
actualizarTipo = (req,res,procariano) => {
	modelo.ProcarianoTipo.update({
		fechaFin : new Date()
	},{
		where: {
			fechaFin : null,
			ProcarianoId: procariano.get('id')
		}
	}).then(respuesta => {
		agregarNuevoTipo(req,res,procariano)
	}).catch( error1 => {
		var status = false;
		var mensaje = 'no se pudo actualizar'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			errorTipo : error1
		}
		res.json(jsonRespuesta);
	});
}

/*
	@Autor: @erialper
	@FechaCreación: 22/07/2017
	@Descripción: Arranca un nuevo periodo en un tipo.
*/
agregarNuevoTipo = (req,res,procariano) => {
	modelo.ProcarianoTipo.create({
		TipoId : req.body.tipoId,
		ProcarianoId : procariano.get('id'),
		fechaInicio : new Date(),
		fechaFin : null
	}).then( repuesta => {
		var status = true;
		var mensaje = 'Asignado correctamente'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			tipo : repuesta
		}
		res.json(jsonRespuesta)
	}).catch( error2 => {
		var status = false;
		var mensaje = 'no se pudo asignar tipo, se modifico información'
		var jsonRespuesta = {
			status : status,
			mensaje : mensaje,
			errorTipo : error2
		}
		res.json(jsonRespuesta);
	});
}

module.exports = {
	crearProcariano,
	buscarProcariano,
	buscarProcarianoPorId,
	editarProcariano,
	eliminarProcariano
}