let express 			= require('express');
let router  			= express.Router();
const authViews 	= require('../../utils/authentication.views');

/*
	@Permisos:
		Usuario
*/

router.use(authViews.usuario)

/* GET home page. */
/*
	@api {get} /home
	@apiPermissions Usuario
*/
router.get('/', function(req, res, next) {
  res.render('calendario/index');
});
/*
	@api {get} /home/tarea
	@apiPermissions Personal, Admin
*/
router.get('/tarea/', authViews.verifyRolView(['Personal', 'Admin']), function(req, res, next){
	res.render('calendario/tareaNueva');
});
/*
	@api {get} /home/evento
	@apiPermissions Personal, Admin
*/
router.get('/evento/', authViews.verifyRolView(['Personal', 'Admin']), function(req, res, next){
	res.render('calendario/eventoNuevo');
});

module.exports = router;