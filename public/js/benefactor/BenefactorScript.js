/*
	@Descripción: Controlador de la vista de ingresarProcariano.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/04/2017
	@ÚltimaModificación: 7/07/2017 @edanmora95 Refactorización
*/
'use strict';

import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';
import VueTheMask from 'vue-the-mask';
import VMoney from 'v-money';


Vue.component('navbar', Navbar);
Vue.use(Materials);
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

var main = new Vue({
    el: '#main',
    created() {

    },
    mounted: function() {
        this.inicializarMaterialize(this);
    },
    data: {
        fechaIncorrecta: false,
        errorObj: {
            campo: '',
            msj: ''
        },
        valor: '', // es una variable temporal para mostrar la mascara luego almacenar el valor contribucion el la variable real
        benefactor: {
            nombres: '',
            apellidos: '',
            cedula: '',
            razonsocial: '',
            direccion: '',
            email: '',
            celular: '',
            convencional: '',
            genero: '',
            tipo: '', //chico de formación/caminante/pescador/pescador consagrado/sacerdote
            estado: 'activo', //activo/inactivo... Activo por default
            valor_contribucion: '',
            dia_cobro: '',
            tarjeta_credito: '',
            tipo_donacion: '',
            nombre_gestor: '',
            relacion: '',
            observacion: ''


        },
        src: '',
        errorAjax: {
            titulo: '',
            descripcion: ''
        },

        mask_format: {
            credit_card: "####-####-####-####",
            telef_convencional: "(0#)###-####",
            telf_celular: "0##-###-####",
            diaCobroMask: "##",
            Ruc_Mask: "#-############"

        },

        money: {
            decimal: '.',
            thousands: ',',
            prefix: '$ ',
            precision: 2,
            masked: false /* doesn't work with directive */
        },

        payment_icons: {
            visa: "ccs ccs-visa",
            mastercard: "ccs ccs-mastercard",
            american: "ccs ccs-amex",
            discover: "ccs ccs-discover",
            dinnersclub: "ccs ccs-dinersclub"
        }
    },
    methods: {

        cambio_text_integerofloat: function() {

            let valor = $('#valor_contribucion').val();
            let diacob = $('#diaCobro').val();
            let result = Number(valor.replace(/[^0-9\.]+/g, ""));
            this.benefactor.tipo_donacion = $('#selectDonacion option:selected').val();
            this.benefactor.valor_contribucion = parseFloat(result);
            this.benefactor.dia_cobro = parseInt(diacob);
        },

        validateBeforeSubmit() {
            let self = this;
            if (self.validarFechaNacimiento()) {
                this.cambio_text_integerofloat();

                this.$validator.validateAll().then(() => {
                    self.ingresarBenefactor();
                }).catch(() => {
                    self.errorObj.campo = self.errors.errors[0].field;
                    self.errorObj.msj = self.errors.errors[0].msg;
                    $('#modalError').modal('open');
                });
            }
        },

        validarIconoTarjeta: function() {
            let value = this.benefactor.tarjeta_credito.substring(0, 2);
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

        validarFechaNacimiento() {
            /*let self = this;
    	let year = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'yyyy');
			let actualYear = new Date().getFullYear();
			let diferencia = actualYear - year;
			if(diferencia < 11){
				self.errorObj.campo = 'Fecha de nacimiento';
				self.errorObj.msj = 'No puede ingresar a alguien con menos de 11 años.';
				$('#modalError').modal('open');
				return false;
			}
			*/
            return true;
        },
        ingresarBenefactor() {
            let self = this;
            let urlApi = '/api/benefactor/';
            $.ajax({
                type: 'POST',
                url: urlApi,
                data: self.benefactor,
                success: function(res) {
                    console.log(res.estado);
                    console.log("QUE PASO?");
                    if (res.estado) {
                        $('#modalBenfactorCreado').modal('open');
                    } else {
                        self.mostrarMensajeDeErrorAjax(self, 'Error de base de datos', 'Error al tratar de ingresar en la base de datos. Intente nuevamente.');
                    }
                },
                error(err) {
                    console.log(err);
                    self.mostrarMensajeDeErrorAjax(self, 'Error de conexión', 'No se pudo conectar con el servidor. Intente nuevamente.');
                }
            });
        },
        /*
    formaterDollar(){
		let valor = $('#valor_contribucion').val();
		var resultado = numeral(valor).format ('$ 0,0,00');
		main.$data.benefactor.benefactor.valor_contribucion = resultado;
		return resultado;
    },



     /*
			@Descripción: 
				Inicializa los elementos de Materialize que se van a usar en el formulario.
    */
        inicializarMaterialize(self) {
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 100 // Creates a dropdown of 15 years to control year
            });
            $(".button-collapse").sideNav();
            $('.modal').modal();
            $('#selectGenero').change(function() {
                let generoSeleccionado = $('#selectGenero option:selected').val();
                //let donacionSeleccionado = $('#selectDonacion option:selected').val();
                //self.filtrarGruposPorGenero(self, generoSeleccionado);
            });
        },
        mostrarMensajeDeErrorAjax(self, titulo, descripcion) {
            self.errorAjax.titulo = titulo;
            self.errorAjax.descripcion = descripcion;
            $('#modalErrorAjax').modal('open');
        }
    }

});


// devuelve el numero de contribucion sin el signo de DOLAR

$('#nombres').change(function() {

    let valor = $('#valor_contribucion').val();
    let result = Number(valor.replace(/[^0-9\.]+/g, ""));
    //alert(result);
});