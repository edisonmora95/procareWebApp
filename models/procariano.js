/*
@Descripcion: Modelo de procariano
@Autor: jose viteri
@FechaCreacion: 20/05/2017
@UltimaFechaModificacion: 03/06/2017 @JoseViteri
*/
'use strict';
var Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var Procariano = sequelize.define('Procariano', {
    colegio: {
      type : DataTypes.STRING,
      allowNull : true
    },
    universidad: {
      type : DataTypes.STRING,
      allowNull : true
    },
    parroquia: {
      type : DataTypes.STRING,
      allowNull : true
    },
    fechaOrdenacion: {
      type : DataTypes.DATE,
      allowNull : true
    },
    estado: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isIn : [['activo', 'inactivo' ]]
      }
    },
    haceParticipacionEstudiantil: {
      type : DataTypes.BOOLEAN,
      allowNull : true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Procariano.belongsTo(models.Persona);
        Procariano.hasMany(models.Ticket);
        Procariano.belongsToMany(models.Tipo, {through: 'ProcarianoTipo'});
        Procariano.belongsToMany(models.Grupo, {through: 'ProcarianoGrupo'});
        Procariano.belongsToMany(models.Reunion, {through: 'ProcarianoReunion'});
      },
      crearProcariano: function(procariano, callback, errorCallback){
        this.create({
          PersonaId: procariano.PersonaId,
          colegio: procariano.colegio,
          universidad: procariano.universidad,
          parroquia: procariano.parroquia,
          fechaOrdenacion: procariano.fechaOrdenacion,
          estado: procariano.estado,
          haceParticipacionEstudiantil: procariano.haceParticipacionEstudiantil
        }).then(callback).catch(errorCallback);
      },
      buscarChicosFormacion: function(successCallback, errorCallback){
        const Tipo = sequelize.import("../models/tipo");
        const Persona = sequelize.import("../models/persona");
        this.findAll({
          include: [
            {
              model: Tipo,
              where: {
                id: 1   //Id de Chico Formación es 1
              },
              attributes: ['id', 'nombre']
            },
            {
              model: Persona,
              attributes: [['id', 'personaId'], 'nombres', 'apellidos']
            }
          ],
          where:{estado: {$not: 'inactivo'}},
          attributes: [['id', 'procarianoId'], 'estado']
        }).then(successCallback).catch(errorCallback);
      },
      obtenerProcarianosDeGrupo: function(idGrupo, successCallback, errorCallback){
        const Grupo = sequelize.import("../models/grupo");
        const Persona = sequelize.import("../models/persona");
        this.findAll({
          include: [
            {
              model: Grupo,
              where: {
                id: idGrupo
              },
              attributes: [ ['id', 'idGrupo']]
            },
            {
              model: Persona,
              attributes: [ ['id', 'idPersona'], 'nombres', 'apellidos', ]
            }
          ],
          attributes:[['id', 'idProcariano']]
        }).then(successCallback).catch(errorCallback);
      },
      obtenerProcarianoPorId: function(idProcariano, successCallback, errorCallback){
        const Persona = sequelize.import("../models/persona");
        this.findOne({
          where: {
            id: idProcariano
          },
          include: [
            {
              model: Persona,
              attributes: [['id', 'personaId'], 'nombres', 'apellidos']
            }
          ],
          attributes: [['id', 'procarianoId']]
        }).then(successCallback).catch(errorCallback);
      },
      obtenerGrupoDeProcariano: function(idProcariano, success, error){
        const Grupo = sequelize.import("../models/grupo");
        this.findOne({
          where: {
            id: idProcariano
          },
          include: [
            {
              model: Grupo
            }
          ]
        }).then(success).catch(error);
      },
      buscarProcarianosActivos: function(success, error){
        const Persona = sequelize.import("../models/persona");
        this.findAll({
          include : [{
              model : Persona
          }], 
          where : {
            estado:{$not:'inactivo'}
          }
        }).then(success).catch(error);
      }
    }
  });
  return Procariano;
};