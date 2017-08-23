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
		estados	: [
			{
				id: '1',
				text: 'Pendiente'
			},
			{
				id: '2',
				text: 'En proceso'
			},
			{
				id: '3',
				text: 'Completada'
			}
		],
		errorObj: {
			campo: '',
			msj: ''
		},
		msjFechaPasada: 'La fecha ingresada no puede ser una fecha pasada',
		fechaInicioPasada: false,
		fechaFinPasada: false,
		fechaFinMenor: false,
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
					if(res.status){
						$('#modalEventoCreado').modal('open');
					}else{
						$('#modalEventoErrorServidor').modal('open');
						console.log(res);
					}
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
			//Asignación de funciones onChange
			self.asignarFuncionesOnChange(self);
		},
		asignarFuncionesOnChange(self){
			let inputHoraInicio = $('#eventoHoraInicio');
			let inputHoraFin = $('#eventoHoraFin');	
			let inputFechaInicio = $('#eventoFechaInicio');
			let inputFechaFin = $('#eventoFechaFin');
			inputFechaInicio.change( () => {
		  	const haIngresadoFechaInicio = ( inputFechaInicio.val() != '' );
		  	const haIngresadoFechaFin = ( inputFechaFin.val() != '' );
		  	//Valida que la fecha ingresada no sea antes que hoy
		  	self.fechaInicioPasada = !self.validarFechaAnteriorAHoy(self, '#eventoFechaInicio', '#eventoHoraInicio');
		  	if( haIngresadoFechaFin ){
		  		//Valida que la fecha fin sea mayor a la fecha inicio
		  		const fechaFinMSec = self.obtenerFechaCompleta('#eventoFechaFin', '#eventoHoraFin').getTime();
		  		const fechaInicioMSec = self.obtenerFechaCompleta('#eventoFechaInicio', '#eventoHoraInicio').getTime();
		  		self.fechaFinMenor = !self.validarFecha(fechaFinMSec, fechaInicioMSec);
		  		//Si la fecha es válida, y es menor a la fecha fin se la añade al objeto de evento
		  		if( !self.fechaFinMenor && !self.fechaInicioPasada ){
		  			self.bindFecha(self, '#eventoFechaInicio', '#eventoHoraInicio', 'fechaInicio');
		  		}else{
		  			//Si no son válidos debe 'encerar' el atributo de fecha para que el evento no se pueda crear
		  			if(self.fechaInicioPasada){
		  				self.evento.fechaInicio = '';
		  			}else if(self.fechaFinMenor){
		  				self.evento.fechaFin = '';
		  			}
		  		}
		  	}else{
		  		//Si no se ha ingresado una fecha fin aún, pero la fecha inicio es válida entonces se la añade al objeto de evento
		  		if(!self.fechaInicioPasada && haIngresadoFechaInicio){
		  			self.bindFecha(self, '#eventoFechaInicio', '#eventoHoraInicio', 'fechaInicio');
		  		}else{
		  			//Si no son válidos debe 'encerar' el atributo de fecha para que el evento no se pueda crear
		  			if(self.fechaInicioPasada){
		  				self.evento.fechaInicio = '';
		  			}else if(self.fechaFinMenor){
		  				self.evento.fechaFin = '';
		  			}
		  		}
		  	}
		  });
		  inputHoraInicio.change( () => {
				const haIngresadoFechaInicio = ( inputFechaInicio.val() != '' );
		  	const haIngresadoFechaFin = ( inputFechaFin.val() != '' );
		  	self.fechaInicioPasada = !self.validarFechaAnteriorAHoy(self, '#eventoFechaInicio', '#eventoHoraInicio');
		  	if( haIngresadoFechaFin ){
		  		const fechaFinMSec = self.obtenerFechaCompleta('#eventoFechaFin', '#eventoHoraFin').getTime();
		  		const fechaInicioMSec = self.obtenerFechaCompleta('#eventoFechaInicio', '#eventoHoraInicio').getTime();
		  		self.fechaFinMenor = !self.validarFecha(fechaFinMSec, fechaInicioMSec);
		  		if( !self.fechaFinMenor && !self.fechaInicioPasada ){
		  			self.bindFecha(self, '#eventoFechaInicio', '#eventoHoraInicio', 'fechaInicio');
		  		}else{
		  			if(self.fechaInicioPasada){
		  				self.evento.fechaInicio = '';
		  			}else if(self.fechaFinMenor){
		  				self.evento.fechaFin = '';
		  			}
		  		}
		  	}else{
		  		if(!self.fechaInicioPasada && haIngresadoFechaInicio){
		  			self.bindFecha(self, '#eventoFechaInicio', '#eventoHoraInicio', 'fechaInicio');
		  		}else{
		  			if(self.fechaInicioPasada){
		  				self.evento.fechaInicio = '';
		  			}else if(self.fechaFinMenor){
		  				self.evento.fechaFin = '';
		  			}
		  		}
		  	}
			});
		  inputFechaFin.change( () => {
		  	const haIngresadoFechaFin = ( inputFechaFin.val() != '' );
		  	const haIngresadoFechaInicio = ( inputFechaInicio.val() != '' );
		  	//Valida que la fecha ingresada no sea antes que hoy
		  	self.fechaFinPasada = !self.validarFechaAnteriorAHoy(self, '#eventoFechaFin', '#eventoHoraFin');
		  	if( haIngresadoFechaInicio ){
		  		//Valida que la fecha fin sea mayor a la fecha inicio
		  		const fechaFinMSec = self.obtenerFechaCompleta('#eventoFechaFin', '#eventoHoraFin').getTime();
		  		const fechaInicioMSec = self.obtenerFechaCompleta('#eventoFechaInicio', '#eventoHoraInicio').getTime();
		  		self.fechaFinMenor = !self.validarFecha(fechaFinMSec, fechaInicioMSec);
		  		if( !self.fechaFinMenor && !self.fechaFinPasada ){
		  			self.bindFecha(self, '#eventoFechaFin', '#eventoHoraFin', 'fechaFin');
		  		}else{
		  			//Si no son válidos debe 'encerar' el atributo de fecha para que el evento no se pueda crear
		  			self.evento.fechaFin = '';
		  		}
		  	}else{
		  		if(!self.fechaFinPasada && haIngresadoFechaFin){
		  			self.bindFecha(self, '#eventoFechaFin', '#eventoHoraFin', 'fechaFin');
		  		}else{
		  			//Si no son válidos debe 'encerar' el atributo de fecha para que el evento no se pueda crear
		  			if(self.fechaFinPasada || self.fechaFinMenor){
		  				self.evento.fechaFin = '';
		  			}
		  		}
		  	}
		  });
			inputHoraFin.change( () => {
				const haIngresadoFechaFin = ( inputFechaFin.val() != '' );
		  	const haIngresadoFechaInicio = ( inputFechaInicio.val()!='' );
				self.fechaFinPasada = !self.validarFechaAnteriorAHoy(self, '#eventoFechaFin', '#eventoHoraFin');
				if( haIngresadoFechaInicio ){
		  		const fechaFinMSec = self.obtenerFechaCompleta('#eventoFechaFin', '#eventoHoraFin').getTime();
		  		const fechaInicioMSec = self.obtenerFechaCompleta('#eventoFechaInicio', '#eventoHoraInicio').getTime();
		  		self.fechaFinMenor = !self.validarFecha(fechaFinMSec, fechaInicioMSec);
		  		if( !self.fechaFinMenor && !self.fechaFinPasada ){
		  			self.bindFecha(self, '#eventoFechaFin', '#eventoHoraFin', 'fechaFin');
		  		}else{
		  			self.evento.fechaFin = '';
		  		}
		  	}else{
		  		if(!self.fechaFinPasada && haIngresadoFecha){
		  			self.bindFecha(self, '#eventoFechaFin', '#eventoHoraFin', 'fechaFin');
		  		}else{
		  			if(self.fechaFinPasada || self.fechaFinMenor){
		  				self.evento.fechaFin = '';
		  			}
		  		}
		  	}
			});
		},
		//////////////////////////////////////////////////
		//Validaciones
		//////////////////////////////////////////////////
		/*
			@Descripción: Valida que la fecha2 sea menor que la fecha1
		*/
		validarFecha(fecha1, fecha2){
			if( fecha2 > fecha1 ){
				return false;
			}else{
				return true;
			}
		},
		validarFechaAnteriorAHoy(self, idDatePicker, idTimePicker){
			const haIngresadoFecha = ( $(idDatePicker).val() != '' );
	  	if( haIngresadoFecha ){
				const fechaIngresadaMSec = self.obtenerFechaCompleta(idDatePicker, idTimePicker).getTime();
				const hoyMSec = new Date().setHours(0, 0, 0, 0);
				return self.validarFecha(fechaIngresadaMSec, hoyMSec);
	  	}
	  	return true;
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
					const fechaFinValida = (self.evento.fechaFin != '');
					if( fechaInicioValida && fechaFinValida ){	//El objeto evento solo tendrá esas fechas si se han ingresado fechas válidas
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
			let responsable = $('#eventoResponsable').val();
			let seObtuvoId = false;
			$.each(self.procarianos, function(index, procariano){
				let nombreCompleto = procariano.nombres + ' ' + procariano.apellidos;
				if(nombreCompleto === responsable){
					self.evento.responsable = procariano.personaId;
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
			$('#eventoFechaInicio').val('');
			$('#eventoFechaFin').val('');
			$('#eventoHoraInicio').val('');
			$('#eventoHoraFin').val('');
			$('#eventoResponsable').val('');
		}
	}
});

$(document).ready(function(){
	inicializarAutocomplete();
});

function inicializarAutocomplete(){
	let datos = {};
	$.each(eventoApp.$data.procarianos, function(index, procariano){
		let nombreCompleto = procariano.nombres + ' ' + procariano.apellidos;
		datos[nombreCompleto] = null;
	});
  $('input.autocomplete').autocomplete({
   data: datos
 });
}
