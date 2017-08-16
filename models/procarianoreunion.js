'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProcarianoReunion = sequelize.define('ProcarianoReunion', {
    esJustificada : {
      type : DataTypes.BOOLEAN,
      allowNull : true
    },
    descripcion : {
      type : DataTypes.STRING(300),
      allowNull : true
    }
  }, {
    singular : 'ProcarianoReunion',
    plural : 'ProcarianoReunion',
    tableName : 'procarianoreunion',
    classMethods : {
      associate : function(models) {
        
      }
    }
  });
  return ProcarianoReunion;
};