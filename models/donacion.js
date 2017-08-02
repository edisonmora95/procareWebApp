/*
@Descripcion: Modelo de Benefactor
@Autor: jose alcivar
@FechaCreacion: 21/06/2017
@UltimaFechaModificacion: 21/06/2017 @josealcivar
*/


var bcrypt = require('bcryptjs');
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Donacion = sequelize.define('Donacion', {
   /* id_benefactor: {
      type : DataTypes.INTEGER,
      allowNull : false
    },*/
    cantidad_donada: {
      type : DataTypes.DECIMAL(10,2),
      allowNull : false
    },
    fecha_donacion: {
      type : DataTypes.DATEONLY,
      allowNull : false
    },
    observacion: {
      type : DataTypes.STRING,
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Donacion.belongsTo(models.Benefactor);
        // associations can be defined here
      }
    }

  });
  return Donacion;
};