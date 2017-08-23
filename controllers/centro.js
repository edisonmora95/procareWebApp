/*
@Descripcion: Creacion de Centro.
@Autor: Jose Alcivar Garcia
@FechaCreacion: 17/06/2017
@UltimaFechaModificacion: 12/08/2017 @erialper Errores de tabla
*/

var modelo = require('../models');

const crearCentro = (req, res, next) => {
  estado = 'activo';
  modelo.Centro.create({
    nombreCentro : req.body.nombreCentro,
    direccion : req.body.direccion,
    estado: estado,
    directorCentro : req.body.directorCentro,
    directorTelefono : req.body.directorTelefono,
    convenio: req.body.convenio,
    observacion : req.body.observacion
  }).then( repuesta => {
    var status = true;
    var mensaje = 'se pudo crear correctamente'
    var jsonRespuesta = {
      status : status,
      mensaje : mensaje,
      sequelizeStatus : repuesta
    }
    res.json(jsonRespuesta)
  }).catch( error => {
    var status = false;
    var mensaje = 'no se pudo crear'
    var jsonRespuesta = {
      status : status,
      mensaje : mensaje,
      sequelizeStatus : error
    }
    res.json(jsonRespuesta);
  });
}

const eliminarCentro = (req, res, next) => {
  estado = 'inactivo';
  idCentro = req.params.id;
  modelo.Centro.update({
    estado : estado
  },{
    where:{
      id: idCentro
    }
  }).then( repuesta => {
    var status = true;
    var mensaje = 'se pudo eliminar correctamente'
    var jsonRespuesta = {
      status : status,
      mensaje : mensaje,
      sequelizeStatus : repuesta
    }
    res.json(jsonRespuesta)
  }).catch( error => {
    var json1 = {
      status : false,
      mensaje: 'No se puede eliminar la Centro',
      error : error
      }
    res.send(json1);
  });
}

const editarCentro = (req, res, next) => {
  modelo.Centro.update({
    nombreCentro : req.body.nombreCentro,
    direccion : req.body.direccion,
    estado: req.body.estado,
    directorCentro : req.body.directorCentro,
    directorTelefono : req.body.directorTelefono,
    convenio: req.body.convenio,
    observacion : req.body.observacion
  },{
    where:{
      id: req.params.id
    }
  }).then( repuesta => {
    var status = true;
    var mensaje = 'se pudo editar correctamente'
    var jsonRespuesta = {
      status : status,
      mensaje : mensaje,
      sequelizeStatus : repuesta
    }
    res.json(jsonRespuesta)
  }).catch( error => {
    var status = false;
    var mensaje = 'no se pudo eliminar'
    var jsonRespuesta = {
      status : status,
      mensaje : mensaje,
      sequelizeStatus : error
    }
    res.json(jsonRespuesta);
  });
}

module.exports = {
  crearCentro,
  eliminarCentro,
  editarCentro
}