'use strict';
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
			between: function(field, valores){
				return 'El valor debe estar entre los valores: ' + valores;
			}
		}
	}
};
VeeValidate.Validator.updateDictionary(dictionary);

let tareaApp = new Vue({
	el: '#tareaApp',
	created(){
		this.obtenerProcarianos(this);
		this.bindFechaPublicacion(this, new Date());
	},
	mounted(){
		this.inicializarMaterialize(this);
	},
	data: {
		procarianos : [],		//Array de procarianos para mostrar en el autocomplete
		errorObj 		: {
			campo : '',
			msj 	: ''
		},
		responsable : '',		//Contendrá el id del procariano seleccionado en el autocomplete
		tarea 			: {
			nombre 					: '',
			descripcion 		: '',
			fechaPublicacion: '',
			fechaInicio 		: '',
			fechaFin 				: '',
			prioridad 			: '',
			estado 					: '1',
			categoria 			: '',
			responsable 		: ''
		},
		msjFechaPasada 		: 'La fecha ingresada no puede ser una fecha pasada',
		errorFechaInicio	: false,
		msjFechaInicio 		: '',
		errorFechaFin			: false,
		msjFechaFin		 		: '',
		msjErrorServer 		: ''
	},
	methods: {
		//////////////////////////////////////////////////
		//Llamadas a la base de datos
		//////////////////////////////////////////////////
		/*
			@Descripción: Obtiene todos los procarianos de la base de datos. 
										Para mostrarlos en el formulario de tarea nueva.
		*/
		obtenerProcarianos(self){
			let urlAPi = '/api/procarianos/activos';
			$.ajax({
				type: 'GET',
				url: urlAPi,
				success(res){
					self.procarianos = res.datos;
				}
			});
		},
		crearTarea(tarea){
			let urlApi = '/api/tareas/';
			$.ajax({
				type: 'POST',
				url: urlApi,
				data: tarea,
				success(res){
					$('#modalTareaCreada').modal('open');
				},
				error(err){
					tareaApp.msjErrorServer = err.responseJSON.mensajeError;
					$('#modalTareaErrorServidor').modal('open');
				}
			});
		},
		//////////////////////////////////////////////////
		//Funciones de DOM
		//////////////////////////////////////////////////
		inicializarMaterialize(self){
			//Inicialización de elementos
			$('.modal').modal();
			$('select').material_select();
			$('.datepicker').pickadate({
				monthsFull 		: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			  monthsShort		: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			  weekdaysFull	: ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
			  weekdaysShort	: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
			  today					: 'Hoy',
			  clear					: 'Limpiar',
			  close					: 'Cerrar',
		    selectMonths	: true, // Creates a dropdown to control month
		    selectYears		: 100, // Creates a dropdown of 15 years to control year,
		    closeOnSelect	: true // Close upon selecting a date,
		  });			
			$('.timepicker').pickatime({
		    default 			: 'now', // Set default time: 'now', '1:30AM', '16:30'
		    fromnow 			: 0,       // set default time to * milliseconds from now (using with default = 'now')
		    twelvehour		: false, // Use AM/PM or 24-hour format
		    donetext			: 'Aceptar', // text for done-button
		    cleartext			: 'Borrar', // text for clear-button
		    canceltext		: 'Cancelar', // Text for cancel-button
		    autoclose			: false, // automatic close timepicker
		    ampmclickable : true, // make AM PM clickable
		    aftershow: function(){} //Function for after opening timepicker
		  });
		  //Asignaciones de funciones onChange
		  self.asignarFuncionesOnChange(self);
		  //SELECTS
		  $('#categoria').change( () => {	self.tarea.categoria = $('#categoria').val(); });
		  $('#prioridad').change( () => { self.tarea.prioridad = $('#prioridad').val(); });
		  $('#estado').change( () => { self.tarea.estado = $('#estado').val(); });
		},
		asignarFuncionesOnChange(self){
			let inputHoraInicio 	= $('#horaInicio');
			let inputHoraFin 			= $('#horaFin');
			let inputFechaInicio 	= $('#fechaInicio');
			let inputFechaFin			= $('#fechaFin');

			inputFechaInicio.change( () => {
				self.validarFechaInicio(self, inputFechaInicio, inputHoraInicio, inputFechaFin);
			});
			inputHoraInicio.change( () => {
				self.validarFechaInicio(self, inputFechaInicio, inputHoraInicio, inputFechaFin);	
			});

			inputFechaFin.change( () => {
				self.validarFechaFin(self, inputFechaFin, inputHoraFin, inputFechaInicio, inputHoraFin);
			});
			inputHoraFin.change( () => {
				self.validarFechaFin(self, inputFechaFin, inputHoraFin, inputFechaInicio, inputHoraFin);
			});
		},
		//////////////////////////////////////////////////
		//Validaciones
		//////////////////////////////////////////////////
		validarFechaInicio(self, inputF, inputH, inputFechaFin){
			//Se valida que la fecha no sea antes del día actual
			const fechaIngresada = self.obtenerFechaCompleta('#fechaInicio', '#horaInicio');
			console.log(fechaIngresada)
			const fechaActual 	 = new Date().setHours(0, 0, 0, 0);
			if( fechaActual > new Date(fechaIngresada).getTime() ){
				self.errorFechaInicio = true;
				inputF.val('');
				inputH.val('');
				return;
			}
			//Se valida que la fecha de inicio sea antes que la fecha fin
			//Primero se verifica si se ha ingresado fecha fin
			if( inputFechaFin.val() != '' ){
				const fechaFin = new Date(self.obtenerFechaCompleta('#fechaFin', '#horaFin')).getTime();
				if( new Date(fechaIngresada).getTime() > fechaFin ){
					self.errorFechaInicio = true;
					self.msjFechaInicio 	= 'La fecha de inicio no puede ser después que la fecha fin';
					inputF.val('');
					inputH.val('');
					return;
				}
			}
			self.errorFechaInicio = false;
			self.msjFechaInicio 	= '';
			self.tarea.fechaInicio = fechaIngresada;
			return;
		},
		validarFechaFin(self, inputF, inputH, inputFechaInicio, inputHoraFin){
			//Se valida que la fecha no sea antes del día actual
			const fechaIngresada = self.obtenerFechaCompleta('#fechaFin', '#horaFin');
			const fechaActual 	 = new Date().setHours(0, 0, 0, 0);
			if( fechaActual > new Date(fechaIngresada).getTime() ){
				self.errorFechaFin = true;
				self.msjFechaFin   = 'No puede ingresar una fecha anterior a hoy';
				inputF.val('');
				inputH.val('');
				return;
			}
			//Se valida que la fecha de inicio sea antes que la fecha fin
			//Primero se verifica si se ha ingresado fecha fin
			if( inputFechaInicio.val() != '' && inputHoraFin.val() != '' ){
				const fechaInicio = new Date(self.obtenerFechaCompleta('#fechaInicio', '#horaInicio')).getTime();
				if( new Date(fechaIngresada).getTime() < fechaInicio ){
					self.errorFechaFin = true;
					self.msjFechaFin   = 'La fecha de inicio no puede ser anterior a la fecha inicio';
					inputF.val('');
					inputH.val('');
					return;
				}
			}
			self.errorFechaFin = false;
			self.msjFechaFin 	 = '';
			self.tarea.fechaFin = fechaIngresada;
			return;
		},
		//Valida que el campo no esté vacío
		validarCampo(idCampo){
			const valor = $(idCampo).val();
			if( valor === '' || valor === null){
				return false;
			}else{
				return true;
			}
		},
		//Valida los campos que no se pueden validar con VeeValidate
		validarSelects(self){
			const categoriaValido = self.validarCampo('#categoria');
			const prioridadValido = self.validarCampo('#prioridad');
			const estadoValido 		= self.validarCampo('#estado');
			const mensaje 				= 'Este campo es obligatorio';

			if( categoriaValido && prioridadValido && estadoValido ){
				return true;
			}else{
				//Mostrar mensajes de error
				if( !categoriaValido ){
					self.mostrarMensajeDeError(self, 'Categoría', mensaje);
				}else if( !prioridadValido ){
					self.mostrarMensajeDeError(self, 'Prioridad', mensaje);
				}else if( !estadoValido ){
					self.mostrarMensajeDeError(self, 'Estado', mensaje);
				}
				return false;
			}
		},
		validarCamposCompletos(self){
			//Primero valido los selects
			const camposSelectValidos = self.validarSelects(self);
			if( camposSelectValidos ){
				//Luego valido el autocomplete
				const campoAutocompleteValido = self.obtenerIdProcarianoResponsable(self);
				if( campoAutocompleteValido ){
					//Finalmente valido las fechas
					const fechaInicioValida = (self.tarea.fechaInicio != '');
					if( fechaInicioValida ){	//El objeto tarea solo tendrá esas fechas si se han ingresado fechas válidas
						return true;
					}else{
						self.mostrarMensajeDeError(self, 'Fechas', 'Verifique que se hayan ingresado fechas correctas');
						return false;
					}
				}else{
					self.mostrarMensajeDeError(self, 'Responsable', 'Verifique que se haya seleccionado a un procariano de la lista');
					return false;
				}
			}else{
				//No se envía un mensaje de error aquí porque eso se hace dentro de la función validarSelects(self)
				return false;
			}
		},
		//////////////////////////////////////////////////
		//Helpers
		//////////////////////////////////////////////////
		mostrarMensajeDeError(self, campo, mensaje){
			self.errorObj.campo = campo;
      self.errorObj.msj 	= mensaje;
			$('#modalTareaError').modal('open');
		},
		/*
			@Descripción: Busca el id del responsable seleccionado
			@Returns: 
				True -> Se obtuvo el id
				False -> No se obtuvo el id
		*/
		obtenerIdProcarianoResponsable(self){
			const responsable = $('#responsable').val();
			let seObtuvoId 		= false;
			$.each(self.procarianos, function(index, procariano){
				let nombreCompleto = procariano.Persona.nombres + ' ' + procariano.Persona.apellidos;
				if(nombreCompleto === responsable){
					self.tarea.responsable = procariano.PersonaId;
					seObtuvoId						 = true;
					return false;
				}
			});
			return seObtuvoId;
		},
		/*
			@Descripción: Formatea la fecha de publicación YYYY/MM/DD y la vincula al objeto de tarea
		*/
		bindFechaPublicacion(self, fechaActual){
			let anio = fechaActual.getFullYear();
			let mes  = fechaActual.getMonth()+1;
			let dia  = fechaActual.getDate();

			let fecha = anio + '/' + ((''+mes).length < 2 ? '0' : '') + mes + '/' + ((''+dia).length < 2 ? '0' : '') + dia;
			self.tarea.fechaPublicacion = fecha;
		},
		/*
			Devuelve la fecha ingresada en los pickers en un formato
			Formato: año-mes-día T hora Z
		*/
		obtenerFechaCompleta(idDatePicker, idTimePicker){
			const anio = $(idDatePicker).pickadate('picker').get('highlight', 'yyyy');
			const mes  = $(idDatePicker).pickadate('picker').get('highlight', 'mm');
			const dia  = $(idDatePicker).pickadate('picker').get('highlight', 'dd');
			const hora = $(idTimePicker).val();
			let fechaIngresada 		= '';
			const haingresadoHora = ( hora != '' );
			if( haingresadoHora ){
				fechaIngresada = anio + '-' + mes + '-' + dia + 'T' + hora + 'Z';
			}else{
				fechaIngresada = anio + '-' + mes + '-' + dia + 'T05:00:00Z';	
			}
			return fechaIngresada;
		},
		//////////////////////////////////////////////////
		//Eventos de botones
		//////////////////////////////////////////////////
		/*
			@Descripción: Valida los campos antes de realizar la llamada a la api
		*/
		validarAntesDeEnviar(){
			let self = this;
			console.log(self.tarea)
			//Valida primero los campos con VeeValidate
			self.$validator.validateAll().then( resultado => {

				if( resultado ){
					const camposValidos = self.validarCamposCompletos(self);
					if( camposValidos ){
						self.crearTarea(self.tarea);
					}else{
						//No se hace nada porque el mensaje de error se bota dentro de validarCamposValidos(self)
					}
				}else{
					self.mostrarMensajeDeError(self, self.errors.items[0].field, self.errors.items[0].msg);
				}
			}).catch( () => {
				self.mostrarMensajeDeError(self, 'Validador', 'Existe un error con el validador. Recargue la página.');
			});
		},
		regresar(){
			window.location.href = '/home';
		},
		/*
			@Descripción: Vincula la fecha indicada en el atributo indicado en tipo
		*/
		bindFecha(self, idDatePicker, idTimePicker, tipo){
			let fechaCompleta = self.obtenerFechaCompleta(idDatePicker, idTimePicker);
			
			if(tipo === 'fechaInicio'){
				self.tarea.fechaInicio = fechaCompleta;	
			}
			else if(tipo === 'fechaFin'){
				self.tarea.fechaFin = fechaCompleta;	
			}
		},
		limpiarTarea(){
			tareaApp.tarea.nombre 					= '';
			tareaApp.tarea.descripcion 			= '';
			tareaApp.tarea.fechaPublicacion = new Date($.now());
			tareaApp.tarea.fechaLimite 			= '';
			tareaApp.tarea.prioridad 				= '';
			tareaApp.tarea.categoria 				= '';
			tareaApp.tarea.responsable 			= '';
			tareaApp.responsable 						= '';
			$('#fechaInicio').val('');
			$('#fechaFin').val('');
			$('#horaInicio').val('');
			$('#horaFin').val('');
		},
	}
});

$(document).ready(function(){
	inicializarAutocomplete();
});

function inicializarAutocomplete(){
	let datos = {};
	$.each( tareaApp.$data.procarianos, function(index, procariano){
		let nombreCompleto 		= procariano.Persona.nombres + ' ' + procariano.Persona.apellidos;
		datos[nombreCompleto] = null;
	});
  $('input.autocomplete').autocomplete({
   data: datos
 });
}
