/*
@Descripcion: Modelo tarea, relacionado con Persona
@Autor: jose alcivar
@FechaCreacion: 16/06/2017
@UltimaFechaModificacion: 03/07/2017 @JV modificado el validate del estado, y el ID responsable
*/
'use strict';

const errors = require('../utils/errors');

module.exports = function(sequelize, DataTypes) {
  let Tarea = sequelize.define('Tarea', {
    nombre: {
      type 		 : DataTypes.STRING,
      allowNull: false,
      validate : {
      	notEmpty: {
          msg : 'El campo "Nombre" no puede estar vacío'
        },
      	not 		: {
          args : /[`~,.<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Nombre"'
        }
      }
    },
    fechaPublicacion: {
      type 				: DataTypes.DATE, //YYY-MM-DD HH:MM:SS
      allowNull 	: false,
      defaultValue: sequelize.NOW,
      validate  	: {
        notEmpty : {
          msg  : 'El campo "Fecha de publicación" no puede estar vacío'
        },
        isDate 	 : {
          msg  : 'El campo "Fecha de publicación" debe estar en formato Date'
        },
        isValidDate(date) {
          if ( new Date(date) > new Date() ) {
            throw new Error('No puede ingresar una fecha de publicación futura');
          }
        }
      }
    },
    fechaInicio: {
      type 				: DataTypes.DATE, //YYY-MM-DD HH:MM:SS
      allowNull 	: false,
      defaultValue: sequelize.NOW,
      validate  	: {
        notEmpty : {
          msg  : 'El campo "Fecha de inicio" no puede estar vacío'
        },
        isDate 	 : {
          msg  : 'El campo "Fecha de inicio" debe estar en formato Date'
        },
        isAfter(value){
          const fechaIngresada = new Date(value);
          const fechaActual    = new Date().setHours(0,0,0,0);
          if( fechaActual > fechaIngresada.getTime() ){
            throw new Error('No puede ingresar una fecha de inicio que ya pasó');
          }
        }
      }
    },
    fechaFin: {
      type 				: DataTypes.DATE, //YYY-MM-DD HH:MM:SS
      allowNull 	: true,
      validate    : {
        isDate   : {
          msg  : 'El campo "Fecha fin" debe estar en formato Date'
        },
        isAfter(value){
          const fechaIngresada = new Date(value);
          const fechaActual    = new Date().setHours(0,0,0,0);
          if( fechaActual > fechaIngresada.getTime() ){
            throw new Error('No puede ingresar una fecha fin que ya pasó');
          }
        }
      }
    },
    prioridad: {
      type 		 : DataTypes.INTEGER,
      allowNull: false,
      validate : {
      	notEmpty  : {
          msg : 'El campo "Prioridad" no puede estar vacío'
        },
        isNumeric: {
          msg: 'El campo "Prioridad" debe ser número'
        },
        isIn: {
          args: [ [1, 2, 3] ], //alta, media, baja
          msg : 'El campo "Prioridad" debe ser 1, 2 ó 3'
        }
      }
    },
    estado: {
      type 		 : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: 'El campo "Estado" no puede estar vacío'
        },
        isNumeric: {
          msg: 'El campo "Estado" debe ser número'
        },
        isIn: {
          args: [  [1, 2, 3] ], //Pendiente, En proceso, Completada
          msg: 'El campo "Estado" debe ser 1, 2 ó 3'
        }
      }
    },
    descripcion: {
      type      : DataTypes.TEXT,
      allowNull : false,
      validate  : {
        notEmpty  : {
          msg     : 'El campo "Descripción" no puede estar vacío'
        },
        not : {
          args : /[`~,<>;':"/[\]|{}()=_+-]/,
          msg  : 'No puede ingresar caracteres especiales en "Descripción"'
        }
      }
    },
    categoria: {
      type 		 : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: 'El campo "Categoría" no puede estar vacío'
        },
        isNumeric: {
          msg: 'El campo "Categoría" debe ser número'
        },
        isIn: {
          args: [ [1, 2, 3] ], //Formación, Acción, Fundación
          msg : 'El campo "Categoría" debe ser 1, 2 ó 3'
        }
      }
    },
    tipo: {
      type: DataTypes.STRING,
      defaultValue: 'tarea'
    }
  },
  {
    classMethods: {
      associate: function(models) {
        Tarea.belongsTo(models.Persona, {foreignKey: 'idResponsable'})
      },
      crearTareaP(tarea){
      	return new Promise( (resolve, reject) => {
          if( !tarea.idResponsable )    return reject( errors.SEQUELIZE_FK_ERROR('Debe enviar el id del responsable') );
          if( tarea.idResponsable < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('El id del responsable debe ser mayor a 0') );
      		return this.create({
		    		nombre 					 : tarea.nombre,
		    		fechaPublicacion : tarea.fechaPublicacion,
		    		fechaInicio 		 : tarea.fechaInicio,
		    		fechaFin 				 : tarea.fechaFin,
		    		prioridad 			 : tarea.prioridad,
		    		estado 					 : tarea.estado,
		    		descripcion 		 : tarea.descripcion,
		    		categoria 			 : tarea.categoria,
		    		tipo 						 : 'tarea',
            idResponsable    : tarea.idResponsable
		    	})
		    	.then( tarea => {
		    		return resolve(tarea);
		    	})
		    	.catch( fail => {
		    		return reject( errors.ERROR_HANDLER(fail) );
		    	});
      	});
      },
      obtenerTodasLasTareasP(){
      	const Persona = sequelize.import("../models/persona");
      	return new Promise( (resolve, reject) => {
					return this.findAll({
						include : [
							{
								model : Persona
							}
						]
					})
					.then( tareas => {
						return resolve(tareas);
					})
          .catch( fail => {
						return reject( errors.ERROR_HANDLER(fail) );
					});
				});
      },
      obtenerTareasDeUsuarioP(idResponsable){
      	const Persona = sequelize.import("../models/persona");
        return new Promise( (resolve, reject) => {
					if( !idResponsable ) 		return reject( errors.SEQUELIZE_FK_ERROR('Debe enviar el id del responsable') );
					if( idResponsable < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('El id del responsable debe ser mayor a 0') );
					return this.findAll({
						include : [
							{
								model : Persona
							}
						],
						where : {
							idResponsable : idResponsable
						}
					})
					.then( tareas => {
						return resolve(tareas);
					})
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
				});
      },
      eliminarTareaT(idTarea, transaction){
      	return new Promise((resolve, reject) => {
      		if( !idTarea ) 		return reject( errors.SEQUELIZE_FK_ERROR('Debe enviar el id de la tarea') );
					if( idTarea < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('El id de la tarea debe ser mayor a 0') );
					return this.destroy({
						where : {
							id : idTarea
						},
            transaction : transaction 
					})
					.then( rows => {
						if( rows < 1 ) return reject( errors.SEQUELIZE_ERROR('No se encontró tarea con el id indicado', 'Delete error') );
						if( rows == 1 ) return resolve(rows);
						if( rows > 1 )	return reject( errors.SEQUELIZE_ERROR('Se encontró más de un registro. No se puede eliminar', 'Delete error') );
					})
					.catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
      	});
      },
      cambiarEstadoP: function(idTarea, estadoNuevo){
        return new Promise( (resolve, reject) => {
          if( !idTarea )    return reject( errors.SEQUELIZE_FK_ERROR('Debe enviar el id de la tarea') );
          if( idTarea < 0 ) return reject( errors.SEQUELIZE_FK_ERROR('El id de la tarea debe ser mayor a 0') );
          return this.update({
            estado: estadoNuevo
          }, {
            where : { id : idTarea }
          })
          .then( resultado => {
            return resolve(resultado);
          })
          .catch( fail => {
            return reject( errors.ERROR_HANDLER(fail) );
          });
        });
      }
    }
	});
	return Tarea;
};