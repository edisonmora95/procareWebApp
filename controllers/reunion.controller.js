/*
@Descripcion: Controlador paro las asistencias de Procare Formación.
@Autor: Erick Pérez
@FechaCreacion: 18/08/2017
@UltimaFechaModificacion: ---
*/
var modelo = require('../models');
var respuestas = require('../utils/respuestas.js')

module.exports.crearReunion = (req, res, next) => {
    if (req.body.fecha == '') {
        var fecha = null;
    } else {
        var fecha = new Date(req.body.fecha);
    }
    var grupoId = req.body.grupoId;
    var fecha = req.body.fecha;
    var horaInicio = null;
    var horaSalida = null;
    var descripcion = 'Procare Formación';
    modelo.Reunion.create({
        fecha: fecha,
        horaInincio: horaInicio,
        horaSalida: horaSalida,
        descripcion: descripcion,
        GrupoId: grupoId
    }).then(reunion => {
        return respuestas.okCreate(res, 'Se inicio la reunion', reunion);
    }).catch(error => {
        return respuestas.error(res, 'No se pudo crear la reunion', '', error);
    });
}

module.exports.anadirProcarianosAReunion = (req, res, next) => {
    let array = JSON.parse(req.body.ausentes.toString());
    modelo.ProcarianoReunion.bulkCreate(array)
        .then(() => {
            return modelo.ProcarianoReunion.findAll();
        }).then(pR => {
            console.log('Exito al ingresar')
            var jsonRespuesta = {
                status: true,
                mensaje: 'Éxito al ingresar',
                sequelizeStatus: pR
            }
            res.json(jsonRespuesta)
        }).catch(errorIngresar => {
            console.log('ERROR AL INGRESAR')
            var jsonRespuesta = {
                status: false,
                mensaje: 'ERROR AL INGRESAR',
                sequelizeStatus: errorIngresar
            }
            res.json(jsonRespuesta);
        }).catch(errorBuscar => {
            console.log('ERROR AL BUSCAR')
            var jsonRespuesta = {
                status: false,
                mensaje: 'ERROR AL BUSCAR',
                sequelizeStatus: errorBuscar
            }
            res.json(jsonRespuesta);
        });
}

module.exports.obtenerReuniones = (req, res, next) => {
    modelo.Reunion.findAll({

    }).then(reuniones => {
        return respuesta.okGet(res, 'Se obtuvieron las reuniones', reuniones);
    }).catch(error => {
        return respuesta.error(res, 'No se pudieron obtener las reuniones', '', error);
    })
}

module.exports.obtenerReunionPorId = (req, res, next) => {
    modelo.Reunion.findOne({
        where: {
            id: req.params.id
        }
    }).then(reunion => {

        idGrupo: reunion.get('GrupoId')
        modelo.Procariano.obtenerProcarianosDeGrupo(idGrupo, (procarianos) => {

            modelo.ProcarianoReunion.findAll({
                where: {
                    ReunionId: req.params.id,
                    GrupoId: idGrupo
                }
            }).then(ausentes => {
                let datos = {
                    reunion: reunion,
                    procariano: procariano,
                    ausentes: ausentes
                };
                return respuesta.okGet(res, 'Grupo creado exitosamente', datos);
            }).catch(errorAusentes => {
                return respuesta.error(res, 'No se pudieron obtener la reunion', '', errorAusentes);
            })

        }, (errorProcarianos) => {
            return respuesta.error(res, 'No se pudieron obtener la reunion', '', errorProcarianos);
        })

    }).catch(errorBuscarReunion => {
        return respuesta.error(res, 'No se pudieron obtener la reunion', '', errorBuscarReunion);
    })
}

module.exports.eliminarReunion = (req, res, next) => {
    var id = req.params.id;
    modelo.ProcarianoReunion.destroy({
        where: {
            ReunionId: id
        }
    }).then(borrarAusentes => {

        modelo.Reunion.destroy({
            where: {
                id: id
            }
        }).then(borrarReunion => {
            let datos = {
                reunion: borrarReunion,
                ausentes: borrarAusentes
            };
            return respuesta.okDelete(res, 'Eliminado exitosamente', datos);
        }).catch(errorReunion => {
            return respuestas.errorDelete(res, 'un problema ocurrio', errorReunion);
        });

    }).catch(errorAusentes => {
        return respuestas.errorDelete(res, 'un problema ocurrio', errorAusentes);
    });
}