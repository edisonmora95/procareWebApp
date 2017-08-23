/*
@Descripcion: Creacion de Nivel.
@Autor: Jose Alcivar Garcia
@FechaCreacion: 17/06/2017
@UltimaFechaModificacion: 17/06/2017 @josealcivar
*/

var modelo = require('../models');

const crearNivel = (req, res, next) => {
    modelo.Nivel.create({
        nombre: req.body.nombre,
        programa: "",
        estado: req.body.estado

    }).then(repuesta => {
        var status = true;
        var mensaje = 'se pudo crear correctamente'
        var jsonRespuesta = {
            status: status,
            mensaje: mensaje,
            sequelizeStatus: repuesta
        }
        res.json(jsonRespuesta)
    }).catch(error => {
        var status = false;
        var mensaje = 'no se pudo crear'
        var jsonRespuesta = {
            status: status,
            mensaje: mensaje,
            sequelizeStatus: error
        }
        res.json(jsonRespuesta);
    });
}

const eliminarNivel = (req, res, next) => {
    idNivel = req.params.id;
    modelo.Nivel.destroy({
        where: {
            id: idNivel
        }
    }).then(repuesta => {
        var status = true;
        var mensaje = 'se pudo eliminar correctamente'
        var jsonRespuesta = {
            status: status,
            mensaje: mensaje,
            sequelizeStatus: repuesta
        }
        res.json(jsonRespuesta)
    }).catch(error => {
        var json1 = {
            status: false,
            mensaje: 'No se puede eliminar la Nivel',
            error: error
        }
        res.send(json1);
    });
}

const editarNivel = (req, res, next) => {
    modelo.Nivel.update({
        nombre: req.body.nombre,
        programa: ""
    }, {
        where: {
            id: req.params.id
        }
    }).then(repuesta => {
        var status = true;
        var mensaje = 'se pudo editar correctamente'
        var jsonRespuesta = {
            status: status,
            mensaje: mensaje,
            sequelizeStatus: repuesta
        }
        res.json(jsonRespuesta)
    }).catch(error => {
        var status = false;
        var mensaje = 'no se pudo eliminar'
        var jsonRespuesta = {
            status: status,
            mensaje: mensaje,
            sequelizeStatus: error
        }
        res.json(jsonRespuesta);
    });
}

const mostrarNiveles = (req, res, next) => {
    modelo.Nivel.findAll({

    }).then(nivels => {
        const respuesta = nivels.map(nivel => {
            return Object.assign({}, {
                id: nivel.id,
                name: nivel.nombre,
                program: nivel.programa,
            });
        });
        return res.json({
            status: true,
            sequelizeStatus: respuesta
        })
    }).catch(error => {
        var status = false;
        var mensaje = 'no se pudo eliminar'
        var jsonRespuesta = {
            status: status,
            mensaje: mensaje,
            sequelizeStatus: error
        }
        res.json(JSON.parse(jsonRespuesta));
    });
}

module.exports = {
    crearNivel,
    eliminarNivel,
    editarNivel,
    mostrarNiveles
}