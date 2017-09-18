 /*
    @Descripcion: Modelo de procariano
    /*
    @Descripcion: Modelo de procariano
    @Autor: jose viteri
    @FechaCreacion: 20/05/2017
    @UltimaFechaModificacion: 03/06/2017 @JoseViteri
    */


 var bcrypt = require('bcryptjs');
 'use strict';
 module.exports = function(sequelize, DataTypes) {
     var Benefactor = sequelize.define('Benefactor', {
         valor_contribucion: {
             type: DataTypes.DECIMAL(10, 2),
             allowNull: false
         },
         dia_cobro: {
             type: DataTypes.INTEGER(2),
             allowNull: false
         },
         tarjeta_credito: {
             type: DataTypes.STRING,
             allowNull: true
         },
         tipo_donacion: {
             type: DataTypes.STRING,
             allowNull: true
         },

         estado: {
             type: DataTypes.STRING,
             allowNull: false
                 /*validate : {
                   isIn : ['activo', 'inactivo' ]
                 }*/
         },
         nombre_gestor: {
             type: DataTypes.STRING,
             allowNull: true
         },

         relacion: {
             type: DataTypes.STRING,
             allowNull: true
         },
         observacion: {
             type: DataTypes.STRING,
             allowNull: true
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
             }
         }
     });
     return Benefactor;
 };