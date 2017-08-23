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
        
      },
      anadirProcarianoAGrupo: function(idGrupo, idProcariano, fechaInicio, callback, errorCallback){
        this.create({
          GrupoId: idGrupo,
          ProcarianoId: idProcariano,
          fechaInicio: fechaInicio,
          fechaFin: null
        }).then(callback).catch(errorCallback);
      },
      /*
        @Descripción: 
          Me devuelve a todos los procarianos que pertenezcan a un grupo
          Si el registro tiene fechaFin null, significa que pertenece a un grupo actualmente
      */
      buscarProcarianosConGrupo: function(callback){
        this.findAll({
          where: {
            fechaFin: null
          }
        }).then(callback);
      },
      obtenerProcarianosDeGrupo: function(idGrupo, success, error){
        this.findAll({
          where: {
            GrupoId: idGrupo
          }
        }).then(success).catch(error);
      },
      /*
        @Descripción: 
          Cuando se quiere registrar que un procariano ya no pertenece a un grupo, se le añade una fechaFin a su registro
      */
      eliminarProcarianoDeGrupo: function(idProcariano, idGrupo, success, error){
        this.update({
          fechaFin: new Date(),
        }, {
          where: {
            GrupoId: idGrupo,
            ProcarianoId: idProcariano
          }
        }).then(success).catch(error);
      },
      obtenerGrupoActualDeProcariano: function(idProcariano, success, error){
        this.findOne({
          where: {
            ProcarianoId: idProcariano,
            fechaFin: null
          }
        }).then(success).catch(error);
      }
    }
  });
  return ProcarianoGrupo;
};