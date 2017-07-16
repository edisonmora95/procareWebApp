/*
@Descripcion: Modelo 'Club por ti'
@Autor: Luis Lainez
@FechaCreacion: 14/07/2017
@UltimaFechaModificacion: 16/07/2017
*/

'use strict';
module.exports = function(sequelize, DataTypes) {
   var Ticket = sequelize.define('Ticket', {
    fecha_compra : {
      type : DataTypes.DATE,
      allowNull : false
    },
    id_procariano : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    valor : {
      type : DataTypes.DECIMAL(2,2),
      allowNull : false
    },
    es_ganador : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isIn : ['si','no']
      }
    }
  }, {
    classMethods : {
      associate : function(models) {
	//Procariano.belongsTo(models.Procariano)
        // associations can be defined here
      }
    }
  });
  return Ticket;
};