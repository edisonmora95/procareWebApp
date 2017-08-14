/*
	@Descripción: Controlador de la vista de verProcaeriano.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/04/2017
*/

'use strict';

import Navbar from './../../components/navbar.vue';
import formDonacion from './../../components/donacion.vue';
Vue.component('navbar', Navbar);
Vue.component('editar', formDonacion);

var app = new Vue({
    el: '#app',
    created() {
        var path = window.location.pathname;
        this.idProcariano = path.split('/')[3];
        this.obtenerProcarianoPorId(this, this.idProcariano);
    },
    mounted: function() {
        //Inicializadores de Materialize
        $('.tooltipped').tooltip({
            delay: 50
        });
        $('.modal').modal();
        //this.procariano.fechaNacimiento = new Date(this.procariano.fechaNacimiento)

    },
    data: {


        donacion: {
            razonsocial: '',
            valor: '',
            diacobro: '',
            cantidad: '',
            fecha_donacion: '',
            observacion: ''


        }
    },
    methods: {
        //Funciones para editar la forma en la que se muestra la fecha

    }
}
});