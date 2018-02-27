/*
	@Descripcion: Controlador de las etapas.
	@Autor: Erick Pérez
	@FechaCreacion: 17/06/2017
	@UltimaFechaModificacion: 
		24/06/2017 @edanmora
*/
'use strict';
const ModeloEtapa = require('../models').Etapa;
let respuesta 		= require('../utils/respuestas');

module.exports.obtenerEtapas = (req, res) =>{
	ModeloEtapa.obtenerEtapas()
	.then( resultado => {
		return respuesta.okGet(res, 'Búsqueda exitosa', resultado);
	})
	.catch( fail => {
    return respuesta.ERROR_SERVIDOR(res, fail);
  });
};
