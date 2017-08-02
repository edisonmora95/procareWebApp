/*
@Descripcion: Modelo 'Club por ti'
@Autor: Luis Lainez
@FechaCreacion: 14/07/2017
@UltimaFechaModificacion: 29/07/2017
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
      },
      crearTicket: function(ticket, callback, errorCallback){
        this.create({
          procarianoId: ticket.ProcarianoId,
          fechaCompra: ticket.fechaCompra,
          valor: ticket.valor,
          esGanador: ticket.esGanador
        }).then(callback).catch(errorCallback);
      },
      obtenerGanadores: function(idProcariano, successCallback, errorCallback){
        this.findAll({
          where: {
            id: idProcariano,
            esGanador: true
          }
        }).then(successCallback).catch(errorCallback);
      }
    }
  });
  return Ticket;
};