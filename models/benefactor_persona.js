/*

@Descripcion: Modelo de rol persona, une a rol con persona
@Autor: jose ALcivar
@FechaCreacion: 18/05/2017
@UltimaFechaModificacion: --


*/


'use strict';
module.exports = function(sequelize, DataTypes) {
  var Benefactor_persona = sequelize.define('Benefactor_persona', {
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName: true
  });
  return Benefactor_persona;
};