'use strict';
module.exports = function(sequelize, DataTypes) {
  const Etapa = sequelize.define('Etapa', {
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true  ,
      validate: {
        isIn: [ ['Iniciación', 'Primera etapa', 'Segunda etapa', 'Tercera etapa', 'Cuarta etapa', 'Quinta etapa'] ]
      }
    } 
    
    //programa: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Etapa.belongsToMany(models.Grupo , {through: 'GrupoEtapa'})
        // associations can be defined here
      },
      obtenerEtapa: function(callback){
        this.findOne({
          where: {
            id: 500
          }
        }).then(callback);
      },
      crearEtapa: function(nomrbeEtapa, callback, error){
        this.create({
          nombre: nomrbeEtapa,
          programas: ""
        }).then(callback).catch(error);
      }

    }
  });

  return Etapa;
};