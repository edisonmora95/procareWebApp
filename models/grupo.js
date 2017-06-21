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
    name : {
      singular: 'grupo',
      plural: 'grupos',
      tableName: 'grupos'
    },
    classMethods : {
      associate : function(models) {
        Grupo.hasOne(models.Animador)
      }
    }
  });
  return Grupo;
};