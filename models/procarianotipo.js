'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProcarianoTipo = sequelize.define('ProcarianoTipo', {
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName: true
  });
  return ProcarianoTipo;
};