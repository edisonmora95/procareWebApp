/*
@Descripcion: Modelo de procariano
@Autor: jose Alcivar
@FechaCreacion: 5/07/2017
@UltimaFechaModificacion: 5/07/2017 @josealcivar
*/


var bcrypt = require('bcryptjs');
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Paralelo = sequelize.define('Paralelo', {
    
    nombre: {
      type : DataTypes.STRING,
      allowNull : true
    },
    cantidadNinios: {
      type : DataTypes.INT,
      allowNull : true
    },
    estado: {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    classMethods: {
      associate: function(models) {
     // Paralelo.belongsToMany(models.Rol , {through: 'benefactor_persona'})
        // associations can be defined here
      }
    }

  });
  return Paralelo;
};
