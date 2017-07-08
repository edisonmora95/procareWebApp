/*
@Descripcion: utils, lugar donde existen las funciones que estandarizan el codigo
@Autor: Jose Viteri
@FechaCreacion: 20/05/2017
@UltimaEdicion: 05/06/2017 (agregado generarJsonProcariano)
*/



var bcrypt = require('bcryptjs');


/*
EXPORTACIONES
*/
/*
@Descripcion: genera el hash para la contrasenna
@Autor: Jose Viteri
@FechaCreacion: 31/05/2017
*/

module.exports.generarHash = function(req,res, next){

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash('posi', salt, function(err, hash) {
            console.log(hash);
            req.body.contrasenna = hash;
            next();

        });
    });
};

/*
FUNCIONES
*/


/*
@Descripcion: genera una contrasenna aleatoria
@Autor: Jose Viteri
@FechaCreacion: 05/06/2017
*/

function hacerId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log(text);
    return text;
}


/*
@Descripcion: pone en un formato adecuado los campos para buscar procariano
@Autor: Jose Viteri
@FechaCreacion: 05/06/2017
*/


module.exports.generarJsonProcariano = function(procariano){
    var respuesta = {};
    respuesta['persona'] = {};
    respuesta['procariano'] = {};
    for (var clave in procariano) {
        if (procariano.hasOwnProperty(clave)) {
            if ( ( (clave == 'cedula') || (clave == 'nombres') || (clave == 'apellidos') || (clave == 'direccion')  || (clave == 'genero') || (clave == 'email') || (clave == 'celular') || (clave == 'trabajo')  || (clave == 'convencional') || (clave == 'fechaNacimiento') ) && ( procariano[clave] != '' ) ) {

                respuesta['persona'][clave] = {
                    $like : '%' + procariano[clave] + '%'
                }
            }
            if ( ( (clave == 'colegio') || (clave == 'universidad') || (clave == 'parroquia') || (clave == 'fechaOrdenacion')  || (clave == 'estado') || (clave == 'haceParticipacionEstudiantil') ) && ( procariano[clave] != '' )) {
                respuesta['procariano'][clave] = {
                    $like : '%' + procariano[clave] + '%'
                }
            }

        }
    }
    return respuesta;
}

/*
@Descripcion: genera el hash para la nueva contrasenna
@Autor: Jose Viteri
@FechaCreacion: 29/06/2017
*/

module.exports.generarHashNuevaContrasenna = function(req,res, next){

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.nuevaContrasenna, salt, function(err, hash) {
            console.log(hash);
            req.body.nuevaContrasenna = hash;
            next();

        });
    });
};








