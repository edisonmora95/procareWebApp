'use strict';
module.exports = function(sequelize, DataTypes) {
  var Animador = sequelize.define('Animador', {
    fechaInicio : {
      type : DataTypes.DATE,
      allowNull : true
    },
    fechaFin : {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    singular : 'animador',
    plural : 'animadores',
    tableName : 'animadores',
    classMethods : {
      associate : function(models) {
        Animador.belongsTo(models.Procariano)
      }
    }
  });
  return Animador;
};