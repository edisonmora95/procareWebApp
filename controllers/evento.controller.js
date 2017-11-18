/*
  @Descripcion: CRUD de Eventos.
  @Autor: Jose Alcivar Garcia
  @FechaCreacion: 17/06/2017
  @UltimaFechaModificacion: 17/06/2017 @josealcivar
*/
'use strict';

const ModeloEvento = require('../models').Evento;
let respuesta     = require('../utils/respuestas');
let co            = require('co');
let sequelize     = require('../models/').sequelize;

var modelo = require('../models');

/*
  @Autor: Jose Alcivar
  @Descripción:
    * Crea el registro de evento
  @ÚltimaModificación:
    17/11/2017 @edisonmora95 Cambiado a Promesas
*/
const crearEvento = (req, res, next) => {
  let fechaFin = null;
  if( req.body.fechaFin != '' ){
    fechaFin = req.body.fechaFin;
  }
  const evento = {
    responsable   : parseInt(req.body.responsable),
    nombre        : req.body.nombre,
    fechaInicio   : req.body.fechaInicio,
    fechaFin      : fechaFin,
    descripcion   : req.body.descripcion,
    lugar         : req.body.lugar,
    gastos        : req.body.gastos,
    ingresos      : req.body.ingresos,
    estado        : req.body.estado,
    tipo          : 'evento'
  };
  ModeloEvento.crearEventoP(evento)
  .then( datos => {
    let mensaje     = 'Evento creado correctamente';
    return respuesta.okCreate(res, mensaje, datos);
  })
  .catch( error => {
    const mensajeError = fail.errors[0].message;
    return respuesta.error(res, 'No se pudo crear el evento', mensajeError, fail);
  });
}

/*
  @Autor: Jose Alcivar
  @Descripción:
    * Elimina el registro de evento
  @ÚltimaModificación:
    17/11/2017 @edisonmora95 Cambiado a Promesas
*/
const eliminarEvento = (req, res, next) => {
  const idEvento = req.params.id;
  let mensaje   = 'Evento eliminado correctamente';
  co(function* (){
    let t = yield inicializarTransaccion();
    yield ModeloEvento.eliminarEventoT(idEvento, t);
    t.commit();
    return respuesta.okDelete(res, mensaje, null);
  })
  .catch(error => {
    const mensajeError = error.errors[0].message;
    return respuesta.error(res, 'No se pudo eliminar el evento', mensajeError, error);
  });
}

const editarEvento = (req, res, next) => {
  modelo.Evento.update({
    
    idOrganizador : req.body.id_organiador,
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
};

const mostrarEventosPorUsuario = (req, res) => {
  const idOrganizador = req.params.id;
  ModeloEvento.obtenerEventosDeUsuarioP(idOrganizador)
  .then( eventos => {
    const datos = eventos.map(tarea => {
      return Object.assign({}, {
        id          : evento.id,
        idUser      : evento.Persona.id,
        title       : evento.titulo,
        user        : evento.Persona.nombres + " " + evento.Persona.apellidos ,
        start       : evento.fecha ,
        description : evento.descripcion, 
        type        : "evento"
      });
    });
    return respuesta.okGet(res, 'Búsqueda exitosa', datos);
  })
  .catch( error => {
    const mensajeError = error.errors[0].message;
    return respuesta.error(res, 'No se pudieron obtener los eventos', mensajeError, error);
  });
};

const mostrarEventos = (req,res,next) =>{
  ModeloEvento.obtenerTodosLosEventosP()
  .then( eventos => {
    const datos = eventos.map(tarea => {
      return Object.assign({}, {
        id          : evento.id,
        idUser      : evento.Persona.id,
        title       : evento.titulo,
        user        : evento.Persona.nombres + " " + evento.Persona.apellidos ,
        start       : evento.fecha ,
        description : evento.descripcion, 
        type        : "evento"
      });
    });
    return respuesta.okGet(res, 'Búsqueda exitosa', datos);
  })
  .catch( error => {
    const mensajeError = error.errors[0].message;
    return respuesta.error(res, 'No se pudieron obtener los eventos', mensajeError, error);
  });
};


const cambiarEstado = (req, res, next) => {
  const idEvento = req.params.id;
  const estadoNuevo = req.body.estadoNuevo;
  let Evento = modelo.Evento;

  Evento.cambiarEstado(idEvento, estadoNuevo, (success) => {
    
    const cantidadRegistrosCambiados = parseInt(success);

    if(cantidadRegistrosCambiados === 1){
      return respuesta.okUpdate(res, 'Evento cambiada de estado', success);  
    }else if( cantidadRegistrosCambiados > 1){
      return respuesta.error(res, 'Se cambió de estado a ' + success + ' tareas', '', success);
    }else if( cantidadRegistrosCambiados < 1){
      return respuesta.error(res, 'Error al intentar cambiar de estado', '', success);
    }

  }, (error) => {
    return respuesta.error(res, 'Error al intentar cambiar de estado', '', error);
  });

};

module.exports = {
  crearEvento,
  eliminarEvento,
  editarEvento,
  mostrarEventosPorUsuario,
  mostrarEventos,
  cambiarEstado
}

function inicializarTransaccion(){
  return new Promise( (resolve, reject) => {
    sequelize.transaction({
      autocommit: false,
    })
    .then( result => {
      return resolve(result);
    })
    .catch( fail => {
      return reject(fail);
    });
  });
}