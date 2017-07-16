/*
	@Descripción: Controlador de la ventana principal. Todos los usuarios tendrán acceso a esta ventana una vez hecho login.
	@Autor: @edisonmora95
	@FechaCreación: 15/06/2017
*/

import Navbar from './../../components/navbar.vue';
//import 'vue-event-calendar/dist/style.css'; //^1.1.10, CSS has been extracted as one file, so you can easily update it.
//import vueEventCalendar from 'vue-event-calendar';
//Vue.use(vueEventCalendar, {locale: 'en'}) //locale can be 'zh' , 'en' , 'es', 'pt-br', 'ja'
//Vue.use(require('vue-full-calendar'));
//import VueFullCalendar from 'vue-full-calendar';
//Vue.component('vue-full-calendar', VueFullCalendar);

Vue.component('navbar', Navbar); 
//Vue.component('vue-event-calendar', vueEventCalendar);

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
	        console.log(calEvent);
	        console.log(calEvent.start);
	        self.eventoSeleccionado = calEvent;
	        /*alert('Event: ' + calEvent.title);
	        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
	        alert('View: ' + view.name);*/

	        // change the border color just for fun
	        //$(this).css('border-color', 'red');

	    	}
	    });	
		});
		
	},
	methods:{
		obtenerEventos(){
			let self = this;
			//console.log('hol.a');
<<<<<<< HEAD
			$.getJSON('/scripts/eventos.json', function(data){
				//console.log(data);
				self.eventos = data;
				/*$.each(data, function(index, evento){
					self.eventos.push(evento);
				})*/
=======
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
>>>>>>> 0ade0d7ca6e482b50084cb1ad035654c58a31ed9
			})
		}
	},
	data: {
		eventos: [],
		eventoSeleccionado: {}
	}
});
