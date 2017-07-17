'use strict';
module.exports = function(sequelize, DataTypes) {
  var Grupo = sequelize.define('Grupo', {
    nombre : {
      type : DataTypes.STRING,
      allowNull : false
    },
    tipo : {
      type : DataTypes.STRING,
      allowNull : false
    },
    cantidadChicos : {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    numeroReuniones : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    genero : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    name : {
      singular: 'Grupo',
      plural: 'Grupos',
      tableName: 'grupos'
    },
    classMethods : {
      associate : function(models) {
        Grupo.hasOne(models.Animador)
        Grupo.hasMany(models.Reunion, {as : 'Reuniones'})
        Grupo.belongsToMany(models.Procariano, {through: 'ProcarianoGrupo'})
        Grupo.belongsToMany(models.Etapa , {through: 'GrupoEtapa'})
      }
    }
  });
  return Grupo;
};