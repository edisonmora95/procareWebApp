/*
@Descripcion: Creacion de Donacion.
@Autor: Jose Alcivar Garcia
@FechaCreacion: 21/06/2017
@UltimaFechaModificacion: 21/06/2017 @josealcivar
*/

var modelo = require('../models');

const Donacion = (req, res, next) => {

  estado = 'activo';

  modelo.Donacion.create({
    id_responsable : req.body.nombre,
    nombre : req.body.nombre,
    fecha_publicacion : req.body.fecha_publicacion,
    fecha_limite : req.body.fecha_limite,
    prioridad : req.body.prioridad,
    estado: req.body.estado,
    descripcion : req.body.descripcion,
    categoria : req.body.categoria

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
   estado = 'inactivo';
   modelo.Donacion.update({
    {
      estado: req.body.estado
    }
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

     id_responsable : req.body.nombre,
    nombre : req.body.nombre,
    fecha_publicacion : req.body.fecha_publicacion,
    fecha_limite : req.body.fecha_limite,
    prioridad : req.body.prioridad,
    estado: req.body.estado,
    descripcion : req.body.descripcion,
    categoria : req.body.categoria

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
