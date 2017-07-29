'use strict';
module.exports = function(sequelize, DataTypes) {
  var Grupo = sequelize.define('Grupo', {
    nombre : {
      type : DataTypes.STRING,
      allowNull : false
    },
    tipo : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isIn : [['Formación', 'Caminantes', 'Pescadores', 'Mayores']]
      }
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
      allowNull : false,
      validate : {
        isIn : [['Procare', 'Procare Mujeres']]
      }
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
      },
      crearGrupo: function(nombre, tipo, cantidadChicos, numeroReuniones, genero ,callback, errorCallback){
        this.create({
          nombre: nombre,
          tipo: tipo,
          cantidadChicos: cantidadChicos,
          numeroReuniones: numeroReuniones,
          genero: genero
        }).then(callback).catch(errorCallback);
      },
      obtenerGrupoPorId: function(idGrupo, success, error){
        const Etapa = sequelize.import("../models/etapa");
        this.findOne({
          where: {
            id: idGrupo
          },
          include: [
            {
              model: Etapa,
            }
          ]
        }).then(success).catch(error);
      },
      obtenerTodosLosGrupos: function(success, error){
        const Etapa = sequelize.import("../models/etapa");
        this.findAll({
          include: [
            {
              model: Etapa
            }
          ]
        }).then(success).catch(error);
      },
      editarGrupo(grupo, success, error){
        this.update({
          nombre: grupo.nombre,
          tipo: grupo.tipo,
          cantidadChicos: grupo.cantidadChicos,
          numeroReuniones: grupo.numeroReuniones,
          genero: grupo.genero
        }, {
          where: {
            id: grupo.id
          }
        }).then(success).catch(error);
      }
    },
    hooks : {
      
    }
  });
  return Grupo;
};