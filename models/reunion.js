/*
@UltimaFechaModificacion: 13/09/2017 @LuisBSC15 Luis Lainez
*/

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
      allowNull : false
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
        Reunion.belongsTo(models.Grupo);
        Reunion.belongsToMany(models.Procariano, {through: 'ProcarianoReunion'});
      },
      crearReunion: function(grupo ,callback, errorCallback){
        this.create({
          fecha: reunion.fecha,
          horaInicio: reunion.horaInicio,
          horaSalida: reunion.horaSalida,
          descripcion: reunion.descripcion
        }).then(callback).catch(errorCallback);
      },
      obtenerTodosLasReuniones: function(success, error){
        const Reunion = sequelize.import("../models/reunion");
        this.findAll({
          /*include: [
            {
              model: Reunion
            }
          ]*/
        }).then(success).catch(error);
      }
    }
  });
  return Reunion;
};