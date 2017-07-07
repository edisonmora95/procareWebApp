/*
	@Descripción: Controlador de la vista de verProcaeriano.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/04/2017
*/

'use strict';

import Navbar from './../../components/navbar.vue';
import FormProcariano from './../../components/formProcariano.vue';
Vue.component('navbar', Navbar); 
Vue.component('editar', FormProcariano);

var app = new Vue({
	el: '#app',
	created(){
		this.obtenerProcarianoPorId();
	},
	mounted: function(){
		//Inicializadores de Materialize
		$('.tooltipped').tooltip({delay: 50});
		$('.modal').modal();
	},
	data: {
		id: 0,
		procariano: {},
		habilitaredicion: false
	},
	methods: {
		//Funciones para editar la forma en la que se muestra la fecha
		moment(date) {
      return moment(date);
    },
    date(date) {
      var es = moment().locale('es');
      if (date === undefined || date === '') {
        return '----';
      }
      return moment(date).format('DD MMMM YYYY');
    },
		obtenerProcarianoPorId(){
			var self = this;
			var path = window.location.pathname;
			self.id = path.split('/')[3];
			var urlApi = '/api/procarianos/' + self.id;
			$.ajax({
				type: 'GET',
				url: urlApi,
				success: function(res){
					self.procariano = res[0];
				}
			});
		},
		eliminar: function(){
			var self = this;
			var urlApi= '/api/procarianos/' + self.id;
			$.ajax({
				type: 'DELETE',
				url: urlApi,
				success: function(res){
					if (res.status) {
						self.procariano.estado = 'inactivo';
						$('#modalExitoEliminar').modal('open');
					}else{
						$('#modalErrorEliminar').modal('open');
					}
				}
			});
		},
		habilitarEditar(){
			this.habilitaredicion = true;
		}
	}
});