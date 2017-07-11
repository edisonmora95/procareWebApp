/*
	@Descripción: Controlador de la ventana principal. Todos los usuarios tendrán acceso a esta ventana una vez hecho login.
	@Autor: @edisonmora95
	@FechaCreación: 15/06/2017
*/

import Navbar from './../../components/navbar.vue';

Vue.component('navbar', Navbar); 

let indexApp = new Vue({
	el: '#indexApp',
	created(){

	},
	mounted(){
		let self = this;
		$.when($.ajax(self.obtenerEventos())).then(function(){
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
	      events: self.eventos,
	      //Funciones
	      eventClick: function(calEvent, jsEvent, view) {

	      	if (event.url) {
	            window.open(event.url);
	            return false;
	        }
	        self.eventoSeleccionado = calEvent;
	    	}
	    });	
		});
		
	},
	methods:{
		obtenerEventos(){
			let self = this;
			//console.log('hol.a');
			//'/scripts/eventos.json'
			$.getJSON('/api/tarea/', function(data){
				console.log(data);
				console.log(data.sequelizeStatus);
				self.eventos = data.sequelizeStatus;
				$.each(data.sequelizeStatus, function(index, evento){
					//console.log("este es el evento " + evento[0]);
					//console.log("este es el evento 0 " + evento[0][0]);
					//console.log("este es el evento 1 " + evento[0][1]);
					self.eventos.push(evento);
				})
			})

		}
	},
	data: {
		eventos: [],
		eventoSeleccionado: {}
	}
});
