/*
@Descripcion: Modelo Evento, relacionado con Persona quien va quedar encargado del evento
@Autor: jose alcivar
@FechaCreacion: 16/06/2017
@UltimaFechaModificacion: --
*/
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Evento = sequelize.define('Evento', {
    nombre: {
      type : DataTypes.STRING,
      allowNull : false
    },
    fechaInicio: {
      type : DataTypes.DATE
    },
    fechaFin: {
      type : DataTypes.DATE
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
      type : DataTypes.INTEGER,
      allowNull : false,
      validate: {
        notEmpty:{
          msg: 'El valor ingresado como estado no puede estar vacío.'
        },
        isIn: {
          args: [[1, 2, 3]],    //Pendiente, En proceso, Completada
          msg: 'Debe ser un valor válido'
        }
      }
    },
    tipo: {
      type: DataTypes.STRING,
      defaultValue: 'evento'
    }
  },{
    classMethods: {
      associate: function(models) {
        Evento.belongsTo(models.Persona, {foreignKey: 'idOrganizador'})
        // associations can be defined here
      },
      obtenerTodosLosEventos: function(success, error){
        this.findAll({

        }).then(success).catch(error);
      },
      cambiarEstado: function(idEvento, estadoNuevo, success, error){
        this.update({
          estado: estadoNuevo
        }, {
          where: {
            id: idEvento
          }
        }).then(success).catch(error);
      }
    }

  });
  return Evento;
};