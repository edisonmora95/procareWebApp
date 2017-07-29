'use strict';
module.exports = function(sequelize, DataTypes) {
  var NinoAccion = sequelize.define('NinoAccion', {
    nombreRep: DataTypes.STRING,
    apellidoRep: DataTypes.STRING,
    cedulaRep: DataTypes.STRING,
    escuela: DataTypes.STRING,
    bautizado: DataTypes.BOOLEAN,
    estado: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return NinoAccion;
};