'use strict';
/*
  @Descripcion: Modelo Reunión
  @Autor: @edisonmora95
  @FechaCreacion: 23/01/2018
  @UltimaFechaModificacion: --
*/

module.exports = function(sequelize, DataTypes) {
  let Reunion = sequelize.define('Reunion', {
    id            : {
      type         : DataTypes.INTEGER,
      primaryKey   : true,
      autoIncrement: true
    },
    fecha         : {
      type      : DataTypes.DATE,
      allowNull : false,
      validate  : {
        notEmpty : {
          msg : 'El campo "Fecha de asistencia" no puede estar vacío.'
        },
        isDate   : {
          msg : 'El campo "Fecha de asistencia" debe estar en formato Date'
        }
      }
    },
    descripcion : {
      type      : DataTypes.STRING(300),
      allowNull : true,
      validate  : {
        not : {
          args : /[`~,<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Descripción"'
        }
      }
    }
  }, {
    singular  : 'Reunion',
    plural    : 'Reuniones',
    tableName : 'reuniones',
    classMethods : {
      associate : function(models) {
        Reunion.belongsTo(models.Grupo);
        Reunion.belongsToMany(models.Procariano, {through: 'AsistenciaChico'});
      },
      ingresarReunion: function(idGrupo, descripcion, fecha){
        return new Promise((resolve, reject) => {
          return this.create({
            GrupoId     : idGrupo,
            descripcion : descripcion,
            fecha       : fecha
          })
          .then( result => {
            resolve(result);
          })
          .catch( error => {
            reject(error);
          });
        });
      }
    }
  });
  return Reunion;
};