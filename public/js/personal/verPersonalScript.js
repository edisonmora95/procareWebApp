/*
	@Descripción: Controlador de la vista de verPersonal.ejs
	@Autor: @javiteri95
	@FechaCreación: 01/08/2017
*/

'use strict';

import Navbar from './../../components/navbar.vue';
import FormPersonal from './../../components/formPersonal.vue';
Vue.component('navbar', Navbar); 
Vue.component('editar', FormPersonal);

var app = new Vue({
	el: '#app',
	created(){
		var path = window.location.pathname;
		this.idPersonal = path.split('/')[3];
		this.obtenerPersonalPorId(this, this.idPersonal);
	},
	mounted: function(){
		//Inicializadores de Materialize
		$('.tooltipped').tooltip({delay: 50});
		$('.modal').modal();
		//this.procariano.fechaNacimiento = new Date(this.procariano.fechaNacimiento)
		
	},
	data: {
		idPersonal: 0,
		personal: {},
		fechaNacimiento: '',
		habilitaredicion: false,
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
		obtenerPersonalPorId(self, id){
			var urlApi = '/api/personal/' + id;
			$.ajax({
				type: 'GET',
				url: urlApi,
				success: function(res){
					self.personal = res.datos;
					self.fechaNacimiento = new Date(self.personal.fechaNacimiento.replace(/-/g, '\/').replace(/T.+/, ''));

				}
			});
		},
		eliminar: function(){
			
			var self = this;
			console.log('este es el id ' + self.idPersonal);
			var urlApi= '/api/personal/' + self.idPersonal;
			$.ajax({
				type: 'DELETE',
				url: urlApi,
				success: function(res){
					if (res.estado) {
						$('#modalExitoEliminar').modal('open');
					}else{
						$('#modalErrorEliminar').modal('open');
					}
				},
				error : function(error){

				}
			});
			
		},
		habilitarEditar(){
			this.habilitaredicion = true;
		}
	}
});