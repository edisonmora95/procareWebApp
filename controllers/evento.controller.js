/*
@Descripcion: CRUD de Eventos.
@Autor: Jose Alcivar Garcia
@FechaCreacion: 17/06/2017
@UltimaFechaModificacion: 17/06/2017 @josealcivar
*/

var modelo = require('../models');

const crearEvento = (req, res, next) => {
  let fechaInicio = '';
  let fechaFin = '';
  //Validar fecha de inicio
  if(req.body.fechaInicio === ''){
     fechaInicio = null;
  }else{
     fechaInicio = req.body.fechaInicio;
  }
  //Validar fecha de fin
  if(req.body.fechaFin === ''){
     fechaFin = null;
  }else{
     fechaFin = req.body.fechaFin;
  }

  modelo.Evento.create({
    idOrganizador : req.body.id_organiador,
    nombre : req.body.nombre,
    fechaInicio : fechaInicio,
    fechaFin : fechaFin,
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
    
    estado : estado

  },{
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
}

const mostrarEventos = (req,res,next) =>{
  modelo.Evento.findAll({
    include: [{
      model: modelo.Persona
    }],
    where : {
      estado : "activo"
    }

  }).then( respuesta => {
    var status = true;
    var mensaje = 'se pueden mostrar correctamente'
    const respuesta2 = respuesta.map( evento => {

      return Object.assign(
        {},
        {
          id : evento.id,
          idUser : evento.Persona.id,
          title : evento.titulo,
          user :evento.Persona.nombres + " " + evento.Persona.apellidos ,
          start : evento.fecha ,
          description : evento.descripcion, 
          type : "evento"
        });
    });
     return res.json({
      status : true,
      mensaje : mensaje,
      sequelizeStatus : respuesta2
    })

  }).catch( error => {
    var status = false;
    var mensaje = 'no se puede mostrar'
    var jsonRespuesta = {
      status : status,
      mensaje : mensaje,
      sequelizeStatus : error
    }
    res.json(jsonRespuesta);
  });
}


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
  mostrarEventos,
  cambiarEstado
}