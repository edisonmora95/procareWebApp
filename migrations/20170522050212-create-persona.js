'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Personas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cedula: {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
      },
      nombres: {
        type : DataTypes.STRING,
        allowNull : false
      },
      apellidos: {
        type : DataTypes.STRING
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
        type : DataTypes.STRING,
        allowNull : false
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Personas');
  }
};