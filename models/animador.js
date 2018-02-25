'use strict';
const errors = require('../utils/errors');

module.exports = function(sequelize, DataTypes) {
  let Animador = sequelize.define('Animador', {
    fechaInicio : {
      type      : DataTypes.DATE,
      allowNull : true
    },
    fechaFin : {
      type      : DataTypes.DATE,
      allowNull : true
    }
  }, {
    singular  : 'animador',
    plural    : 'animadores',
    tableName : 'animadores',
    classMethods : {
      associate : function(models) {
        Animador.belongsTo(models.Procariano)
      },
      ///////////////////////////////////////
      //FUNDIONES CON PROMESAS
      ///////////////////////////////////////
      obtenerAnimadorDeGrupoP: function(idGrupo){
        return new Promise( (resolve, reject) => {
          if ( !idGrupo )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') );
          if ( idGrupo < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') );
          return this.findOne({
            where: {
              GrupoId  : idGrupo,
              fechaFin : null
            }
          })
          .then( animador => {
            return resolve(animador);
          })
          .catch( error => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      ///////////////////////////////////////
      //FUNDIONES CON TRANSACCIONES
      ///////////////////////////////////////
      agregarAnimadorAGrupoT: function(idAnimador, idGrupo, transaction){
        return new Promise( (resolve, reject) => {
          if( !idAnimador )     return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del animador') );
          if ( idAnimador < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del animador inválido') );
          if( !idGrupo )        return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') );
          if ( idGrupo < 0 )    return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') );
          return this.create({
            ProcarianoId: idAnimador,
            GrupoId     : idGrupo,
            fechaInicio : new Date(),
            fechaFin    : null
          }, { transaction : transaction })
          .then( registro => {
            return resolve(registro);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      cambiarAnimadorDeGrupoT: function(idGrupo, idAnimadorAntiguo, idAnimadorNuevo, transaction){
        return new Promise( (resolve, reject) => {
          if( !idGrupo )               return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') );
          if ( idGrupo < 0 )           return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') );
          if( !idAnimadorAntiguo )     return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del animador antiguo') );
          if ( idAnimadorAntiguo < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del animador antiguo inválido') );
          if( !idAnimadorNuevo )       return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del animador nuevo') );
          if ( idAnimadorNuevo < 0 )   return reject( errors.SEQUELIZE_FK_ERROR('Id del animador nuevo inválido') );
          return this.update({
            fechaFin: new Date()
          }, {
            where : {
              GrupoId     : idGrupo,
              ProcarianoId: idAnimadorAntiguo
            },
            transaction : transaction
          })
          .then( registro1 => {
            return this.create({
              GrupoId     : idGrupo,
              ProcarianoId: idAnimadorNuevo,
              fechaInicio : new Date(),
              fechaFin    : null
            }, { transaction : transaction })
            .then( registro2 => { 
              return resolve(registro2);
            })
            .catch( fail2 => {
              return reject( errors.ERROR_HANDLER(fail2) );
            });
          })
          .catch( fail1 => {
            return reject( errors.ERROR_HANDLER(fail1) );
          });
        });
      },
      eliminarRegistrosDeGrupoT: function(idGrupo, transaction){
        return new Promise( (resolve, reject) => {
          if( !idGrupo )     return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') );
          if ( idGrupo < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') );
          return this.destroy({
            where : {
              GrupoId : idGrupo
            },
            transaction : transaction
          })
          .then( resultado => {
            if( resultado === 0 ) return reject( errors.SEQUELIZE_ERROR('Delete error', 'No se encontró el registro del animador del grupo para eliminar') );
            if( resultado === 1 ) return resolve(resultado);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail1) );
          });
        });
      }
    }
  });
  return Animador;
};