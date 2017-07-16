/*
@Descripcion: Modelo tarea, relacionado con Persona
@Autor: jose alcivar
@FechaCreacion: 16/06/2017
@UltimaFechaModificacion: 03/07/2017 @JV modificado el validate del estado, y el ID responsable
*/

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tarea = sequelize.define('Tarea', {
    nombre: {
      type : DataTypes.STRING,
      allowNull : false
    },
    fecha_publicacion: {
      type : DataTypes.DATE
    },
    fecha_limite: {
      type : DataTypes.DATE
    },
    prioridad : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    estado: {

      type : DataTypes.STRING,
      allowNull : false/*,
      
      validate : {
        isIn : ['activo','inactivo']
      }
      */
    },
    descripcion : {
      type : DataTypes.TEXT
    },
    categoria : {
      type : DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        Tarea.belongsTo(models.Persona, {foreignKey: 'idResponsable'})
        // associations can be defined here
      }
    }

  });
  return Tarea;
};