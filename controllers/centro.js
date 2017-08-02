/*
@Descripcion: Creacion de Centro.
@Autor: Jose Alcivar Garcia
@FechaCreacion: 17/06/2017
@UltimaFechaModificacion: 17/06/2017 @josealcivar
*/

var modelo = require('../models');

const crearCentro = (req, res, next) => {

  estado = 'activo';

  modelo.Tarea.create({
    nombreCentro : req.body.nombreCentro,
    direccion : req.body.direccion,
    estado: req.body.estado,
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
const mostrarCentroPorUsuario = (req, res, next) =>{
  idCentro = req.params.id;
  modelo.Tarea.findAll({
      //include: [{
       //   model: modelo.Persona
     // }],
      where : {
        idCentro : idCentro, 
        estado : "activo"
      } 

  }).then( centros => {
    console.log(centros);
    const respuesta = centros.map( centro => {

      return Object.assign(
        {},
        {
          
          id : centro.id,
         // idUser : centro.Persona.id,
          name : centro.nombreCentro,
          director : centro.directorCentro,
          telefono : centro.directorTelefono ,
          convenio : centro.convenio ,
          observacion : centro.observacion, 
          type : "centro"
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

const mostrarCentros = (req, res, next) =>{
    modelo.Centro.findAll({
      include: [{
          model: modelo.Persona
      }],
      where : {
        estado : "activo"
      } 

  }).then( centros => {
    console.log(centros);
    const respuesta = centros.map( tarea => {

      return Object.assign(
        {},
        {
           id : centro.id,
         // idUser : centro.Persona.id,
          name : centro.nombreCentro,
          director : centro.directorCentro,
          telefono : centro.directorTelefono ,
          convenio : centro.convenio ,
          observacion : centro.observacion, 
          type : "centro"
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

module.exports = {
  crearCentro,
  eliminarCentro,
  editarCentro,
  mostrarCentroPorUsuario,
  mostrarCentros
}