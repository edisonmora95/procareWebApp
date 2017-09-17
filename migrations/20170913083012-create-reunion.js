/*
@Autor: Luis Lainez
@FechaCreacion: 13/09/2017
@UltimaFechaModificacion: 13/09/2017
*/


'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Reuniones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      horaInicio: {
        type: Sequelize.DATETIME
      },
      horaSalida: {
        type: Sequelize.DATETIME
      },
      descripcion: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Grupos');
  }
};