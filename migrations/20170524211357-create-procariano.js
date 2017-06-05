'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Procarianos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      colegio: {
        type : DataTypes.STRING,
        allowNull : true
      },
      universidad: {
        type : DataTypes.STRING,
        allowNull : true
      },
      parroquia: {
        type : DataTypes.STRING,
        allowNull : true
      },
      fecha_ordenacion: {
        type : DataTypes.DATE,
        allowNull : true
      },
      estado: {
        type : DataTypes.BOOLEAN,
        allowNull : true
      },
      hace_participacion_estudiantil: {
        type : DataTypes.BOOLEAN,
        allowNull : true
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
    return queryInterface.dropTable('Procarianos');
  }
};