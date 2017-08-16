'use strict';
module.exports = function(sequelize, DataTypes) {
  var AsistenciaNino = sequelize.define('AsistenciaNino', {
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
  return AsistenciaNino;
};