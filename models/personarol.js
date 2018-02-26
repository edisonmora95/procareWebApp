/*
@Descripcion: Modelo de rol persona, une a rol con persona
@Autor: jose viteri
@FechaCreacion: 18/05/2017
@UltimaFechaModificacion: @erialper 12/08/2017 agrega campos al modelo
*/
'use strict';
const errors = require('../utils/errors');

module.exports = function(sequelize, DataTypes) {
  let PersonaRol = sequelize.define('PersonaRol', {
      fechaInicio : {
        type      : DataTypes.DATE,
        allowNull : true
      },
      fechaFin : {
        type      : DataTypes.DATE,
        allowNull : true
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      buscarRolesDePersonaPorId: function(idPersona){
        return new Promise( (resolve, reject) => {
          if( !idPersona )     return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id') );
          if( idPersona < 0 )  return reject( errors.SEQUELIZE_FK_ERROR('Id inválido') );
          return this.findAll({
            where: {
              fechaFin  : null,
              PersonaId : idPersona,
            }
          })
          .then( registro => {
            return resolve(registro);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      ////////////////////////////////////
      //FUNCIONES CON TRANSACCIONES
      ////////////////////////////////////
      asignarRolT: function(idPersona, rol, transaction){
        return new Promise( (resolve, reject) => {
          if( !idPersona )     return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id') );
          if( idPersona < 0 )  return reject( errors.SEQUELIZE_FK_ERROR('Id inválido') );
          return this.create({
            fechaInicio : new Date(),
            fechaFin    : null,
            PersonaId   : idPersona,
            RolNombre   : rol
          }, { transaction : transaction })
          .then( registro => {
            return resolve(registro);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      }
    },
    freezeTableName: true
  });

  return PersonaRol;
};