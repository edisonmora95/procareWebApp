'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProcarianoTipo = sequelize.define('ProcarianoTipo', {
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE
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
      }
    },
    freezeTableName: true
  });
  return ProcarianoTipo;
};