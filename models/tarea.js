
/*


@Descripcion: Modelo tarea, relacionado con Persona
@Autor: jose alcivar
@FechaCreacion: 16/06/2017
@UltimaFechaModificacion: --


*/
var bcrypt = require('bcryptjs');

/*

@Descripcion: Modelo tarea, relacionado con Persona
@Autor: jose alcivar
@FechaCreacion: 16/06/2017
@UltimaFechaModificacion: 03/07/2017 @JV modificado el validate del estado, y el ID responsable
*/


'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tarea = sequelize.define('Tarea', {

    id_responsable: {
      type : DataTypes.INTEGER,
      unique : true,
      allowNull : false
    },

    nombre: {
      type : DataTypes.STRING,
      allowNull : false
    },
    fecha_publicacion: {

      type : DataTypes.DATEONLY
    },
    fecha_limite: {
      type : DataTypes.DATEONLY

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


      type : DataTypes.STRING(1),

      allowNull : false

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

        Tarea.belongsTo(models.Persona)

        Tarea.belongsTo(models.Persona, {foreignKey: 'idResponsable'})

        // associations can be defined here
      }
    }

  });
  return Tarea;

};

};

