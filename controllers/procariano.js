/*
@Descripcion: Clase controladora de todos los procarianos
@Autor: Jose Viteri
@FechaCreacion: 26/06/2017
@UltimaFechaModificacion: 07/06/2017 @JoseViteri (cambios detallados abajo)
*/


'use strict';


var modelo = require('../models');
var utils = require('../utils/utils')



/*
Autor : JV
Creado : 26/06/2017
Modificado: 07/07/2017
Por: JV , agregados campos convencional y fecha date

*/
const crearProcariano = (req, res, next) => {
        //formato fechas : YYYY-MM-DD

        console.log('REQ.BODY: ');
        console.log(req.body);


        /*
        Autor : JV
        Creado : 26/06/2017
        Modificado: 07/07/2017
        Por: JV , agregados campos convencional y fecha date
        */
        const crearProcariano = (req, res, next) => {
            //formato fechas : YYYY-MM-DD

            //console.log('REQ.BODY: ');
            //console.log(req.body);


            cedula = req.body.cedula;
            nombres = req.body.nombres;
            apellidos = req.body.apellidos;
            direccion = req.body.direccion;
            fechaNacimiento = new Date(req.body.fechaNacimiento);
            contrasenna = req.body.contrasenna;

            email = req.body.email;
            celular = req.body.celular;
            trabajo = req.body.trabajo;
            convencional = req.body.convencional;
            genero = req.body.genero;



            colegio = req.body.colegio;
            universidad = req.body.universidad;
            parroquia = req.body.parroquia;

            estado = 'activo';
            haceParticipacionEstudiantil = req.body.haceParticipacionEstudiantil;



            modelo.Persona.create({
                cedula: cedula,
                nombres: nombres,
                apellidos: apellidos,
                direccion: direccion,
                fechaNacimiento: fechaNacimiento,
                genero: genero,
                contrasenna: contrasenna,
                email: email,
                celular: celular,
                trabajo: trabajo,
                convencional: convencional


            }).then(persona => {


                console.log('S1')

                modelo.Procariano.create({
                    PersonaId: persona.get('id'),
                    colegio: colegio,
                    universidad: universidad,
                    parroquia: parroquia,
                    //fechaOrdenacion : fechaOrdenacion,
                    estado: estado,
                    haceParticipacionEstudiantil: haceParticipacionEstudiantil
                }).then(procariano => {


                    console.log('S2')


                    var status = true;
                    var json1 = {
                        status: status,
                        mensaje: 'Se pudo crear correctamente',
                        //para motivos de debug
                        persona: persona,
                        procariano: procariano
                    };

                    res.json(json1);
                }).catch(error2 => {

                    console.log('E2')

                    var json1 = {
                        status: false,
                        mensaje: 'No se pudo crear este procariano',
                        error: error2
                    }
                    res.send(json1);

                });
            }).catch(error => {
                var json1 = {
                    status: false,
                    mensaje: 'No se pudo crear esta persona',
                    error: error
                }
                res.send(json1);
            });
        }


        /*
        Autor : JV
        Creado : 28/05/2017
        Modificado: 07/07/2017
        Por : Jv , agregado meyodo generar JsonProcariano
        */

        const buscarProcariano = (req, res, next) => {

            var jsonModelo = utils.generarJsonProcariano(req.query);

            modelo.Procariano.findAll({
                include: [{
                    model: modelo.Persona,
                    where: jsonModelo.persona
                }],
                where: jsonModelo.procariano //aqui va el where

            }).then(procarianos => {
                const respuesta = procarianos.map(procariano => {

                    return Object.assign({}, {
                        personaId: procariano.Persona.id,
                        procarianoID: procariano.id,
                        colegio: procariano.colegio,
                        universidad: procariano.universidad,
                        parroquia: procariano.parroquia,
                        fechaOrdenacion: procariano.fecha_ordenacion,
                        haceParticipacionEstudiantil: procariano.hace_participacion_estudiantil,
                        cedula: procariano.Persona.cedula,
                        nombres: procariano.Persona.nombres,
                        apellidos: procariano.Persona.apellidos,
                        direccion: procariano.Persona.fechaNacimiento,
                        genero: procariano.Persona.genero,
                        fechaNacimiento: procariano.Persona.fechaNacimiento,
                        convencional: procariano.Persona.convencional,
                        celular: procariano.Persona.celular,
                        trabajo: procariano.Persona.trabajo,
                        email: procariano.Persona.email,
                        estado: procariano.estado
                    });
                });
                return res.json(respuesta);
            });

        };


        /*
        Autor : JV
        Creado : 28/05/2017
        Modificad8: 07/07/2017
        Por : JV , para que modifique por ID
        */

        const buscarProcarianoPorId = (req, res, next) => {
            //tener cuidado xq cualquiera podra ver este id
            var id = req.params.id;

            modelo.Procariano.findAll({
                include: [{
                    model: modelo.Persona,
                    where: {
                        id: id
                    }
                }],
                where: {
                    PersonaId: id
                }
            }).then(procarianos => {
                const respuesta = procarianos.map(procariano => {

                    return Object.assign({}, {
                        personaId: procariano.Persona.id,
                        procarianoID: procariano.id,
                        colegio: procariano.colegio,
                        universidad: procariano.universidad,
                        parroquia: procariano.parroquia,
                        fechaOrdenacion: procariano.fecha_ordenacion,
                        haceParticipacionEstudiantil: procariano.hace_participacion_estudiantil,
                        cedula: procariano.Persona.cedula,
                        nombres: procariano.Persona.nombres,
                        apellidos: procariano.Persona.apellidos,
                        direccion: procariano.Persona.direccion,
                        genero: procariano.Persona.genero,
                        fechaNacimiento: procariano.Persona.fechaNacimiento,
                        convencional: procariano.Persona.convencional,
                        celular: procariano.Persona.celular,
                        trabajo: procariano.Persona.trabajo,
                        email: procariano.Persona.email,
                        estado: procariano.estado
                    });
                });
                return res.json(respuesta);
            });
        };

        /*
        Autor : JV
        Creado : 28/05/2017
        Modificad8: 07/07/2017
        por : JV , agregado date a datos date
        */

        const editarProcariano = (req, res, next) => {
            console.log('REQ.BODY')
            console.log(req.body)
            var id = req.body.id;
            modelo.Persona.update({
                cedula: req.body.cedula,
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                direccion: req.body.direccion,
                fechaNacimiento: new Date(req.body.fechaNacimiento),
                genero: req.body.genero,
                email: req.body.email,
                celular: req.body.celular,
                trabajo: req.body.trabajo,
                convencional: req.body.convencional

            }, {
                where: {
                    id: id
                }
            }).then(result => {
                modelo.Procariano.update({
                    colegio: req.body.colegio,
                    universidad: req.body.universidad,
                    parroquia: req.body.parroquia,
                    //fechaOrdenacion : new Date(req.body.fechaOrdenacion),
                    haceParticipacionEstudiantil: req.body.haceParticipacionEstudiantil
                }, {
                    where: {
                        PersonaId: id
                    }
                }).then(result2 => {
                    var status = true;
                    var mensaje = 'se pudo actualizar correctamente'
                    var jsonRespuesta = {
                        status: status,
                        mensaje: mensaje,
                        sequelizeStatus: result2
                    }
                    res.json(jsonRespuesta)
                }).catch(err2 => {
                    var status = false;
                    var mensaje = 'no se pudo actualizar'
                    var jsonRespuesta = {
                        status: status,
                        mensaje: mensaje,
                        sequelizeStatus: err2
                    }
                    res.json(jsonRespuesta);
                });

            }).catch(err => {
                var status = false;
                var mensaje = 'no se pudo actualizar'
                var jsonRespuesta = {
                    status: status,
                    mensaje: mensaje,
                    sequelizeStatus: err
                }
                res.json(jsonRespuesta);
            });
        };

        /*
        Autor : JV
        Creado : 28/05/2017
        Modificad8: 07/07/2017
        por : JV , agregado date a datos date
        */

        const eliminarProcariano = (req, res, next) => {
            console.log('SE VA A ELIMINAR EL PROCARIANO');
            var id = req.params.id;
            console.log(id);
            modelo.Procariano.update({
                estado: 'inactivo'
            }, {
                where: {
                    PersonaId: id
                }
            }).then(result => {
                var status = true;
                var mensaje = 'eliminado correctamente'
                var jsonRespuesta = {
                    status: status,
                    mensaje: mensaje,
                    sequelizeStatus: result
                }
                res.json(jsonRespuesta);
            }).catch(err => {
                var status = false;
                var mensaje = 'no se pudo eliminar'
                var jsonRespuesta = {
                    status: status,
                    mensaje: mensaje,
                    sequelizeStatus: err
                }
                res.json(jsonRespuesta);
            });
        };




        module.exports = {
            crearProcariano,
            buscarProcariano,
            buscarProcarianoPorId,
            editarProcariano,
            eliminarProcariano
        };