/*
@Descripcion: Modelo de procariano
@Autor: jose viteri
@FechaCreacion: 20/05/2017
@UltimaFechaModificacion: 03/06/2017 @JoseViteri
*/
'use strict';

const errors    = require('../utils/errors');
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  let Procariano = sequelize.define('Procariano', {
    colegio: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Colegio"'
        }
      }
    },
    universidad: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Universidad"'
        }
      }
    },
    parroquia: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Parroquia"'
        }
      }
    },
    fechaOrdenacion: {
      type      : DataTypes.DATE,
      allowNull : true
    },
    estado: {
      type      : DataTypes.STRING,
      allowNull : false,
      validate  : {
        notEmpty: {
          msg: 'Estado del grupo no puede estar vacío.'
        },
        isIn : {
          args  : [['activo', 'inactivo' ]],
          msg   : 'Valor ingresado de "estado" no es válido'
        }
      }
    },
    haceParticipacionEstudiantil: {
      type : DataTypes.BOOLEAN,
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Procariano.belongsTo(models.Persona);
        Procariano.hasMany(models.Ticket);
        Procariano.belongsToMany(models.Tipo, {through: 'ProcarianoTipo'});
        Procariano.belongsToMany(models.Grupo, {through: 'ProcarianoGrupo'});
        Procariano.belongsToMany(models.Reunion, {through: 'AsistenciaChico'});
      },
      ///////////////////////////////////////
      //FUNDIONES CON PROMESAS
      ///////////////////////////////////////
      /*
        @Descripción: Devuelve la información del procariano con el id de Procariano
        @Return: Promesa con info de Procariano y Persona
      */
      obtenerProcarianoPorIdP: function(idProcariano){
        const Persona = sequelize.import("../models/persona");
        return new Promise( (resolve, reject) => {
          if( !idProcariano )     return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del procariano') );
          if( idProcariano < 0 )  return reject( errors.SEQUELIZE_FK_ERROR('Id del procariano inválido') );
          return this.findOne({
            where: {
              id: idProcariano
            },
            include: [
              {
                model     : Persona,
                attributes: [['id', 'personaId'], 'nombres', 'apellidos', 'genero', 'email']
              }
            ],
            attributes: [['id', 'procarianoId']]
          })
          .then( procariano => {
            if ( !procariano ) return reject( errors.SEQUELIZE_ERROR('No se encontró registro del procariano', 'Find error') );
            return resolve(procariano);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      /*
        @Descripción: Busca a todos los procarianos pertenecientes al grupo inicado por el idGrupo
        @Return: Promesa con info de Procariano, Persona, Grupo y ProcarianoGrupo
      */
      obtenerProcarianosDeGrupoP: function(idGrupo){
        const Grupo = sequelize.import("../models/grupo");
        const Persona = sequelize.import("../models/persona");
        return new Promise( (resolve, reject) => {
          if ( !idGrupo )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') );
          if ( idGrupo < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') );
          return this.findAll({
            include: [
              {
                model: Grupo,
                where: {
                  id: idGrupo
                },
                attributes: [ ['id', 'idGrupo']]
              },
              {
                model: Persona,
                attributes: [ ['id', 'idPersona'], 'nombres', 'apellidos', ]
              }
            ],
            attributes:[['id', 'idProcariano']]
          })
          .then( procarianos => {
            return resolve(procarianos);
          })
          .catch( error => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      /*
        @Descripción : Busca la información del procariano por el id de la Persona
        @Return      : Promesa con la información de Procariano, Persona, Tipo y Grupo
      */
      obtenerProcarianoPorIdPersonaP: function(idPersona){
        const Persona = sequelize.import("../models/persona");
        const Tipo    = sequelize.import("../models/tipo");
        const Grupo   = sequelize.import("../models/grupo");
        return new Promise( (resolve, reject) => {
          if( !idPersona )     return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del procariano') );
          if( idPersona < 0 )  return reject( errors.SEQUELIZE_FK_ERROR('Id del procariano inválido') );
          return this.findOne({
            include : [
              {
                model : Persona
              },
              {
                model : Tipo
              },
              {
                model : Grupo
              }
            ],
            where : {
              PersonaId : idPersona
            }  
          })
          .then( procariano => {
            if ( !procariano ) return reject( errors.SEQUELIZE_ERROR('No se encontró registro del procariano', 'Find error') );
            return resolve(procariano);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      /*
        @Descripción : Busca a los procarianos activos
        @Return      : Devuelve la información de: Procariano, Persona y Tipo
      */
      obtenerProcarianosActivosP: function(){
        const Persona = sequelize.import("../models/persona");
        const Tipo    = sequelize.import("../models/tipo");
        const Grupo   = sequelize.import("../models/grupo");
        return new Promise( (resolve, reject) => {
          return this.findAll({
            include : [
              {
                model : Persona
              },
              {
                model : Tipo
              },
              {
                model : Grupo
              }
            ],
            where : {
              estado : 'activo'
            }
          })
          .then( procarianos => {
            return resolve(procarianos);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      buscarChicosFormacionP: function(){
        const Tipo = sequelize.import("../models/tipo");
        const Persona = sequelize.import("../models/persona");
        return new Promise( (resolve, reject) => {
          return this.findAll({
            include : [
              {
                model : Tipo,
                where : {
                  id  : 1 //Id de Chico Formación es 1
                },
                attributes: ['id', 'nombre']
              },
              {
                model       : Persona,
                attributes  : [['id', 'personaId'], 'nombres', 'apellidos']
              }
            ],
            where : {
              estado  : {
                $not  : 'inactivo'
              }
            },
            attributes: [['id', 'procarianoId'], 'estado']
          })
          .then( procarianos => {
            return resolve(procarianos);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      obtenerPosiblesAnimadoresP: function(){
        const Persona = sequelize.import("../models/persona");
        const Tipo    = sequelize.import("../models/tipo");
        return new Promise( (resolve, reject) => {
          return this.findAll({
            where   : {
              estado   : 'activo'
            },
            include    : [
              {
                model : Tipo,
                where : {
                  id : { $not : 1}
                },
                attributes : [['id', 'tipoId'], 'nombre']
              },
              {
                model : Persona,
                attributes: [['id', 'personaId'], 'nombres', 'apellidos']
              }
            ],
            attributes : [['id', 'procarianoId']] 
          })
          .then( resultado => {
            resolve(resultado);
          })
          .catch( error => {
            reject(error);
          });
        });
      },
      ///////////////////////////////////////
      //FUNDIONES CON TRANSACCIONES
      ///////////////////////////////////////
      /*
        @Descripción : Crea un registro en la tabla Procarianos de la base de datos a partir de una transacción
        @Params      : 
          procariano  : Objeto con la información del Procariano a crear
          transaction : Transacción para crear el Procariano
        @Return      : Promesa con la información del Procariano creado
      */
      crearProcarianoT: function(procariano, transaction){
        return new Promise( (resolve, reject) => {
          if ( !procariano.PersonaId )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id de la persona') );
          if ( procariano.PersonaId < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id de la persona inválido') );
          return this.create({
            PersonaId       : procariano.PersonaId,
            colegio         : procariano.colegio,
            universidad     : procariano.universidad,
            parroquia       : procariano.parroquia,
            fechaOrdenacion : procariano.fechaOrdenacion,
            estado          : procariano.estado,
          }, { transaction : transaction })
          .then( procariano => {
            return resolve(procariano);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      /*
        @Descripción : Edita un registro en la tabla Procarianos de la base de datos a partir de una transacción
        @Params      : 
          idPersona   : Id de la Persona para editar el registro
          procariano  : Objeto con la información del Procariano a crear
          transaction : Transacción para crear el Procariano
        @Return      : Promesa con el número de registros editados
      */
      editarProcarianoT: function(idPersona, procariano, transaction){
        return new Promise( (resolve, reject) => {
          if ( !idPersona )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id de la persona') );
          if ( idPersona < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id de la persona inválido') );
          return this.update({
            colegio         : procariano.colegio,
            universidad     : procariano.universidad,
            parroquia       : procariano.parroquia,
            fechaOrdenacion : procariano.fechaOrdenacion,
            estado          : procariano.estado,
          },
          {
            where : {
              PersonaId : idPersona
            },
            transaction : transaction
          })
          .then( resultado => {
            if( resultado[0] < 1 ) return   reject( errors.SEQUELIZE_ERROR('Edit error', 'No se encontró el registro del procariano para eliminar') );
            if( resultado[0] === 1 ) return resolve(resultado[0]);
            if( resultado[0] > 1 ) return   reject( errors.SEQUELIZE_ERROR('Edit error', 'Se encontraron múltiples registros. Se cancela la edición') );
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      /*
        @Descripción : Cambia el estado a inactivo de un Procariano en la base a partir de una transacción
        @Params      : 
          idPersona   : id de la Persona para realizar el cambio de estado
          transaction : Transacción para crear el Procariano
        @Return      : Promesa con el número de registros afectados
      */
      eliminarProcarianoT: function(idPersona, transaction){
        return new Promise( (resolve, reject) => {
          if ( !idPersona )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id de la persona') );
          if ( idPersona < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id de la persona inválido') );
          return this.update({
            estado : 'inactivo'
          }, {
            where : {
              PersonaId : idPersona
            },
            transaction : transaction
          })
          .then( resultado => {
            if( resultado < 1 )   return reject( errors.SEQUELIZE_ERROR('No se encontró el registro del procariano para eliminar', 'Delete error') );
            if ( resultado == 1 ) return resolve(resultado);
            return reject( errors.SEQUELIZE_ERROR('Se encontraron varios registros. Se cancela la eliminación', 'Delete error') );
          })
          .catch( error => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      }
    }
  });
  return Procariano;
};