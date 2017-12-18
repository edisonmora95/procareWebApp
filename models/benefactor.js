/*
  @Descripcion: Modelo de Benefactor
  @Autor: jose viteri
  @FechaCreacion: 20/05/2017
  @UltimaFechaModificacion: 03/06/2017 @JoseViteri
*/
'use strict';

const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  let Benefactor = sequelize.define('Benefactor', {
    valorContribucion: {
      type      : DataTypes.DECIMAL(10, 2),
      allowNull : false,
      validate  : {
        notEmpty : {
          msg : 'El valor de la contribución no puede estar vacío.'
        },
        min      : {
          args : [0],
          msg  : 'El valor de la contribución no puede ser menor a 0.'
        }
      }
    },
    diaCobro: {
      type      : DataTypes.INTEGER(2),
      allowNull : false,
      validate  : {
        notEmpty  : {
          msg : 'El campo día de cobro no puede estar vacío'
        },
        min      : {
          args : [0],
          msg  : 'El valor de día de cobro no puede ser menor a 0.'
        },
        max      : {
          args : [31],
          msg  : 'El valor de la contribución no puede ser maxor a 31.'
        }
      }
    },
    tarjetaCredito: {
      type      : DataTypes.STRING,
      allowNull : true,
    },
    tipoDonacion: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not       : {
          args  : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg   : 'No puede ingresar caracteres especiales en "Tipo de donación"'
        }
      }
    },
    estado: {
      type      : DataTypes.STRING,
      allowNull : false,
      validate  : {
        notEmpty  : {
          msg   : 'El valor de estado no puede estar vacío.'
        },
        isIn      : {
          args  : [['activo', 'inactivo']],
          msg   : 'El estado debe ser activo o inactivo'
        }
      }
    },
    nombreGestor: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not       : {
          args  : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg   : 'No puede ingresar caracteres especiales en "Nombre de gestor"'
        }
      }
    },
    relacion: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not       : {
          args  : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg   : 'No puede ingresar caracteres especiales en "Relación"'
        }
      }
    },
    observacion: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not       : {
          args  : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg   : 'No puede ingresar caracteres especiales en "Observación"'
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Benefactor.belongsTo(models.Persona);
        // Benefactor.belongsToMany(models.Persona, {through: 'BenefactorPersona'});
      },
      crearBenefactor: function(benefactor, callback, errorCallback) {
        this.create({
          PersonaId: benefactor.PersonaId,
          valor_contribucion: benefactor.valor_contribucion,
          dia_cobro: benefactor.dia_cobro,
          tarjeta_credito: benefactor.tarjeta_credito,
          tipo_donacion: benefactor.tipo_donacion,
          estado: benefactor.estado,
          nombre_gestor: benefactor.nombre_gestor,
          relacion: benefactor.relacion,
          observacion: benefactor.observacion
        }).then(callback).catch(errorCallback);
      },
      obtenerProcarianoPorId: function(idBenefactor, successCallback, errorCallback) {
        const Persona = sequelize.import("../models/persona");
        this.findOne({
          where: {
            id: idBenefactor
          },
          include: [{
            model: Persona,
            attributes: [
              ['id', 'personaId'], 'nombres', 'apellidos'
            ]
          }],
          attributes: [
            ['id', 'benefactorId']
          ]
        }).then(successCallback).catch(errorCallback);
      },
      /*
        @Descripción : Busca a todos los benefactores de la base de datos
        @Return      : Devuelve la información de: Benefactor y Persona
      */
      obtenerBenefactoresP: function(){
        const Persona = sequelize.import("../models/persona");
        return new Promise( (resolve, reject) => {
          return this.findAll({
            include : [
              {
                model : Persona
              }
            ]
          })
          .then( benefactores => {
            return resolve(benefactores);
          })
          .catch( error => {
            return reject(error);
          })
        });
      },
      obtenerProcarianoPorIdPersonaP: function(idPersona){
        const Persona = sequelize.import("../models/persona");
        return new Promise( (resolve, reject) => {
          return this.findAll({
            include : [
              {
                model : Persona
              }
            ],
            where  :  {
              personaId : idPersona
            }
          })
          .then( benefactor => {
            return resolve(benefactor);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      ///////////////////////////////////////
      //FUNDIONES CON TRANSACCIONES
      ///////////////////////////////////////
      /*
        @Descripción : Crea un registro en la tabla Benfecator de la base de datos a partir de una transacción
        @Params      : 
          benefactor  : Objeto con la información del Benfactor a crear
          transaction : Transacción para crear al Benefactor
        @Return      : Promesa con la información del Benefactor creado
      */
      crearBenefactorT: function(benefactor, transaction){
        return new Promise( (resolve, reject) => {
          return this.create({
            PersonaId         : benefactor.PersonaId,
            valorContribucion : benefactor.valorContribucion,
            diaCobro          : benefactor.diaCobro,
            tarjetaCredito    : benefactor.tarjetaCredito,
            tipoDonacion      : benefactor.tipoDonacion,
            estado            : benefactor.estado,
            nombreGestor      : benefactor.nombreGestor,
            relacion          : benefactor.relacion,
            observacion       : benefactor.observacion
          }, { transaction : transaction })
          .then( benefactor => {
            return resolve(benefactor);
          })
          .catch( error => {
            return reject(error);
          });
        });
      }
     }
  });
  return Benefactor;
 };