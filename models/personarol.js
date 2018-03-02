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
      /*
        @Description: 
          Devuelve todos los roles de la Persona.
        @Params:
          {int} idPersona  Id de la persona
        @Success: 
          {Object[]} procariano  Array con los roles de la Persona
        @Error:
          {Object} fail SEQUELIZE_ERROR
      */
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
      /*
        @Description: 
          Devuelve todos los roles de la Persona.
        @Params:
          {int} idPersona  Id de la persona
          {String} rol Nombre del rol a buscar
        @Success: 
          {Boolean} resultado  True|False dependiendo de si tiene o no el rol actualmente
        @Error:
          {Object} fail SEQUELIZE_ERROR Error en búsqueda
      */
      personaTieneRolActualmente: function(idPersona, rol){
        return new Promise( (resolve, reject) => {
          if( !idPersona )     return reject( errors.SEQUELIZE_FK_ERROR('No ingresó el id') );
          if( idPersona < 0 )  return reject( errors.SEQUELIZE_FK_ERROR('Id inválido') );
          return this.findOne({
            where: {
              fechaFin  : null,
              PersonaId : idPersona,
              RolNombre : rol
            }
          })
          .then( registro => {
            if ( !registro ) { return resolve(false); }
            return resolve(true);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      },
      ////////////////////////////////////
      // FUNCIONES CON TRANSACCIONES
      ////////////////////////////////////
      /**
        @Descripción:
          Crea el regstro del Rol de la Persona. No hace commit.
        @Params:
          {Int}    idPersona  Id de la Persona
          {String} rol        Nombre del rol
          {Object} transaction
        @Success:
          {Object} registro registro creado en la base
        @Error:
          {Object} fail Sequelize error {tipo, mensaje}
      */
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