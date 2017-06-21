/*
@Descripcion: Clase para representar el concepto de Grupo
@Autor: Gustavo Totoy
@FechaCreacion: 31/05/2017
@UltimaFechaModificacion: 31/05/2017 @GustavoTotoy
*/

var modelo = require('../models');

const crearGrupo = (req, res, next) => {

	// nombre = 'Developers'
	// tipo = true
	// cantidadChicos = 42
	// numeroReuniones = 0
	// genero = 'masculino'

	nombre = req.body.nombre
	tipo = req.body.tipo
	cantidadChicos = req.body.cantidadChicos
	numeroReuniones = req.body.numeroReuniones
	genero = req.body.genero

	modelo.Grupo.create({
		console.log("Se creo un grupo")

		GrupoId : grupo.get('id'),
		nombre : nombre,
		tipo : tipo,
		cantidadChicos : cantidadChicos,
		numeroReuniones : numeroReuniones,
		genero : genero

	}).then( grupo => {
		var status = true
		var rjson = {
			status : status,
			mensaje : 'Grupo creado exitosamente',
			persona : persona // @ Debug(gus)
		}
		res.json(rjson);

	}).catch( error => {
		var rjson = {
			esteEsElError : error,
			esteEsElbody : req.body
		}
		res.send(rjson);
	});
}

module.exports = {
	crearGrupo
}