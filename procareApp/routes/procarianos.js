var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('procariano/buscarProcariano');
});

router.get('/nuevo', function(req, res, next){
	res.render('procariano/ingresarProcariano');
});


module.exports = router;
