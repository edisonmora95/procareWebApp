'use strict';
module.exports = function(sequelize, DataTypes) {
  var Persona = sequelize.define('Persona', {
    cedula: {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false
    },
    nombres: {
      type : DataTypes.STRING,
      allowNull : false
    },
    apellidos: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    direccion: {
      type : DataTypes.TEXT
    },
    fechaNacimiento: {
      type : DataTypes.DATEONLY
    },
    genero : {
      type : DataTypes.STRING,
      allowNull : false
    },
    contrasenna : {
      type : DataTypes.STRING
    },
    genero : {
      type : DataTypes.STRING
    },
    email : {
      type : DataTypes.STRING,
      unique : true
    },
    convencional : {
      type : DataTypes.STRING
    },
    celular : {
      type : DataTypes.STRING
    },
    trabajo : {
      type : DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Persona;
};