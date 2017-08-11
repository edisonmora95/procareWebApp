'use strict';
import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(Materials);

Vue.component('navbar', Navbar); 

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
		}
	},
	methods: {
		inicializarMaterialize(self){
			let inputHoraInicio = $('#eventoHoraInicio');
			let inputHoraFin = $('#eventoHoraFin');	
			//Inicialización de elementos
			$('.modal').modal();
			$('.timepicker').pickatime({
		    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
		    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
		    twelvehour: false, // Use AM/PM or 24-hour format
		    donetext: 'OK', // text for done-button
		    cleartext: 'Clear', // text for clear-button
		    canceltext: 'Cancel', // Text for cancel-button
		    autoclose: false, // automatic close timepicker
		    ampmclickable: true, // make AM PM clickable
		    aftershow: function(){} //Function for after opening timepicker
		  });
			//Asignación de funciones onChange
			inputHoraInicio.change( () => {
				self.bindFecha(self, '#eventoFechaInicio', '#eventoHoraInicio', 'fechaInicio');
			});
			inputHoraFin.change( () => {
				let fechaInicio = new Date( $('#eventoFechaInicio').val() );
				let fechaFin = new Date( $('#eventoFechaFin').val() );
				self.bindFecha(self, '#eventoFechaFin', '#eventoHoraFin', 'fechaFin');
				if( !self.validarFecha(fechaFin, fechaInicio) ){
					self.errorObj.campo = 'Fecha de fin';
					self.errorObj.msj = 'No se puede ingresar una fecha fin que sea antes que la fecha de inicio.';
					$('#modalError').modal('open');
				}
			});
		},
		/*
			@Descripción: Obtiene todos los procarianos de la base de datos. Para mostrarlos en el formulario de evento nueva
		*/
		obtenerProcarianos(self){
			let urlAPi = '/api/procarianos/';
			$.ajax({
				type: 'GET',
				url: urlAPi,
				success(res){
					self.procarianos = res;
				}
			});
		},
		/*
			@Descripción: Vincula la fecha indicada en el atributo indicado. Retorna un boolean.
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
					self.evento.fechaInicio = fechaCompleta;	
				}
				else if(tipo === 'fechaFin'){
					self.evento.fechaFin = fechaCompleta;	
				}
				
			}else{
				if(tipo === 'fechaInicio'){
					self.errorObj.campo = 'Fecha de inicio';	
				}
				else if(tipo === 'fechaFin'){
					self.errorObj.campo = 'Fecha de fin';	
				}
				self.errorObj.msj = 'No se puede ingresar una fecha que ya pasó.';
				$('#modalError').modal('open');
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
		obtenerIdPersonaResponsable(self){
			let responsable = $('#eventoResponsable').val();
			$.each(self.procarianos, function(index, procariano){
				let nombreCompleto = procariano.nombres + ' ' + procariano.apellidos;
				if(nombreCompleto === responsable){
					self.evento.responsable = procariano.personaId;
					return false;
				}
			});
		},
		//EVENTOS DE BOTONES
		/*
			@Descripción:
				Valida el formulario y luego hace la llamada a la api
		*/
		crearEvento(){
			let self = this;
			this.$validator.validateAll().then( (result) => {
				if(result){
					//self.obtenerIdProcarianoResponsable(self);
					self.llamadaApi(self.evento);
				}else{
					console.log(self.errors);
					self.errorObj.campo = self.errors.items[0].field;
          self.errorObj.msj = self.errors.items[0].msg;
					$('#modalError').modal('open');
				}
			}).catch( () => {
				self.errorObj.campo = self.errors.items[0].field;
        self.errorObj.msj = self.errors.items[0].msg;
				$('#modalError').modal('open');
			});
				
		},
		llamadaApi(evento){
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
		regresar(){
			window.location.href = '/home';
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
