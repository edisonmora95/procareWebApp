/*
	@Descripción: Controlador de la vista de tablaPersonal.ejs
	@Autor: @joseviteri
	@FechaCreación: 30/07/2017
*/
 
'use strict';

import Navbar from './../../components/navbar.vue';
Vue.component('navbar', Navbar); 

var main = new Vue({
	el: '#main',
	beforeMount: function(){
		this.cargarPersonal();
	},
	mounted: function(){
		
	},
	data: {
		personal: {
			id: '',
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
			sueldo: ''/*,
			estado: '' deberia ir*/ 
		},												
		arregloPersonal: [],	
		msg: '',
		fallaCargar: false				//Array con el resultado de las personas
	},
	methods: {
		irAPerfil(persona){
			window.location.href = '/personal/perfil/' + persona.id;
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
    },
    cargarPersonal(){
    	/*
				@Descripcion : carga el personal en la tabla

    	*/
    	let self = this;
    	self.arregloPersonal = [];
    	//let urlApi = '/api/personal/';
    	$.ajax({
				type : 'GET',
				url: '/api/personal/',
				success: function(res){
					console.log(res);
					if(res.status){
						$.each(res.personal, function(index, personalEncontrado){
							//console.log(personalEncontrado)
								self.arregloPersonal.push(personalEncontrado);
							});
						console.log(res)
					}
					else{
							self.fallaCargar = true;
							self.msg = res.message;
							console.log(res)
					}						
				},
				error : function(res){
					self.fallaCargar = true;
					self.msg = res.message;
					console.log(res)
				}
			});
    }
	}
});