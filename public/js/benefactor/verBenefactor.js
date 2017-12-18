/*
  @Descripción: Controlador de la vista de Benefactores.ejs
  @Autor: @joseAlcivar
  @FechaCreación: 30/07/2017
*/

//'use strict';

import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';
import VueTheMask from 'vue-the-mask';
import VMoney from 'v-money';

// index.js or main.js





Vue.component('navbar', Navbar);
Vue.use(Materials);
Vue.use(VueTheMask);
Vue.use(VMoney);



Vue.filter('numeral', function(value) {
    return numeral(value).format('0,0');
});

var main = new Vue({
    el: '#main',

    beforeMount: function() {
        this.cargarBenefactor();

    },
    mounted: function() {

    },
    data: {
        searchItem: '',
        items: '',

        filteredItems: [],
        paginatedItems: [], // paginatedItems arreglo toda la informacion
        key: 0,

        persona: {
            id: '',
            nombres: '',
            apellidos: '',
            cedula: '',
            razonsocial: '',
            direccion: '',
            email: '',
            celular: '',
            convencional: '',
            genero: '',
            tipo: '',
            estado: '', //activo/inactivo... Activo por default
            valor_contribucion: '',
            dia_cobro: '',
            tarjeta_credito: '',
            tipo_donacion: '',
            nombre_gestor: '',
            relacion: '',
            observacion: '',



        },

        money: {
            decimal: '.',
            thousands: ',',
            prefix: '$ ',
            precision: 2,
            masked: false /* doesn't work with directive */
        },
        arregloBenefactor: [],
        msg: '',
        fallaCargar: false //Array con el resultado de las personas
    },
    pagination: {
        range: 5,
        currentPage: 1,
        itemPerPage: 8,
        items: [],
        filteredItems: []
    },


    //},

    /* ready()
      {
       this.filteredItems = this.items
       this.buildPagination()
       this.selectPage(1)    
     },*/
    methods: {

        irAPerfil(persona) {
            window.location.href = '/benefactor/' + persona.benefactorId;
        },
        /*,
                selectItem(item) {
                    item.selected = true
                    this.selectedItems.push(item)
                    this.searchInTheList(this.searchItem, this.pagination.currentPage)
                },
                */
        cargarBenefactor: function() {
            /*
              @Descripcion : carga el Benefactor en la tabla

            */
            var path = window.location.pathname;
            console.log(path);
            var id = path.split('/')[3];
            console.log("AQUI");
            console.log(id);
            console.log("segundo");
            let self = this;
            self.arregloBenefactor = [];

            //let urlApi = '/api/personal/';
            $.ajax({
                type: 'GET',
                url: '/api/benefactor/',
                success: function(res) {
                    console.log(res[0].nombres);
                    console.log(res.estado);
                    console.log("**********************");
                    $.each(res, function(index, benefactorEncontrado) {

                        console.log(benefactorEncontrado);

                        self.arregloBenefactor.push(benefactorEncontrado);



                    });
                    console.log(res);
                    /*
                         self.fallaCargar = true;
                         self.msg = res.mensaje;
                         console.log(res)
                      */
                },
                error: function(res) {
                    self.fallaCargar = true;
                    self.msg = res.mensaje;
                    console.log(res)
                }

            });
            this.key = arregloBenefactor.length();

        },
        searchInTheList(searchText, currentPage) {
            if (_.isUndefined(searchText)) {
                this.filteredItems = _.filter(this.arregloBenefactor, function(v, k) {
                    return !v.selected;
                })
            } else {
                this.filteredItems = _.filter(this.arregloBenefactor, function(v, k) {
                    return !v.selected && v.razonsocial.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
                })
            }
            this.filteredItems.forEach(function(v, k) {
                v.key = k + 1;
            })
        },


    }
});