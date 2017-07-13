'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProcarianoGrupo = sequelize.define('ProcarianoGrupo', {
    fechaInicio : {
      type : DataTypes.DATE,
      allowNull : true
    },
    fechaFin : {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    singular : 'ProcarianoGrupo',
    plural : 'ProcarianoGrupo',
    tableName : 'procarianogrupo',
    classMethods : {
      associate : function(models) {
        
      }
    }
  });
  return ProcarianoGrupo;
};