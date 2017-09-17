/*
  @Descripción: Controlador de la vista de Benefactores.ejs
  @Autor: @joseAlcivar
  @FechaCreación: 30/07/2017
*/

'use strict';

//import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';
import VueTheMask from 'vue-the-mask';
import VMoney from 'v-money';

// index.js or main.js





//Vue.component('navbar', Navbar);
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
        this.inicializarMaterialize(this);

    },
    data: {
        searchItem: '',
        items: '',

        filteredItems: [],
        paginatedItems: [], // paginatedItems arreglo toda la informacion
        id_benefactor_eliminar: 0,
        nombre_eliminado: '',
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
        errorAjax: {
            titulo: '',
            descripcion: ''
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
            var id = path.split('/')[1];
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
                    // console.log(res[0].nombres);
                    console.log(res.status);
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
            // this.key = arregloBenefactor.length();

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

        PreguntaparaEliminar(persona) {
            this.nombre_eliminado = persona.razonsocial;
            this.id_benefactor_eliminar = persona.personaId;
            $('#modalBenfactorEliminar').modal('open');
        },
        //INGRESA UN NUEVO BENEFACTOR 
        EliminarBenefactor() {

            var urlApi = '/api/benefactor/' + this.id_benefactor_eliminar;
            //alert(urlApi);

            console.log(urlApi);
            $.ajax({
                type: 'DELETE',
                url: urlApi,
                success: function(res) {
                        console.log(res.status);
                        console.log(res.mensaje);
                        if (res.status) {
                            $('#modalBenfactorEliminado').modal('open');
                        } else {
                            self.mostrarMensajeDeErrorAjax(self, 'Error de base de datos', 'Error al tratar de eliminar el registro seleccionado. Intente nuevamente.');
                        }

                    } //,
                    //error(err) {
                    //  console.log(err);
                    // self.mostrarMensajeDeErrorAjax(self, 'Error de conexión', 'No se pudo conectar con el servidor. Intente nuevamente.');
                    //}
            });
        },
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