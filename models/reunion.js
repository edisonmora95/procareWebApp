'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reunion = sequelize.define('Reunion', {
    fecha : {
      type : DataTypes.DATEONLY,
      allowNull : true
    },
    horaInicio : {
      type : DataTypes.DATE,
      allowNull : true
    },
    horaSalida : {
      type : DataTypes.DATE,
      allowNull : true
    },
    descripcion : {
      type : DataTypes.STRING(300),
      allowNull : true
    }
  }, {
    singular : 'Reunion',
    plural : 'Reuniones',
    tableName : 'reuniones',
    classMethods : {
      associate : function(models) {
        Reunion.belongsToMany(models.Procariano, {through: 'ProcarianoReunion'});
      }
    }
  });
  return Reunion;
};