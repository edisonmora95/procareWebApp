'use strict';
module.exports = function(sequelize, DataTypes) {
  var AsistenciaCatequista = sequelize.define('AsistenciaCatequista', {
    fecha: DataTypes.DATE,
    descripcion: DataTypes.STRING(300)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName: true
  });
  return AsistenciaCatequista;
};