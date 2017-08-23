/*
@Descripcion: Modelo tarea, relacionado con Persona
@Autor: jose alcivar
@FechaCreacion: 16/06/2017
@UltimaFechaModificacion: 03/07/2017 @JV modificado el validate del estado, y el ID responsable
*/
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Tarea = sequelize.define('Tarea', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaPublicacion: {
            type: DataTypes.DATE //YYY-MM-DD HH:MM:SS
        },
        fechaInicio: {
            type: DataTypes.DATE
        },
        fechaFin: {
            type: DataTypes.DATE
        },
        prioridad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: 'Debe ser número'
                },
                isIn: {
                    args: [
                        [1, 2, 3]
                    ], //alta, media, baja
                    msg: 'Debe ser 1, 2 ó 3'
                }
            }
        },
        estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El valor ingresado como estado no puede estar vacío.'
                },
                isIn: {
                    args: [
                        [1, 2, 3]
                    ], //Pendiente, En proceso, Completada
                    msg: 'Debe ser un valor válido'
                }
            }
        },
        descripcion: {
            type: DataTypes.TEXT
        },
        categoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El valor ingresado como categoría no puede estar vacío.'
                },
                isIn: {
                    args: [
                        [1, 2, 3]
                    ], //Formación, Acción, Fundación
                    msg: 'El valor ingresado como categoría debe ser 1, 2 ó 3'
                }
            }
        },
        tipo: {
            type: DataTypes.STRING,
            defaultValue: 'tarea'
        }
    }, {
        classMethods: {
            associate: function(models) {
                Tarea.belongsTo(models.Persona, {
                        foreignKey: 'idResponsable'
                    })
                    // associations can be defined here
            },
            obtenerTodasLasTareas: function(success, error) {
                this.findAll({}).then(success).catch(error);
            }
        }

    });
    return Tarea;
};