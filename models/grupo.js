'use strict';
module.exports = function(sequelize, DataTypes) {
  var Grupo = sequelize.define('Grupo', {
    nombre : {
      type : DataTypes.STRING,
      allowNull : false
    },
    tipo : {
      type : DataTypes.BOOLEAN,
      allowNull : false
    },
    cantidadChicos : {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    numeroReuniones : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    genero : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Grupo;
};