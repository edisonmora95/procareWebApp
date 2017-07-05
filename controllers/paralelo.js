/*
@Descripcion: Creacion de Donacion.
@Autor: Jose Alcivar Garcia
@FechaCreacion: 21/06/2017
@UltimaFechaModificacion: 21/06/2017 @josealcivar
*/

var modelo = require('../models');

const CrearParalelo = (req, res, next) => {

  estado = 'activo';

  modelo.Paralelo.create({
    nombre : req.body.nombre,
    cantidadNinios : req.body.cantidadNinios,
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

const eliminarParalelo = (req, res, next) => {
   estado = 'inactivo';
   modelo.Paralelo.update({
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

const editarParalelo = (req, res, next) => {
  modelo.Paralelo.update({

    id_benefactor : req.body.id_benefactor,
    cantidad_donada : req.body.cantidad_donada

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

const mostrarParalelo = (req,res,next) =>{
  modelo.Paralelo.findAll({

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
  CrearParalelo,
  eliminarParalelo,
  editarParalelo,
  mostrarParalelo
}
