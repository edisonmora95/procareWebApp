/*
	@Descripción: Controlador de la vista de buscarGrupo.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/05/2017
*/

import Navbar from './../../components/navbar.vue';

Vue.component('navbar', Navbar); 

let BuscarGrupoApp = new Vue({
	el: '#BuscarGrupoApp',
	created: function(){

	},
	mounted: function(){
		//Inicializadores de componentes de Materialize
		$(".button-collapse").sideNav();
		$('.modal').modal();
		$('select').material_select();
		$('.tooltipped').tooltip({delay: 50});
		//Flujo
		this.formarNavbar();
	},
	data: {
		grupos: [],
		/*grupo:{
			nombre: '',
			anio: '',
			animador: '',
			etapa: ''
		}*/
		aux: [
			{
				nombre: 'Grupo de Mario',
				etapa: 'Quinta etapa',
				animador: 'Mario Montalván'
			},
			{
				nombre: 'Grupo de Fernando',
				etapa: 'Quinta etapa',
				animador: 'Fernando Icaza'
			},
			{
				nombre: 'Grupo de Luis',
				etapa: 'Quinta etapa',
				animador: 'Luis Andino'
			},
			{
				nombre: 'Grupo de Bernardo',
				etapa: 'Quinta etapa',
				animador: 'Bernardo Meitzner'
			}
		],
		grupo:{
			nombre: '',
			anio: new Date().getFullYear(),
			animador: '',
			etapa: ''
		}

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
		//Eventos
		buscar(){
			let self = this;
			let campoLleno = false;	//Bandera que indicará si hay por lo menos un campo de búsqueda lleno.
			self.grupos = [];	//Lo vacío por si acaso...
			console.log(self.grupo);
			//Primero revisa si por lo menos un campo está lleno
			$.each(self.grupo, (property, value) => {
				if(value != ''){
					campoLleno = true;
					return false;
				}
			});
			if(campoLleno){
				//Llamada a la api...
				$.each(self.aux, function(index, grupo){
					self.grupos.push(grupo);
				});
			}else{
				Materialize.toast('Llene por lo menos un campo de búsqueda.', 3000, 'rounded');
			}
			
		}
	}
});

//2 way data binding
$('#etapaSelect').change(function(){
	BuscarGrupoApp.$data.grupo.etapa = $('#etapaSelect option:selected').text();
});