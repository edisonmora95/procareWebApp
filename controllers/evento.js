/*
@Descripcion: CRUD de Eventos.
@Autor: Jose Alcivar Garcia
@FechaCreacion: 17/06/2017
@UltimaFechaModificacion: 17/06/2017 @josealcivar
*/

var modelo = require('../models');

const crearEvento = (req, res, next) => {

  estado = 'activo';

  modelo.Evento.create({
    id_organizador : req.body.id_organiador,
    nombre : req.body.nombre,
    fecha : req.body.fecha,
    descripcion : req.body.descripcion,
    lugar : req.body.lugar,
    gastos: req.body.gastos,
    ingresos : req.body.ingresos,
    estado : req.body.estado
    
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

const eliminarEvento = (req, res, next) => {
   estado = 'inactivo';
   modelo.Evento.update({
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
      mensaje: 'No se puede eliminar la Evento',
      error : error
      }
    res.send(json1);
  });
}

const editarEvento = (req, res, next) => {
  modelo.Evento.update({
    
     id_organizador : req.body.id_organiador,
    nombre : req.body.nombre,
    fecha : req.body.fecha,
    descripcion : req.body.descripcion,
    lugar : req.body.lugar,
    gastos: req.body.gastos,
    ingresos : req.body.ingresos,
    estado : req.body.estado

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

const mostrarEvento = (req,res,next) =>{
  modelo.Evento.findAll({

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
  crearEvento,
  eliminarEvento,
  editarEvento,
  mostrarEvento
}