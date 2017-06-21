/*

@Descripcion: Modelo Evento, relacionado con Persona quien va quedar encargado del evento
@Autor: jose alcivar
@FechaCreacion: 16/06/2017
@UltimaFechaModificacion: --


*/
var bcrypt = require('bcryptjs');
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Evento = sequelize.define('Evento', {
    id_organizador: {
      type : DataTypes.INTEGER,
      unique : true,
      allowNull : false
    },
    nombre: {
      type : DataTypes.STRING,
      allowNull : false
    },
    fecha: {
      type : DataTypes.DATEONLY
    },
    descripcion : {
      type : DataTypes.TEXT
    },
    lugar : {
      type : DataTypes.STRING(200)
    },
    gastos : {
      type : DataTypes.DECIMAL(10,2)
    },
    ingresos : {
      type : DataTypes.DECIMAL(10,2)
    },
    estado: {
      type : DataTypes.STRING,
      allowNull : false
		}
  }, {
    classMethods: {
			associate: function(models) {
        Evento.belongsTo(models.Persona)
        // associations can be defined here
      }
    }

  });
  return Evento;
};
