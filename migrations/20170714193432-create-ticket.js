/*
@Autor: Luis Lainez
@FechaCreacion: 14/07/2017
@UltimaFechaModificacion: 16/07/2017
*/


'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Etapas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaCompra: {
	allowNull: false,
        type: Sequelize.DATE
      },
      valor: {
	allowNull: false,
        type: Sequelize.DOUBLE
      },
      esGanador: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('TickerClubPorTi');
  }
};