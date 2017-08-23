/*
	@Descripción: Controlador de la ventana principal. Todos los usuarios tendrán acceso a esta ventana una vez hecho login.
	@Autor: @edisonmora95
	@FechaCreación: 15/06/2017
*/

let indexApp = new Vue({
	el: '#indexApp',
	created(){
		this.obtenerUsuarioLoggeado(this);
	},
	mounted(){
		let self = this;
		$('.modal').modal();
		$('select').material_select();
		let selectEstado = $('#selectEstado');
		selectEstado.change( () => {
			const estadoNuevo = $('#selectEstado option:selected').val();
			self.cambiarEstado(self.eventoSeleccionado, estadoNuevo);
		});
		$('#tareas').hide();
	},
	data: {
		tareasEventos: [],
		eventoSeleccionado: {},
		usuario: {},
		esPersonal: false
	},
	methods: {
		/*
			@Descripción: 
				Obtiene la información del usuario logeado. Para armar la navbar de acuerdo con su rol.
		*/
		obtenerUsuarioLoggeado(self){
			$.ajax({
				type: 'GET',
				url: '/api/login/usuarios',
				success(res){
					self.usuario = res;
					const esPersonal = self.verificarRolDeUsuario(self, 'Personal');
					if( esPersonal ){
						//Si es personal se muestran tooodas las tareas y eventos
						self.esPersonal = true;
						self.obtenerTareasEventos(self);
					}else{
						//Si no es personal, se muestran todos los eventos y solo las tareas asignadas al usuario
						self.obtenerTareasEventosDeUsuario(self, self.usuario.id);
					}
				}
			});
		},
		/*
			@Descripción:
				Verifica si el usuario logeado tiene el rol indicado
			@Params:
				rolIndicado -> String -> Rol que se quiere averiguar.
		*/
		verificarRolDeUsuario(self, rolIndicado){
			let roles = self.usuario.roles;
			let flag = false;
			$.each(roles, function(index, rol){
				if(rol === rolIndicado){
					flag = true;
					return false;
				}
			});
			return flag;
		},
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
		/*
			@Descripción: Obtiene todas las tareas de la base de datos del usuario loggeado, luego arma el calendario con ellas
		*/
		obtenerTareasEventosDeUsuario(self, idPersona){
			const urlApi = '/api/calendario/usuario/' + idPersona;
			console.log(urlApi)
			$.ajax({
				type: 'GET',
				url: urlApi,
				success(res){
					console.log(res)
					if(res.estado){
						self.tareasEventos = res.datos;
						self.armarCalendario(self);
					}
				},
				error(err){
					Materialize.toast('No se pudieron obtener las tareas y eventos', 4000, 'rounded error');
				}
			})
		},
		armarCalendario(self){
			$('#calendar').fullCalendar({
	      //Atributos
	     	header: {
	     		left: 'prev,next today',
	     		center: 'title',
	     		right: 'month,agendaWeek,agendaDay'
	     	},
	     	dayClick: function(date, jsEvent, view) {
        		window.location.href = '/home/tarea/';
    		},
	     	firstDay: 1,
	     	showNonCurrentDates: false,
	      navLinks: true,
	      eventLimit: true, // for all non-agenda views
	      events: self.tareasEventos,
	      //Funciones
	      eventMouseover: function(calEvent, jsEvent, view) {
	        self.eventoSeleccionado = calEvent;
	        $('#selectEstado').val(self.eventoSeleccionado.estado);
	        $('#selectEstado').material_select();
	        self.cambiarClase(self.eventoSeleccionado);
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
	  /////////////////////////////////////////////////////////////
	  //Eventos
	  /////////////////////////////////////////////////////////////
	  cambiarClase(eventoSeleccionado){
	  	let divCalendario = $('#calendar');
	  	let divSeleccion = $('#tareas');

	  	divCalendario.removeClass('l12');
	  	divCalendario.addClass('l8');

	  	divSeleccion.show();
	  },
	  cambiarEstado(evento, estadoNuevo){
	  	const esTarea = ( evento.type === 'tarea' );
	  	const esEvento = ( evento.type === 'evento' );
	  	let mensajeExito = '';
	  	let urlApi = '';
	  	if( esTarea ){
	  		urlApi = '/api/tareas/cambiarEstado/' + evento.id;
	  		mensajeExito = 'Tarea realizada'
	  	}
	  	if ( esEvento ) {
	  		urlApi = '/api/eventos/cambiarEstado/' + evento.id;
	  		mensajeExito = 'Evento completado'
	  	}

	  	$.ajax({
	  		type: 'PUT',
	  		url: urlApi,
	  		data: { estadoNuevo : estadoNuevo},
	  		success(res){
	  			Materialize.toast(mensajeExito, 3000, 'rounded')
	  		},
	  		error(err){
	  			//Regresar el evento/tarea al estado previo
	  			$('#selectEstado').val(self.eventoSeleccionado.estado);
	  		}
	  	})
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
