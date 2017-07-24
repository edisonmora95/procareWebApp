'use strict';
module.exports = function(sequelize, DataTypes) {
  var GrupoEtapa = sequelize.define('GrupoEtapa', {
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE
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
      }
    },
    freezeTableName: true
  });
  return GrupoEtapa;
};