'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProcarianoTipo = sequelize.define('ProcarianoTipo', {
    fechaInicio : {
      type : DataTypes.DATE,
      allowNull : true
    },
    fechaFin : {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      anadirTipoProcariano: function(idTipo, idProcariano, fechaInicio, callback, errorCallback){
        this.create({
          TipoId: idTipo,
          ProcarianoId: idProcariano,
          fechaInicio: fechaInicio,
          fechaFin: null
        }).then(callback).catch(errorCallback);
      },
      ///////////////////////////////////////
      //FUNDIONES CON PROMESAS
      ///////////////////////////////////////
      obtenerTipoActualDeProcarianoP: function(idProcariano){
        return new Promise( (resolve, reject) => {
          if( !idProcariano )    return reject('No ingresó el id del procariano');
          if( idProcariano < 0 ) return reject('Id de procariano inválido');
          return this.findOne({
            where : {
              fechaFin : null,
              ProcarianoId : idProcariano
            }
          })
          .then( registro => {
            return resolve(registro);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      ///////////////////////////////////////
      //FUNDIONES CON TRANSACCIONES
      ///////////////////////////////////////
      anadirTipoProcarianoT: function(idTipo, idProcariano, transaction){
        return new Promise( (resolve, reject) => {
          if( !idTipo )          return reject('No ingresó un tipo');
          if( !idProcariano )    return reject('No ingresó el id del procariano');
          if( idTipo < 0 )       return reject('Id de tipo inválido');
          if( idProcariano < 0 ) return reject('Id de procariano inválido');
          return this.create({
            TipoId: idTipo,
            ProcarianoId: idProcariano,
            fechaInicio: new Date(),
            fechaFin: null
          }, { transaction : transaction })
          .then( resultado => {
            return resolve(resultado);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      cambiarTipoDeProcarianoT: function(idProcariano, tipoActual, tipoNuevo, transaction){
        return new Promise( (resolve, reject) => {
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
              TipoId: tipoNuevo,
              ProcarianoId: idProcariano,
              fechaInicio: new Date(),
              fechaFin: null
            }, { transaction : transaction })
            .then( resultado => {
              return resolve(resultado);
            })
            .catch( error2 => {
              return reject(error2);
            });
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      anadirFechaFinT: function(idProcariano, idTipo, transaction){
        return new Promise( (resolve, reject) => {
          if( !idTipo )          return reject('No ingresó un tipo');
          if( !idProcariano )    return reject('No ingresó el id del procariano');
          if( idTipo < 0 )       return reject('Id de tipo inválido');
          if( idProcariano < 0 ) return reject('Id de procariano inválido');
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
            return resolve(resultado);
          })
          .catch( error => {
            return reject(error);
          });
        });
      }
    },
    freezeTableName: true
  });
  return ProcarianoTipo;
};

