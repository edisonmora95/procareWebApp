'use strict';
module.exports = function(sequelize, DataTypes) {
  var personaRol = sequelize.define('PersonaRol', {
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName: true
  });
  return personaRol;
};