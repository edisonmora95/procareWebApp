/*
@Descripcion: Modelo de procariano
<<<<<<< HEAD

@Autor: jose Alcivar
@FechaCreacion: 29/06/2017
@UltimaFechaModificacion: 29/06/2017 @josealcivar

@Autor: jose viteri
@FechaCreacion: 20/05/2017
@UltimaFechaModificacion: 03/06/2017 @JoseViteri

=======
@Autor: jose viteri
@FechaCreacion: 20/05/2017
@UltimaFechaModificacion: 03/06/2017 @JoseViteri
>>>>>>> d1aba19f25bbe92b0dbcbd0f516fa2bc7511a9d5
*/


var bcrypt = require('bcryptjs');
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Benefactor = sequelize.define('Benefactor', {
    valor_contribucion: {
      type : DataTypes.DECIMAL(10,2),
      allowNull : false
    },
    dia_cobro: {
      type : DataTypes.INTEGER(2),
      allowNull : false
    },
    tarjeta_credito: {
      type : DataTypes.STRING,
      allowNull : true
    },
    tipo_donacion: {
      type : DataTypes.STRING,
      allowNull : true
    },
    estado: {
      type : DataTypes.STRING,
      allowNull : false,
      /*validate : {
        isIn : ['activo', 'inactivo' ]
      }*/
    },
    nombre_gestor: {
      type : DataTypes.STRING,
      allowNull : true
    },

    relacion: {
      type : DataTypes.STRING,
      allowNull : true
    },
    observacion: {
      type : DataTypes.STRING,
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {

        Benefactor.belongsTo(models.Persona , {through: 'benefactor_persona'})

      //  Benefactor.belongsTo(models.Persona)

        // associations can be defined here
      }
    }

  });
  return Benefactor;


};


};
