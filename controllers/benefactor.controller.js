'use strict';
/*
@Descripcion: Clase controladora de todos los procarianos
@Autor: Jose Viteri
@FechaCreacion: 26/06/2017
*/

var modelo = require('../models');
const respuesta = require('../utils/respuestas');

let sequelize           = require('../models/').sequelize;
const ModeloBenefactor  = require('../models/').Benefactor;

/*
  Autor : JOSE ALCIVAR
  Creado : 06/08/2017
  Modificado: 
    06/08/2017 @josealcivar agrega un benefactor
    05/03/2018  @edisonmora95 Cambiado a varios Controllers
*/
const crearBenefactor = (req, res) => {
  let transaction = res.locals.t;
  const benefactor = {
    PersonaId         : res.locals.idPersona,
    valorContribucion : req.body.valorContribucion,
    diaCobro          : req.body.diaCobro,
    tarjetaCredito    : req.body.tarjetaCredito,
    tipoDonacion      : req.body.tipoDonacion,
    estado            : req.body.estado,
    nombreGestor      : req.body.nombreGestor,
    relacion          : req.body.relacion,
    observacion       : req.body.observacion
  };
  ModeloBenefactor.crearBenefactorT(benefactor, transaction)
  .then( registro => {
    transaction.commit();
    return respuesta.okCreate(res, 'Benefactor creado correctamente', registro.get('id'));
  })
  .catch( fail => {
    res.locals.t.rollback();
    return respuesta.ERROR_SERVIDOR(res, fail);
  });

};


/*
Autor : JA
Creado : 28/05/2017
Modificado: 07/07/2017 @Jv , agregado metodo generar JsonProcariano
            21/07/2017 @erialper, agrego la excepción de busquedad
*/

const buscarBenefactor = (req, res, next) => {
  ModeloBenefactor.obtenerBenefactoresP()
  .then( benefactores => {
    const registro = benefactores.map(benefactor => {
      return Object.assign({}, {
        personaId           : benefactor.Persona.id,
        benefactorId        : benefactor.id,
        valorContribucion  : benefactor.valorContribucion,
        diaCobro           : benefactor.diaCobro,
        tarjetaCredito     : benefactor.tarjetaCredito,
        tipoDonacion       : benefactor.tipoDonacion,
        nombreGestor       : benefactor.nombreGestor,
        relacion            : benefactor.relacion,
        observacion         : benefactor.observacion,
        cedula              : benefactor.Persona.cedula,
        nombres             : benefactor.Persona.nombres,
        apellidos           : benefactor.Persona.apellidos,
        razonSocial         : benefactor.Persona.razonSocial,
        direccion           : benefactor.Persona.direccion,
        genero              : benefactor.Persona.genero,
        fechaNacimiento     : benefactor.Persona.fechaNacimiento,
        convencional        : benefactor.Persona.convencional,
        celular             : benefactor.Persona.celular,
        trabajo             : benefactor.Persona.trabajo,
        email               : benefactor.Persona.email,
        estado              : benefactor.estado
      });
    });
    return respuesta.okGet(res, 'Búsqueda exitosa', registro);
  })
  .catch( error => {
    return respuesta.error(res, 'Error en la búsqueda', '', error);
  });
};

/*
Autor : JA
Creado : 28/05/2017
Modificado: 07/07/2017 @Jv , agregado metodo generar JsonProcariano
            21/07/2017 @erialper, agrego la excepción de busquedad
*/


const buscarBenefactorNombres = (req, res, next) => {
    //var jsonModelo = utils.generarJsonProcariano(req.query);
    var ll_estado = "activo";
    console.log(ll_estado);
    var llrazon = req.body.searchItem;
    console.log(llrazon);
    modelo.Benefactor.findAll({
        include: [{
            model: modelo.Persona
        }], //, where : jsonModelo.benefactor//aqui va el where

        where: {
            razonsocial: {
                $like: '%' + llrazon + '%'
            },
            estado: ll_estado

        }
    }).then(personas => {
        const respuesta = personas.map(benefactor => {

            return Object.assign({}, {
                personaId: benefactor.Persona.id,
                benefactorId: benefactor.id,
                valor_contribucion: benefactor.valor_contribucion,
                dia_cobro: benefactor.dia_cobro,
                tarjeta_credito: benefactor.tarjeta_credito,
                tipo_donacion: benefactor.tipo_donacion,
                nombre_gestor: benefactor.nombre_gestor,
                relacion: benefactor.relacion,
                observacion: benefactor.observacion,
                cedula: benefactor.Persona.cedula,
                nombres: benefactor.Persona.nombres,
                apellidos: benefactor.Persona.apellidos,
                razonsocial: benefactor.Persona.razonsocial,
                direccion: benefactor.Persona.direccion,
                genero: benefactor.Persona.genero,
                fechaNacimiento: benefactor.Persona.fechaNacimiento,
                convencional: benefactor.Persona.convencional,
                celular: benefactor.Persona.celular,
                trabajo: benefactor.Persona.trabajo,
                email: benefactor.Persona.email,
                estado: benefactor.estado
            });
        });
        //  console.log('hola');
        //console.log(respuesta);
        return res.json(respuesta);
    }).catch(error => {
        var status = false;
        var mensaje = 'No se obtuvieron benefactor'
        var jsonRespuesta = {
            status: status,
            mensaje: mensaje,
            errorBenefactor: error
        }
        res.json(jsonRespuesta);
    });
};


/*
Autor : JV
Creado : 28/05/2017
Modificado: 07/07/2017 @JV , para que modifique por ID
            21/07/2017 @erialper , para que devuelva el tipo de procariano, agrego la excepción de busquedad    
            23/07/2017 @edanmora , luego de obtener el id del tipo, también obtiene el nombre del tipo
*/

const buscarBenefactorPorId = (req, res) => {
  const idPersona = req.params.id;
  ModeloBenefactor.obtenerProcarianoPorIdPersonaP(idPersona)
  .then( benefactor => {
    const registro = benefactor.map(benefactor => {
      return Object.assign({}, {
        personaId           : benefactor.Persona.id,
        benefactorId        : benefactor.id,
        valorContribucion   : benefactor.valorContribucion,
        diaCobro            : benefactor.diaCobro,
        tarjetaCredito      : benefactor.tarjetaCredito,
        tipoDonacion        : benefactor.tipoDonacion,
        nombreGestor        : benefactor.nombreGestor,
        relacion            : benefactor.relacion,
        observacion         : benefactor.observacion,
        cedula              : benefactor.Persona.cedula,
        nombres             : benefactor.Persona.nombres,
        apellidos           : benefactor.Persona.apellidos,
        razonSocial         : benefactor.Persona.razonSocial,
        direccion           : benefactor.Persona.direccion,
        genero              : benefactor.Persona.genero,
        fechaNacimiento     : benefactor.Persona.fechaNacimiento,
        convencional        : benefactor.Persona.convencional,
        celular             : benefactor.Persona.celular,
        trabajo             : benefactor.Persona.trabajo,
        email               : benefactor.Persona.email,
        estado              : benefactor.estado
      });
    });
    return respuesta.okGet(res, 'Búsqueda exitosa', registro);
  })
  .catch( fail => {
    const mensajeError = fail.errors[0].message;
    return respuesta.error(res, 'Error en la búsqueda', mensajeError, fail);
  });
};

/*
Autor : JoseAlcivar
Creado : 28/05/2017
Modificado: 07/07/2017 @JV , agregado date a datos date
            22/07/2017 @erialper, agregado el cambio de tipo
*/

const editarBenefactor = (req, res, next) => {
    console.log("ingresa aqui");
    var id = req.params.id;
    console.log(req.body.razonsocial);
    if (req.body.razonsocial == '') {
        razonsocial = req.body.nombres + ' ' + req.body.apellidos;

    } else {
        razonsocial = req.body.razonsocial;

    }
    console.log("razon social");
    console.log(razonsocial);
    console.log(id);
    console.log("mostro aqui");
    let valor = req.body.valor_contribucion;
    console.log("valor");
    console.log(valor);
    let result = Number(valor.replace(/[^0-9\.]+/g, ""));
    valordolares = parseFloat(result);
    console.log("valores");
    console.log(valordolares);
    modelo.Persona.update({
        cedula: req.body.cedula,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        razonsocial: razonsocial,
        genero: req.body.genero,
        email: req.body.email,
        celular: req.body.celular,
        trabajo: req.body.trabajo,
        convencional: req.body.convencional
    }, {
        where: {
            id: id
        }
    }).then(result => {
        modelo.Benefactor.update({
            valor_contribucion: valordolares,
            dia_cobro: req.body.diaCobro,
            tarjeta_credito: req.body.tarjeta_credito,
            tipo_donacion: req.body.tipo_donacion,
            estado: req.body.estado,
            nombre_gestor: req.body.nombre_gestor,
            relacion: req.body.relacion,
            observacion: req.body.observacion
        }, {
            where: {
                PersonaId: id
            }
        }).then(result2 => {
            var status = true;
            var mensaje = 'se pudo actualizar correctamente';

            var jsonRespuesta = {
                status: status,
                mensaje: mensaje,
                sequelizeStatus: result2
            }
            res.json(jsonRespuesta);

        }).catch(err2 => {
            var status = false;
            var mensaje = 'no se pudo actualizar';

            var jsonRespuesta = {
                status: status,
                mensaje: mensaje,
                sequelizeStatus: err2
            }
            res.json(jsonRespuesta);
        });

    }).catch(err => {
        var status = false;
        var mensaje = 'no se pudo actualizar';

        var jsonRespuesta = {
            status: status,
            mensaje: mensaje,
            sequelizeStatus: err
        }
        res.json(jsonRespuesta);
    });
};

/*
Autor : JV
Creado : 28/05/2017
Modificado: 21/07/2017 @erialper , agrega eliminar el tipo y el grupo
*/

const eliminarBenefactor = (req, res, next) => {
    console.log('SE VA A ELIMINAR EL BENEFACTOR');
    var id = req.params.id;
    console.log(id);
    var ll_estado = "inactivo";
    modelo.Benefactor.update({
        estado: ll_estado
    }, {
        where: {
            PersonaId: id
        }
    }).then(result => {
        var status = true;
        var mensaje = 'Benefator Eliminado Correctamente';
        var jsonRespuesta = {
            status: status,
            mensaje: mensaje,
            errorBenefactor: result
        }
        res.json(jsonRespuesta);

    }).catch(error => {
        var status = false;
        var mensaje = 'NO se Pudo Eliminar El Benefactor';
        var jsonRespuesta = {
            status: status,
            mensaje: mensaje,
            errorBenefactor: error
        }
        res.json(jsonRespuesta);
    });


};



module.exports = {
    crearBenefactor,
    buscarBenefactor,
    buscarBenefactorPorId,
    editarBenefactor,
    eliminarBenefactor,
    buscarBenefactorNombres
}

function inicializarTransaccion(){
  return new Promise( (resolve, reject) => {
    sequelize.transaction({
      autocommit: false,
    })
    .then( result => {
      return resolve(result);
    })
    .catch( fail => {
      return reject(fail);
    });
  });
}