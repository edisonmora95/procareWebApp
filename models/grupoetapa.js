'use strict';
module.exports = function(sequelize, DataTypes) {
  var GrupoEtapa = sequelize.define('GrupoEtapa', {
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
      crearGrupoEtapa: function(idGrupo, idEtapa, successCallback, errorCallback){
        this.create({
          EtapaId: idEtapa,
          GrupoId: idGrupo,
          fechaInicio: new Date(),
          fechaFin: null
        }).then(successCallback).catch(errorCallback);
      },
      cambiarGrupoDeEtapa: function(idGrupo, idEtapaAntigua, idEtapaNueva, success, errorUpdate, errorCreate){
        this.update({
          fechaFin: new Date(),
        }, {
          where: {
            GrupoId: idGrupo,
            EtapaId:  idEtapaAntigua
          }
        }).then( (updateSuccess) => {
          this.create({
            GrupoId: idGrupo,
            EtapaId: idEtapaNueva,
            fechaInicio: new Date(),
            fechaFin: null
          }).then(success).catch(errorCreate);
        }).catch(errorUpdate);
      },
      ////////////////////////////////////
      //FUNCIONES CON TRANSACCIONES
      ////////////////////////////////////
      crearGrupoEtapaT: function(idGrupo, idEtapa, transaction){
        return new Promise( (resolve, reject) => {
          return this.create({
            EtapaId: idEtapa,
            GrupoId: idGrupo,
            fechaInicio: new Date(),
            fechaFin: null
          }, { transaction : transaction})
          .then( (registro) => {
            return resolve(registro);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
    },
    freezeTableName: true
  });
  return GrupoEtapa;
};