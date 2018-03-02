'use strict';

const errors = require('../utils/errors');

module.exports = function(sequelize, DataTypes) {
  const Etapa = sequelize.define('Etapa', {
    nombre:{
      type     : DataTypes.STRING,
      allowNull: false,
      unique   : true  ,
      validate : {
        isIn    : {
          args: [ ['Iniciación', 'Primera etapa', 'Segunda etapa', 'Tercera etapa', 'Cuarta etapa', 'Quinta etapa'] ],
          msg : 'Valor ingresado como nombre de etapa no es válido.'
        },
        notEmpty: {
          msg : 'Nombre no puede ser vacío.'
        },
      }
    },
    programa: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Etapa.belongsToMany( models.Grupo , { through : 'GrupoEtapa' } );
      },
      obtenerEtapas: function(){
        return new Promise( (resolve, reject) => {
          return this.findAll({})
          .then( resultado => {
            resolve(resultado)
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      }
    }
  });
  return Etapa;
};