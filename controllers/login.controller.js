
var modelo = require('../models');

const co            = require('co');
const jwt           = require('jsonwebtoken');

const ModeloPersona = require('../models').Persona;
const config        = require('../config/config');
let respuesta 		  = require('../utils/respuestas');

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
			console.log(isMatch);
			console.log("nueva contrasenna es " + nuevaContrasenna);
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

const login = (req, res, next) => {
	co(function* () {
		const id    = req.user.get('id');
		const roles 				= yield ModeloPersona.obtenerRolesP(id);
		const rolesActuales = obtenerRolesActuales(roles);
		//Genero el token
    const payload = { 
      roles : rolesActuales,
      id    : id
    };
    const secret  = config[process.env.NODE_ENV].secret;
    const token   = jwt.sign(payload, secret);
    return res.send({
      status: true,
      token  : token,
    });
	}).catch( fail => {
    return res.status(500).send(fail);
  });	
};

const getUsuario = (req, res, next) => {
	const usuario      = req.user[0];
	const rolesUsuario = usuario.get('Rols');
	let lista	= [];
	for (let i = 0; i < rolesUsuario.length; i++) {
		lista.push(rolesUsuario[i].get('nombre'));
	}
	const datos = {
		id 				: usuario.get('id'),
		nombre 		: usuario.get('nombres'),
		apellidos : usuario.get('apellidos'),
		genero    : usuario.get('genero'),
		correo		: usuario.get('correo'),
		roles 		: lista
	};
	return respuesta.okGet(res, 'Usuario obtenido', datos);
};

module.exports = {
	cambioContrasenna,
	login,
	getUsuario,
};

function obtenerRolesActuales(arrayRoles){
  let array = [];
  for (let i = 0; i < arrayRoles.length; i++) {
    let actual = arrayRoles[i].get('PersonaRol');
    if( !actual.fechaFin ){
      array.push(actual.RolNombre);
    }
  }
  return array;
}
