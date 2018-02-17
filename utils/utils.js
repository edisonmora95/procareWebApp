/*
    @Descripcion: utils, lugar donde existen las funciones que estandarizan el codigo
    @Autor: Jose Viteri
    @FechaCreacion: 20/05/2017
    @UltimaEdicion: 05/06/2017 (agregado generarJsonProcariano)
*/
'use strict';

const bcrypt        = require('bcryptjs');
const cloudinary    = require('cloudinary');

let respuestas      = require('./respuestas.js');
const config        = require('../config/config.json');
const modelo        = require('../models');
const ModeloPersona = require('../models').Persona;

cloudinary.config(config[process.env.NODE_ENV].cloudinary);

/*
EXPORTACIONES
*/
/*
  @Descripcion: Sube la imagen al album en Cloudinary
  @Params:
    img -> imagen (url, path, base64)
    options -> json con las opciones posibles. Revisar documentación de Cloudinary
  @FechaCreación: 20/12/2017
  @Return:
    Promise
      err -> Error de cloudinary
      result -> json de la imagen subida con su url
*/
module.exports.subirImagenCloudinary = function(img, options){
  return new Promise( (resolve, reject) => {
    cloudinary.v2.uploader.upload(img, options, function(err, result) { 
      if ( err ) reject(err);
      resolve(result);
    });
  });
} 

/*
  @Descripcion: Asigna al req los roles que serán permitidos para usar la ruta indicada
*/
module.exports.aisgnarRolesPermitidos = function(arrayRoles) {
  return function(req, res, next){
    req.rolesPermitidos = arrayRoles;
    next();  
  }
};

/*
  @Descripcion: genera una contrasenna aleatoria
  @Autor: Jose Viteri
  @FechaCreacion: 05/06/2017
*/
module.exports.randomString = () => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

/*
  @Descripcion: Genera el hash para la contraseña
  @Autor: Jose Viteri
  @FechaCreacion: 31/05/2017
  @ÚltimaModificacion:
    29/12/2017  @edisonmora95 Promesas
*/

module.exports.generarHash = function(password) {
  return new Promise( (resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if ( err ) return reject(err);
      bcrypt.hash(password, salt, (err2, hash) => {
        if ( err2 )return reject(err2);
        return resolve(hash);
      });
    });
  });
};

/*
  @Descripcion: genera el hash para la nueva contrasenna, en el crear contrasenna
  @Autor: Jose Viteri
  @FechaCreacion: 29/06/2017
*/

module.exports.generarHashNuevaContrasenna = function(req, res, next) {

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.nuevaContrasenna, salt, function(err, hash) {
            console.log(hash);
            req.body.nuevaContrasenna = hash;
            next();

        });
    });
};

/*
FUNCIONES
*/



/*
  @Descripcion: pone en un formato adecuado los campos para buscar procariano
  @Autor: Jose Viteri
  @FechaCreacion: 05/06/2017
*/


module.exports.generarJsonProcariano = function(procariano) {
    var respuesta = {};
    respuesta['persona'] = {};
    respuesta['procariano'] = {};
    for (var clave in procariano) {
        if (procariano.hasOwnProperty(clave)) {
            if (((clave == 'cedula') || (clave == 'nombres') || (clave == 'apellidos') || (clave == 'direccion') || (clave == 'genero') || (clave == 'email') || (clave == 'celular') || (clave == 'trabajo') || (clave == 'convencional') || (clave == 'fechaNacimiento')) && (procariano[clave] != '')) {

                respuesta['persona'][clave] = {
                    $like: '%' + procariano[clave] + '%'
                }
            }
            if (((clave == 'colegio') || (clave == 'universidad') || (clave == 'parroquia') || (clave == 'fechaOrdenacion') || (clave == 'estado') || (clave == 'haceParticipacionEstudiantil')) && (procariano[clave] != '')) {
                respuesta['procariano'][clave] = {
                    $like: '%' + procariano[clave] + '%'
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


module.exports.generarJsonGrupo = function(grupo) {
    var respuesta = {};
    respuesta['persona'] = {};
    respuesta['grupo'] = {};
    respuesta['animador'] = {};
    respuesta['etapa'] = {};

    for (var clave in grupo) {
        if (grupo.hasOwnProperty(clave)) {
            if (((clave == 'genero')) && (procariano[clave] != '')) {

                respuesta['grupo'][clave] = {
                    $like: '%' + grupo[clave] + '%'
                }
            }
            if (((clave == 'nombre') || (clave == 'apellido')) && (procariano[clave] != '')) {
                respuesta['persona'][clave] = {
                    $like: '%' + grupo[clave] + '%'
                }
            }

            if (((clave == 'fechaInicio')) && (procariano[clave] != '')) {

                respuesta['animador'][clave] = {
                    $like: '%' + grupo[clave] + '%'
                }
            }

            if (((clave == 'etapa')) && (procariano[clave] != '')) {

                respuesta['etapa'][clave] = {
                    $like: '%' + grupo[clave] + '%'
                }
            }

        }
    }
    return respuesta;
}


/*
  @Descripcion: pone en un formato adecuado los campos para buscar nino de accion
  @Autor: Luis Lainez
  @FechaCreacion: 29/07/2017
*/
module.exports.generarJsonNinoAccion = function(ninoaccion) {
        var respuesta = {};
        respuesta['persona'] = {};
        respuesta['ninoaccion'] = {};
        for (var clave in ninoaccion) {
            if (ninoaccion.hasOwnProperty(clave)) {
                if (((clave == 'cedula') || (clave == 'nombres') || (clave == 'apellidos') || (clave == 'direccion') || (clave == 'genero') || (clave == 'email') || (clave == 'celular') || (clave == 'trabajo') || (clave == 'convencional') || (clave == 'fechaNacimiento')) && (ninoaccion[clave] != '')) {


                    respuesta['persona'][clave] = {
                        $like: '%' + ninoaccion[clave] + '%'
                    }
                }
                if (((clave == 'nombreRep') || (clave == 'apellidoRep') || (clave == 'cedulaRep') || (clave == 'telefonoRep') || (clave == 'escuela') || (clave == 'esBautizado') || (clave == 'estado')) && (ninoaccion[clave] != '')) {
                    respuesta['ninoaccion'][clave] = {
                        $like: '%' + ninoaccion[clave] + '%'
                    }
                }

            }
        }
        return respuesta;
    }

/*
  @Descripcion: es una funcion que genera y envia el correo al destinatario
  @Autor: Jose Viteri
  @FechaCreacion: 18/08/2017
  @UltimaModificacion:
    30/12/20217 @edisonmora95 Cambiado a Promesas
*/
module.exports.generarCorreo = function(mensaje, destinatario, sujeto) {
  //mensaje : el mensaje del correo
  //destinatario : la persona o personas que se le va a enviar el correo (si son varias, separadas por comas)
  //sujeto : el tema del correo
  const nodemailer = require('nodemailer');

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host   : 'smtp.gmail.com',
    port   : 465,
    secure : true, // secure:true for port 465, secure:false for port 587
    auth   : {
      type    : 'OAuth2',
      user    : 'procarewebapp@gmail.com',
      clientId: '636471246614-f425frovl75hc6971hpq0hbh77iq4dta.apps.googleusercontent.com',
      clientSecret: "pJBQIxcaEN9BAALMKowo6zld",
      refreshToken: "1/D0LJMDXjVy3JCB5Wcr7069jLs1-lmtlh2GF-EfqUwVXnCHDk0NJ4sUXqeQuhKk4l"
          //accessToken: serverConfig.gmail.access_token,
    },
    tls    : {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from   : '"Procare " <procarewebapp@gmail.com>', // sender address
    to     : destinatario, // list of receivers
    subject: sujeto, // Subject line
    text   : mensaje // plain text body
  };
  return new Promise( (resolve, reject) => {
    return transporter.sendMail(mailOptions, (error, info) => {
      if ( error ) {
        console.log('Este es el error:', error);
        return reject(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      return resolve(info)
    });
  });
}


/*
 
 
 */

module.exports.generarUsuarioConCorreo = function(id, res, mensajeExito, mensajeError, resultado) {
    modelo.PersonaRol.count({
        where: {
            PersonaId: id
        }
    }).then(contador => {
        if (contador > 1) {
            return respuestas.okCreate(res, mensajeExito, resultado);
        } else {
            var nuevaContrasenna = hacerClave();
            console.log('esta es la nueva clave ' + nuevaContrasenna);
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(nuevaContrasenna, salt, function(err, hash) {
                    console.log(hash);
                    modelo.Persona.update({
                        contrasenna: hash
                    }, {
                        where: {
                            id: id
                        }
                    }).then(respuesta => {
                        modelo.Persona.findOne({
                            attributes: ['email'],
                            where: {
                                id: id
                            }
                        }).then(respuesta2 => {
                            const nodemailer = require('nodemailer');
                            console.log('entra aqui en este lugar \n')
                            console.log(respuesta2.email);


                            // create reusable transporter object using the default SMTP transport
                            console.log('entra dentro de generarCorreo');
                            let transporter = nodemailer.createTransport({
                                host: 'smtp.gmail.com',
                                port: 465,
                                secure: true, // secure:true for port 465, secure:false for port 587
                                auth: {
                                    type: 'OAuth2',
                                    user: 'procarewebapp@gmail.com',
                                    clientId: '636471246614-f425frovl75hc6971hpq0hbh77iq4dta.apps.googleusercontent.com',
                                    clientSecret: "pJBQIxcaEN9BAALMKowo6zld",
                                    refreshToken: "1/D0LJMDXjVy3JCB5Wcr7069jLs1-lmtlh2GF-EfqUwVXnCHDk0NJ4sUXqeQuhKk4l"
                                        //accessToken: serverConfig.gmail.access_token,
                                },
                                tls: {
                                    rejectUnauthorized: false
                                }
                            });

                            // setup email data with unicode symbols
                            let mailOptions = {
                                from: '"Procare " <procarewebapp@gmail.com>', // sender address
                                to: respuesta2.email, // list of receivers
                                subject: 'Creación de cuenta Fundación Procare', // Subject line
                                text: 'Su nueva contraseña para la fundación procare es: ' + nuevaContrasenna + " .\nPor favor proceda a cambiarla por motivos de seguridad . \n\nAtentamente \nFundación Procare" // plain text body
                                    //html: '<b>Hello world ?</b>' // html body
                            };

                            // send mail with defined transport object
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log('este es error: ' + error);
                                    return respuestas.error(res, error, '', info);

                                }
                                console.log('Message %s sent: %s', info.messageId, info.response);
                                return respuestas.okCreate(res, mensajeExito, resultado);
                            });
                            //return respuestas.okCreate(res,mensajeExito,resultado);

                        }).catch(error2 => {
                            return respuestas.error(res, mensajeError, '', error2);
                        })

                    }).catch(error => {
                        return respuestas.error(res, mensajeError, '', error);

                    })

                });
            });

        }
    })
}

module.exports.findAllDaysInYear = (day) => {
  var date = new Date();
  var nextYear = date.getFullYear() + 1;
  let array = [];

  while(date.getDay() != day) {
    date.setDate(date.getDate() + 1)    
  }

  while(date.getFullYear() < nextYear)  {
    var yyyy = date.getFullYear();

    var mm = (date.getMonth() + 1);
    mm = (mm < 10) ? '0' + mm : mm;

    var dd = date.getDate();
    dd = (dd < 10) ? '0' + dd : dd;

    let fecha = yyyy + '-' + mm + '-' + dd;
    array.push(fecha);

    date.setDate(date.getDate() + 7);
  }
  return array;
}


