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
			},
			decimal: function(){
				return 'Su sueldo debe tener un máximo de dos decimales'
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
			msj: '',
			statusApi : true
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
			trabajo: '',
			sueldo: ''

		}
	},
	methods: {
		validateBeforeSubmit() {
			let self = this;
			if(self.validarFechaNacimiento()){
				this.$validator.validateAll().then(resultado => {
					console.log('este es el resultado ' + resultado);
					self.ingresarPersonal();	        
	      }).catch(() => {
	          self.errorObj.campo = self.errors.errors[0].field;
	          self.errorObj.msj = self.errors.errors[0].msg;
	          self.errorObj.statusApi = true;
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
    	//console.log("ingresado personal correctamente")
    	
    	let self = this;
    	console.log(self.personal);
    	//let urlApi = '/api/procarianos/';
    	$.ajax({
      	type:'POST',
      	url: '/api/personal/',
      	data: self.personal,
      	success: function(res){
      		console.log('este es res: ' + res);
      		if(res.estado){
      			$('#modalPersonalCreado').modal('open');
      		}else{
      			self.errorObj.msj = res.mensaje;
      			self.errorObj.statusApi = false;
      			$('#modalError').modal('open');
      		}
      	},
      	error : function(err){
      		console.log(err);
      	}
      });
      
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
    },
    /*
			@Descripcion:
				Solo cancela y redirige a la panatalla de la tabla de personal
    */
    cancelar(){
    	window.location.href = '/personal/'
    	//console.log('debo agregar esa vista aun');
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
