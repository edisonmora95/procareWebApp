/*
  @Descripción: Controlador de la vista de ingresarProcariano.ejs
  @Autor: @edisonmora95
  @FechaCreación: 31/04/2017
  @ÚltimaModificación: 7/07/2017 @edanmora95 Refactorización
*/
'use strict';

import VueTheMask from 'vue-the-mask';
import VMoney from 'v-money';

Vue.use(VeeValidate);
Vue.use(VueTheMask);
Vue.use(VMoney);
/*
  Validaciones. Cambio de mensajes de error
*/
const dictionary = {
  en: {
    messages: {
      email: function() {
          return 'Ingrese un correo válido.';
      },
      required: function() {
          return 'Este campo es obligatorio.';
      },
      alpha_spaces: function() {
          return 'Este campo sólo puede contener letras y espacios.';
      },
      digits: function(field, length) {

          return 'Este campo sólo puede contener ' + length + ' números.';
      },
      numeric: function() {
          return 'Este campo sólo puede contener números.';
      },
      alpha_num: function() {
          return 'Este campo sólo puede contener letras y números.';
      },
      regex: function(field, val) {
          return 'No ingrese caracteres especiales.';
      }
    }
  }
};
VeeValidate.Validator.localize(dictionary);

let main = new Vue({
  el: '#main',
  mounted: function() {
    this.inicializarMaterialize(this);
    $('#tipo-persona').change( () => {
      $('#cedula').keypress( () => {
        const valor = $('#cedula').val();
        if ( valor.length >= 9 ) {
          main.buscarCedula(valor);
        }
      });
    });
  },
  updated: function() {
    this.inicializarMaterialize(this);
  },
  data: {
    registroNuevo: false,
    buscando: false,
    fechaIncorrecta: false,
    benefactor: {
      ruc              : '',
      tipo             : '',
      nombres          : '',
      apellidos        : '',
      fechaNacimiento  : '',
      cedula           : '',
      razonSocial      : '',
      direccion        : '',
      email            : '',
      celular          : '',
      convencional     : '',
      genero           : '',
      tipo             : '',
      estado           : 'activo', // activo|inactivo... Activo por default
      valorContribucion: '',
      diaCobro         : '',
      tarjetaCredito   : '',
      tipoDonacion     : '',
      nombreGestor     : '',
      relacion         : '',
      observacion      : '',
      valordolares     : ''
    },
    errorObj  : {
      campo: '',
      msj  : ''
    },
    errorAjax : {
      titulo     : '',
      descripcion: ''
    },
    mask_format: {
      credit_card       : "####-####-####-####",
      telef_convencional: "(0#)###-####",
      telf_celular      : "0##-###-####",
      diaCobroMask      : "##",
      Ruc_Mask          : "#############",
      cedula            : '##########',
    },
    money: {
      decimal  : '.',
      thousands: ',',
      prefix   : '$ ',
      precision: 2,
      masked   : false /* doesn't work with directive */
    },
    payment_icons: {
      visa       : "ccs ccs-visa",
      mastercard : "ccs ccs-mastercard",
      american   : "ccs ccs-amex",
      discover   : "ccs ccs-discover",
      dinnersclub: "ccs ccs-dinersclub"
    }
  },
  methods: {
    inicializarMaterialize(self) {
      $('.datepicker').pickadate({
        monthsFull    : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort   : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdaysFull  : ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        weekdaysShort : ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        today         : 'Hoy',
        clear         : 'Limpiar',
        close         : 'Cerrar',
        selectMonths  : true, // Creates a dropdown to control month
        selectYears   : 100,  // Creates a dropdown of 15 years to control year,
        closeOnSelect : true  // Close upon selecting a date,
      });
      $(".button-collapse").sideNav();
      $('select').material_select();
      $('#selectGenero').change(function() {
        self.benefactor.genero = $('#selectGenero').val();
      });
      $('#selectDonacion').change(function() {
        self.benefactor.tipoDonacion   = $('#selectDonacion').val();
      });
      $('#fecha-nacimiento').change( () => {
        self.fechaIncorrecta = !fechaNacimientoValida('#fecha-nacimiento');
        if ( self.fechaIncorrecta ) {
          self.benefactor.fechaNacimiento = '';
        } else {
          self.benefactor.fechaNacimiento = obtenerFechaCompleta('#fecha-nacimiento');
        }
      });
      
    },
    //////////////////////////////////////////////
    // LLAMADAS A LA API
    //////////////////////////////////////////////
    ingresarBenefactor(self) {
      let urlApi = '/api/benefactores/';
      $('.modal').modal();
      $.ajax({
        type: 'POST',
        url : urlApi,
        data: main.benefactor,
        success(res) {
          $('#modalBenfactorCreado').modal('open');
        },
        error(err) {
          console.log(err);
          self.mostrarMensajeDeErrorAjax(self, 'Error!', err.responseJSON.mensajeError);
        }
      });
    },
    buscarCedula(cedula) {
      main.buscando = true;
      const urlApi = '/api/procarianos/';
      $.ajax({
        type: 'GET',
        url: urlApi,
        headers: {
          "x-access-token" : localStorage.getItem('token')
        },
        data: { cedula : cedula },
        success: function(res){
          main.buscando = false;
          if ( res.datos.length === 0 ) {
            main.registroNuevo = true;
            main.encerarFormulario();
          } else {
            main.registroNuevo = false;
            const persona = res.datos[0];
            main.asignarPersonaEncontrada(persona);
          }
        },
        error: function(err){
          main.buscando = false;
          console.log(err);
        }
      });
    },
    //////////////////////////////////////////////
    // EVENTOS
    //////////////////////////////////////////////
    validar() {
      let self = this;
      self.benefactor.valorContribucion = cambio_text_integerofloat('#valorContribucion');
      if ( !validarFecha(self.benefactor.tipo) ) {
        self.mostrarErrorValidacion(self, 'Fecha de nacimiento', 'No puede ingresar a alguien con menos de 18 años como benefactor');
      } else {
        self.$validator.validateAll()
        .then( result => {
          if( result ){
            self.ingresarBenefactor(self);
          }else{
            self.mostrarErrorValidacion(self, self.errors.items[0].field, self.errors.items[0].msg);
          }
        });
      }
    },
    //////////////////////////////////////////////
    // DOM
    //////////////////////////////////////////////
    asignarPersonaEncontrada(persona) {
      main.benefactor.nombres = persona.nombres;
      main.benefactor.apellidos = persona.apellidos;
      main.benefactor.email = persona.email;
      main.benefactor.direccion = persona.direccion;
      main.benefactor.celular = persona.celular;
      main.benefactor.convencional = persona.convencional;

      //Asignar fecha de nacimiento
      const fechaNacimiento = new Date(persona.fechaNacimiento.replace(/-/g, '\/').replace(/T.+/, ''));
      const $input = $('#fecha-nacimiento').pickadate();
      const picker = $input.pickadate('picker');
      picker.set('select', fechaNacimiento);
      main.benefactor.fechaNacimiento = obtenerFechaCompleta('#fecha-nacimiento');
      // Asignar género
      $('#selectGenero').val(persona.genero);
      $('#selectGenero').material_select();
      main.benefactor.genero = persona.genero;
    },
    encerarFormulario() {
      main.benefactor.nombres = '';
      main.benefactor.apellidos = '';
      main.benefactor.fechaNacimiento = '';
      main.benefactor.direccion = '';
      main.benefactor.email = '';
      main.benefactor.celular = '';
      main.benefactor.convencional = '';
      // Asignar género
      $('#selectGenero').val('');
      $('#selectGenero').material_select();
      main.benefactor.genero = '';
      // Datepicker
      const $input = $('#fecha-nacimiento').pickadate();
      const picker = $input.pickadate('picker');
      picker.stop();
      picker.set({});
      picker.start();
    },
    validarIconoTarjeta: function() {
      let value = this.benefactor.tarjetaCredito.substring(0, 2);
      if (value[0] == 4 || value == 13 || value == 16) {
        return this.payment_icons.visa;
      } else if ((value > 51 && value < 56) || value == 16) {
        return this.payment_icons.mastercard;
      } else if (value == 34 || value == 37 || value == 15) {
        return this.payment_icons.american;
      } else if (value == 30 || value == 36 || value == 38 || value == 14) {
        return this.payment_icons.dinnersclub;
      }
    },
    mostrarMensajeDeErrorAjax(self, titulo, descripcion) {
      $('.modal').modal();
      self.errorAjax.titulo      = titulo;
      self.errorAjax.descripcion = descripcion;
      $('#modalErrorAjax').modal('open');
    },
    mostrarErrorValidacion(self, campo, msj){
      $('.modal').modal();
      self.errorObj.campo = campo;
      self.errorObj.msj   = msj;
      $('#modalError').modal('open');
    },
  }
});

/*
  Verifica si la fecha ingresada es la de una persona con al menos 18 años de edad.
*/
function fechaNacimientoValida(idPicker) {
  const year  = $(idPicker).pickadate('picker').get('highlight', 'yyyy');
  const day   = $(idPicker).pickadate('picker').get('highlight', 'dd');
  const month = $(idPicker).pickadate('picker').get('highlight', 'mm');
  const actualYear = new Date().getFullYear();
  const diferencia = actualYear - year;
  if ( diferencia < 18 ) {
    return false;
  } else {
    return true;
  }
}

/*
  Devuelve la fecha ingresada en los pickers en un formato
  Formato: año-mes-día T hora Z
*/
function obtenerFechaCompleta(idDatePicker){
  const anio = $(idDatePicker).pickadate('picker').get('highlight', 'yyyy');
  const mes  = $(idDatePicker).pickadate('picker').get('highlight', 'mm');
  const dia  = $(idDatePicker).pickadate('picker').get('highlight', 'dd');
  let fechaIngresada = anio + '-' + mes + '-' + dia + 'T05:00:00Z'; 
  return fechaIngresada;
}

function cambio_text_integerofloat(idInput) {
  let valor  = $(idInput).val();
  let result = Number(valor.replace(/[^0-9\.]+/g, ""));
  return result;
}

function validarFecha(tipo) {
  if ( tipo === 'empresa' ) {
    main.benefactor.fechaNacimiento = null;
    return true;
  } else {
    if ( main.fechaIncorrecta || main.benefactor.fechaNacimiento === '' ) {
      return false;
    }
    return true;
  }
}