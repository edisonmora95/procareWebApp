'use strict';

const errors = require('../utils/errors');

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
      singular : 'Grupo',
      plural   : 'Grupos',
      tableName: 'grupos'
    },
    classMethods : {
      associate : function(models) {
        Grupo.hasOne(models.Animador);
        Grupo.hasMany(models.Reunion, {as : 'Reuniones'});
        Grupo.belongsToMany(models.Procariano, {through: 'ProcarianoGrupo'});
        Grupo.belongsToMany(models.Etapa , {through: 'GrupoEtapa'});
      },
      ///////////////////////////////////////
      //FUNDIONES CON PROMESAS
      ///////////////////////////////////////
      obtenerGrupoPorIdP: function(idGrupo){
        const Etapa = sequelize.import("../models/etapa");
        return new Promise( (resolve, reject) => {
          if ( !idGrupo )    { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') ); }
          if ( idGrupo < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') ); }
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
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
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
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      ///////////////////////////////////////
      //FUNDIONES CON TRANSACCIONES
      ///////////////////////////////////////
      /**
        @Descripción:
          Crea el regstro del grupo. No hace commit.
        @Params:
          {Object} grupo json con la información necesaria para crear le grupo
          {Object} transaction
        @Success:
          {Object} grupo
        @Error:
          {Object} fail Sequelize error {tipo, mensaje}
      */
      crearGrupoT: function(grupo, transaction){
        return new Promise( (resolve, reject) => {
          return this.create({
            nombre         : grupo.nombre,
            tipo           : grupo.tipo,
            genero         : grupo.genero,
            cantidadChicos : grupo.cantidadChicos,
            numeroReuniones: grupo.numeroReuniones,
          }, { transaction : transaction })
          .then( grupo => {
            return resolve(grupo);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      editarGrupoT: function(grupo, idGrupo, transaction){
        return new Promise( (resolve, reject) => {
          if ( !idGrupo )    { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') ); }
          if ( idGrupo < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') ); }
          return this.update({
            nombre         : grupo.nombre,
            tipo           : grupo.tipo,
            genero         : grupo.genero,
            cantidadChicos : grupo.cantidadChicos,
            numeroReuniones: grupo.numeroReuniones,
          }, {
            where: {
              id: idGrupo
            },
            transaction : transaction 
          })
          .then( result => {
            return resolve(result);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      /**
        @Descripción:
          Elimina los registro del grupo. No hace commit.
        @Params:
          {Int} idGrupo  Id del grupo
          {Object} transaction
        @Success:
          {Int} registro cantidad de registros eliminados
        @Error:
          {Object} fail Sequelize error {tipo, mensaje}
      */
      eliminarGrupoT: function(idGrupo, transaction){
        return new Promise( (resolve, reject) => {
          if ( !idGrupo )    { return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id del grupo') ); }
          if ( idGrupo < 0 ) { return reject( errors.SEQUELIZE_FK_ERROR('Id del grupo inválido') ); }
          return this.destroy({
            where : {
              id : idGrupo
            },
            transaction : transaction
          })
          .then( resultado => {
            if ( resultado === 1 ) { return resolve(resultado); }
            return reject( errors.SEQUELIZE_ERROR('Cantidad de registros encontrados incorrecta. Se cancela la eliminación', 'Delete error') );
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      }
    },
    hooks : {
      
    }
  });
  return Grupo;
};