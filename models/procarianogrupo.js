'use strict';

const errors = require('../utils/errors');

module.exports = function(sequelize, DataTypes) {
  let ProcarianoGrupo = sequelize.define('ProcarianoGrupo', {
    fechaInicio : {
      type      : DataTypes.DATE,
      allowNull : true
    },
    fechaFin : {
      type      : DataTypes.DATE,
      allowNull : true
    }
  }, {
    singular  : 'ProcarianoGrupo',
    plural    : 'ProcarianoGrupo',
    tableName : 'procarianogrupo',
    classMethods : {
      associate : function(models) {
        
      },
      anadirProcarianoAGrupo: function(idGrupo, idProcariano, fechaInicio, callback, errorCallback){
        this.create({
          GrupoId       : idGrupo,
          ProcarianoId  : idProcariano,
          fechaInicio   : fechaInicio,
          fechaFin      : null
        }).then(callback).catch(errorCallback);
      },
      /*
        @Descripción: 
          Me devuelve a todos los procarianos que pertenezcan a un grupo
          Si el registro tiene fechaFin null, significa que pertenece a un grupo actualmente
      */
      buscarProcarianosConGrupo: function(callback){
        this.findAll({
          where: {
            fechaFin: null
          }
        }).then(callback);
      },
      obtenerProcarianosDeGrupo: function(idGrupo, success, error){
        this.findAll({
          where: {
            GrupoId: idGrupo
          }
        }).then(success).catch(error);
      },
      /*
        @Descripción: 
          Cuando se quiere registrar que un procariano ya no pertenece a un grupo, se le añade una fechaFin a su registro
      */
      eliminarProcarianoDeGrupo: function(idProcariano, idGrupo, success, error){
        this.update({
          fechaFin: new Date(),
        }, {
          where: {
            GrupoId: idGrupo,
            ProcarianoId: idProcariano
          }
        }).then(success).catch(error);
      },
      obtenerGrupoActualDeProcariano: function(idProcariano, success, error){
        this.findOne({
          where: {
            ProcarianoId: idProcariano,
            fechaFin: null
          }
        }).then(success).catch(error);
      },
      ///////////////////////////////////////
      //FUNDIONES CON PROMESAS
      ///////////////////////////////////////
      obtenerGrupoActualDeProcarianoP: function(idProcariano){
        return new Promise( (resolve, reject) => {
          return this.findOne({
            where: {
              ProcarianoId: idProcariano,
              fechaFin: null
            }
          })
          .then( resultado => {
            return resolve(resultado);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      buscarProcarianosConGrupoP: function(){
        return new Promise( (resolve, reject) => {
          return this.findAll({
            where : {
              fechaFin : null
            }
          })
          .then( procarianos => {
            return resolve(procarianos);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      ///////////////////////////////////////
      //FUNDIONES CON TRANSACCIONES
      ///////////////////////////////////////
      eliminarRegistrosDeGrupoT: function(idGrupo, transaction){
        return new Promise( (resolve, reject) => {
          if ( !idGrupo )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') );
          if ( idGrupo < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') );
          return this.destroy({
            where : {
              GrupoId : idGrupo
            },
            transaction : transaction
          })
          .then( resultado => {
            if( resultado === 0 ) return reject( errors.SEQUELIZE_ERROR('Delete error', 'No se encontró el registro de la etapa del grupo para eliminar') );
            if( resultado === 1 ) return resolve(resultado);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      anadirProcarianoAGrupoT: function(idGrupo, idProcariano, transaction){
        return new Promise( (resolve, reject) => {
          if ( !idGrupo )         return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') );
          if ( idGrupo < 0 )      return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') );
          if ( !idProcariano )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del procariano') );
          if ( idProcariano < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del procariano inválido') );
          return this.create({
            GrupoId       : idGrupo,
            ProcarianoId  : idProcariano,
            fechaInicio   : new Date(),
            fechaFin      : null
          }, { transaction : transaction })
          .then( resultado => {
            return resolve(resultado);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      anadirFechaFinT: function(idProcariano, transaction){
        return new Promise( (resolve, reject) => {
          return this.update({
            fechaFin : new Date()
          }, {
            where : {
              fechaFin      : null,
              ProcarianoId  : idProcariano
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
    }
  });
  return ProcarianoGrupo;
};

