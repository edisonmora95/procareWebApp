/*
	@Descripción: Controlador de la vista de verPersonal.ejs
	@Autor: @edisonmora95
	@FechaCreación: 24/07/2017
*/
 
'use strict';

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
				value : 'Trabajo',
				id: 'check-trabajo'
			}
		],		//Campos que el usuario puede seleccionar para realizar la búsqueda
		checkboxes: ['Nombre'],		//Campo por default que se encuentra en la búsqueda
		procariano: {
			nombres: '',
			apellidos: '',
			cedula: '',
			direccion: '',
			fechaNacimiento: '',
			genero: '',
			email: '',
			convencional: '',
			celular: '', 
			estado: ''
		},												//Objeto que va a almacenar la persona a buscar
		arregloPersonal: [],					//Array en el que se almacenarán los resultados de la búsqueda
		usuario: 'director ejecutivo'
	},
	methods: {
		/*
			@Descripción: Función utilizada para mostrar los campos de búsqueda según los campos que se encuentran en el array checkboxes
			@Autor: @edisonmora95
			@FechaCreacion: 20-05-2017
		*/
		checkArray: function(nombre){
			var self = this;
			var variableEnCheckboxes = false;
			$.each(self.checkboxes, function(index, element){
				if(element===nombre){
					variableEnCheckboxes = true;
				}
			});
			return variableEnCheckboxes;
		},
		buscar: function(){
			var self = this;
			self.arregloPersonal = [];		//Primero se vacía el array de resultados
			var urlApi = '/api/procarianos/';
			$.ajax({
				type: 'GET',
				url: urlApi,
				data: self.procariano,
				success: function(res){
					$.each(res, function(index, personalEncontrado){
						self.arregloPersonal.push(personalEncontrado);
					});
				}
			});
			
		},
		irAPerfil(procariano){
			window.location.href = '/procarianos/perfil/' + procariano.personaId;
		},
		//Funciones para editar la forma en la que se muestra la fecha
		moment: function (date) {
      return moment(date);
    },
    date: function (date) {
      var es = moment().locale('es');
      if (date === undefined || date === '') {
        return '----';
      }
      return moment(date).format('DD MMMM YYYY');
    }
	}
});