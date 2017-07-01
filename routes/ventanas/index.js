var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD:routes/index.js
  res.render('login', { title: 'Procare' });
=======
  res.render('index');
>>>>>>> fa320d49ad520f67c1194922adf646b8c120402d:routes/ventanas/index.js
});

module.exports = router;
