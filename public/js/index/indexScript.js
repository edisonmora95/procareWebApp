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
		this.obtenerProcarianos();
	},
	mounted(){
		let self = this;
		$('.modal').modal();
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
			$.ajax({
				type: 'GET',
				url: '/api/tarea/',
				success(res){
					console.log(res)
				}
			});
			/*$.getJSON('/api/tarea/', function(data){
				console.log(data)
				self.eventos = data.sequelizeStatus;
				$.each(data.sequelizeStatus, function(index, evento){
					//console.log("este es el evento " + evento[0]);
					//console.log("este es el evento 0 " + evento[0][0]);
					//console.log("este es el evento 1 " + evento[0][1]);
					self.eventos.push(evento);
				})
			})*/
		},
		obtenerProcarianos(){
			let self = this;
			let urlAPi = '/api/procarianos/';
			$.ajax({
				type: 'GET',
				url: urlAPi,
				success(res){
					self.procarianos = res;
				}
			});
		},
		crearTarea(){
			this.flag = false;
		}
	},
	data: {
		flag: true,
		eventos: [],
		eventoSeleccionado: {},
		procarianos: []
	}
});



//Por alguna razón, esto no funciona dentro de la instancia de Vue... 
	$(document).ready(function(){
		console.log('sdaf')
		let datos = {};
		$.each(indexApp.$data.procarianos, function(index, procariano){
			let nombreCompleto = procariano.nombres + ' ' + procariano.apellidos;
			datos[nombreCompleto] = null;
		});
	  $('input.autocomplete').autocomplete({
	     data: datos
	   });
	});
