/*
@Descripcion: Modelo 'Club por ti'
@Autor: Luis Lainez
@FechaCreacion: 14/07/2017
@UltimaFechaModificacion: 16/07/2017
*/

'use strict';
module.exports = function(sequelize, DataTypes) {
   var Ticket = sequelize.define('Ticket', {
    fechaCompra : {
      type : DataTypes.DATE,
      allowNull : false
    },
    valor : {
      type : DataTypes.DOUBLE,
      allowNull : false
    },
    esGanador : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isIn : [['si', 'no']]
      }
    }
  }, {
    classMethods : {
      associate : function(models) {
        Ticket.belongsTo(models.Procariano)
        // associations can be defined here
      }
    }
  });
  return Ticket;
};