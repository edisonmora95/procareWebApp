/*

@Descripcion: Modelo de rol persona, une a rol con persona
@Autor: jose viteri
@FechaCreacion: 18/05/2017
@UltimaFechaModificacion: --

*/


'use strict';
module.exports = function(sequelize, DataTypes) {
  var PersonaRol = sequelize.define('PersonaRol', {
    
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