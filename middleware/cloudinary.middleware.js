/*
	@Descripcion: Middleware de Cloudinary
	@Autor: @edisonmora95
	@FechaCreacion: 18/02/2018
	@UltimaFechaModificacion:
*/
'use strict';

const utils     = require('../utils/utils');
const respuesta = require('../utils/respuestas');

/*
	@Autor : @edisonmora95
	@FechaCreacion : 18/02/2018
	@Descripción:
		*	Se sube la imagen a Cloudinary
		*	Se pasa al siguiente controlador
	@Modificado: 
*/
module.exports.subirImagen = (req, res, next) => {
	if ( req.body.imagenUrl ) {
		const options       = {
			public_id : req.body.nombres + ' ' + req.body.apellidos + ' ' + Date.now()
		};

		utils.subirImagenCloudinary(req.body.imagenUrl, options)
		.then( resCloudinary => {
			res.locals.imageUrl = resCloudinary.secure_url;
			next();
		})
		.catch( fail => {
			return respuesta.ERROR_SERVIDOR(res, fail);
		});
	} else {
		res.locals.imagenUrl = null;
		next();
	}

};

module.exports.editarImagen = (req, res, next) => {
	if ( req.body.imagenUrl ) {
		next();
	} else {
		next();
	}
};