module.exports.okCreate = (res, mensaje, datos) => {
	return res.status(201).json({
		estado: true,
		mensaje: mensaje,
		datos: datos
	});
};

module.exports.error = (res, mensaje, mensajeError, datos) => {
	return res.status(400).json({
		estado: false,
		mensaje: mensaje,
		mensajeError: mensajeError,
		datos: datos
	});
};

module.exports.okGet = (res, mensaje, datos) => {
	return res.status(200).json({
		estado: true,
		mensaje: mensaje,
		datos: datos
	});
};