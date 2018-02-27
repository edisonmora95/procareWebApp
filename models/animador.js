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
        Animador.belongsTo(models.Procariano);
      },
      ///////////////////////////////////////
      //FUNDIONES CON PROMESAS
      ///////////////////////////////////////
      obtenerAnimadorDeGrupoP: function(idGrupo){
        return new Promise( (resolve, reject) => {
          if ( !idGrupo )    { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') ); }
          if ( idGrupo < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') ); }
          return this.findOne({
            where: {
              GrupoId  : idGrupo,
              fechaFin : null
            }
          })
          .then( animador => {
            return resolve(animador);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      /**
        @Descripción:
          Busca en la base de datos si esa persona es animador de un grupo actualmente.
        @Params:
          {Object} idAnimador  Id del animador (Procariano)
        @Success:
          {Boolean} registro True si tiene un grupo actualmente | False si no lo tiene
        @Error:
          {Object} fail Sequelize error {tipo, mensaje}
      */
      animadorTieneGrupoActualmente: function(idAnimador){
        return new Promise( (resolve, reject) => {
          if ( !idAnimador )    { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del animador') ); }
          if ( idAnimador < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id del animador inválido') ); }
          return this.findOne({
            where: {
              ProcarianoId  : idAnimador,
              fechaFin      : null
            }
          })
          .then( registro => {
            if ( !registro ) { return resolve(false); }
            return resolve(true);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      ///////////////////////////////////////
      //FUNDIONES CON TRANSACCIONES
      ///////////////////////////////////////
      /**
        @Descripción:
          Crea el regstro del animador del grupo. No hace commit.
        @Params:
          {Object} idGrupo  Id del grupo
          {Object} idAnimador  Id del animador (Procariano)
          {Object} transaction
        @Success:
          {Object} registro registro creado en la base
        @Error:
          {Object} fail Sequelize error {tipo, mensaje}
      */
      agregarAnimadorAGrupoT: function(idAnimador, idGrupo, transaction){
        return new Promise( (resolve, reject) => {
          if( !idAnimador )     { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del animador') ); }
          if ( idAnimador < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id del animador inválido') ); }
          if( !idGrupo )        { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') ); }
          if ( idGrupo < 0 )    { return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') ); }
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
      /**
        @Descripción:
          Le pone una fecha fin al registro del antiguo animador del grupo.
          Crea el nuevo registro del animador del grupo. 
          No hace commit.
        @Params:
          {Int} idGrupo  Id del grupo
          {Int} idAnimadorAntiguo  Id del animador antiguo (Procariano)
          {Int} idAnimadorNuevo    Id del animador nuevo (Procariano)
          {Object} transaction
        @Success:
          {Object} registro registro creado en la base
        @Error:
          {Object} fail Sequelize error {tipo, mensaje}
      */
      cambiarAnimadorDeGrupoT: function(idGrupo, idAnimadorAntiguo, idAnimadorNuevo, transaction){
        return new Promise( (resolve, reject) => {
          if( !idGrupo )               { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') ); }
          if ( idGrupo < 0 )           { return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') ); }
          if( !idAnimadorAntiguo )     { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del animador antiguo') ); }
          if ( idAnimadorAntiguo < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id del animador antiguo inválido') ); }
          if( !idAnimadorNuevo )       { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del animador nuevo') ); }
          if ( idAnimadorNuevo < 0 )   { return reject( errors.SEQUELIZE_FK_ERROR('Id del animador nuevo inválido') ); }
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
      /**
        @Descripción:
          Elimina los regstro de animadores del grupo. No hace commit.
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
          if( !idGrupo )     { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') ); }
          if ( idGrupo < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') ); }
          return this.destroy({
            where : {
              GrupoId : idGrupo
            },
            transaction : transaction
          })
          .then( resultado => {
            if( resultado < 1 ) { return reject( errors.SEQUELIZE_ERROR('No se encontró el registro del animador del grupo para eliminar', 'Delete error') ); }
            return resolve(resultado);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      }
    }
  });
  return Animador;
};