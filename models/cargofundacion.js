'use strict';
module.exports = function(sequelize, DataTypes) {
  var CargoFundacion = sequelize.define('CargoFundacion', {
    nombre: DataTypes.STRING,
    sueldo: DataTypes.DOUBLE,
    descripcion: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CargoFundacion;
};