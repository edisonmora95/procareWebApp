/*
@Descripcion: Clase controladora de todos los miembros del personal
@Autor: Jose Viteri
@FechaCreacion: 30/07/2017
*/
'use strict'
var modelo = require('../models');
var utils = require('../utils/utils');
var respuestas = require('../utils/respuestas.js')

/*
Autor : JV
Creado : 26/06/2017
Modificado: 30
*/
const crearPersonal = (req, res, next) => {
	console.log('\n\nesta es la fecha de nacimiento ' + req.body.fechaNacimiento);
	if(req.body.fechaNacimiento == ''){
		var fechaNacimiento = null;
	}else{

		var fechaNacimiento = new Date(req.body.fechaNacimiento);	
	}
	console.log('\n\nesta es la fecha de nacimiento modificada' + fechaNacimiento);
	
	let persona = {
		cedula : req.body.cedula,
		nombres : req.body.nombres,
		apellidos : req.body.apellidos,
		direccion : req.body.direccion,
		fechaNacimiento : fechaNacimiento,
		genero : req.body.genero,
		//contrasenna : req.body.contrasenna,
		email : req.body.email,
		celular : req.body.celular,
		trabajo : 'personal procare',
		convencional : req.body.convencional,
		tipo : req.body.tipo
	};

	modelo.Persona.count({
		where : {
			cedula : persona.cedula
		}
	}).then( contador => {
		if (contador == 0){ // no existe esa persona por lo que se la crea desde cero
			modelo.Persona.crearPersona(persona, (persona) => {
			console.log(persona);

			modelo.PersonaRol.create({
				fechaInicio: new Date(),
				RolNombre : 'Personal',
				PersonaId : persona.id
			}).then( personaConRol => {
				console.log('se creo correctamente');
				return utils.generarUsuarioConCorreo(personaConRol.PersonaId, res , 'se agrergo una persona correctamente', 'algo paso', personaConRol );
				//return respuestas.okCreate(res, 'se agrego una persona correctamente', personaConRol);

			}).catch(error => {
					return respuestas.error(res, 'algo sucedio', '', error);
				})
			}, (errorPersona) => {
					return respuestas.error(res, 'algo sucedio', '', errorPersona);
				});

		}else{ // existe esa persona en la base de datos como procariano, por lo que se actualiza su tipo
			modelo.Persona.update({
				tipo : persona.tipo
			},{
				where : {
					cedula : persona.cedula
				}
			}).then( resultado => {

				modelo.Persona.find({
					attributes: ['id'],
					where : {
						cedula : persona.cedula
					}
				}).then( personaConId => {
					modelo.PersonaRol.create({
						RolNombre : 'Personal',
						PersonaId : personaConId.id
					}).then( resultado2 => {

						//console.log('\n\nesta es persona ' + persona + ' \n\n')
						return utils.generarUsuarioConCorreo(resultado2.PersonaId, res , 'se agrego el tipo a esa persona', 'algo paso', resultado2  );
						//return respuestas.okCreate(res, 'se agrego el tipo a esa persona', resultado2);

					}).catch(error2 => {
						return respuestas.error(res, 'Usuario con esa cédula ya existe', '', error2);
					});


				}).catch( error => {
					return respuestas.error(res, 'algo sucedio', '', error2);
				});

			})
		}
	})
}

const obtenerTablaPersonal = (req, res, next) => {
    modelo.Persona.findAll({
        include: [{
            model: modelo.Rol,
            where: {
                nombre: 'Personal'
            }
        }]
    }).then(personal => {
        console.log(personal);
        return respuestas.okGet(res, 'aqui esta todo el staff del personal', personal);

    }).catch(error => {
        console.log(error);
        return respuestas.error(res, 'algo sucedio', '', error);
    })
}

const obtenerPersonalIndependiente = (req, res, next) => {
    modelo.Persona.find({
        where: {
            id: req.params.id
        }
    }).then(personal => {
        console.log('este es personal ' + personal);
        return respuestas.okGet(res, 'personal puesto correctamente', personal);
    }).catch(error => {
        console.log('este es un error ' + error);
        return respuestas.error(res, 'hubo un problema', '', error);
    })
}

const eliminarPersonal = (req, res, next) => {
    var id = req.params.id;
    //probablemente en benefactor despues habra que ver
    //tomar en cuenta el trabajo : 'personal procare'
    modelo.Procariano.count({
        where: {
            PersonaId: id
        }
    }).then(contador => {
        if (contador > 0) { //solo le quito el rol
            modelo.PersonaRol.update({
                fechaFin: new Date()
            }, {
                where: {
                    PersonaId: id,
                    RolNombre: 'Personal'
                }
            }).then(respuesta => {
                console.log(respuesta);
                return respuestas.okDelete(res, 'se quito esta persona como parte del personal de la fundación', respuesta);
            }).error(error => {
                return respuestas.errorDelete(res, 'un problema ocurrio', error);
            })
        } else { //destruyo a esa persona
            modelo.Persona.destroy({
                where: {
                    id: id
                }
            }).then(respuesta => {
                console.log(respuesta);
                return respuestas.okDelete(res, 'se elimino esta persona como parte de la fundación', respuesta);
            }).error(error => {
                return respuestas.errorDelete(res, 'un problema ocurrio', error);
            })
        }
    })
}


const editarPersonal = (req, res, next) => {
    console.log('entra aqui')
    console.log(req.params);
    let id = req.params.id;
    let fechaNacimiento = '';
    if (req.body.fechaNacimiento == '') {
        fechaNacimiento = null;
    } else {
        fechaNacimiento = new Date(req.body.fechaNacimiento);
    }
    let persona = {
        cedula: req.body.cedula,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        fechaNacimiento: fechaNacimiento,
        genero: req.body.genero,
        contrasenna: req.body.contrasenna,
        email: req.body.email,
        celular: req.body.celular,
        convencional: req.body.convencional,
        tipo: req.body.tipo
    };
    modelo.Persona.update({
        cedula: req.body.cedula,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        fechaNacimiento: fechaNacimiento,
        genero: req.body.genero,
        contrasenna: req.body.contrasenna,
        email: req.body.email,
        celular: req.body.celular,
        convencional: req.body.convencional,
        tipo: req.body.tipo
    }, {
        where: {
            id: id
        }
    }).then(respuesta => {
        return respuestas.okUpdate(res, 'se pudo actualizar correctamente', respuesta);

    }).catch(error => {
        return respuestas.error(res, 'hubo un problema', '', error);
    })
}

module.exports = {
    obtenerTablaPersonal,
    crearPersonal,
    obtenerPersonalIndependiente,
    editarPersonal,
    eliminarPersonal
}