/*
@Descripcion: Creacion de Tareas.
@Autor: Jose Alcivar Garcia
@FechaCreacion: 17/06/2017
@UltimaFechaModificacion: 17/06/2017 @josealcivar
*/

var modelo = require('../models');

const crearTarea = (req, res, next) => {

  estado = 'activo';

  modelo.Tarea.create({
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

const eliminarTarea = (req, res, next) => {
   estado = 'inactivo';
   idTarea = req.params.id;
   modelo.Tarea.update({
    
    estado : estado

  },{
    where:{
      id: idTarea
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

const editarTarea = (req, res, next) => {
  modelo.Tarea.update({
    
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
/*
const mostrarTarea = (req,res,next) =>{
  modelo.Tarea.findAll({

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
*/
const mostrarTareaPorUsuario = (req, res, next) =>{
  idUsuario = req.params.id;
  modelo.Tarea.findAll({
      include: [{
          model: modelo.Persona
      }],
      where : {
        idResponsable : idUsuario, 
        estado : "activo"
      } 

  }).then( tareas => {
    console.log(tareas);
    const respuesta = tareas.map( tarea => {

      return Object.assign(
        {},
        {
          id : tarea.id,
          idUser : tarea.Persona.id,
          title : tarea.titulo,
          user : tarea.Persona.nombres + " " + tarea.Persona.apellidos ,
          start : tarea.fecha_publicacion ,
          end : tarea.fecha_limite ,
          description : tarea.descripcion, 
          type : "tarea"
        });
    });
    return res.json({
      status : true,
      sequelizeStatus : respuesta
    })
  }).catch( error => {
    var status = false;
    var mensaje = 'no se pudo eliminar'
    var jsonRespuesta = {
      status : status,
      mensaje : mensaje,
      sequelizeStatus : error
    }
    res.json(JSON.parse(jsonRespuesta));
  });
}

const mostrarTareas = (req, res, next) =>{
    modelo.Tarea.findAll({
      include: [{
          model: modelo.Persona
      }],
      where : {
        estado : "activo"
      } 

  }).then( tareas => {
    console.log(tareas);
    const respuesta = tareas.map( tarea => {

      return Object.assign(
        {},
        {
          id : tarea.id,
          idUser : tarea.Persona.id,
          title : tarea.titulo,
          user : tarea.Persona.nombres + " " + tarea.Persona.apellidos ,
          start : tarea.fecha_publicacion ,
          end : tarea.fecha_limite ,
          description : tarea.descripcion, 
          type : "tarea"
        });
    });
    return res.json({
      status : true,
      sequelizeStatus : respuesta
    })
  }).catch( error => {
    var jsonRespuesta = {
      status : false,
      mensaje :'no se pudo eliminar',
      sequelizeStatus : error
    }
    res.json(JSON.parse(jsonRespuesta));
  });
}

module.exports = {
  crearTarea,
  eliminarTarea,
  editarTarea,
  mostrarTareaPorUsuario,
  mostrarTareas
}