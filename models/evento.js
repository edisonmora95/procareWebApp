/*
@Descripcion: Modelo Evento, relacionado con Persona quien va quedar encargado del evento
@Autor: jose alcivar
@FechaCreacion: 16/06/2017
@UltimaFechaModificacion: --
*/
'use strict';

const errors = require('../utils/errors');

module.exports = function(sequelize, DataTypes) {
  let Evento = sequelize.define('Evento', {
    nombre: {
      type     : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          msg : 'El campo "Nombre" no puede estar vacío'
        },
        not     : {
          args : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Nombre"'
        }
      }
    },
   fechaInicio: {
      type        : DataTypes.DATE, //YYY-MM-DD HH:MM:SS
      allowNull   : false,
      defaultValue: sequelize.NOW,
      validate    : {
        notEmpty : {
          msg  : 'El campo "Fecha de inicio" no puede estar vacío'
        },
        isDate   : {
          msg  : 'El campo "Fecha de inicio" debe estar en formato Date'
        },
        isAfter(value){
          const fechaIngresada = new Date(value);
          const fechaActual    = new Date().setHours(0,0,0,0);
          if( fechaActual > fechaIngresada.getTime() ){
            throw new Error('No puede ingresar una fecha de inicio que ya pasó');
          }
        }
      }
    },
    fechaFin: {
      type        : DataTypes.DATE, //YYY-MM-DD HH:MM:SS
      allowNull   : true,
      validate    : {
        isDate   : {
          msg  : 'El campo "Fecha fin" debe estar en formato Date'
        },
        isAfter(value){
          const fechaIngresada = new Date(value);
          const fechaActual    = new Date().setHours(0,0,0,0);
          if( fechaActual > fechaIngresada.getTime() ){
            throw new Error('No puede ingresar una fecha fin que ya pasó');
          }
        }
      }
    },
    descripcion: {
      type      : DataTypes.TEXT,
      allowNull : false,
      validate  : {
        notEmpty  : {
          msg     : 'El campo "Descripción" no puede estar vacío'
        },
        not : {
          args : /[`~,<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Descripción"'
        }
      }
    },
    lugar: {
      type      : DataTypes.TEXT,
      allowNull : false,
      validate  : {
        notEmpty  : {
          msg     : 'El campo "Lugar" no puede estar vacío'
        },
        not : {
          args : /[`~,<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Lugar"'
        }
      }
    },
    gastos: {
        type: DataTypes.DECIMAL(10, 2)
    },
    ingresos: {
        type: DataTypes.DECIMAL(10, 2)
    },
    estado: {
      type     : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: 'El campo "Estado" no puede estar vacío'
        },
        isNumeric: {
          msg: 'El campo "Estado" debe ser número'
        },
        isIn: {
          args: [  [1, 2, 3] ], //Pendiente, En proceso, Completada
          msg: 'El campo "Estado" debe ser 1, 2 ó 3'
        }
      }
    },
    tipo: {
      type: DataTypes.STRING,
      defaultValue: 'evento'
    }
  }, 
  {
    classMethods: {
      associate: function(models) {
        Evento.belongsTo(models.Persona, { foreignKey: 'idOrganizador' });
      },
      crearEventoP(evento){
        return new Promise( (resolve, reject) => {
          if( !evento.responsable )    return reject( errors.SEQUELIZE_FK_ERROR('Debe enviar el id del organizador') );
          if( evento.responsable < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('El id del organizador debe ser mayor a 0') );
          return this.create({
            idOrganizador : evento.responsable,
            nombre        : evento.nombre,
            fechaInicio   : evento.fechaInicio,
            fechaFin      : evento.fechaFin,
            descripcion   : evento.descripcion,
            lugar         : evento.lugar,
            gastos        : evento.gastos,
            ingresos      : evento.ingresos,
            estado        : evento.estado,
            tipo          : 'evento'
          })
          .then( evento => {
            return resolve(evento);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      obtenerTodosLosEventosP(){
        const Persona = sequelize.import("../models/persona");
        return new Promise( (resolve, reject) => {
          return this.findAll({
            include : [
              {
                model : Persona
              }
            ]
          })
          .then( eventos => {
            return resolve(eventos);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      obtenerEventosDeUsuarioP(idOrganizador){
        const Persona = sequelize.import("../models/persona");
        return new Promise( (resolve, reject) => {
          if( !idOrganizador )    return reject( errors.SEQUELIZE_FK_ERROR('Debe enviar el id del organizador') );
          if( idOrganizador < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('El id del organizador debe ser mayor a 0') );
          return this.findAll({
            include : [
              {
                model : Persona
              }
            ],
            where : {
              idOrganizador : idOrganizador
            }
          })
          .then( eventos => {
            return resolve(eventos);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      eliminarEventoT(idEvento, transaction){
        return new Promise((resolve, reject) => {
          if( !idEvento )    return reject( errors.SEQUELIZE_FK_ERROR('Debe enviar el id del evento') );
          if( idEvento < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('El id del evento debe ser mayor a 0') );
          return this.destroy({
            where : {
              id : idEvento
            },
            transaction : transaction
          })
          .then( rows => {
            if( rows == 0 ) return reject( errors.SEQUELIZE_ERROR('No se encontró evento con el id indicado', 'Delete error'));
            if( rows < 0 )  return reject( errors.SEQUELIZE_ERROR('Error al eliminar', 'Delete error'));
            if( rows == 1 ) return resolve(rows);
            if( rows > 1 )  return reject( errors.SEQUELIZE_ERROR('Se encontró más de un registro. No se puede eliminar', 'Delete error'))
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      cambiarEstadoP: function(idEvento, estadoNuevo){
        return new Promise( (resolve, reject) => {
          if( !idEvento )    return reject( errors.SEQUELIZE_FK_ERROR('Debe enviar el id del evento') );
          if( idEvento < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('El id del evento debe ser mayor a 0') );
          return this.update({
            estado: estadoNuevo
          }, {
            where : { id : idEvento }
          })
          .then( resultado => {
            return resolve(resultado);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      }
    }
  });
  return Evento;
};