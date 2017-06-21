'use strict';
module.exports = function(sequelize, DataTypes) {
  var CargoFormacion = sequelize.define('CargoFormacion', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        CargoFormacion.belongsToMany(models.Procariano, {through: 'ProcarianoCargoFormacion'});
      }
    }
  });
  return CargoFormacion;
};