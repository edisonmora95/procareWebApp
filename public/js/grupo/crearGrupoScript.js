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
		$(".button-collapse").sideNav();
		$('.modal').modal();
		$('select').material_select();
		//Flujo
		this.formarNavbar();
	},
	data: {
		flag: true
	},
	methods: {
		formarNavbar: function() {
			/*
		   	Esta función crea el navbar dependiendo tel tipo de usuario que está loggeado.
		   */
			var usuario = 'personal';
			if (usuario === 'personal') {
				this.crearDropdownPA();
				this.crearDropdownPF();
			}
		},
		crearDropdownPA: function() {
			//Esta función crea las pestañas del dropdown de Procare Acción del navbar.
			var liAsistencias = $('<li>');
			var aAsistencias = $('<a>').html('Asistencias');
			liAsistencias.append(aAsistencias);
			$('#ulProcareAccion').append(liAsistencias);
			var liParalelos = $('<li>');
			var aParalelos = $('<a>').html('Paralelos');
			liParalelos.append(aParalelos);
			$('#ulProcareAccion').append(liParalelos);
			var liNinos = $('<li>');
			var aNinos = $('<a>').html('Niños');
			liNinos.append(aNinos);
			$('#ulProcareAccion').append(liNinos);
		},
		crearDropdownPF: function() {
			//Esta función crea las pestañas del dropdown de Procare Formación del navbar.
			var liAsistencias = $('<li>');
			var aAsistencias = $('<a>').html('Asistencias');
			liAsistencias.append(aAsistencias);
			$('#ulProcareFormacion').append(liAsistencias);
			var liGrupos = $('<li>');
			var aGrupos = $('<a>').html('Grupos');
			liGrupos.append(aGrupos);
			$('#ulProcareFormacion').append(liGrupos);
			var liProcarianos = $('<li>');
			var aProcarianos = $('<a>').html('Procarianos');
			liProcarianos.append(aProcarianos);
			$('#ulProcareFormacion').append(liProcarianos);
		},
	}
});

