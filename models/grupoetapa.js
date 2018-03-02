'use strict';

const errors = require('../utils/errors');

module.exports = function(sequelize, DataTypes) {
  let GrupoEtapa = sequelize.define('GrupoEtapa', {
    fechaInicio : {
      type      : DataTypes.DATE,
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
      ////////////////////////////////////
      // FUNCIONES CON TRANSACCIONES
      ////////////////////////////////////
      /**
        @Descripción:
          Crea el regstro de asociación del grupo en la etapa indicada. No hace commit.
        @Params:
          {Object} idGrupo  Id del grupo
          {Object} idEtapa  Id de la etapa
          {Object} transaction
        @Success:
          {Object} registro registro creado en la base
        @Error:
          {Object} fail Sequelize error {tipo, mensaje}
      */
      crearGrupoEtapaT: function(idGrupo, idEtapa, transaction){
        return new Promise( (resolve, reject) => {
          if ( !idGrupo )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') );
          if ( idGrupo < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') );
          if ( !idEtapa )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id de la etapa') );
          if ( idEtapa < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id de etapa inválido') );
          return this.create({
            EtapaId    : idEtapa,
            GrupoId    : idGrupo,
            fechaInicio: new Date(),
            fechaFin   : null
          }, { transaction : transaction})
          .then( (registro) => {
            return resolve(registro);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      cambiarGrupoDeEtapaT: function(idGrupo, idEtapaAntigua, idEtapaNueva, transaction){
        return new Promise( (resolve, reject) => {
          if ( !idGrupo )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') );
          if ( idGrupo < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') );
          if ( !idEtapaAntigua )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id de la etapa antigua') );
          if ( idEtapaAntigua < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id de etapa antigua inválido') );
          if ( !idEtapaNueva )    return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id de la etapa nueva') );
          if ( idEtapaNueva < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('Id de etapa nueva inválido') );
          return this.update({
            fechaFin : new Date()
          }, {
            where : {
              GrupoId: idGrupo,
              EtapaId:  idEtapaAntigua
            },
            transaction : transaction 
          })
          .then( registro => {
            return this.create({
              GrupoId     : idGrupo,
              EtapaId     : idEtapaNueva,
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
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      /**
        @Descripción:
          Elimina los regstro de etapas del grupo. No hace commit.
        @Params:
          {Int} idGrupo  Id del grupo
          {Object} transaction
        @Success:
          {Int} registro cantidad de registros eliminados
        @Error:
          {Object} fail Sequelize error {tipo, mensaje}
      */
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
            if( resultado < 1 ) return reject( errors.SEQUELIZE_ERROR('No se encontró el registro de la etapa del grupo para eliminar', 'Delete error') );
            return resolve(resultado);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      }
    },
    freezeTableName: true
  });
  return GrupoEtapa;
};