'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProcarianoCargoFormacion = sequelize.define('ProcarianoCargoFormacion', {
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
  return ProcarianoCargoFormacion;
};