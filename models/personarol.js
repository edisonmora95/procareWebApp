/*
@Descripcion: Modelo de rol persona, une a rol con persona
@Autor: jose viteri
@FechaCreacion: 18/05/2017
@UltimaFechaModificacion: @erialper 12/08/2017 agrega campos al modelo
*/
'use strict';
module.exports = function(sequelize, DataTypes) {
  var PersonaRol = sequelize.define('PersonaRol', {
      fechaInicio : {
        type : DataTypes.DATE,
        allowNull : true
      },
      fechaFin : {
        type : DataTypes.DATE,
        allowNull : true
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName: true
  });
  return PersonaRol;
};