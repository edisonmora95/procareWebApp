/*
	@Descripción: Controlador de la vista de ingresarProcariano.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/04/2017
	@ÚltimaModificación: 7/07/2017 @edanmora95 Refactorización
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
		this.obtenerTodosLosGrupos();
	},
	mounted: function(){
		this.inicializarMaterialize();
	},
	data: {
		fechaIncorrecta: false,
		errorObj: {
			campo: '',
			msj: ''
		},
		procariano: {
			nombres: '',
			apellidos: '',
			fechaNacimiento: '',
			cedula: '',
			direccion: '',
			email: '',
			celular: '',
			convencional: '',
			genero: '',
			tipo: '',	//chico de formación/caminante/pescador/pescador consagrado/sacerdote
			estado: 'activo',	//activo/inactivo... Activo por default
			colegio: '',
			universidad: '',
			grupo: '',
			trabajo: '',
			parroquia: '',
			fechaOrdenacion: ''
		},
		src: '',
		gruposCaminantes: [],
		grupoCaminantesSel: '',
		gruposFormacion: [],
		grupoFormacionSel: '',
		gruposPescadores: [],
		grupoPescadoresSel: '',
		gruposMayores: [],
		grupoMayoresSel: ''
	},
	methods: {
		validateBeforeSubmit() {
			let self = this;
			if(self.validarFechaNacimiento()){
				self.bindGrupoSeleccionado();
				this.$validator.validateAll().then(() => {
					self.ingresarProcariano();	        
	      }).catch(() => {
	          self.errorObj.campo = self.errors.errors[0].field;
	          self.errorObj.msj = self.errors.errors[0].msg;
	          $('#modalError').modal('open');
	      });
			}
    },
    /*
			@Descripción: Valida que la fecha de nacimiento ingresada no sea de alguien menor a 11 años.
			@Return:
				True si es una fecha válida (>11)
				False si es inválida
    */
    validarFechaNacimiento(){
    	let self = this;
    	let year = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'yyyy');
			let actualYear = new Date().getFullYear();
			let diferencia = actualYear - year;
			if(diferencia < 11){
				self.errorObj.campo = 'Fecha de nacimiento';
				self.errorObj.msj = 'No puede ingresar a alguien con menos de 11 años.';
				$('#modalError').modal('open');
				return false;
			}
			return true;
    },
    /*
			@Descripción:
				Dependiendo del tipo de procariano seleccionado, se hace el binding con el grupo seleccionado.
    */
    bindGrupoSeleccionado(){
    	let self = this;
    	let tipoProcariano = self.procariano.tipo;
    	if(tipoProcariano === '1'){
    		self.procariano.grupo = self.grupoFormacionSel;
    	}else if(tipoProcariano === '2'){
    		self.procariano.grupo = self.grupoCaminantesSel;
    	}else if(tipoProcariano === '3'){
    		self.procariano.grupo = self.grupoPescadoresSel;
    	}
    },
    ingresarProcariano(){
    	let self = this;
    	console.log(self.procariano);
    	let urlApi = '/api/procarianos/';
    	$.ajax({
      	type:'POST',
      	url: urlApi,
      	data: self.procariano,
      	success: function(res){
      		if(res.mensaje === 'Se pudo crear correctamente'){
      			$('#modalProcarianoCreado').modal('open');
      		}else{
      			alert('Error al ingresar en la base de datos');
      		}
      	},
      	error : function(err){
      		console.log(err);
      	}
      });
    },
    obtenerTodosLosGrupos(){
    	let self = this;
    	$.ajax({
    		type: 'GET',
    		url: '/api/grupos/',
    		success(res){
    			self.armarArraysGrupos(res.sequelizeStatus);
    		},
    		error(){

    		}
    	});
    },
    /*
			@Descripción: Arma los arrays de grupos obtenidos de la base de datos
			@Params:
				grupos -> grupos obtenidos de la base de datos al hacer la llamada a la api.
    */
    armarArraysGrupos(grupos){
    	let self = this;
    	$.each(grupos, function(index, grupo){
    		let grupoObj = {
  				id: grupo.id,
  				text: grupo.nombre
  			};
    		if(grupo.tipo === 'Formación'){
    			self.gruposFormacion.push(grupoObj);
    		}else if(grupo.tipo === 'Caminantes'){
    			self.gruposCaminantes.push(grupoObj);
    		}else if(grupo.tipo === 'Pescadores'){
    			self.gruposPescadores.push(grupoObj);
    		}else if(grupo.tipo === 'Mayores'){
    			self.gruposMayores.push(grupoObj);
    		}
    	});
    },
    /*
			@Descripción: 
				Inicializa los elementos de Materialize que se van a usar en el formulario.
    */
    inicializarMaterialize(){
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
	if(diferencia < 11){
		main.$data.fechaIncorrecta = true;
	}else{
		main.$data.fechaIncorrecta = false;
	}

	var fecha = year + '/' + month + '/' + day;
	main.$data.procariano.fechaNacimiento = fecha;
});
$('#fecha-ordenacion').change(function(){
	var year = $('#fecha-ordenacion').pickadate('picker').get('highlight', 'yyyy');
	var day = $('#fecha-ordenacion').pickadate('picker').get('highlight', 'dd');
	var month = $('#fecha-ordenacion').pickadate('picker').get('highlight', 'mm');
	var fecha = year + '/' + month + '/' + day;
	main.$data.procariano.fechaOrdenacion = fecha;
});