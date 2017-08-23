/*
	@Descripción: Controlador de la vista de verProcaeriano.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/04/2017
*/

'use strict';

import FormProcariano from './../../components/formProcariano.vue';
Vue.component('editar', FormProcariano);

var app = new Vue({
	el: '#app',
	created(){
		var path = window.location.pathname;
		this.idProcariano = path.split('/')[3];
		this.obtenerProcarianoPorId(this, this.idProcariano);
	},
	mounted: function(){
		//Inicializadores de Materialize
		$('.modal').modal();
	},
	data: {
		idProcariano: 0,
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
		obtenerProcarianoPorId(self, id){
			var urlApi = '/api/procarianos/' + id;
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
					self.tipoprocariano.id = res[0].tipoId;
					self.tipoprocariano.text = res[0].tipoNombre;
					self.fechaNacimiento = new Date(self.procariano.fechaNacimiento.replace(/-/g, '\/').replace(/T.+/, ''));
					self.obtenerGrupoDeProcariano(self, self.procariano.procarianoID);
				}
			});
		},
		obtenerGrupoDeProcariano(self, idProcariano){
			let urlApi = '/api/procarianos/grupo/' + idProcariano;
			$.ajax({
				type: 'GET',
				url: urlApi,
				success(res){
					console.log(res)
					if(res.estado){
						self.grupoprocariano.id = res.datos.id;
						self.grupoprocariano.text = res.datos.nombre;
					}else{
						self.grupoprocariano.id = '';
						self.grupoprocariano.text = '';	
					}
				},
				error(err){
					self.grupoprocariano.id = '';
					self.grupoprocariano.text = '';	
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