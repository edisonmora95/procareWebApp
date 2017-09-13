/*
@Descripcion: Modelo de rol persona, une a rol con persona
@Autor: jose viteri
@FechaCreacion: 18/05/2017
@UltimaFechaModificacion: @erialper 12/08/2017 agrega campos al modelo
*/
'use strict';
module.exports = function(sequelize, DataTypes) {
  var PersonaRol = sequelize.define('PersonaRol', {
      fechaInicio : {
        type : DataTypes.DATE,
        allowNull : true
      },
      fechaFin : {
        type : DataTypes.DATE,
        allowNull : true
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      buscarRolDePersonaPorId: function(idPersona){
        return new Promise( (resolve, reject) => {
          return this.findOne({
            where: {
              fechaFin : null,
              PersonaId : idPersona,
              RolNombre : 'Animador'
            }
          })
          .then( registro => {
            return resolve(registro);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      ////////////////////////////////////
      //FUNCIONES CON TRANSACCIONES
      ////////////////////////////////////
      asignarRolT: function(idPersona, rol, transaction){
        return new Promise( (resolve, reject) => {
          return this.create({
            fechaInicio : new Date(),
            fechaFin : null,
            PersonaId : idPersona,
            RolNombre : rol
          }, { transaction : transaction })
          .then( registro => {
            return resolve(registro);
          })
          .catch( error => {
            return reject(error);
          });
        });
      }
    },
    freezeTableName: true
  });

  return PersonaRol;
};