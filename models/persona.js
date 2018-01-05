/*
  @Descripcion: Modelo de persona
  @Autor: jose viteri
  @FechaCreacion: 20/05/2017
  @UltimaFechaModificacion: 19/08/2017 @JoseViteri se agrego tipo, se quito sueldo
*/
let bcrypt = require('bcryptjs');
'use strict';
module.exports = function(sequelize, DataTypes) {
  let Persona = sequelize.define('Persona', {
    cedula: {
      type      : DataTypes.STRING,
      unique    : true,
      allowNull : false,
      validate  : {
        notEmpty: {
          msg : 'El campo "Cédula" no puede estar vacío'
        },
        isNumeric : {
          msg   : 'La cédula solo puede contener números'
        },
        len     : {
          args  : [10, 10],
          msg   : 'La cédula debe tener 10 caracteres'
        },
      }
    },
    nombres: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        notEmpty  : {
          msg     : 'El campo "Nombres" no puede estar vacío'
        },
        not : {
          args : /[`~,<>;':"/[\]|{}()=_+-\d]/,
          msg  : 'No puede ingresar caracteres especiales en "Nombre"'
        }
      }
    },
    apellidos: {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        notEmpty  : {
          msg     : 'El campo "Apellidos" no puede estar vacío'
        },
        not : {
          args : /[`~,<>;':"/[\]|{}()=_+-\d]/,
          msg  : 'No puede ingresar caracteres especiales en "Apellidos"'
        }
      }
    },
    razonSocial : {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,<>;':"/[\]|{}()=_+-\d]/,
          msg  : 'No puede ingresar caracteres especiales en "Razón Social"'
        }
      }
    },
    direccion: {
      type      : DataTypes.TEXT,
      allowNull : false,
      validate  : {
        notEmpty  : {
          msg     : 'El campo "Dirección" no puede estar vacío'
        },
        not : {
          args : /[`~,<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Dirección"'
        }
      }
    },
    fechaNacimiento: {
      type      : DataTypes.DATE,
      allowNull : false,
      validate  : {
        notEmpty  : {
          msg     : 'El campo "Fecha de nacimiento" no puede estar vacío'
        },
        isDate    : {
          msg     : 'El campo "Fecha de nacimiento" debe estar en formato Date'
        },
        isBefore  : {
          args    :  new Date().toString() ,
          msg     : 'No puede ingresar una fecha de nacimiento futura'
        }
      }
    },
    contrasenna : {
      type      : DataTypes.STRING,
      allowNull : true
    },
    genero : {
      type      : DataTypes.STRING,
      allowNull : false,
      validate  : {
        notEmpty  : {
          msg     : 'El campo "Género" no puede estar vacío'
        },
        isIn    : {
          args : [['masculino', 'femenino']],
          msg  : 'El género ingresado debe ser "masculino" o "femenino"'
        }
      }
    },
    email : {
      type      : DataTypes.STRING,
      allowNull : false,
      unique    : true,
      validate  : {
        notEmpty  : {
          msg     : 'El campo "Email" no puede estar vacío'
        },
        not : {
          args : /[`~,<>;':"/[\]|{}()=+]/,
          msg  : 'No puede ingresar caracteres especiales en "Email"'
        },
        isEmail   : {
          msg     : 'El campo "Email" debe contener un email válido'
        }
      }
    },
    convencional : {
      type       : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,<>;':"/[\]|{}=_+]/,
          msg  : 'No puede ingresar caracteres especiales en "Dirección"'
        },
        len       : {
          args    : [0, 15],
          msg     : 'No más de 15 caracteres'
        }
      }
    },
    celular : {
      type      : DataTypes.STRING,
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,<>;':"/[\]|{}=_+]/,
          msg  : 'No puede ingresar caracteres especiales en "Dirección"'
        },
        len       : {
          args    : [0, 15],
          msg     : 'No más de 15 caracteres'
        }
      }
    },
    trabajo : {
      type      : DataTypes.TEXT,
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Trabajo"'
        }
      }
    },
    tipo : {
      type : DataTypes.STRING
    },
    imagenUrl : {
      type      : DataTypes.STRING,
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Persona.belongsToMany(models.Rol , {through: 'PersonaRol'})
        // associations can be defined here
      },
      compararContrasenna :  function(candidatePassword, hash, done, user){
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if(err) {
              return done(null, false , { status : false ,  message : "Usuario no registrado en el sistema"});
            }
            if (isMatch){
              return done(null,user, {status : true , message : "Logueado correctamente"});
            }
            else{
              return done(null, false , { status : false ,  message : "Contraseña inválida"});
            }
        });
      },
      compararContrasenna2 :  function(candidatePassword, hash, callback){
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if(err){
              return done(null, false , { status : false ,  message : "Usuario no registrado en el sistema"});
            }
            return callback(null , isMatch);

        });
      },
      crearPersona: function(persona, callback, errorCallback){
        this.create({
          cedula: persona.cedula,
          nombres: persona.nombres,
          apellidos: persona.apellidos,
          direccion: persona.direccion,
          fechaNacimiento: persona.fechaNacimiento,
          genero: persona.genero,
          contrasenna: persona.contrasenna,
          email: persona.email,
          celular: persona.celular,
          trabajo: persona.trabajo,
          convencional: persona.convencional,
          tipo: persona.tipo
        }).then(callback).catch(errorCallback);
      },
      ///////////////////////////////////////
      //FUNCIONES CON PROMESAS
      ///////////////////////////////////////
      buscarPersonaPorCedulaP: function(cedula){
        return new Promise( (resolve, reject) => {
          if( !cedula ) return reject('No ingresó la cédula a buscar');
          return this.findOne({
            where : {
              cedula : cedula
            }
          })
          .then( persona => {
            return resolve(persona);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      buscarPersonaPorEmailP: function(email){
        return new Promise( (resolve, reject) => {
          return this.findOne({
            where : {
              email : email
            }
          })
          .then( persona => {
            return resolve(persona);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      obtenerRolesP: function(idPersona){
        const Rol = sequelize.import("../models/rol");
        return new Promise( (resolve, reject) => {
          return this.findOne({
            where : {
              id : idPersona
            },
            include : [
              {
                model : Rol
              }
            ]
          })
          .then( persona => {
            return resolve(persona.Rols);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      ///////////////////////////////////////
      //FUNCIONES CON TRANSACCIONES
      ///////////////////////////////////////
      crearPersonaT: function(persona, transaction){
        return new Promise( (resolve, reject) => {
          return this.create({
            cedula          : persona.cedula,
            nombres         : persona.nombres,
            apellidos       : persona.apellidos,
            direccion       : persona.direccion,
            fechaNacimiento : persona.fechaNacimiento,
            genero          : persona.genero,
            contrasenna     : persona.contrasenna,
            email           : persona.email,
            celular         : persona.celular,
            trabajo         : persona.trabajo,
            convencional    : persona.convencional,
            tipo            : persona.tipo,
            imagenUrl       : persona.imagenUrl
          }, { transaction  : transaction })
          .then( persona => {
            return resolve(persona);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      editarPersonaT: function(idPersona, persona, transaction){
        return new Promise( (resolve, reject) => {
          if( !idPersona )    return reject('No ingresó id de Persona.');
          if( idPersona < 0 ) return reject('Id de Persona no puede ser negativo.');
          return this.update({
            cedula          : persona.cedula,
            nombres         : persona.nombres,
            apellidos       : persona.apellidos,
            direccion       : persona.direccion,
            fechaNacimiento : persona.fechaNacimiento,
            genero          : persona.genero,
            email           : persona.email,
            celular         : persona.celular,
            trabajo         : persona.trabajo,
            convencional    : persona.convencional,
            tipo            : persona.tipo
          }, 
          { 
            where : {
              id  : idPersona
            },
            transaction  : transaction 
          })
          .then( resultado => {
            return resolve(resultado);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      ingresarContrasenna: function(idPersona, contrasenna, transaction){
        return new Promise( (resolve, reject) => {
           return this.update({
            contrasenna : contrasenna
          }, 
          { 
            where : {
              id  : idPersona
            },
            transaction  : transaction 
          })
          .then( resultado => {
            return resolve(resultado);
          })
          .catch( error => {
            return reject(error);
          });
        });
      },
      cambiarContrasenna: function(email, contrasenna){
        return new Promise((resolve, reject) => {
          return this.update({
            contrasenna : contrasenna
          },
          {
            where : {
              email : email
            }
          })
          .then( resultado => {
            resolve(resultado);
          })
          .catch( error => {
            reject(error);
          });
        });
      }

    }
    });
    return Persona;
};