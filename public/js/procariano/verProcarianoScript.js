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

		/*procariano:{
			nombres: 'Edison André',
			apellidos: 'Mora Cazar',
			cedula: '0927102848',
			direccion: 'Cdla. Coviem',
			fechaNacimiento: '27/06/1995',
			genero: 'Masculino',
			email: 'edanmora@espol.edu.ec',
			convencional: '042438648',
			celular: '0992556793',
			trabajo: '',
			colegio: 'Liceo Panamericano',
			universidad: 'Espol',
			tipo: 'Caminante',
			anio: '',
			fechaOrdenacion: '',
			estado: 'Activo',
			grupo: ''
		},*/

		procariano: {},
		habilitaredicion: false
	},
	methods: {

		 moment: function (date) {
      return moment(date);
    },
    date: function (date) {
      var es = moment().locale('es');
      // es.localeData().months(date)
      // return moment(date).format('DD/MM hh:mm:ss');
      if (date == undefined || date == '') {
        return '----'
      }
      // var hora = moment(date).format('hh')
      // if ( parseInt(hora) < 5) {
      //   return moment(date).add(8,'h').tz("America/Guayaquil").format('DD MMMM hh:mm');
      // }
      return moment(date).format('DD MMMM HH:mm');

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

			/*
				@Autor: @edisonmora95
				@FechaCreación: 20-05-2017
			*/

			var self = this;
			var urlApi= '/api/procarianos/' + self.id;
			$.ajax({
				type: 'DELETE',
				url: urlApi,
				success: function(res){
					if (res.status) {

						//Materialize.toast('Procariano cambiado a estado inactivo', 2000, 'rounded');
						self.procariano.estado = 'inactivo';
						//window.location.href = '/procarianos/';	
						$('#modalExitoEliminar').modal('open');
					}else{
						$('#modalErrorEliminar').modal('open');
						console.log(res);

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