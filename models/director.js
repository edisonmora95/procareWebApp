'use strict';
module.exports = function(sequelize, DataTypes) {
  var Director = sequelize.define('Director', {
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
  return Director;
};