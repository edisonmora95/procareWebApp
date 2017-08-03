/*
	@Descripción: Controlador de la ventana principal. Todos los usuarios tendrán acceso a esta ventana una vez hecho login.
	@Autor: @edisonmora95
	@FechaCreación: 15/06/2017
*/

import Navbar from './../../components/navbar.vue';
import Tarea from './../../components/tareaNueva.vue';

Vue.component('navbar', Navbar); 
Vue.component('tarea', Tarea); 

let indexApp = new Vue({
	el: '#indexApp',
	created(){
		this.obtenerProcarianos(this);
		this.obtenerTareas(this);
	},
	mounted(){
		let self = this;
		$('.modal').modal();
	},
	methods:{
		/*
			@Descripción: Obtiene todos los procarianos de la base de datos. Para mostrarlos en el formulario de tarea nueva
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
			@Descripción: Obtiene todas las tareas de la base de datos, luego arma el calendario con ellas
		*/
		obtenerTareas(self){
			$.ajax({
				type: 'GET',
				url: '/api/tareas/',
				success(res){
					self.tareas = res.sequelizeStatus;
					console.log(self.tareas)
					self.armarCalendario(self);
				}
			});
		},
		armarCalendario(self){
			$('#calendar').fullCalendar({
	      //Atributos
	     	header: {
	     		left: 'prev,next today',
	     		center: 'title',
	     		right: 'month,agendaWeek,agendaDay'
	     	},
	     	firstDay: 1,
	     	showNonCurrentDates: false,
	      navLinks: true,
	      eventLimit: true, // for all non-agenda views
	      events: self.tareas,
	      //Funciones
	      eventClick: function(calEvent, jsEvent, view) {
	        self.eventoSeleccionado = calEvent;
	        console.log(self.eventoSeleccionado);
	    	}
	    });	
		},
		crearTarea(){
			this.flag = false;
		},
		moment(date) {
      return moment(date);
    },
    date(date) {
      var es = moment().locale('es');
      if (date === undefined || date === '') {
        return '----';
      }
      return moment(date).format('DD MMMM YYYY - HH:MM');
    },
	},
	data: {
		flag: true,
		tareas: [],
		eventoSeleccionado: {},
		procarianos: []
	}
});


//Por alguna razón, esto no funciona dentro de la instancia de Vue... 
	$(document).ready(function(){
		let datos = {};
		$.each(indexApp.$data.procarianos, function(index, procariano){
			let nombreCompleto = procariano.nombres + ' ' + procariano.apellidos;
			datos[nombreCompleto] = null;
		});
	  $('input.autocomplete').autocomplete({
	     data: datos
	   });
	});

