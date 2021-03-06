 /*
 @Descripcion: Modelo Centro
 @Autor: jose alcivar
 @FechaCreacion: 15/07/2017
 @UltimaFechaModificacion: 03/07/2017 @JV modificado el validate del estado, y el ID responsable
 */
 'use strict';
 module.exports = function(sequelize, DataTypes) {
     var Centro = sequelize.define('Centro', {
         nombreCentro: {
             type: DataTypes.STRING,
             allowNull: false,
             unique: true
         },
         direccion: {
             type: DataTypes.STRING
         },
         estado: {
             type: DataTypes.STRING,
             allowNull: false
         },
         directorCentro: {
             type: DataTypes.STRING,
             allowNull: false
         },
         directorTelefono: {
             type: DataTypes.STRING
         },
         convenio: {
             type: DataTypes.INTEGER
         },
         observacion: {
             type: DataTypes.STRING
         }
     }, {
         classMethods: {
             associate: function(models) {
                 Centro.belongsToMany(models.Nivel, {
                         through: 'CentroNivel'
                     })
                     // associations can be defined here
             }
         }
     });
     return Centro;
 };