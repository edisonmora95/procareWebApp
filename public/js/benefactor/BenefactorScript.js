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
VeeValidate.Validator.updateDictionary(dictionary);

let main = new Vue({
    el: '#main',
    mounted: function() {
      this.inicializarMaterialize(this);
    },
    data: {
      fechaIncorrecta: false,
      
      valor: '', // es una variable temporal para mostrar la mascara luego almacenar el valor contribucion el la variable real
      benefactor: {
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
        estado           : 'activo', //activo/inactivo... Activo por default
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
        Ruc_Mask          : "#############"
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
        $('.modal').modal();
        $('select').material_select();
        $('#selectGenero').change(function() {
          self.benefactor.genero = $('#selectGenero').val();
        });
        $('#selectDonacion').change(function() {
          self.benefactor.tipoDonacion   = $('#selectDonacion').val();
        });
      },
      cambio_text_integerofloat: function() {
        let valor       = $('#valorContribucion').val();
        let result      = Number(valor.replace(/[^0-9\.]+/g, ""));
        let diaCobro    = $('#diaCobro').val();
        main.benefactor.valorContribucion = parseFloat(result);
        main.benefactor.diaCobro          = parseInt(diaCobro);
      },
      validateBeforeSubmit() {
        let self = this;
        const anioIngresado = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'yyyy');
        if ( self.validarFechaNacimiento(self, anioIngresado) ) {
          self.cambio_text_integerofloat();
          
          this.$validator.validateAll().then((result) => {
            if( result ){
              self.ingresarBenefactor(self);
            }else{
              self.errorObj.campo = self.errors.errors[0].field;
              self.errorObj.msj   = self.errors.errors[0].msg;
              $('#modalError').modal('open');
            }
          });
        }
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
      /*
        @Descripción: Valida que la fecha de nacimiento ingresada no sea de alguien menor a 11 años.
        @Return:
          True si es una fecha válida (>11)
          False si es inválida
      */
      validarFechaNacimiento(self, year){
        const actualYear  = new Date().getFullYear();
        const diferencia  = actualYear - year;
        if( diferencia < 18 ){
          self.errorObj.campo = 'Fecha de nacimiento';
          self.errorObj.msj   = 'No puede ingresar a alguien con menos de 18 años.';
          return false;
        }
        return true;
      },
      ingresarBenefactor(self) {
        let urlApi = '/api/benefactores/';
        console.log(main.benefactor);
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
      mostrarMensajeDeErrorAjax(self, titulo, descripcion) {
        self.errorAjax.titulo      = titulo;
        self.errorAjax.descripcion = descripcion;
        $('#modalErrorAjax').modal('open');
      }
    }
});


// devuelve el numero de contribucion sin el signo de DOLAR

$('#valorContribucion').change(function() {
    let valor = $('#valorContribucion').val();
    let result = Number(valor.replace(/[^0-9\.]+/g, ""));
});

$('#fecha-nacimiento').change(function(){
  var year  = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'yyyy');
  var day   = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'dd');
  var month = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'mm');
  //Primero valida que la fecha ingresada no sea de alguien menor a 11 años
  let actualYear = new Date().getFullYear();
  let diferencia = actualYear - year;
  if(diferencia < 18){
    main.$data.fechaIncorrecta = true;
  }else{
    main.$data.fechaIncorrecta = false;
  }

  var fecha = year + '/' + month + '/' + day;
  main.$data.benefactor.fechaNacimiento = fecha;
});
