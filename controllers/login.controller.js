
var modelo = require('../models');
var utils = require('../utils/utils');



const cambioContrasenna = (req, res , next) => {
	let	email = req.body.correo;
	let viejaContrasenna = req.body.viejaContrasenna;
	let nuevaContrasenna = req.body.nuevaContrasenna;

	modelo.Persona.find({
		where : {
			email : email, 
		}
	}).then( persona => {
		modelo.Persona.compararContrasenna2(viejaContrasenna, persona.contrasenna, function(err, isMatch){
			if(err) throw err;
			console.log(isMatch)
			if (isMatch){
				modelo.Persona.update({
					contrasenna : nuevaContrasenna
				  
				}, {
				  where: {
				    email : email,
				  }
				}).then( persona2 => {
					res.json( {
						status : true,
						message : "se realizo el cambio correctamente"
					});
				}).catch( err2 => {
					res.json({
						status : false, 
						message : "algo paso"
					});
				});

			}else{
				res.json({
					status : false,
					message : "vieja contraseña no coincide"
				});
			}
		})


	}).catch( err => {
		res.json({
			status : false, 
			message : "No existe usuaario asignado a ese correo"
		});
	})

};


module.exports = {
	cambioContrasenna
};
