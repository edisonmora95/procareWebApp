/*
	@Descripción: Controlador de la vista de verProcaeriano.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/04/2017
*/

import Navbar from './../../components/navbar.vue';
Vue.component('navbar', Navbar); 

var main = new Vue({
	el: '#main',
	mounted: function(){
		$('.modal').modal();
		$(".button-collapse").sideNav();
	},
	data: {
		checkboxesAux: [
			{
				value: 'Nombre',
				id: 'check-nombre'
			},
			{
				value: 'Apellido',
				id: 'check-apellido'
			},
			{
				value: 'Cédula',
				id: 'check-cedula'
			},
			{
				value: 'Dirección',
				id: 'check-direccion'
			},
			{
				value: 'Fecha de nacimiento',
				id: 'check-fecha-nacimiento'
			},
			{
				value: 'Género',
				id: 'check-genero'
			},
			{
				value: 'Email',
				id: 'check-email'
			},
			{
				value: 'Convencional',
				id: 'check-convencional'
			},
			{
				value: 'Celular',
				id: 'check-celular'
			},
			{
				value: 'Trabajo',
				id: 'check-trabajo'
			},
			{
				value: 'Colegio',
				id: 'check-colegio'
			},
			{
				value: 'Universidad',
				id: 'check-universidad'
			},
			{
				value: 'Tipo',
				id: 'check-tipo'
			},
			{
				value: 'Año',
				id: 'check-anio'
			},
			{
				value: 'Fecha de ordenación',
				id: 'check-fecha-ordenacion'
			},
			{
				value: 'Estado',
				id: 'estado'
			},
			{
				value: 'Grupo',
				id: 'grupo'
			}
		],
		checkboxes: ['Nombre'],
		procarianos: [
			{
				nombre: 'Edison',
				apellido: 'Mora',
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
			{
				nombre: 'Felipe',
				apellido: 'Clavijo',
				cedula: '0954786589',
				direccion: 'direccion falsa',
				fechaNacimiento: '26/06/1995',
				genero: 'Masculino',
				email: 'felipe@hotmail.com',
				convencional: '042568748',
				celular: '0992568748',
				trabajo: '',
				colegio: '',
				universidad: '',
				tipo: 'Caminante',
				anio: '',
				fechaOrdenacion: '',
				estado: 'Activo',
				grupo: ''
			}
		],
		procariano: {
			nombre: '',
			apellido: '',
			cedula: '',
			direccion: '',
			fechaNacimiento: '',
			genero: '',
			email: '',
			convencional: '',
			celular: '',
			trabajo: '',
			colegio: '',
			universidad: '',
			tipo: '',
			anio: '',
			fechaOrdenacion: '',
			estado: '',
			grupo: ''
		},
		resultados: [],
		usuario: 'personal'
	},
	methods: {
		checkArray: function(nombre){
			/*
				@Descripción: Fuck if I know...
				@Autor: @edisonmora95
				@FechaCreacion: 20-05-2017
			*/
			var self = this;
			var flag = false;
			$.each(self.checkboxes, function(index, element){
				//console.log(element)
				if(element==nombre){
					//console.log('lo encontro')
					flag = true;
				}
			});
			return flag;
		},
		buscar: function(){
			console.log(self.procariano)
			
		}
	}
});