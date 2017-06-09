/*
	@Descripción: Controlador de la vista de verProcaeriano.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/04/2017
*/

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
		$('.tooltipped').tooltip({delay: 50});
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
    },
		obtenerProcarianoPorId(){
			var self = this;
			var path = window.location.pathname;
			self.id = path.split('/')[3];
			console.log(path);
			console.log(self.id);
			var urlApi = '/api/procarianos/' + self.id;
			$.ajax({
				type: 'GET',
				url: urlApi,
				success: function(res){
					console.log(res[0]);
					self.procariano = res[0];
				}
			})
		},
		eliminar: function(){
			/*
				@Autor: @edisonmora95
				@FechaCreación: 20-05-2017
			*/
			//Llamada a la api para eliminar al procariano
			var self = this;
			var urlApi= '/api/procarianos/' + self.id;
			$.ajax({
				type: 'DELETE',
				url: urlApi,
				success: function(res){
					console.log(res);
					Materialize.toast('Procariano cambiado a estado inactivo', 2000, 'rounded');
					self.procariano.estado = 'inactivo';
				}
			});

			//this.procariano.estado = 'inactivo';
			//Materialize.toast('Procariano cambiado a estado inactivo', 2000, 'rounded')
		},
		habilitarEditar(){
			this.habilitaredicion = true;
		}
	}
});