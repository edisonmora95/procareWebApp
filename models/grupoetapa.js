'use strict';
module.exports = function(sequelize, DataTypes) {
  var GrupoEtapa = sequelize.define('GrupoEtapa', {
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return GrupoEtapa;
};