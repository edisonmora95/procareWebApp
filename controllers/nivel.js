/*
@Descripcion: Creacion de Nivel.
@Autor: Jose Alcivar Garcia
@FechaCreacion: 17/06/2017
@UltimaFechaModificacion: 17/06/2017 @josealcivar
*/

var modelo = require('../models');

const crearNivel = (req, res, next) => {

  estado = 'activo';

  modelo.Nivel.create({
    nombre : req.body.nombre,
    programa : req.body.programa,
    estado: req.body.estado
    
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

const eliminarNivel = (req, res, next) => {
   estado = 'inactivo';
   idNivel = req.params.id;
   modelo.Nivel.update({
    
    estado : estado

  },{
    where:{
      id: idNivel
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
      mensaje: 'No se puede eliminar la Nivel',
      error : error
      }
    res.send(json1);
  });
}

const editarNivel = (req, res, next) => {
  modelo.Nivel.update({
    
     nombre : req.body.nombre,
     programa : req.body.programa

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
const mostrarNivelPorUsuario = (req, res, next) =>{
  idNivel = req.params.id;
  modelo.Nivel.findAll({
      //include: [{
       //   model: modelo.Persona
     // }],
      where : {
        idNivel : idNivel, 
        estado : "activo"
      } 

  }).then( nivels => {
    console.log(nivels);
    const respuesta = nivels.map( nivel => {

      return Object.assign(
        {},
        {
          
          id : nivel.id,
         // idUser : centro.Persona.id,
          name : nivel.nombre,
          program : nivel.programa,
          type : "nivel"
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

const mostrarNivels = (req, res, next) =>{
    modelo.Nivel.findAll({
     // include: [{
     //     model: modelo.Persona
   //   }],
      where : {
        estado : "activo"
      } 

  }).then( nivels => {
    console.log(nivels);
    const respuesta = nivels.map( nivel => {

      return Object.assign(
        {},
        {
           id : nivel.id,
         // idUser : centro.Persona.id,
          name : nivel.nombre,
          program: nivel.programa, 
          type : "nivel"
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
  crearNivel,
  eliminarNivel,
  editarNivel,
  mostrarNivelPorUsuario,
  mostrarNivels
}