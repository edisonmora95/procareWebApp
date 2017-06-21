var express = require('express');
var router = express.Router();
var modelos = require('../../models');

router.get('/api/loginFalla', function(req,res,next){
	let objeto = {
		status : false,
		message : "algo paso"
	}
	res.json(objeto);
})

