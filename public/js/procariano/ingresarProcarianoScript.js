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
		this.obtenerTodosLosGrupos(this);
		this.obtenerTiposProcariano(this);
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
		gruposObtenidos: [],
		gruposCaminantes: [],
		grupoCaminantesSel: '',
		gruposFormacion: [],
		grupoFormacionSel: '',
		gruposPescadores: [],
		grupoPescadoresSel: '',
		gruposMayores: [],
		grupoMayoresSel: '',
		tipos: []
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
    },
    /*
			@Descripción:
				Obtiene todos los grupos existentes en la base de datos.
				Los almacena en self.grupos.
    */
    obtenerTodosLosGrupos(self){
    	$.ajax({
    		type: 'GET',
    		url: '/api/grupos/',
    		success(res){
    			self.gruposObtenidos = res.sequelizeStatus;
    			self.armarArraysGrupos(self.gruposObtenidos, self);
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
    armarArraysGrupos(grupos, self){
    	//No borrar esto. Sirve cuando se eejcuta este método dentro del filtro de grupos
    	self.gruposFormacion = [];
    	self.gruposCaminantes = [];
    	self.gruposPescadores = [];
    	self.gruposMayores = [];

    	$.each(grupos, function(index, grupo){
    		let grupoObj = {
  				id: grupo.id,
  				text: grupo.nombre,
  				genero: grupo.genero
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
				Obtiene todos los tipos de procarianos de la base de datos
				Los almacena dentro de self.tipos
    */
    obtenerTiposProcariano(self){
    	$.ajax({
    		type: 'GET',
    		url: '/api/tipo/',
    		success(res){
    			self.armarArrayTipos(res.sequelizeStatus, self);
    		}
    	});
    },
    /*
			@Descripción:
				Arma el array de tipos obtenidos de la base de datos
			@Params:
				tipos -> tipos obtenidos de la base de datos
    */
    armarArrayTipos(tipos, self){
    	$.each(tipos, function(index, tipo){
    		let tipoObj = {
    			id: tipo.id,
    			text: tipo.nombre
    		};
    		self.tipos.push(tipoObj);
    	});
    	console.log('Array de tipos de procarianos: ');
    	console.log(self.tipos);
    },
    /*
			@Descripción:
				Se ejecuta cuando el usuario selecciona un género del procariano a ingresar.
				Filtra todos los grupos a mostrar dependiendo del género seleccionado
    */
    filtrarGruposPorGenero(self, generoSeleccionado){
    	//Primero hay que volver a armar los arrays de los grupos
    	self.armarArraysGrupos(self.gruposObtenidos, self);
    	let generoGrupoSeleccionado = '';
    	if(generoSeleccionado!==''){
    		if(generoSeleccionado == 'masculino'){
    			generoGrupoSeleccionado = 'Procare';
    		}else{
    			generoGrupoSeleccionado = 'Procare Mujeres';
    		}
    		self.gruposFormacion = $.grep(self.gruposFormacion, function(grupo, index){
    			return grupo.genero === generoGrupoSeleccionado;
    		});
    		self.gruposCaminantes = $.grep(self.gruposCaminantes, function(grupo, index){
    			return grupo.genero === generoGrupoSeleccionado;
    		});
    		self.gruposPescadores = $.grep(self.gruposPescadores, function(grupo, index){
    			return grupo.genero === generoGrupoSeleccionado;
    		});
    		self.gruposMayores = $.grep(self.gruposMayores, function(grupo, index){
    			return grupo.genero === generoGrupoSeleccionado;
    		});
    	}
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
			$('#selectGenero').change(function(){
				let generoSeleccionado = $('#selectGenero option:selected').val();
				self.filtrarGruposPorGenero(self, generoSeleccionado);
			});
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