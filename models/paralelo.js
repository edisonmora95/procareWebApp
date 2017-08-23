/*
@Descripcion: Modelo de procariano
@Autor: jose Alcivar
@FechaCreacion: 5/07/2017
@UltimaFechaModificacion: 5/07/2017 @josealcivar
*/
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Paralelo = sequelize.define('Paralelo', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true

        },
        cantidadNinios: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }

    });
    return Paralelo;
};