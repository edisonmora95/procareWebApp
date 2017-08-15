'use strict';
module.exports = function(sequelize, DataTypes) {
  var CentroNivel = sequelize.define('CentroNivel', {
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName: true
  });
  return CentroNivel;
};