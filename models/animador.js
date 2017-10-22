'use strict';
module.exports = function(sequelize, DataTypes) {
  var Animador = sequelize.define('Animador', {
    fechaInicio : {
      type : DataTypes.DATE,
      allowNull : true
    },
    fechaFin : {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    singular : 'animador',
    plural : 'animadores',
    tableName : 'animadores',
    classMethods : {
      associate : function(models) {
        Animador.belongsTo(models.Procariano)
      },
      agregarAnimadorAGrupo: function(idAnimador, idGrupo, successCallback, errorCallback){
        this.create({
          ProcarianoId: idAnimador,
          GrupoId: idGrupo,
          fechaInicio: new Date(),
          fechaFin: null
        }).then(successCallback).catch(errorCallback);
      },
      obtenerAnimadorDeGrupo: function(idGrupo, successCallback, errorCallback){
        this.findOne({
          where: {
            GrupoId: idGrupo,
            fechaFin: null
          }
        }).then(successCallback).catch(errorCallback);
      },
      obtenerGrupoDeAnimador: function(idAnimador, success, error){
        this.findOne({
          where: {
            ProcarianoId: idAnimador,
            fechaFin: null
          }
        }).then(success).catch(error);
      },
      cambiarAnimadorDeGrupo: function(idGrupo, idAnimadorAntiguo, idAnimadorNuevo, success, errorUpdate, errorCreate){
        this.update({
          fechaFin: new Date()
        }, {
          where: {
            GrupoId: idGrupo,
            ProcarianoId: idAnimadorAntiguo
          }
        }).then((updateSuccess) => {
          this.create({
            GrupoId: idGrupo,
            ProcarianoId: idAnimadorNuevo,
            fechaInicio: new Date(),
            fechaFin: null
          }).then(success).catch(errorCreate);
        }).catch(errorUpdate);
      },
      ///////////////////////////////////////
      //FUNDIONES CON PROMESAS
      ///////////////////////////////////////
      obtenerAnimadorDeGrupoP: function(idGrupo){
        return new Promise( (resolve, reject) => {
          if(!idGrupo) return reject('No ingresó el id del grupo');
          return this.findOne({
            where: {
              GrupoId: idGrupo,
              fechaFin: null
            }
          })
          .then( animador => {
            return resolve(animador);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      ///////////////////////////////////////
      //FUNDIONES CON TRANSACCIONES
      ///////////////////////////////////////
      agregarAnimadorAGrupoT: function(idAnimador, idGrupo, transaction){
        return new Promise( (resolve, reject) => {
          if(!idAnimador) return reject('No ingresó el animador');
          if(!idGrupo) return reject('No ingresó el grupo');
          return this.create({
            ProcarianoId: idAnimador,
            GrupoId: idGrupo,
            fechaInicio: new Date(),
            fechaFin: null
          }, { transaction : transaction })
          .then( registro => {
            return resolve(registro);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      cambiarAnimadorDeGrupoT: function(idGrupo, idAnimadorAntiguo, idAnimadorNuevo, transaction){
        return new Promise( (resolve, reject) => {
          return this.update({
            fechaFin: new Date()
          }, {
            where : {
              GrupoId: idGrupo,
              ProcarianoId: idAnimadorAntiguo
            },
            transaction : transaction
          })
          .then( registro1 => {
            return this.create({
              GrupoId: idGrupo,
              ProcarianoId: idAnimadorNuevo,
              fechaInicio: new Date(),
              fechaFin: null
            }, { transaction : transaction })
            .then( registro2 => { 
              return resolve(registro2);
            })
            .catch( error2 => {
              return reject(error2);
            });
          })
          .catch( error1 => {
            return reject(error1);
          });
        });
      },
      eliminarRegistrosDeGrupoT: function(idGrupo, transaction){
        return new Promise( (resolve, reject) => {
          return this.destroy({
            where : {
              GrupoId : idGrupo
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
  return Animador;
};