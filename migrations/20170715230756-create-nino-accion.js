'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('NinoAccions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombreRep: {
        type: Sequelize.STRING
      },
      apellidoRep: {
        type: Sequelize.STRING
      },
      cedulaRep: {
        type: Sequelize.STRING
      },
      escuela: {
        type: Sequelize.STRING
      },
      bautizado: {
        type: Sequelize.BOOLEAN
      },
      estado: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('NinoAccions');
  }
};