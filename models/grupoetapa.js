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
      }
    },
    freezeTableName: true
  });
  return GrupoEtapa;
};