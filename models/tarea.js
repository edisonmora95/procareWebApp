/*
@Descripcion: Modelo tarea, relacionado con Persona
@Autor: jose alcivar
@FechaCreacion: 16/06/2017
@UltimaFechaModificacion: 03/07/2017 @JV modificado el validate del estado, y el ID responsable
*/
'use strict';
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
        isBefore : {
          args :  new Date().toString() ,
          msg  : 'No puede ingresar una fecha de publicación futura'
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
        isAfter  : function(value){
          const fechaIngresada = value;
          const fechaActual    = new Date().setHours(0,0,0,0);
          if( fechaActual > new Date(fechaIngresada).getTime() ){
            return false;
          }
          return true;
        }
      }
    },
    fechaFin: {
      type 				: DataTypes.DATE, //YYY-MM-DD HH:MM:SS
      allowNull 	: true,
    },
    prioridad: {
      type 		 : DataTypes.INTEGER,
      allowNull: false,
      validate : {
      	notEmpty  : {
          msg : 'El campo "Prioridad" no puede estar vacío'
        },
        isNumeric: {
          msg: 'Debe ser número'
        },
        isIn: {
          args: [ [1, 2, 3] ], //alta, media, baja
          msg : 'Debe ser 1, 2 ó 3'
        }
      }
    },
    estado: {
      type 		 : DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: 'El valor ingresado como estado no puede estar vacío.'
        },
        isNumeric: {
          msg: 'Debe ser número'
        },
        isIn: {
          args: [  [1, 2, 3] ], //Pendiente, En proceso, Completada
          msg: 'Debe ser un valor válido'
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
          msg: 'El valor ingresado como categoría no puede estar vacío.'
        },
        isNumeric: {
          msg: 'Debe ser número'
        },
        isIn: {
          args: [ [1, 2, 3] ], //Formación, Acción, Fundación
          msg : 'El valor ingresado como categoría debe ser 1, 2 ó 3'
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
		    	.catch( error => {
		    		return reject(error);
		    	})
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
					}).catch( error => {
						return reject(error);
					});
				});
      },
      obtenerTareasDeUsuarioP(idResponsable){
      	const Persona = sequelize.import("../models/persona");
        return new Promise( (resolve, reject) => {
					if( !idResponsable ) 		return reject( new Error('Debe enviar el id del responsable') );
					if( idResponsable < 0 ) return reject( new Error('El id debe ser mayor a 0') );
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
					}).catch( error => {
						return reject(error);
					});
				});
      },
      eliminarTareaT(idTarea, transaction){
      	return new Promise((resolve, reject) => {
      		if( !idTarea ) 		return reject( new Error('Debe enviar el id de la tarea') );
					if( idTarea < 0 ) return reject( new Error('El id debe ser mayor a 0') );
					return this.destroy({
						where : {
							id : idTarea
						}
					},
					{ 
						transaction : transaction 
					})
					.then( rows => {
						if( rows == 0 ) return reject( new Error('No se encontró tarea con el id indicado'));
						if( rows < 0 ) 	return reject( new Error('Error al eliminar'));
						if( rows == 1 ) return resolve(rows);
						if( rows > 1 )	return reject( new Error('Se eliminó más de una tarea'))
					})
					.catch( error => {
						return reject(error);
					});
      	});
      },
      cambiarEstado: function(idTarea, estadoNuevo, success, error){
        this.update({
          estado: estadoNuevo
        }, {
          where: {
            id: idTarea
          }
        }).then(success).catch(error);
      }
    }
	});
	return Tarea;
};