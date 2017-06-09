var bcrypt = require('bcryptjs');
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Procariano = sequelize.define('Procariano', {
    colegio: {
      type : DataTypes.STRING,
      allowNull : true
    },
    universidad: {
      type : DataTypes.STRING,
      allowNull : true
    },
    parroquia: {
      type : DataTypes.STRING,
      allowNull : true
    },
    fechaOrdenacion: {
      type : DataTypes.DATEONLY,
      allowNull : true
    },
    estado: {
      type : DataTypes.STRING,
      allowNull : false,
      /*validate : {
        isIn : ['activo', 'inactivo' ]
      }*/
    },
    haceParticipacionEstudiantil: {
      type : DataTypes.BOOLEAN,
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Procariano.belongsTo(models.Persona)
        // associations can be defined here
      }
    }

  });
  return Procariano;
};

