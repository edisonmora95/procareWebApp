'use strict';
module.exports = function(sequelize, DataTypes) {
  var Etapa = sequelize.define('Etapa', {

    nombre: DataTypes.STRING,
    programa: DataTypes.STRING

    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true  ,
      values: ['Iniciación', 'Primera etapa', 'Segunda etapa', 'Tercera etapa', 'Cuarta etapa', 'Quinta etapa']
    } 
    
    //programa: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Etapa;
};