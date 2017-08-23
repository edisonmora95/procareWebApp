/*
@Descripcion: Modelo Nivel
@Autor: jose alcivar
@FechaCreacion: 15/07/2017
@UltimaFechaModificacion: 03/07/2017 @JV modificado el validate del estado, y el ID responsable
*/

'use strict';
module.exports = function(sequelize, DataTypes) {
    var Nivel = sequelize.define('Nivel', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'Nombre no puede ser vacío.'
                },
                isIn: {
                    args: [
                        ['Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4']
                    ],
                    msg: 'Nombre no está dentro de los valores válidos.'
                }

            }
        },
        programa: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function(models) {
                Nivel.belongsToMany(models.Centro, {
                        through: 'CentroNivel'
                    })
                    // associations can be defined here
            }
        }

    });
    return Nivel;
};