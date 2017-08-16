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
@Descripcion: pone en un formato adecuado los campos para buscar los grupos
@Autor: Jose Viteri
@FechaCreacion: 15/07/2017
*/


module.exports.generarJsonGrupo = function(grupo){
    var respuesta = {};
    respuesta['persona'] = {};
    respuesta['grupo'] = {};
    respuesta['animador'] = {};
    respuesta['etapa'] = {};

    for (var clave in grupo) {
        if (grupo.hasOwnProperty(clave)) {
            if ( ( (clave == 'genero') ) && ( procariano[clave] != '' ) ) {

                respuesta['grupo'][clave] = {
                    $like : '%' + grupo[clave] + '%'
                }
            }
            if ( ( (clave == 'nombre') || (clave == 'apellido') ) && ( procariano[clave] != '' )) {
                respuesta['persona'][clave] = {
                    $like : '%' + grupo[clave] + '%'
                }
            }

            if ( ( (clave == 'fechaInicio')) && ( procariano[clave] != '' ) ) {

                respuesta['animador'][clave] = {
                    $like : '%' + grupo[clave] + '%'
                }
            }

            if ( ( (clave == 'etapa')) && ( procariano[clave] != '' ) ) {

                respuesta['etapa'][clave] = {
                    $like : '%' + grupo[clave] + '%'
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


/*
@Descripcion: pone en un formato adecuado los campos para buscar nino de accion
@Autor: Luis Lainez
@FechaCreacion: 29/07/2017
*/


module.exports.generarJsonNinoAccion = function(ninoaccion){
    var respuesta = {};
    respuesta['persona'] = {};
    respuesta['ninoaccion'] = {};
    for (var clave in ninoaccion) {
        if (ninoaccion.hasOwnProperty(clave)) {
            if ( ( (clave == 'cedula') || (clave == 'nombres') || (clave == 'apellidos') || (clave == 'direccion')  || (clave == 'genero') || (clave == 'email') || (clave == 'celular') || (clave == 'trabajo')  || (clave == 'convencional') || (clave == 'fechaNacimiento') ) && ( ninoaccion[clave] != '' ) ) {

                respuesta['persona'][clave] = {
                    $like : '%' + ninoaccion[clave] + '%'
                }
            }
            if ( ( (clave == 'nombreRep') || (clave == 'apellidoRep') || (clave == 'cedulaRep') || (clave == 'telefonoRep')  || (clave == 'escuela') || (clave == 'esBautizado') || (clave == 'estado') ) && ( ninoaccion[clave] != '' )) {
                respuesta['ninoaccion'][clave] = {
                    $like : '%' + ninoaccion[clave] + '%'
                }
            }

        }
    }
    return respuesta;
}
