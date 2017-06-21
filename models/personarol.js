'use strict';
module.exports = function(sequelize, DataTypes) {
  var PersonaRol = sequelize.define('PersonaRol', {
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName: true
  });
  return PersonaRol;
};