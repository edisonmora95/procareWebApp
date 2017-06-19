'use strict';
module.exports = function(sequelize, DataTypes) {
  var Etapa = sequelize.define('Etapa', {
    nombre: DataTypes.STRING,
    programa: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Etapa;
};