/*
	@Descripción: Controlador de la vista de ingresarProcariano.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/04/2017
	@ÚltimaModificación: 7/07/2017 @edanmora95 Refactorización
*/
'use strict';

import VueTheMask from 'vue-the-mask';

Vue.use(VeeValidate);
Vue.use(VueTheMask);
/*
	Validaciones. Cambio de mensajes de error
*/
const dictionary = {
	en: {
		messages: {
			email(){
				return 'Ingrese un correo válido.';
			},
			required(){
				return 'Este campo es obligatorio.';
			},
			alpha_spaces(){
				return 'Este campo sólo puede contener letras y espacios.';
			},
			digits(field, length){
				return 'Este campo sólo puede contener ' + length + ' números.';
			},
			numeric(){
				return 'Este campo sólo puede contener números.';
			},
			alpha_num(){
				return 'Este campo sólo puede contener letras y números.';
			},
			regex(field, val){
				return 'No ingrese caracteres especiales.';
			}
		}
	}
};
VeeValidate.Validator.updateDictionary(dictionary);

let main = new Vue({
	el: '#main',
	created(){
		this.obtenerTodosLosGrupos(this);
		this.obtenerTiposProcariano(this);
	},
	mounted: function(){
		this.inicializarMaterialize(this);
	},
	data: {
		fechaIncorrecta : false,
		errorObj 				: {
			campo : '',
			msj 	: ''
		},
		procariano 			: {
			nombres					: '',
			apellidos				: '',
			fechaNacimiento : '',
			cedula 					: '',
			direccion 			: '',
			email						: '',
			celular					: '',
			convencional		: '',
			genero 					: '',
			tipo 						: '',				//chico de formación/caminante/pescador/pescador consagrado/sacerdote
			estado 					: 'activo',	//activo/inactivo... Activo por default
			colegio 				: '',
			universidad 		: '',
			grupo 					: '',
			trabajo 				: '',
			parroquia 			: '',
			fechaOrdenacion : ''
		},
		src: '',
		gruposObtenidos 		: [],
		gruposCaminantes 		: [],
		grupoCaminantesSel 	: '',
		gruposFormacion 		: [],
		grupoFormacionSel 	: '',
		gruposPescadores 		: [],
		grupoPescadoresSel 	: '',
		gruposMayores 			: [],
		grupoMayoresSel 		: '',
		errorAjax 					: {
			titulo 			: '',
			descripcion : ''
		},
		cargoTipos : false,
		mask_format: {
	    telef_convencional : "(0#)###-####",
	    telf_celular 			 : "(0#)#-###-####",
	    Ruc_Mask 					 : "##########"
    },
	},
	methods: {
		/*
			@Descripción: 
				Inicializa los elementos de Materialize que se van a usar en el formulario.
    */
    inicializarMaterialize(self){
    	$('.datepicker').pickadate({
			  monthsFull 		: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			  monthsShort 	: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			  weekdaysFull 	: ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
			  weekdaysShort : ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
			  today 				: 'Hoy',
			  clear 				: 'Limpiar',
			  close 				: 'Cerrar',
		    selectMonths 	: true, // Creates a dropdown to control month
		    selectYears 	: 100,  // Creates a dropdown of 15 years to control year,
		    closeOnSelect : true  // Close upon selecting a date,
		  });
			$(".button-collapse").sideNav();
			$('.modal').modal();
			$('select').material_select();
			/* Funciones on change de selects */
			$('#selectGenero').change( () => {
				self.procariano.genero = $('#selectGenero option:selected').val();
				self.filtrarGruposPorGenero(self, self.procariano.genero);
			});
			$('#selectTipo').change( () => {
				self.procariano.tipo = $('#selectTipo option:selected').val();
			});
			$('#selectGrupoFormacion').change( () => {
				self.grupoFormacionSel = $('#selectGrupoFormacion option:selected').val();
			});
			$('#selectGrupoCaminantes').change( () => {
				self.grupoCaminantesSel = $('#selectGrupoCaminantes option:selected').val();
			});
			$('#selectGrupoPescadores').change( () => {
				self.grupoPescadoresSel = $('#selectGrupoPescadores option:selected').val();
			});
    },
		//////////////////////////////////
		//OBTENER DATOS DE LA BASE
		//////////////////////////////////
		/*
			@Descripción:
				Obtiene todos los grupos existentes en la base de datos.
				Los almacena en self.gruposObtenidos
				Luego divide los grupos de acuerdo a su tipo
    */
    obtenerTodosLosGrupos(self){
    	$.ajax({
    		type  : 'GET',
    		url 	: '/api/grupos/',
    		success(res){
    			if( res.estado ){
    				self.gruposObtenidos = res.datos;
	    			self.armarArraysGrupos(self, self.gruposObtenidos);	
    			}else{
    				self.mostrarMensajeDeErrorAjax(self, 'Error de base de datos', res.mensaje);
    			}
    		},
    		error(err){
    			console.log(err);
    			self.mostrarMensajeDeErrorAjax(self, 'Error de conexión', 'No se pudo conectar con el servidor para obtener los grupos. Intente nuevamente.');
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
    		type : 'GET',
    		url  : '/api/tipo/',
    		success(res){
    			self.armarSelect(self, res.datos, '#selectTipo');
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
    	let aux = [];
    	let generoGrupoSeleccionado = '';		//Género del grupo a mostrar
    	if( generoSeleccionado !== '' ){
    		//Indica el genero del grupo a mostrar
    		if( generoSeleccionado == 'masculino' ){
    			generoGrupoSeleccionado = 'Procare';
    		}else{
    			generoGrupoSeleccionado = 'Procare Mujeres';
    		}
    		//De los grupos obtenidos, se muestran solo los grupos con el género seleccionado
    		aux = $.grep(self.gruposObtenidos, (grupo, index) => {
    			return grupo.genero === generoGrupoSeleccionado;
    		});
    		self.armarArraysGrupos(self, aux);
    	}
    },
    /*
			@Descripción: 
				Divide los grupos obtenidos de la base de datos en arrays de acuerdo a su tipo
			@Params:
				grupos -> grupos obtenidos de la base de datos al hacer la llamada a la api.
    */
    armarArraysGrupos(self, grupos){
    	//No borrar esto. Sirve cuando se ejecuta este método dentro del filtro de grupos
    	self.gruposFormacion 	= [];
    	self.gruposCaminantes = [];
    	self.gruposPescadores = [];
    	self.gruposMayores 		= [];
    	//Se ubica el grupo en el array correspondiente por su tipo
    	$.each(grupos, function(index, grupo){
    		if( grupo.tipo === 'Formación' ){
    			self.gruposFormacion.push(grupo);
    		}else if( grupo.tipo === 'Caminantes' ){
    			self.gruposCaminantes.push(grupo);
    		}else if( grupo.tipo === 'Pescadores' ){
    			self.gruposPescadores.push(grupo);
    		}else if( grupo.tipo === 'Mayores' ){
    			self.gruposMayores.push(grupo);
    		}
    	});
    	self.armarSelect(self, self.gruposFormacion, '#selectGrupoFormacion');
    	self.armarSelect(self, self.gruposCaminantes, '#selectGrupoCaminantes');
    	self.armarSelect(self, self.gruposPescadores, '#selectGrupoPescadores');
    },
    /*
			@Descripción:
				Arma un select con los datos de un array
			@Params:
				array -> datos obtenidos de la base de datos
				idselect -> id del elemento con #
    */
    armarSelect(self, array, idSelect){
    	$(idSelect).empty();
    	$(idSelect).append('<option value=""  disabled selected></option>');
    	$.each(array, (index, elemento) => {
    		$(idSelect).append('<option value=' + elemento.id + '>' + elemento.nombre + '</option>');
    	});
    	$('select').material_select();
    },
    mostrarMensajeDeErrorAjax(self, titulo, descripcion){
    	self.errorAjax.titulo 			= titulo;
			self.errorAjax.descripcion	= descripcion;
			$('#modalErrorAjax').modal('open');
    },
    mostrarErrorValidacion(self, campo, msj){
    	self.errorObj.campo = campo;
      self.errorObj.msj 	= msj;
      $('#modalError').modal('open');
    },
		//////////////////////////////////
		//EVENTOS
		//////////////////////////////////
		/*
			@Descripción:
				* Primero valida la fecha de nacimiento
		*/
		validateBeforeSubmit() {
			let self = this;
			const anioIngresado = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'yyyy');
			if( self.validarFechaNacimiento(self, anioIngresado) ){
				
				self.bindGrupoSeleccionado(self, self.procariano.tipo);
				this.$validator.validateAll().then( (result) => {
					if( result ){
						self.procariano.convencional = convertirTelefono(self.procariano.convencional);
						self.procariano.celular 		 = convertirTelefono(self.procariano.celular)		 ;
						self.ingresarProcariano(self);
					}else{
						console.log(self.errors)
						self.mostrarErrorValidacion(self, self.errors.items[0].field, self.errors.items[0].msg);
					}
						        
	      }).catch( () => {
	      	self.mostrarErrorValidacion(self, self.errors.items[0].field, self.errors.items[0].msg);
	      });

			}else{
				$('#modalError').modal('open');
			}
    },
    /*
			@Descripción: Valida que la fecha de nacimiento ingresada no sea de alguien menor a 11 años.
			@Return:
				True si es una fecha válida (>11)
				False si es inválida
    */
    validarFechaNacimiento(self, year){
			let actualYear 	= new Date().getFullYear();
			let diferencia 	= actualYear - year;
			if( diferencia < 11 ){
				self.errorObj.campo = 'Fecha de nacimiento';
				self.errorObj.msj 	= 'No puede ingresar a alguien con menos de 11 años.';
				return false;
			}
			return true;
    },
    /*
			@Descripción:
				Dependiendo del tipo de procariano seleccionado, se hace el binding con el grupo seleccionado.
    */
    bindGrupoSeleccionado(self, tipoSeleccionado){
    	if( tipoSeleccionado === '1' ){
    		self.procariano.grupo = self.grupoFormacionSel;
    	}else if( tipoSeleccionado === '2' ){
    		self.procariano.grupo = self.grupoCaminantesSel;
    	}else if( tipoSeleccionado === '3' ){
    		self.procariano.grupo = self.grupoPescadoresSel;
    	}
    },
    cancelar(){
    	window.location.href = '/procarianos/'
    },
    ingresarProcariano(self){
    	let urlApi = '/api/procarianos/';
    	$.ajax({
      	type	:'POST',
      	url 	: urlApi,
      	data	: self.procariano,
      	success: function(res){
      		if(res.estado){
      			$('#modalProcarianoCreado').modal('open');
      		}else{
      			self.mostrarMensajeDeErrorAjax(self, res.mensaje,res.mensajeError);
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
	var year 	= $('#fecha-nacimiento').pickadate('picker').get('highlight', 'yyyy');
	var day 	= $('#fecha-nacimiento').pickadate('picker').get('highlight', 'dd');
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
	var year 	= $('#fecha-ordenacion').pickadate('picker').get('highlight', 'yyyy');
	var day 	= $('#fecha-ordenacion').pickadate('picker').get('highlight', 'dd');
	var month = $('#fecha-ordenacion').pickadate('picker').get('highlight', 'mm');
	var fecha = year + '/' + month + '/' + day;
	main.$data.procariano.fechaOrdenacion = fecha;
});

function convertirTelefono(telefono){
	return telefono.replace(/[^0-9.]/g, "");
}