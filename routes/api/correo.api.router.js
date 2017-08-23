var express = require('express');
var router = express.Router();
var utils = require('../../utils/utils');

router.get('/', (req, res, next) => {
	var json = utils.generarCorreo('hola mundo','erick94.perez@gmail.com', 'este es una prueba');
	console.log(json);
	res.json(json);
})


module.exports = router;