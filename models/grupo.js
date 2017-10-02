'use strict';
module.exports = function(sequelize, DataTypes) {
  let Grupo = sequelize.define('Grupo', {
    nombre : {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : 'Nombre del grupo no puede estar vacío.'
        },
      }
    },
    tipo : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty: {
          msg: 'Tipo del grupo no puede estar vacío.'
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
      //FUNDIONES CON PROMESAS
      ///////////////////////////////////////
      crearGrupoP: function(grupo){
        return new Promise( (resolve, reject) => {
          return this.create({
            nombre: grupo.nombre,
            tipo: grupo.tipo,
            cantidadChicos: grupo.cantidadChicos,
            numeroReuniones: grupo.numeroReuniones,
            genero: grupo.genero
          })
          .then( grupo => {
            return resolve(grupo);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      obtenerGrupoPorIdP: function(idGrupo){
        const Etapa = sequelize.import("../models/etapa");
        return new Promise( (resolve, reject) => {
          if( !idGrupo )    return reject('No envió id de grupo');
          if( idGrupo < 0 ) return reject('ID de grupo a buscar no puede ser negativo');
          return this.findOne({
            where: {
              id: idGrupo
            },
            include: [
              {
                model: Etapa,
              }
            ]
          })
          .then( grupo => {
            return resolve(grupo);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      obtenerTodosLosGruposP: function(){
        const Etapa = sequelize.import("../models/etapa");
        return new Promise( (resolve, reject) => {
          return this.findAll({
            include: [
              {
                model: Etapa
              }
            ]
          })
          .then( resultado => {
            return resolve(resultado);
          })
          .catch( error => {
            return reject(error);
          });
        });
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
      editarGrupoT: function(grupo, transaction){
        return new Promise( (resolve, reject) => {
          return this.update({
            nombre: grupo.nombre,
            tipo: grupo.tipo,
            cantidadChicos: grupo.cantidadChicos,
            numeroReuniones: grupo.numeroReuniones,
            genero: grupo.genero
          }, {
            where: {
              id: grupo.id
            },
            transaction : transaction 
          })
          .then( result => {
            return resolve(result);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      eliminarGrupoT: function(idGrupo, transaction){
        return new Promise( (resolve, reject) => {
          return this.destroy({
            where : {
              id : idGrupo
            },
            transaction : transaction
          })
          .then( resultado => {
            return resolve(resultado);
          })
          .catch( error => {
            return reject(error);
          });
        });
      }
    },
    hooks : {
      
    }
  });
  return Grupo;
};