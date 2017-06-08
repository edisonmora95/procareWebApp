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
	mounted: function(){
		$('.tooltipped').tooltip({delay: 50});
	},
	data: {
		procariano:{
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
		},
		habilitaredicion: false
	},
	methods: {
		eliminar: function(){
			/*
				@Autor: @edisonmora95
				@FechaCreación: 20-05-2017
			*/
			//Llamada a la api para eliminar al procariano
			this.procariano.estado = 'inactivo';
			Materialize.toast('Procariano cambiado a estado inactivo', 2000, 'rounded')
		},
		habilitarEditar(){
			this.habilitaredicion = true;
		}
	}
});