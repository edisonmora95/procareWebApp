/*
	@Descripción: Controlador de la vista de ingresarProcariano.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/04/2017
	@ÚltimaModificación: 7/07/2017 @edanmora95 Refactorización
*/
'use strict';

import Materials from 'vue-materials';
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
		tipos: [],
		errorAjax: {
			titulo: '',
			descripcion: ''
		}
	},
	methods: {
		/*
			@Descripción: 
				Inicializa los elementos de Materialize que se van a usar en el formulario.
    */
    inicializarMaterialize(self){
    	$('.datepicker').pickadate({
			  monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			  monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			  weekdaysFull: ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
			  weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
			  today: 'Hoy',
			  clear: 'Limpiar',
			  close: 'Cerrar',
		    selectMonths: true, // Creates a dropdown to control month
		    selectYears: 100, // Creates a dropdown of 15 years to control year,
		    closeOnSelect: true // Close upon selecting a date,
		  });
			$(".button-collapse").sideNav();
			$('.modal').modal();
			$('#selectGenero').change(function(){
				let generoSeleccionado = $('#selectGenero option:selected').val();
				self.filtrarGruposPorGenero(self, generoSeleccionado);
			});
    },
		//////////////////////////////////
		//OBTENER DATOS DE LA BASE
		//////////////////////////////////
		/*
			@Descripción:
				Obtiene todos los grupos existentes en la base de datos.
				Los almacena en self.grupos
    */
    obtenerTodosLosGrupos(self){
    	$.ajax({
    		type: 'GET',
    		url: '/api/grupos/',
    		success(res){
    			if(res.estado){
    				self.gruposObtenidos = res.datos;
	    			self.armarArraysGrupos(self.gruposObtenidos, self);	
    			}else{
    				self.mostrarMensajeDeErrorAjax(self, 'Error de base de datos', res.mensaje);
    			}
    		},
    		error(err){
    			console.log(err);
    			self.mostrarMensajeDeErrorAjax(self, 'Error de conexión', 'No se pudo conectar con el servidor. Intente nuevamente.');
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
    		},
    		error(err){
    			console.log(err);
    			self.mostrarMensajeDeErrorAjax(self, 'Error de conexión', 'No se pudo conectar con el servidor. Intente nuevamente.');
    		}
    	});
    },
		//////////////////////////////////
		//FUNCIONES PARA ARMAR EL DOM
		//////////////////////////////////
    /*
			@Descripción:
				Se ejecuta cuando el usuario selecciona un género del procariano a ingresar.
				Filtra todos los grupos a mostrar dependiendo del género seleccionado
    */
    filtrarGruposPorGenero(self, generoSeleccionado){
    	//Primero hay que volver a armar los arrays de los grupos
    	self.armarArraysGrupos(self.gruposObtenidos, self);
    	 let generoGrupoSeleccionado = '';
    	if( generoSeleccionado !== '' ){
    		if( generoSeleccionado == 'masculino' ){
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
    	//console.log('Array de tipos de procarianos: ');
    	//console.log(self.tipos);
    },
    mostrarMensajeDeErrorAjax(self, titulo, descripcion){
    	self.errorAjax.titulo = titulo;
			self.errorAjax.descripcion = descripcion;
			$('#modalErrorAjax').modal('open');
    },
    mostrarErrorValidacion(self, campo, msj){
    	self.errorObj.campo = campo;
      self.errorObj.msj = msj;
      $('#modalError').modal('open');
    },
		//////////////////////////////////
		//EVENTOS
		//////////////////////////////////
		validateBeforeSubmit() {
			let self = this;
			if(self.validarFechaNacimiento()){
				self.bindGrupoSeleccionado(self);
				this.$validator.validateAll().then(() => {
					self.ingresarProcariano(self);	        
	      }).catch(() => {
	      	self.mostrarErrorValidacion(self, self.errors.errors[0].field, self.errors.errors[0].msg);
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
    bindGrupoSeleccionado(self){
    	let tipoProcariano = self.procariano.tipo;
    	if( tipoProcariano === '1' ){
    		self.procariano.grupo = self.grupoFormacionSel;
    	}else if( tipoProcariano === '2' ){
    		self.procariano.grupo = self.grupoCaminantesSel;
    	}else if( tipoProcariano === '3' ){
    		self.procariano.grupo = self.grupoPescadoresSel;
    	}
    },
    cancelar(){
    	window.location.href = '/procarianos/'
    	//console.log('debo agregar esa vista aun');
    },
    ingresarProcariano(self){
    	let urlApi = '/api/procarianos/';
    	$.ajax({
      	type:'POST',
      	url: urlApi,
      	data: self.procariano,
      	success: function(res){
      		if(res.estado){
      			$('#modalProcarianoCreado').modal('open');
      		}else{
      			self.mostrarMensajeDeErrorAjax(self, 'Error de base de datos', 'Error al tratar de ingresar en la base de datos. Intente nuevamente.');
      		}
      	},
      	error: function(err){
      		console.log(err);
      		self.mostrarMensajeDeErrorAjax(self, 'Error de conexión', 'No se pudo conectar con el servidor. Intente nuevamente.');
      	}
      });
    },
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