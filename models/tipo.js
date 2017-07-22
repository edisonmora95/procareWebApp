'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tipo = sequelize.define('Tipo', {
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true  ,
      values: ['Chico Formación', 'Caminante', 'Pescador', 'Pescador Consagrado', 'Sacerdote', 'Mayor']
    } 
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tipo.belongsToMany(models.Procariano, {through: 'ProcarianoTipo'});
      }
    }
  });
  return Tipo;
};