'use strict';
module.exports = function(sequelize, DataTypes) {
  var Grupo = sequelize.define('Grupo', {
    nombre : {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty: true
      }
    },
    tipo : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty: {
          msg: 'Tipo no puede ser vacío.'
        },
        isIn: {
          args: [['Formación', 'Caminantes', 'Pescadores', 'Mayores']],
          msg: 'Tipo no está dentro de los valores válidos.'
        }
       
      }
    },
    cantidadChicos : {
      type: DataTypes.INTEGER,
      allowNull : false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'La cantidad de chicos debe ser un número entero.'
        },
        min: {
          args: [0],
          msg: 'La cantidad de chicos no puede ser un número negativo.'
        },
        max: {
          args: [30],
          msg: 'La cantidad de chicos no puede ser mayor a 30.'
        }
      }
    },
    numeroReuniones : {
      type : DataTypes.INTEGER,
      allowNull : false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'La cantidad de reuniones debe ser un número entero.'
        },
        min: {
          args: [0],
          msg: 'La cantidad de reuniones no puede ser un número negativo.'
        },
        max: {
          args: [30],
          msg: 'La cantidad de reuniones no puede ser mayor a 30.'
        }
      }
    },
    genero : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty: {
          msg: 'Género no puede ser vacío.'
        },
        isIn: {
          args: [['Procare', 'Procare Mujeres']],
          msg: 'Género puede ser Procare o Procare Mujeres solamente.'
        }
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
      crearGrupo: function(grupo ,callback, errorCallback){
        this.create({
          nombre: grupo.nombre,
          tipo: grupo.tipo,
          cantidadChicos: grupo.cantidadChicos,
          numeroReuniones: grupo.numeroReuniones,
          genero: grupo.genero
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
      },
      ///////////////////////////////////////
      //FUNDIONES CON TRANSACCIONES
      ///////////////////////////////////////
      crearGrupoT: function(grupo, transaction){
        return new Promise( (resolve, reject) => {
          return this.create({
            nombre: grupo.nombre,
            tipo: grupo.tipo,
            cantidadChicos: grupo.cantidadChicos,
            numeroReuniones: grupo.numeroReuniones,
            genero: grupo.genero
          }, { transaction : transaction })
          .then( grupo => {
            return resolve(grupo);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
    },
    hooks : {
      
    }
  });
  return Grupo;
};