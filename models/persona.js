
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Persona = sequelize.define('Persona', {
    cedula: {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false
    },
    nombres: {
      type : DataTypes.STRING,
      allowNull : false
    },
    apellidos: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    direccion: {
      type : DataTypes.TEXT
    },
    fechaNacimiento: {
      type : DataTypes.DATEONLY
    },
    genero : {
      type : DataTypes.STRING,
      allowNull : false
    },
    contrasenna : {
      type : DataTypes.STRING
    },
    genero : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isIn : ['masculino', 'femenino']
      }
    },
    email : {
      type : DataTypes.STRING,
      unique : true
    },
    convencional : {
      type : DataTypes.STRING
    },
    celular : {
      type : DataTypes.STRING
    },
    trabajo : {
      type : DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }/*, hooks : {
      beforeCreate : (persona, options) => {
         bcrypt.hash(persona.contrasenna, salt, function(err, hash) {
            console.log('este es el hash' + hash)
            persona.contrasenna = hash;
          });

      }
    }/*,instanceMethods: {
        generateHash: function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },
        validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        },
    }*/
  });

  return Persona;
};
