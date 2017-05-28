'use strict';
module.exports = function(sequelize, DataTypes) {
  var Procariano = sequelize.define('Procariano', {
    colegio: {
      type : DataTypes.STRING,
      allowNull : true
    },
    universidad: {
      type : DataTypes.STRING,
      allowNull : true
    },
    parroquia: {
      type : DataTypes.STRING,
      allowNull : true
    },
    fecha_ordenacion: {
      type : DataTypes.DATE,
      allowNull : true
    },
    estado: {
      type : DataTypes.BOOLEAN,
      allowNull : true
    },
    hace_participacion_estudiantil: {
      type : DataTypes.BOOLEAN,
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Procariano.belongsTo(models.Persona)
        // associations can be defined here
      }
    }
  });
  return Procariano;
};