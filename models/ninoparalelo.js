'use strict';
module.exports = function(sequelize, DataTypes) {
  var NinoParalelo = sequelize.define('NinoParalelo', {
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
      }
    },
    freezeTableName: true
  });
  return NinoParalelo;
};