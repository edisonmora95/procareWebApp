'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rol = sequelize.define('Rol', {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      descripcion: {
        type: DataTypes.TEXT
      },
  }, {
    classMethods: {
      associate: function(models) {
        Rol.belongsToMany(models.Persona, {through: 'PersonaRol'});

        // associations can be defined here
      }
    }
  });
  return Rol;
};