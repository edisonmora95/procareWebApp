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
		//this.procariano.fechaNacimiento = new Date(this.procariano.fechaNacimiento)
		
	},
	data: {
		id: 0,
		procariano: {},
		fechaNacimiento: '',
		habilitaredicion: false,
		grupoprocariano: {
			id: '',
			text: ''
		},
		tipoprocariano: {
			id: '',
			text: ''
		}
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
					let grupo = {
						id: '',
						text: ''
					};
					self.procariano.grupo = '';
					console.log(self.procariano)
					self.fechaNacimiento = new Date(self.procariano.fechaNacimiento.replace(/-/g, '\/').replace(/T.+/, ''));
					console.log(self.fechaNacimiento)
					self.obtenerGrupoDeProcariano();
				}
			});
		},
		obtenerGrupoDeProcariano(){
			let self = this;
			let urlApi = '/api/pg/' + self.procariano.procarianoID;
			console.log(urlApi)
			$.ajax({
				type: 'GET',
				url: urlApi,
				success(res){
					console.log(res)
					self.grupoprocariano.id = res.grupo.id;
					self.grupoprocariano.text = res.grupo.nombre;
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