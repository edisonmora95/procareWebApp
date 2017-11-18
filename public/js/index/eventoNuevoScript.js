'use strict';
import Materials from 'vue-materials';

Vue.use(VeeValidate);
Vue.use(Materials);

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

let eventoApp = new Vue({
	el: '#eventoApp',
	created(){
		this.obtenerProcarianos(this);
	},
	mounted(){
		this.inicializarMaterialize(this);
	},
	data: {
		responsable : '',
		evento: {
			nombre: '',
			fechaInicio: '',
			fechaFin: '',
			descripcion: '',
			lugar: '',
			ingresos: 0.00,
			gastos: 0.00,
			estado: 1,
			responsable: ''
		},
		procarianos: [],
		errorObj: {
			campo: '',
			msj: ''
		},
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
			@Descripción: Obtiene todos los procarianos de la base de datos. Para mostrarlos en el formulario de evento nueva
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
		crearEvento(evento){
			let urlApi = '/api/eventos/';
			$.ajax({
				type: 'POST',
				url: urlApi,
				data: evento,
				success(res){
					$('#modalEventoCreado').modal('open');
				},
				error(err){
					eventoApp.msjErrorServer = err.responseJSON.mensajeError;
					$('#modalEventoErrorServidor').modal('open');
					console.log(err);
				}
			});
		},
		//////////////////////////////////////////////////
		//Funciones de DOM
		//////////////////////////////////////////////////
		inicializarMaterialize(self){
			let inputHoraInicio = $('#eventoHoraInicio');
			let inputHoraFin = $('#eventoHoraFin');	
			//Inicialización de elementos
			$('.modal').modal();
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
			$('.timepicker').pickatime({
		    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
		    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
		    twelvehour: false, // Use AM/PM or 24-hour format
		    donetext: 'Aceptar', // text for done-button
		    cleartext: 'Borrar', // text for clear-button
		    canceltext: 'Cancelar', // Text for cancel-button
		    autoclose: false, // automatic close timepicker
		    ampmclickable: true, // make AM PM clickable
		    aftershow: function(){} //Function for after opening timepicker
		  });
		  $('select').material_select();
			//Asignación de funciones onChange
			self.asignarFuncionesOnChange(self);
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
			self.evento.fechaInicio = fechaIngresada;
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
			self.evento.fechaFin = fechaIngresada;
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
			const estadoValido = self.validarCampo('#estado');
			const mensaje = 'Este campo es obligatorio';

			if( estadoValido ){
				return true;
			}else{
				self.mostrarMensajeDeError(self, 'Estado', mensaje);
				return false;
			}
		},
		validarCamposCompletos(self){
			//Primero valido los selects
			const camposSelectValidos = self.validarSelects(self);
			if( camposSelectValidos ){
				//Luego valido el autocomplete
				const campoAutocompleteValido = self.obtenerIdPersonaResponsable(self);
				if( campoAutocompleteValido ){
					//Finalmente valido las fechas
					const fechaInicioValida = (self.evento.fechaInicio != '');
					if( fechaInicioValida ){	//El objeto evento solo tendrá esas fechas si se han ingresado fechas válidas
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
      self.errorObj.msj = mensaje;
			$('#modalError').modal('open');
		},
		/*
			@Descripción: Busca el id del responsable seleccionado
		*/
		obtenerIdPersonaResponsable(self){
			let responsable = $('#responsable').val();
			let seObtuvoId = false;
			$.each(self.procarianos, function(index, procariano){
				let nombreCompleto = procariano.Persona.nombres + ' ' + procariano.Persona.apellidos;
				if(nombreCompleto === responsable){
					self.evento.responsable = procariano.PersonaId;
					seObtuvoId = true;
					return false;
				}
			});
			return seObtuvoId;
		},
		obtenerFechaCompleta(idDatePicker, idTimePicker){
			const anio = $(idDatePicker).pickadate('picker').get('highlight', 'yyyy');
			const mes = $(idDatePicker).pickadate('picker').get('highlight', 'mm');
			const dia = $(idDatePicker).pickadate('picker').get('highlight', 'dd');
			const hora = $(idTimePicker).val();
			let fechaIngresada = '';
			const haingresadoHora = ( hora != '' );
			if( haingresadoHora ){
				fechaIngresada = new Date(anio + '-' + mes + '-' + dia + 'T' + hora + 'Z');
			}else{
				fechaIngresada = new Date(anio + '-' + mes + '-' + dia + 'T05:00:00Z');	
			}
			return fechaIngresada;
		},
		//////////////////////////////////////////////////
		//Eventos de botones
		//////////////////////////////////////////////////
		/*
			@Descripción:
				Valida el formulario y luego hace la llamada a la api
		*/
		validarAntesDeEnviar(){
			let self = this;
			this.$validator.validateAll().then( resultado => {
				if(resultado){
					const camposValidos = self.validarCamposCompletos(self);
					if( camposValidos ){
						self.crearEvento(self.evento);
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
				self.evento.fechaInicio = fechaCompleta;	
			}
			else if(tipo === 'fechaFin'){
				self.evento.fechaFin = fechaCompleta;	
			}
		},
		limpiarEventoNuevo(){
			this.evento.nombre = '';
			this.evento.descripcion = '';
			this.evento.lugar = '';
			this.evento.fechaInicio = '';
			this.evento.fechaFin = '';
			this.evento.ingresos = 0;
			this.evento.gastos = 0;
			this.evento.responsable = '';
			this.evento.estado = 1;
			$('#fechaInicio').val('');
			$('#fechaFin').val('');
			$('#horaInicio').val('');
			$('#horaFin').val('');
			$('#responsable').val('');
		}
	}
});

$(document).ready(function(){
	inicializarAutocomplete();
});

function inicializarAutocomplete(){
	let datos = {};
	$.each(eventoApp.$data.procarianos, function(index, procariano){
		let nombreCompleto = procariano.Persona.nombres + ' ' + procariano.Persona.apellidos;
		datos[nombreCompleto] = null;
	});
  $('input.autocomplete').autocomplete({
   data: datos
 });
}
