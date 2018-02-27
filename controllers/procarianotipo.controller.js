'use strict';

const co = require('co');

const ModeloProcarianoTipo 	= require('../models/').ProcarianoTipo;
const respuesta = require('../utils/respuestas');

module.exports.cambiarTipo = (req, res, next) => {
	const idProcariano 	= req.body.idProcariano;
	let t = res.locals.t;
	const idTipoNuevo 		= req.body.tipoId;

	co(function*(){
		const tipoActual = yield ModeloProcarianoTipo.obtenerTipoActualDeProcarianoP(idProcariano);
		if ( !tipoActual ) {
			yield ModeloProcarianoTipo.anadirTipoProcarianoT(idTipoNuevo, idProcariano, t);
			return respuesta.okUpdate(res, 'Se modificó la información del procariano. Se añadió el tipo', null);
		} else {
			const idTipoActual = tipoActual.get('TipoId');
			const cambioValido = ( idTipoNuevo == 6 || ( idTipoActual == idTipoNuevo-1 && idTipoNuevo != 5 ) );
			if ( idTipoActual != idTipoNuevo ) {
				if ( cambioValido ) {
					yield ModeloProcarianoTipo.anadirFechaFinT(idProcariano, idTipoActual, t);
					yield ModeloProcarianoTipo.anadirTipoProcarianoT(idTipoNuevo, idProcariano, t);
					t.commit();
					return respuesta.okUpdate(res, 'Se modificó la información del procariano. Incluyendo el tipo', null);
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