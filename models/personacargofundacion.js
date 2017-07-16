'use strict';
module.exports = function(sequelize, DataTypes) {
  var PersonaCargoFundacion = sequelize.define('PersonaCargoFundacion', {
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
    freezeTableName: true
    }
  });
  return PersonaCargoFundacion;
};