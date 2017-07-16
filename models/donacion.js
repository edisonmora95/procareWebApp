/*
@Descripcion: Modelo de Benefactor
@Autor: jose alcivar
@FechaCreacion: 21/06/2017
@UltimaFechaModificacion: 21/06/2017 @josealcivar
<<<<<<< HEAD

=======
>>>>>>> d1aba19f25bbe92b0dbcbd0f516fa2bc7511a9d5
*/


var bcrypt = require('bcryptjs');
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Donacion = sequelize.define('Donacion', {

   /* id_benefactor: {
      type : DataTypes.INTEGER,
      allowNull : false
    },*/

    id_benefactor: {
      type : DataTypes.INTEGER,
      allowNull : false
    },

    cantidad_donada: {
      type : DataTypes.DECIMAL(10,2),
      allowNull : false
    },
    fecha_donacion: {
      type : DataTypes.DATEONLY,
      allowNull : false
    },
    observacion: {
      type : DataTypes.STRING,
      allowNull : true


    },
    estado: {
      type : DataTypes.STRING,
      allowNull : false



    }
  }, {
    classMethods: {
      associate: function(models) {


        //Donacion.belongsTo(models.Benefactor {foreignKey: 'id_benefactor'})

        //Benefactor.belongsTo(models.Persona id_benefactor)


        //Benefactor.belongsTo(models.Persona)

        // associations can be defined here
      }
    }

  });
  return Donacion;

};

};
