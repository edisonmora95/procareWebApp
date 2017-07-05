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
<<<<<<< HEAD
		],
		checkboxes: ['Nombre'],
		/*procarianos: [
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
		],*/
=======
		],		//Campos que el usuario puede seleccionar para realizar la búsqueda
		checkboxes: ['Nombre'],		//Campo por default que se encuentra en la búsqueda
>>>>>>> 74ea86c0eb4652d1ea655c43da1477291cca8bdb
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
			trabajo: '',
			colegio: '',
			universidad: '',
			tipo: '',
			anio: '',
			fechaOrdenacion: '',
			estado: '',
			grupo: ''
<<<<<<< HEAD
		},
		procarianos: [],
		resultados: [],
=======
		},												//Objeto que va a almacenar al procariano a buscar
		procarianos: [],					//Array en el que se almacenarán los resultados de la búsqueda
		//resultados: [],
>>>>>>> 74ea86c0eb4652d1ea655c43da1477291cca8bdb
		usuario: 'personal'
	},
	methods: {
		checkArray: function(nombre){
			/*
				@Descripción: Función utilizada para mostrar los campos de búsqueda según los campos que se encuentran en el array checkboxes
				@Autor: @edisonmora95
				@FechaCreacion: 20-05-2017
			*/
			var self = this;
			var flag = false;
			$.each(self.checkboxes, function(index, element){
				if(element==nombre){
					flag = true;
				}
			});
			return flag;
		},
		buscar: function(){
			var self = this;
<<<<<<< HEAD
			self.procarianos = [];
			console.log(self.procariano);
			console.log('Mira Erick que no se recarga la página.')
=======
			self.procarianos = [];		//Primero se vacía el array de resultados
>>>>>>> 74ea86c0eb4652d1ea655c43da1477291cca8bdb
			var urlApi = '/api/procarianos/';
			$.ajax({
				type: 'GET',
				url: urlApi,
				data: self.procariano,
				success: function(res){
<<<<<<< HEAD
					console.log(res);
=======
>>>>>>> 74ea86c0eb4652d1ea655c43da1477291cca8bdb
					$.each(res, function(index, procarianoEncontrado){
						self.procarianos.push(procarianoEncontrado);
					});
				}
			})
			
		},
		irAPerfil(procariano){
<<<<<<< HEAD
			let urlApi = '/procarianos/perfil/' + procariano.cedula;
			/*$.ajax({
				type: 'GET',
				url: urlApi

			})*/
			window.location.href = '/procarianos/perfil/' + procariano.personaId;
		}
=======
			window.location.href = '/procarianos/perfil/' + procariano.personaId;
		},
		//Funciones para editar la forma en la que se muestra la fecha
		moment: function (date) {
      return moment(date);
    },
    date: function (date) {
      var es = moment().locale('es');
      if (date == undefined || date == '') {
        return '----'
      }
      return moment(date).format('DD MMMM YYYY');
    }
>>>>>>> 74ea86c0eb4652d1ea655c43da1477291cca8bdb
	}
});