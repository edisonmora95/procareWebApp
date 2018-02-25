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
      ///////////////////////////////////////
      //FUNDIONES CON PROMESAS
      ///////////////////////////////////////
      obtenerGrupoActualDeProcarianoP: function(idProcariano){
        return new Promise( (resolve, reject) => {
          if ( !idProcariano )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del procariano') );
          if ( idProcariano < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del procariano inválido') );
          return this.findOne({
            where: {
              ProcarianoId: idProcariano,
              fechaFin    : null
            }
          })
          .then( resultado => {
            return resolve(resultado);
          })
          .catch( error => {
            return reject( errors.ERROR_HANDLER(fail) );
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
            if ( resultado < 0 ) return reject( errors.SEQUELIZE_ERROR('Error en la eliminación. Se cancela', 'Delete error') );
            return resolve(resultado);
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
          if ( !idProcariano )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del procariano') );
          if ( idProcariano < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del procariano inválido') );
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
            return resolve(resultado[0]);
          })
          .catch( error => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      }
    }
  });
  return ProcarianoGrupo;
};

