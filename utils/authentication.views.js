const respuesta = require('./respuestas');

/*
	@Descripción: 
		Verifica si el usuario que quiere acceder a la ruta es un usuario de la aplicación
		Si es, lo deja pasar
		Si no es, lo redirige al login
*/
const usuario = (req, res, next) => {
	if(!req.user){
		res.redirect('/');
	}else{
		next();
	}
};

/*
	Verifica si el rol del usuario loggeado le permite entrar a la ventana que quiere.
	Los roles del usuario los saca de la session.
	@Params:
		arrayRoles : Array de los roles permitidos para la ventana que quiere entrar

*/
const verifyRolView = (arrayRoles) => {
	return 	(req, res, next) => {
		let flag    = false;
		const roles = req.user.get('Rols');
		//Busca si el usuario tiene uno de los roles permitidos para la ventana
		for (let i = 0; i < roles.length; i++) {
			let nombreRol = roles[i].get('nombre');
			if ( arrayRoles.indexOf(nombreRol) > -1 ) {
				flag = true;
				break;
			}
		}
		
		if ( flag ) {
			next();
		} else {
			return respuesta.viewsUnauthorized(res);
		}

	}
}

/*
	@Descripción: 
		Verifica si el usuario que quiere acceder a la ruta es un usuario de la aplicación
		Verifica si el usuario tiene el rol de personal
		Si es, lo deja pasar
		Si no es, lo redirige al login
*/
const personal = (req, res, next) => {
	let flag = false;

	if( esUsuario(req) ){
		const usuario = req.user[0].dataValues;

		for (var i = 0; i < usuario.Rols.length; i++) {
			let rol = usuario.Rols[i].dataValues;
			if ( rol.nombre === 'Personal' ) {
				flag = true;
				break;
			}
		}

		if( flag ){
			console.log('Es usuario personal')
			next();
		}else{
			console.log('No es Personal')
			res.render('error');		//Cambiar luego por la ventana 404
		}
	}else{
		console.log('No se ha loggeado')
		res.redirect('/');
	}
	
};

////////////////////////////////////////////////
//FUNCIONES INTERNAS
////////////////////////////////////////////////

function esUsuario(req){
	if(req.user) return true;
	return false;
}

module.exports = {
	usuario,
	personal,
	verifyRolView
};