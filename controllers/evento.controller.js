/*
  @Descripcion: CRUD de Eventos.
  @Autor: Jose Alcivar Garcia
  @FechaCreacion: 17/06/2017
  @UltimaFechaModificacion: 17/06/2017 @josealcivar
*/
'use strict';

const ModeloEvento = require('../models').Evento;
const respuesta    = require('../utils/respuestas');
let co            = require('co');
let sequelize     = require('../models/').sequelize;

var modelo = require('../models');

/*
  @Autor: Jose Alcivar
  @Descripción:
    * Crea el registro de evento
  @ÚltimaModificación:
    17/11/2017 @edisonmora95  Cambiado a Promesas
    24/02/2018 @edisonmora95  Modificada respuesta
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
    return respuesta.okCreate(res, 'Evento creado correctamente', datos.get('id'));
  })
  .catch( fail => {
    return respuesta.ERROR_SERVIDOR(res, fail);
  });
}

/*
  @Autor: Jose Alcivar
  @Descripción:
    * Elimina el registro de evento
  @ÚltimaModificación:
    17/11/2017  @edisonmora95 Cambiado a Promesas
    24/02/2018  @edisonmora95 Modificado orden de funciones
*/
const eliminarEvento = (req, res, next) => {
  const idEvento = req.params.id;
  inicializarTransaccion()
  .then( t => {
    ModeloEvento.eliminarEventoT(idEvento, t)
    .then( resultado => {
      t.commit();
      return respuesta.okDelete(res, 'Evento eliminado correctamente', resultado);
    })
     .catch( fail => {
      return respuesta.ERROR_SERVIDOR(res, fail);
    });
  })
  .catch( fail => {
    return respuesta.ERROR_SERVIDOR(res, fail);
  });
}

const editarEvento = (req, res, next) => {
  ModeloEvento.update({
    
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

/*
  @UltimaModificacion:
    24/02/2018  @edisonmora95 Modificado formato de respuesta
*/
const mostrarEventosPorUsuario = (req, res) => {
  const idOrganizador = req.params.id;
  ModeloEvento.obtenerEventosDeUsuarioP(idOrganizador)
  .then( eventos => {
    const datos = eventos.map(evento => {
      return Object.assign({}, {
        id          : evento.id,
        idUser      : evento.get('Persona').get('id'),
        title       : evento.nombre,
        user        : evento.get('Persona').get('nombres') + " " + evento.get('Persona').get('apellidos') ,
        start       : evento.fechaInicio,
        end         : evento.fechaFin,
        description : evento.descripcion, 
        type        : "evento"
      });
    });
    return respuesta.okGet(res, 'Búsqueda exitosa', datos);
  })
 .catch( fail => {
    return respuesta.ERROR_SERVIDOR(res, fail);
  });
};

/*
  @UltimaModificacion:
    24/02/2018  @edisonmora95 Modificado formato de respuesta
*/
const mostrarEventos = (req,res,next) =>{
  ModeloEvento.obtenerTodosLosEventosP()
  .then( eventos => {
    const datos = eventos.map(evento => {
      return Object.assign({}, {
        id          : evento.id,
        idUser      : evento.get('Persona').get('id'),
        title       : evento.nombre,
        user        : evento.get('Persona').get('nombres') + " " + evento.get('Persona').get('apellidos') ,
        start       : evento.fechaInicio,
        end         : evento.fechaFin,
        description : evento.descripcion, 
        type        : "evento"
      });
    });
    return respuesta.okGet(res, 'Búsqueda exitosa', datos);
  })
  .catch( fail => {
    return respuesta.ERROR_SERVIDOR(res, fail);
  });
};


const cambiarEstado = (req, res, next) => {
  const idEvento    = req.params.id;
  const estadoNuevo = req.body.estadoNuevo;

  ModeloEvento.cambiarEstadoP(idEvento, estadoNuevo)
  .then( success => {
    return respuesta.okUpdate(res, 'Evento cambiado de estado', success);  
  })
  .catch( fail => {
    return respuesta.ERROR_SERVIDOR(res, fail);
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