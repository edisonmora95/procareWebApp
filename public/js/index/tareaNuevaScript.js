'use strict';
import Materials from 'vue-materials';
Vue.use(Materials)
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
		procarianos: [],
		errorObj: {
			campo: '',
			msj: ''
		},
		responsable: '',
		tarea: {
			nombre: '',
			descripcion: '',
			fechaPublicacion: '',
			fechaInicio: '',
			fechaFin: '',
			prioridad: '',
			estado: '1',
			categoria: '',
			responsable: ''
		},
		categoriasTarea:[
			{
				id: '1',
				text: 'Formación'
			},
			{
				id: '2',
				text: 'Acción'
			},
			{
				id: '3',
				text: 'Fundación'
			},
		],
		prioridadesTarea:[
			{
				id: '1',
				text: 'Alta'
			},
			{
				id: '2',
				text: 'Media'
			},
			{
				id: '3',
				text: 'Baja'
			},
		],
		estadosTarea: [
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
					if(res.status){
						$('#modalTareaCreada').modal('open');
					}else{
						$('#modalTareaErrorServidor').modal('open');
						console.log(res);
					}
				}
			});
		},
		//////////////////////////////////////////////////
		//Funciones de DOM
		//////////////////////////////////////////////////
		inicializarMaterialize(self){
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
		  //Asignaciones de funciones onChange
		  self.asignarFuncionesOnChange(self);
		},
		asignarFuncionesOnChange(self){
			let inputHoraInicio = $('#horaInicio');
			let inputHoraFin = $('#horaFin');	
			let inputFechaInicio = $('#fechaInicio');
			let inputFechaFin = $('#fechaFin');
			inputFechaInicio.change( () => {
		  	const haIngresadoFechaInicio = ( inputFechaInicio.val() != '' );
		  	const haIngresadoFechaFin = (inputFechaFin.val()!='');
		  	//Valida que la fecha ingresada no sea antes que hoy
		  	self.fechaInicioPasada = !self.validarFechaAnteriorAHoy(self, '#fechaInicio', '#horaInicio');
		  	if( haIngresadoFechaFin ){
		  		//Valida que la fecha fin sea mayor a la fecha inicio
		  		const fechaFinMSec = self.obtenerFechaCompleta('#fechaFin', '#horaFin').getTime();
		  		const fechaInicioMSec = self.obtenerFechaCompleta('#fechaInicio', '#horaInicio').getTime();
		  		self.fechaFinMenor = !self.validarFecha(fechaFinMSec, fechaInicioMSec);
		  		//Si la fecha es válida, y es menor a la fecha fin se la añade al objeto de tarea
		  		if( !self.fechaFinMenor && !self.fechaInicioPasada ){
		  			self.bindFecha(self, '#fechaInicio', '#horaInicio', 'fechaInicio');
		  		}else{
		  			//Si no son válidos debe 'encerar' el atributo de fecha para que la tarea no se pueda crear
		  			if(self.fechaInicioPasada){
		  				self.tarea.fechaInicio = '';
		  			}else if(self.fechaFinMenor){
		  				self.tarea.fechaFin = '';
		  			}
		  		}
		  	}else{
		  		//Si no se ha ingresado una fecha fin aún, pero la fecha inicio es válida entonces se la añade al objeto de tarea
		  		if(!self.fechaInicioPasada && haIngresadoFechaInicio){
		  			self.bindFecha(self, '#fechaInicio', '#horaInicio', 'fechaInicio');
		  		}else{
		  			//Si no son válidos debe 'encerar' el atributo de fecha para que la tarea no se pueda crear
		  			if(self.fechaInicioPasada){
		  				self.tarea.fechaInicio = '';
		  			}else if(self.fechaFinMenor){
		  				self.tarea.fechaFin = '';
		  			}
		  		}
		  	}
		  });
		  inputHoraInicio.change( () => {
				const haIngresadoFechaInicio = ( inputFechaInicio.val() != '' );
		  	const haIngresadoFechaFin = (inputFechaFin.val()!='');
		  	self.fechaInicioPasada = !self.validarFechaAnteriorAHoy(self, '#fechaInicio', '#horaInicio');
		  	if( haIngresadoFechaFin ){
		  		const fechaFinMSec = self.obtenerFechaCompleta('#fechaFin', '#horaFin').getTime();
		  		const fechaInicioMSec = self.obtenerFechaCompleta('#fechaInicio', '#horaInicio').getTime();
		  		self.fechaFinMenor = !self.validarFecha(fechaFinMSec, fechaInicioMSec);
		  		if( !self.fechaFinMenor && !self.fechaInicioPasada ){
		  			self.bindFecha(self, '#fechaInicio', '#horaInicio', 'fechaInicio');
		  		}else{
		  			if(self.fechaInicioPasada){
		  				self.tarea.fechaInicio = '';
		  			}else if(self.fechaFinMenor){
		  				self.tarea.fechaFin = '';
		  			}
		  		}
		  	}else{
		  		if(!self.fechaInicioPasada && haIngresadoFechaInicio){
		  			self.bindFecha(self, '#fechaInicio', '#horaInicio', 'fechaInicio');
		  		}else{
		  			if(self.fechaInicioPasada){
		  				self.tarea.fechaInicio = '';
		  			}else if(self.fechaFinMenor){
		  				self.tarea.fechaFin = '';
		  			}
		  		}
		  	}
			});
		  inputFechaFin.change( () => {
		  	const haIngresadoFechaFin = ( inputFechaFin.val() != '' );
		  	const haIngresadoFechaInicio = ( inputFechaInicio.val()!='' );
		  	//Valida que la fecha ingresada no sea antes que hoy
		  	self.fechaFinPasada = !self.validarFechaAnteriorAHoy(self, '#fechaFin', '#horaFin');
		  	if( haIngresadoFechaInicio ){
		  		//Valida que la fecha fin sea mayor a la fecha inicio
		  		const fechaFinMSec = self.obtenerFechaCompleta('#fechaFin', '#horaFin').getTime();
		  		const fechaInicioMSec = self.obtenerFechaCompleta('#fechaInicio', '#horaInicio').getTime();
		  		self.fechaFinMenor = !self.validarFecha(fechaFinMSec, fechaInicioMSec);
		  		if( !self.fechaFinMenor && !self.fechaFinPasada ){
		  			self.bindFecha(self, '#fechaFin', '#horaFin', 'fechaFin');
		  		}else{
		  			//Si no son válidos debe 'encerar' el atributo de fecha para que la tarea no se pueda crear
		  			self.tarea.fechaFin = '';
		  		}
		  	}else{
		  		if(!self.fechaFinPasada && haIngresadoFechaFin){
		  			self.bindFecha(self, '#fechaFin', '#horaFin', 'fechaFin');
		  		}else{
		  			//Si no son válidos debe 'encerar' el atributo de fecha para que la tarea no se pueda crear
		  			if(self.fechaFinPasada || self.fechaFinMenor){
		  				self.tarea.fechaFin = '';
		  			}
		  		}
		  	}
		  });
			inputHoraFin.change( () => {
				const haIngresadoFechaFin = ( inputFechaFin.val() != '' );
		  	const haIngresadoFechaInicio = ( inputFechaInicio.val()!='' );
				self.fechaFinPasada = !self.validarFechaAnteriorAHoy(self, '#fechaFin', '#horaFin');
				if( haIngresadoFechaInicio ){
		  		const fechaFinMSec = self.obtenerFechaCompleta('#fechaFin', '#horaFin').getTime();
		  		const fechaInicioMSec = self.obtenerFechaCompleta('#fechaInicio', '#horaInicio').getTime();
		  		self.fechaFinMenor = !self.validarFecha(fechaFinMSec, fechaInicioMSec);
		  		if( !self.fechaFinMenor && !self.fechaFinPasada ){
		  			self.bindFecha(self, '#fechaFin', '#horaFin', 'fechaFin');
		  		}else{
		  			self.tarea.fechaFin = '';
		  		}
		  	}else{
		  		if(!self.fechaFinPasada && haIngresadoFecha){
		  			self.bindFecha(self, '#fechaFin', '#horaFin', 'fechaFin');
		  		}else{
		  			if(self.fechaFinPasada || self.fechaFinMenor){
		  				self.tarea.fechaFin = '';
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
			const categoriaValido = self.validarCampo('#categoria');
			const prioridadValido = self.validarCampo('#prioridad');
			const estadoValido = self.validarCampo('#estado');
			const mensaje = 'Este campo es obligatorio';

			if(categoriaValido && prioridadValido && estadoValido){
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
					const fechaFinValida = (self.tarea.fechaFin != '');
					if( fechaInicioValida && fechaFinValida ){	//El objeto tarea solo tendrá esas fechas si se han ingresado fechas válidas
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
			let seObtuvoId = false;
			$.each(self.procarianos, function(index, procariano){
				let nombreCompleto = procariano.nombres + ' ' + procariano.apellidos;
				if(nombreCompleto === responsable){
					self.tarea.responsable = procariano.personaId;
					seObtuvoId = true;
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
			let mes = fechaActual.getMonth()+1;
			let dia = fechaActual.getDate();

			let fecha = anio + '/' + ((''+mes).length < 2 ? '0' : '') + mes + '/' + ((''+dia).length < 2 ? '0' : '') + dia;
			self.tarea.fechaPublicacion = fecha;
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
			@Descripción: Valida los campos antes de realizar la llamada a la api
		*/
		validarAntesDeEnviar(){
			let self = this;
			console.log(self.tarea)
			//Valida primero los campos con VeeValidate
			self.$validator.validateAll().then( resultado => {
				if(resultado){
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
			this.tarea.nombre = '';
			this.tarea.descripcion = '';
			this.tarea.fechaPublicacion = new Date($.now());
			this.tarea.fechaLimite = '';
			this.tarea.prioridad = '';
			this.tarea.categoria = '';
			this.tarea.responsable = '';
			this.responsable = '';
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
	$.each(tareaApp.$data.procarianos, function(index, procariano){
		let nombreCompleto = procariano.nombres + ' ' + procariano.apellidos;
		datos[nombreCompleto] = null;
	});
  $('input.autocomplete').autocomplete({
   data: datos
 });
}
