'use strict';
module.exports = function(sequelize, DataTypes) {
  var Animador = sequelize.define('Animador', {
    fechaInicio : {
      type : DataTypes.DATE,
      allowNull : true
    },
    fechaFin : {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    singular : 'animador',
    plural : 'animadores',
    tableName : 'animadores',
    classMethods : {
      associate : function(models) {
        Animador.belongsTo(models.Procariano)
      },
      agregarAnimadorAGrupo: function(idAnimador, idGrupo, successCallback, errorCallback){
        this.create({
          ProcarianoId: idAnimador,
          GrupoId: idGrupo,
          fechaInicio: new Date(),
          fechaFin: null
        }).then(successCallback).catch(errorCallback);
      },
      obtenerAnimadorDeGrupo: function(idGrupo, successCallback, errorCallback){
        this.findOne({
          where: {
            GrupoId: idGrupo,
            fechaFin: null
          }
        }).then(successCallback).catch(errorCallback);
      }
    }
  });
  return Animador;
};