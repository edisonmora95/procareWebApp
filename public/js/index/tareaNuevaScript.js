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
		this.bindFechaPublicacion(this);
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
		]
	},
	methods: {
		inicializarMaterialize(self){
			let inputHoraInicio = $('#horaInicio');
			let inputHoraFin = $('#horaFin');	
			//Inicialización de elementos
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
			$('.modal').modal();
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
			inputHoraInicio.change( () => {
				self.bindFecha(self, '#fechaInicio', '#horaInicio', 'fechaInicio');
			});
			inputHoraFin.change(function(){
				//Esto no parece confiable. Edison del futuro debe refactorizar esta parte
				const fechaInicio = new Date( $('#fechaInicio').val() );
				const fechaFin = new Date( $('#fechaFin').val() );
				self.bindFecha(self, '#fechaFin', '#horaFin', 'fechaFin');
				if( !self.validarFecha(fechaFin, fechaInicio) ){
					self.errorObj.campo = 'Fecha de fin';
					self.errorObj.msj = 'No se puede ingresar una fecha fin que sea antes que la fecha de inicio.';
					$('#modalTareaError').modal('open');
				}
			});
		},
		/*
			@Descripción: Obtiene todos los procarianos de la base de datos. Para mostrarlos en el formulario de tarea nueva.
		*/
		obtenerProcarianos(self){
			let urlAPi = '/api/procarianos/tareas';
			$.ajax({
				type: 'GET',
				url: urlAPi,
				success(res){
					self.procarianos = res;
				}
			});
		},
		/*
			@Descripción: Vincula la fecha indicada en el atributo indicado en tipo
		*/
		bindFecha(self, idDatePicker, idTimePicker, tipo){
			let fechaCompleta = '';
			const anio = $(idDatePicker).pickadate('picker').get('highlight', 'yyyy');
			const mes = $(idDatePicker).pickadate('picker').get('highlight', 'mm');
			const dia = $(idDatePicker).pickadate('picker').get('highlight', 'dd');
			const hora = $(idTimePicker).val();
			const fechaIngresada = new Date( $(idDatePicker).val() );
			const fechaActual = new Date();
			let fechaValida = self.validarFecha(fechaIngresada, fechaActual);

			if(fechaValida){
				fechaCompleta = anio + '-' + mes + '-' + dia + ' ' + hora + ' Z';
				if(tipo === 'fechaInicio'){
					self.tarea.fechaInicio = fechaCompleta;	
				}
				else if(tipo === 'fechaFin'){
					self.tarea.fechaFin = fechaCompleta;	
				}
				
			}else{
				if(tipo === 'fechaInicio'){
					self.errorObj.campo = 'Fecha de inicio';	
				}
				else if(tipo === 'fechaFin'){
					self.errorObj.campo = 'Fecha de fin';	
				}
				self.errorObj.msj = 'No se puede ingresar una fecha que ya pasó.';
				$('#modalTareaError').modal('open');
			}
		},
		/*
			@Descripción: Valida que la fecha1 sea mayor que la fecha2
		*/
		validarFecha(fecha1, fecha2){
			if(fecha2 > fecha1){
				return false;
			}else{
				return true;
			}
		},
		/*
			@Descripción: Busca el id del responsable seleccionado
		*/
		obtenerIdProcarianoResponsable(self){
			let responsable = $('#responsable').val();
			$.each(self.procarianos, function(index, procariano){
				let nombreCompleto = procariano.nombres + ' ' + procariano.apellidos;
				if(nombreCompleto === responsable){
					self.tarea.responsable = procariano.personaId;
					return false;
				}
			});
		},
		crearTarea(){
			let self = this;
			this.$validator.validateAll().then( (result) => {
				if(result){
					self.obtenerIdProcarianoResponsable(self);
					self.llamadaApi(self.tarea);
				}else{
					self.errorObj.campo = self.errors.items[0].field;
          self.errorObj.msj = self.errors.items[0].msg;
					$('#modalTareaError').modal('open');
				}
			}).catch( () => {
				self.errorObj.campo = 'Validador';
        self.errorObj.msj = 'Existe un error con el validador. Recargue la página.';
				$('#modalTareaError').modal('open');
			});
		},
		llamadaApi(tarea){
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
		/*
			@Descripción: Formatea la fecha de publicación YYYY/MM/DD y la vincula al objeto de tarea
		*/
		bindFechaPublicacion(self){
			let fechaActual = new Date();
			let anio = fechaActual.getFullYear();
			let mes = fechaActual.getMonth()+1;
			let dia = fechaActual.getDate();

			let fecha = anio + '/' + ((''+mes).length < 2 ? '0' : '') + mes + '/' + ((''+dia).length < 2 ? '0' : '') + dia;
			self.tarea.fechaPublicacion = fecha;
		},
		regresar(){
			window.location.href = '/home';
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
