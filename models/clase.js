'use strict';
module.exports = function(sequelize, DataTypes) {
  var Clase = sequelize.define('Clase', {
    fecha : {
      type : DataTypes.DATEONLY,
      allowNull : true
    },
    horaInicio : {
      type : DataTypes.DATE,
      allowNull : true
    },
    horaSalida : {
      type : DataTypes.DATE,
      allowNull : true
    },
    descripcion : {
      type : DataTypes.STRING(300),
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Clase;
};