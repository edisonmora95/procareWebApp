/*
  @Descripción: Controlador de la vista de Benefactores.ejs
  @Autor: @joseAlcivar
  @FechaCreación: 30/07/2017
*/

//'use strict';

import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';
// index.js or main.js





Vue.component('navbar', Navbar);
Vue.use(Materials);



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
        items: items2,
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
            observacion: ''

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
            window.location.href = '/benefactor/' + persona.id;
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


            let self = this;
            self.arregloBenefactor = [];

            //let urlApi = '/api/personal/';
            $.ajax({
                type: 'GET',
                url: '/api/benefactor/',
                success: function(res) {

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
            console.log("valor de la clave");
            console.log(key);
            console.log("fin de valor");
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
        }
        //  this.buildPagination()


        /*            if (_.isUndefined(currentPage)) {
                        this.selectPage(1);
                    } else {
                        this.selectPage(currentPage);
                    }
            }
            /*,

            selectPage(item) {
                this.pagination.currentPage = item

                let start = 0
                let end = 0
                if (this.pagination.currentPage < this.pagination.range - 2) {
                    start = 1
                    end = start + this.pagination.range - 1
                } else if (this.pagination.currentPage <= this.pagination.items.length && this.pagination.currentPage > this.pagination.items.length - this.pagination.range + 2) {
                    start = this.pagination.items.length - this.pagination.range + 1
                    end = this.pagination.items.length
                } else {
                    start = this.pagination.currentPage - 2
                    end = this.pagination.currentPage + 2
                }
                if (start < 1) {
                    start = 1
                }
                if (end > this.pagination.items.length) {
                    end = this.pagination.items.length
                }

                this.pagination.filteredItems = []
                for (var i = start; i <= end; i++) {
                    this.pagination.filteredItems.push(i);
                }

                this.arregloBenefactor = this.filteredItems.filter((v, k) => {
                    return Math.ceil((k + 1) / this.pagination.itemPerPage) == this.pagination.currentPage
                })
            }*/
    }
});