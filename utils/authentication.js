/*
	@Descripción: 
		Verifica si el usuario que quiere acceder a la ruta es un usuario de la aplicación
		Si es, lo deja pasar
		Si no es, lo redirige al login
*/
let usuario = (req, res, next) => {
	if(!req.user){
		console.log('No se ha loggeado')
		res.redirect('/');
	}else{
		console.log('Es un usuario de la aplicación')
		next();
	}
};

/*
	@Descripción: 
		Verifica si el usuario que quiere acceder a la ruta es un usuario de la aplicación
		Verifica si el usuario tiene el rol de personal
		Si es, lo deja pasar
		Si no es, lo redirige al login
*/
let personal = (req, res, next) => {
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
	personal
};