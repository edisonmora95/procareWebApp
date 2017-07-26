/*
	@Descripción: Controlador de la vista de ingresarProcariano.ejs
	@Autor: jose viteri
	@FechaCreación: 24/07/2017
	@ÚltimaModificación: 
*/
'use strict';

import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';
Vue.component('navbar', Navbar); 
Vue.use(Materials);
Vue.use(VeeValidate);
/*
	Validaciones. Cambio de mensajes de error
*/
const dictionary = {
	en: {
		messages: {
			email : function(){
				return 'Ingrese un correo válido.';
			},
			required: function(){
				return 'Este campo es obligatorio.';
			},
			alpha_spaces: function(){
				return 'Este campo sólo puede contener letras y espacios.';
			},
			digits: function(field, length){
				return 'Este campo sólo puede contener ' + length + ' números.';
			},
			numeric: function(){
				return 'Este campo sólo puede contener números.';
			},
			alpha_num: function(){
				return 'Este campo sólo puede contener letras y números.';
			},
			regex: function(field, val){
				return 'No ingrese caracteres especiales.';
			}
		}
	}
};
VeeValidate.Validator.updateDictionary(dictionary);

var main = new Vue({
	el: '#main',
	created(){
	},
	mounted: function(){
		this.inicializarMaterialize(this);
	},
	data: {
		fechaIncorrecta: false,
		errorObj: {
			campo: '',
			msj: ''
		},
		personal: {
			nombres: '',
			apellidos: '',
			fechaNacimiento: '',
			cedula: '',
			direccion: '',
			email: '',
			celular: '',
			convencional: '',
			genero: '',
			//estado: 'activo',	//deberia estar en persona
			trabajo: ''

		}
	},
	methods: {
		validateBeforeSubmit() {
			let self = this;
			if(self.validarFechaNacimiento()){
				this.$validator.validateAll().then(() => {
					self.ingresarPersonal();	        
	      }).catch(() => {
	          self.errorObj.campo = self.errors.errors[0].field;
	          self.errorObj.msj = self.errors.errors[0].msg;
	          $('#modalError').modal('open');
	      });
			}
    },
    /*
			@Descripción: Valida que la fecha de nacimiento ingresada no sea de alguien menor a 18 años.
			@Return:
				True si es una fecha válida (>18)
				False si es inválida
    */
    validarFechaNacimiento(){
    	let self = this;
    	let year = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'yyyy');
			let actualYear = new Date().getFullYear();
			let diferencia = actualYear - year;
			if(diferencia < 18){
				self.errorObj.campo = 'Fecha de nacimiento';
				self.errorObj.msj = 'No puede ingresar a alguien con menos de 18 años.';
				$('#modalError').modal('open');
				return false;
			}
			return true;
    },
    ingresarPersonal(){
    	console.log("ingresado personal correctamente")
    	/*
    	let self = this;
    	console.log(self.procariano);
    	let urlApi = '/api/procarianos/';
    	$.ajax({
      	type:'POST',
      	url: urlApi,
      	data: self.procariano,
      	success: function(res){
      		console.log(res)
      		if(res.status){
      			$('#modalProcarianoCreado').modal('open');
      		}else{
      			alert('Error al ingresar en la base de datos');
      		}
      	},
      	error : function(err){
      		console.log(err);
      	}
      });
      */
    },
    /*
			@Descripción: 
				Inicializa los elementos de Materialize que se van a usar en el formulario.
    */
    inicializarMaterialize(self){
    	$('.datepicker').pickadate({
				selectMonths: true, // Creates a dropdown to control month
				selectYears: 100 // Creates a dropdown of 15 years to control year
			});
			$(".button-collapse").sideNav();
			$('.modal').modal();
    }
	}
});

//2 way data binding de los date pickers
$('#fecha-nacimiento').change(function(){
	var year = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'yyyy');
	var day = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'dd');
	var month = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'mm');
	//Primero valida que la fecha ingresada no sea de alguien menor a 11 años
	let actualYear = new Date().getFullYear();
	let diferencia = actualYear - year;
	if(diferencia < 18){
		main.$data.fechaIncorrecta = true;
	}else{
		main.$data.fechaIncorrecta = false;
	}

	var fecha = year + '/' + month + '/' + day;
	main.$data.personal.fechaNacimiento = fecha;
});
