'use strict';
module.exports = function(sequelize, DataTypes) {
  var ParaleloNivel = sequelize.define('ParaleloNivel', {
    fechaInicio : {
      type : DataTypes.DATE,
      allowNull : true
    },
    fechaFin : {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
    freezeTableName: true
    }
  });
  return ParaleloNivel;
};