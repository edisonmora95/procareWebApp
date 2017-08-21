/*
	@Descripción: Controlador de la vista de Donaciones
	@Autor: @josealcivar
	@FechaCreación: 15/08/2017
*/

'use strict';

import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';
import VueTheMask from 'vue-the-mask';
import VMoney from 'v-money';
import Autocomplete from './../../components/Autocomplete.vue';



Vue.use(Autocomplete);
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

var app = new Vue({
    el: '#app',

    components: {
        Autocomplete
    },

    created() {
        var path = window.location.pathname;

    },
    mounted: function() {
        this.NombresBenefactor();
        //Inicializadores de Materialize
        $('.tooltipped').tooltip({
            delay: 50
        });
        $('.modal').modal();
        //this.procariano.fechaNacimiento = new Date(this.procariano.fechaNacimiento)

    },
    data: {
        fechaIncorrecta: false,
        value: '',
        errorObj: {
            campo: '',
            msj: ''
        },

        NameBenefactor: [],
        arregloBenefactor: [],
        options: [], // arreglo para la busqueda 

        donacion: {
            razonsocial: '',
            valor: '',
            diacobro: '',
            cantidad: '',
            fecha_donacion: '',
            observacion: ''
        },
        money: {
            decimal: '.',
            thousands: ',',
            prefix: '$ ',
            precision: 2,
            masked: false /* doesn't work with directive */
        },
        src: '',
        errorAjax: {
            titulo: '',
            descripcion: ''
        }
    },


    methods: {

        onOptionSelect(option) {
            console.log('Selected option:', option);
        },
        //Funciones para editar la forma en la que se muestra la fecha

        cargarBenefactorPorDonacion() {

        },

        NombresBenefactor() {

            let self = this;
            self.arregloBenefactor = [];
            self.NameBenefactor = [];

            //let urlApi = '/api/personal/';
            $.ajax({
                type: 'GET',
                url: '/api/benefactor/',
                success: function(res) {

                    console.log(res.estado);

                    $.each(res, function(index, benefactorEncontrado) {

                        self.arregloBenefactor.push(benefactorEncontrado);
                        self.NameBenefactor.push(benefactorEncontrado.razonsocial);
                        self.options.push(benefactorEncontrado.razonsocial);


                    });

                    /*
                         self.fallaCargar = true;
                         self.msg = res.mensaje;
                         console.log(res)
                      */
                },
                error: function(res) {
                    self.fallaCargar = true;
                    self.msg = res.mensaje;

                }

            });

        }

    }

});