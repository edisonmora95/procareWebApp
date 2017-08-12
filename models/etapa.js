'use strict';
module.exports = function(sequelize, DataTypes) {
  const Etapa = sequelize.define('Etapa', {
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true  ,
      validate: {
        isIn: {
          args: [ ['Iniciación', 'Primera etapa', 'Segunda etapa', 'Tercera etapa', 'Cuarta etapa', 'Quinta etapa'] ],
          msg: 'Valor ingresado como nombre de etapa no es válido.'
        },
        notEmpty: {
          msg: 'Nombre no puede ser vacío.'
        },
      }
    },
    programa: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Etapa.belongsToMany(models.Grupo , {through: 'GrupoEtapa'})
        // associations can be defined here
      },
      obtenerEtapas: function(callback){
        this.findAll({     
        }).then(callback);
      },
      crearEtapa: function(nomrbeEtapa, callback, error){
        this.create({
          nombre: nomrbeEtapa,
          programa: ""
        }).then(callback).catch(error);
      },
      eliminarEtapa: function(idEtapa, success, error){
        this.destroy({
          where:{
            id: idEtapa
          }
        }).then(success).catch(error);
      }
    }
  });
  return Etapa;
};