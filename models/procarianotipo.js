'use strict';

const errors = require('../utils/errors');

module.exports = function(sequelize, DataTypes) {
  let ProcarianoTipo = sequelize.define('ProcarianoTipo', {
    fechaInicio : {
      type      : DataTypes.DATE,
      allowNull : true
    },
    fechaFin    : {
      type      : DataTypes.DATE,
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      ///////////////////////////////////////
      //FUNDIONES CON PROMESAS
      ///////////////////////////////////////
      obtenerTipoActualDeProcarianoP: function(idProcariano){
        return new Promise( (resolve, reject) => {
          if( !idProcariano )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó un procariano') );
          if( idProcariano < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id de procariano inválido') );
          return this.findOne({
            where : {
              fechaFin     : null,
              ProcarianoId : idProcariano
            }
          })
          .then( registro => {
            return resolve(registro);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      ///////////////////////////////////////
      //FUNDIONES CON TRANSACCIONES
      ///////////////////////////////////////
      anadirTipoProcarianoT: function(idTipo, idProcariano, transaction){
        return new Promise( (resolve, reject) => {
          if( !idTipo )          return reject( errors.SEQUELIZE_FK_ERROR('No ingresó un tipo') );
          if( !idProcariano )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó un procariano') );
          if( idTipo < 0 )       return reject( errors.SEQUELIZE_FK_ERROR('Id de tipo inválido') );
          if( idProcariano < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id de procariano inválido') );
          return this.create({
            TipoId      : idTipo,
            ProcarianoId: idProcariano,
            fechaInicio : new Date(),
            fechaFin    : null
          }, { transaction : transaction })
          .then( resultado => {
            return resolve(resultado);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      cambiarTipoDeProcarianoT: function(idProcariano, tipoActual, tipoNuevo, transaction){
        return new Promise( (resolve, reject) => {
          if( !tipoActual )      return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el tipo actual') );
          if( tipoActual < 0 )   return reject( errors.SEQUELIZE_FK_ERROR('Id de tipo actual inválido') );
          if( !tipoNuevo )       return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el tipo nuevo') );
          if( tipoNuevo < 0 )    return reject( errors.SEQUELIZE_FK_ERROR('Id de tipo nuevo inválido') );
          if( !idProcariano )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó un procariano') );
          if( idProcariano < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id de procariano inválido') );
          return this.update({
            fechaFin  : new Date()
          }, {
            where : {
              ProcarianoId  : idProcariano,
              TipoId        : tipoActual
            },
            transaction : transaction
          })
          .then( resultado => {
            return this.create({
              TipoId      : tipoNuevo,
              ProcarianoId: idProcariano,
              fechaInicio : new Date(),
              fechaFin    : null
            }, { transaction : transaction })
            .then( resultado2 => {
              return resolve(resultado2);
            })
            .catch( fail2 => {
              return reject( errors.ERROR_HANDLER(fail2) );
            });
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      anadirFechaFinT: function(idProcariano, idTipo, transaction){
        return new Promise( (resolve, reject) => {
          if( !idProcariano )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó un procariano') );
          if( idProcariano < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id de procariano inválido') );
          if( !idTipo )          return reject( errors.SEQUELIZE_FK_ERROR('No ingresó un tipo') );
          if( idTipo < 0 )       return reject( errors.SEQUELIZE_FK_ERROR('Id de tipo inválido') );
          return this.update({
            fechaFin : new Date()
          }, {
            where : {
              fechaFin      : null,
              ProcarianoId  : idProcariano,
              TipoId        : idTipo
            },
            transaction : transaction
          })
          .then( resultado => {
            if ( resultado[0] < 1 ) return reject( errors.SEQUELIZE_ERROR('No se encontró el registro. Se cancela la edición', 'Update error') )
            if ( resultado[0] > 1 ) return reject( errors.SEQUELIZE_ERROR('Se encontraron varios registros con ese id. Se cancela la edición', 'Update error') )
            return resolve(resultado[0]);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      }
    },
    freezeTableName: true
  });
  return ProcarianoTipo;
};

