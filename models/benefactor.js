/*
@Descripcion: Modelo de procariano
@Autor: jose viteri
@FechaCreacion: 20/05/2017
@UltimaFechaModificacion: 03/06/2017 @JoseViteri
*/
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Benefactor = sequelize.define('Benefactor', {
    valor_contribucion: {
      type : DataTypes.DECIMAL(10,2),
      allowNull : false
    },
    dia_cobro: {
      type : DataTypes.INTEGER(2),
      allowNull : false
    },
    tarjeta_credito: {
      type : DataTypes.STRING,
      allowNull : true
    },
    tipo_donacion: {
      type : DataTypes.STRING,
      allowNull : true
    },
    estado: {
      type : DataTypes.STRING,
      allowNull : false,
      /*validate : {
        isIn : ['activo', 'inactivo' ]
      }*/
    },
    nombre_gestor: {
      type : DataTypes.STRING,
      allowNull : true
    },
    relacion: {
      type : DataTypes.STRING,
      allowNull : true
    },
    observacion: {
      type : DataTypes.STRING,
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }

  });
  return Benefactor;
};