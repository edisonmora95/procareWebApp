/*
@Descripcion: Creacion de Donacion.
@Autor: Jose Alcivar Garcia
@FechaCreacion: 21/06/2017
@UltimaFechaModificacion: 12/08/2017 @erialper errores de comunicación con el modelo
*/

var modelo = require('../models');

const crearDonacion = (req, res, next) => {
  modelo.Donacion.create({
    id_benefactor : req.body.id_benefactor,
    cantidad_donada : req.body.cantidad_donada,
    fecha_donacion : req.body.fecha_donacion,
    observacion : req.body.observacion,
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

const eliminarDonacion = (req, res, next) => {   
  modelo.Donacion.destroy({
    where:{
      id: req.params.id
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
      mensaje: 'No se puede eliminar la Tarea',
      error : error
      }
    res.send(json1);
  });
}

const editarDonacion = (req, res, next) => {
  modelo.Donacion.update({
    id_benefactor : req.body.id_benefactor,
    cantidad_donada : req.body.cantidad_donada,
    fecha_donacion : req.body.fecha_donacion,
    observacion : req.body.observacion,
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

const mostrarDonacion = (req,res,next) =>{
  modelo.Donacion.findAll({

  }).then( repuesta => {
    var status = true;
    var mensaje = 'se pudo actualizar correctamente'
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
  crearDonacion,
  eliminarDonacion,
  editarDonacion,
  mostrarDonacion
}