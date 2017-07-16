/*
@Descripcion: Modelo Nivel
@Autor: jose alcivar
@FechaCreacion: 15/07/2017
@UltimaFechaModificacion: 03/07/2017 @JV modificado el validate del estado, y el ID responsable
*/

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Nivel = sequelize.define('Nivel', {
    nombre: {
      type : DataTypes.STRING,
      allowNull : false
    },
    programa: {
      type : DataTypes.STRING
    }, 
    estado: {

      type : DataTypes.STRING,
      allowNull : false
    }
   
  }, {
    classMethods: {
      associate: function(models) {
        Nivel.belongsTo(models.Centro, {foreignKey: 'idCentro'})
        // associations can be defined here
      }
    }

  });
  return Nivel;
};

