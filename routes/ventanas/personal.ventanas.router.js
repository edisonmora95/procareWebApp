
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('personal/buscarPersonal');
});

router.get('/nuevo', function(req,res,next){
	res.render('personal/ingresarPersonal')
})

module.exports = router;
