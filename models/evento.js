/*
@Descripcion: Modelo Evento, relacionado con Persona quien va quedar encargado del evento
@Autor: jose alcivar
@FechaCreacion: 16/06/2017
@UltimaFechaModificacion: --
*/
'use strict';
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
        isAfter  : function(value){
          const fechaIngresada = value;
          const fechaActual    = new Date().setHours(0,0,0,0);
          if( fechaActual > new Date(fechaIngresada).getTime() ){
            return false;
          }
          return true;
        }
      }
    },
    fechaFin: {
      type        : DataTypes.DATE, //YYY-MM-DD HH:MM:SS
      allowNull   : true,
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
          msg: 'El valor ingresado como estado no puede estar vacío.'
        },
        isNumeric: {
          msg: 'Debe ser número'
        },
        isIn: {
          args: [  [1, 2, 3] ], //Pendiente, En proceso, Completada
          msg: 'Debe ser un valor válido'
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
          .catch( error => {
            return reject(error);
          })
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
          .catch( error => {
            return reject(error);
          })
        });
      },
      obtenerEventosDeUsuarioP(idOrganizador){
        const Persona = sequelize.import("../models/persona");
        return new Promise( (resolve, reject) => {
          if( !idOrganizador )    return reject( new Error('Debe enviar el id del organizador') );
          if( idOrganizador < 0 ) return reject( new Error('El id debe ser mayor a 0') );
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
          .catch( error => {
            return reject(error);
          })
        });
      },
      obtenerTodosLosEventos: function(success, error) {
          this.findAll({}).then(success).catch(error);
      },
      eliminarEventoT(idEvento, transaction){
        return new Promise((resolve, reject) => {
          if( !idEvento )    return reject( new Error('Debe enviar el id del evento') );
          if( idEvento < 0 ) return reject( new Error('El id debe ser mayor a 0') );
          return this.destroy({
            where : {
              id : idEvento
            }
          },
          { 
            transaction : transaction 
          })
          .then( rows => {
            if( rows == 0 ) return reject( new Error('No se encontró evento con el id indicado'));
            if( rows < 0 )  return reject( new Error('Error al eliminar'));
            if( rows == 1 ) return resolve(rows);
            if( rows > 1 )  return reject( new Error('Se eliminó más de un evento'))
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      cambiarEstado: function(idEvento, estadoNuevo, success, error){
        this.update({
          estado: estadoNuevo
        }, {
          where: {
            id: idEvento
          }
        }).then(success).catch(error);
      }
    }
  });
  return Evento;
};