/*
@Descripcion: Modelo de procariano
@Autor: jose viteri
@FechaCreacion: 20/05/2017
@UltimaFechaModificacion: 03/06/2017 @JoseViteri
*/

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
        Procariano.belongsToMany(models.Tipo, {through: 'ProcarianoTipo'});
        Procariano.belongsToMany(models.Grupo, {through: 'ProcarianoGrupo'});
        Procariano.belongsToMany(models.Reunion, {through: 'ProcarianoReunion'});
      }
    }

  });
  return Procariano;
};

