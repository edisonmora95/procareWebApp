var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
});

router.get('/nuevo', function(req, res, next){
	res.render('ingresarProcariano');
});

module.exports = router;
