/*
	@Descripción: Controlador de la ventana principal. Todos los usuarios tendrán acceso a esta ventana una vez hecho login.
	@Autor: @edisonmora95
	@FechaCreación: 15/06/2017
*/

let indexApp = new Vue({
	el: '#indexApp',
	created(){
		this.obtenerTareasEventos	(this);
	},
	mounted(){
		$('.modal').modal();
	},
	data: {
		tareasEventos: [],
		eventoSeleccionado: {},
	},
	methods: {
		/*
			@Descripción: Obtiene todas las tareas de la base de datos, luego arma el calendario con ellas
		*/
		obtenerTareasEventos(self){
			$.ajax({
				type: 'GET',
				url: '/api/calendario/',
				success(res){
					self.tareasEventos = res.datos;
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
	      events: self.tareasEventos,
	      //Funciones
	      eventClick: function(calEvent, jsEvent, view) {
	        self.eventoSeleccionado = calEvent;
	    	},
	    	eventRender: function(evento, elemento){
	    		self.renderizarEventos(evento, elemento);
	    	}
	    });	
		},
		//FUNCIONES PARA DAR FORMATO A LAS FECHAS
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
	  /*
			@Descripción: Muestra los eventos y tareas en el calendario con el formato indicado por Procare
	  */
	  renderizarEventos(evento, elemento){
	  	let esTarea = (evento.type === 'tarea');
	  	
  		let eventoEsFormacion = (evento.categoria === 1);
  		let eventoEsAccion = (evento.categoria === 2);
  		let eventoEsFundacion = (evento.categoria === 3);

  		let eventoPendiente = (evento.estado === 1);
  		let eventoEnProceso = (evento.estado === 2);
  		let eventoCompletado = (evento.estado === 3);

  		if(esTarea){
  			elemento.addClass('tarea');
  		}else{
  			elemento.addClass('evento');
  		}

  		if(eventoEsFormacion){
  			elemento.addClass('formacion');
  		}else if(eventoEsAccion){
  			elemento.addClass('accion');
  		}else if(eventoEsFundacion){
  			elemento.addClass('fundacion');
  		}

  		if(eventoPendiente){
  			elemento.addClass('pendiente');
  		}else if(eventoEnProceso){
  			elemento.addClass('proceso');
  		}else if(eventoCompletado){
  			elemento.addClass('completado');
  		}	
	  }
	}
});
