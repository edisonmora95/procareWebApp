'use strict';

const ModeloProcarianoTipo 	= require('../models/').ProcarianoTipo;
const respuesta = require('../utils/respuestas');

module.exports.cambiarTipo = (req, res, next) => {
	const idProcariano 	= req.body.idProcariano;
	let t = res.locals.t;
	const idTipoNuevo 		= req.body.tipoId;

	ModeloProcarianoTipo.obtenerTipoActualDeProcarianoP(idProcariano)
	.then( tipoActual => {
		if ( !tipoActual ) {
			ModeloProcarianoTipo.anadirTipoProcarianoT(idTipoNuevo, idProcariano, t)
			.then( resultado => {
				t.commit();
				return respuesta.okUpdate(res, 'Se modificó la información del procariano. Se añadió el tipo', null);
			})
			.catch( fail => {
				t.rollback();
				return respuesta.ERROR_SERVIDOR(res, fail);
			});
		} else {
			const idTipoActual = tipoActual.get('TipoId');
			const cambioValido = ( idTipoNuevo == 6 || ( idTipoActual == idTipoNuevo-1 && idTipoNuevo != 5 ) );
			if ( idTipoActual != idTipoNuevo ) {
				if ( cambioValido ) {
					ModeloProcarianoTipo.cambiarTipoDeProcarianoT(idProcariano, idTipoActual, idTipoNuevo, t)
					.then( resultado2 => {
						t.commit();
						return respuesta.okUpdate(res, 'Se modificó la información del procariano. Incluyendo el tipo', null);
					})
					.catch( fail => {
						t.rollback();
						return respuesta.ERROR_SERVIDOR(res, fail);
					});
				} else {
					t.commit();
					return respuesta.okUpdate(res, 'Se modificó la información del procariano. No se permite cambiar el tipo a uno menor', null);
				}
			} else {
				t.commit();
				return respuesta.okUpdate(res, 'Se modificó la información del procariano. No se cambió el tipo ya que era igual al anterior', null);
			}
		}
	})
	.catch( fail => {
		t.rollback();
		return respuesta.ERROR_SERVIDOR(res, fail);
	});
};