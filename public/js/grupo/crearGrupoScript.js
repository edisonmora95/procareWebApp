/*
	@Descripción: Este archivo llama a los componentes para crear grupo y escoger chicos del grupo
	@Autor: @edisonmora95
	@FechaCreación: 26-05-2017
*/
import Navbar from './../../components/navbar.vue';
import CrearGrupo1 from './../../components/crearGrupo.vue';
import EscogerChicos from './../../components/escogerChicos.vue';

Vue.component('navbar', Navbar); 
Vue.component('crear-grupo-1', CrearGrupo1);
Vue.component('escoger-chicos', EscogerChicos);

var app = new Vue({
	el: '#app',
	mounted: function() {
		//Inicializadores de componentes de Materialize
		$('.modal').modal();
		$('select').material_select();
		//Flujo
	},
	data: {
		flag: true,
		grupo: {
			nombre: '',
			animador: '',
			genero: '',
			etapa: '',
			tipo: 'Formación',
			cantidadChicos: 0,
			numeroReuniones: 0
		}
	},
	methods: {
	}
});
