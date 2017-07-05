/*
<<<<<<< HEAD

=======
>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149
@Descripcion: Modelo de Benefactor
@Autor: jose alcivar
@FechaCreacion: 21/06/2017
@UltimaFechaModificacion: 21/06/2017 @josealcivar
<<<<<<< HEAD


=======
>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149
*/


var bcrypt = require('bcryptjs');
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Donacion = sequelize.define('Donacion', {
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
<<<<<<< HEAD
    },
    estado: {
      type : DataTypes.STRING,
      allowNull : false
=======
>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149
    }
  }, {
    classMethods: {
      associate: function(models) {
<<<<<<< HEAD
        Donacion.belongsTo(models.Benefactor)
=======
        //Benefactor.belongsTo(models.Persona)
>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149
        // associations can be defined here
      }
    }

  });
  return Donacion;
<<<<<<< HEAD
};
=======
};
>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149
