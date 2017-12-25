/*
	@Descripción: Controlador de la ventana principal. Todos los usuarios tendrán acceso a esta ventana una vez hecho login.
	@Autor: @edisonmora95
	@FechaCreación: 15/06/2017
*/

let App = new Vue({
	el: '#indexApp',
	created(){
		this.obtenerUsuarioLoggeado(this);
	},
	mounted(){
		this.inicializarMaterialize(this);
	},
	data: {
		tareasEventos     : [],
		eventoSeleccionado: {},
		usuario           : {},
		esPersonal        : false,
		errorAjax         : {
			header : '',
			content: '',
		},
	},
	methods: {
		inicializarMaterialize(self){
			$('.modal').modal();
			$('select').material_select();
			let selectEstado = $('#selectEstado');
			selectEstado.change( () => {
				const estadoNuevo = $('#selectEstado option:selected').val();
				self.cambiarEstado(self.eventoSeleccionado, estadoNuevo);
			});
			$('#tareas').hide();	
		},
		/*
			@Descripción: 
				Obtiene la información del usuario logeado. Para armar la navbar de acuerdo con su rol.
		*/
		obtenerUsuarioLoggeado(self){
			$.ajax({
				type: 'GET',
				url : '/api/login/usuarios',
				success(res){
					App.usuario 		 = res.datos;
					App.esPersonal  = App.verificarRolDeUsuario('Personal');
					if( App.esPersonal ){
						App.obtenerTareasEventos();
					}else{
						App.obtenerTareasEventosDeUsuario(App.usuario.id);
					}
				},
				error(err){
					console.log(err)
				}
			});
		},
		/*
			@Descripción:
				Verifica si el usuario logeado tiene el rol indicado
			@Params:
				rolIndicado -> String -> Rol que se quiere averiguar.
		*/
		verificarRolDeUsuario(rolIndicado){
			let roles = App.usuario.roles;
			let flag 	= false;
			$.each(roles, function(index, rol){
				if( rol === rolIndicado ){
					flag = true;
					return false;
				}
			});
			return flag;
		},
		/*
			@Descripción: Obtiene todas las tareas de la base de datos, luego arma el calendario con ellas
		*/
		obtenerTareasEventos(){
			$.ajax({
				type   : 'GET',
				url    : '/api/calendario/',
				headers: {
	        "x-access-token" : localStorage.getItem('token')
		    },
				success(res){
					App.tareasEventos = res.datos;
					App.armarCalendario(App.tareasEventos);
				},
				error(err){
					if( err.status === 403 ){
						App.error404(err.responseJSON.mensaje);
					}else{
						Materialize.toast('No se pudieron obtener las tareas y eventos', 4000, 'rounded error');	
					}
					console.log(err)
				}
			});
		}, 
		/*
			@Descripción: Obtiene todas las tareas de la base de datos del usuario loggeado, luego arma el calendario con ellas
		*/
		obtenerTareasEventosDeUsuario(idPersona){
			const urlApi = '/api/calendario/usuario/' + idPersona;
			$.ajax({
				type   : 'GET',
				url    : urlApi,
				headers: {
	        "x-access-token" : localStorage.getItem('token')
		    },
				success(res){
					App.tareasEventos = res.datos;
					App.armarCalendario(App.tareasEventos);
				},
				error(err){
					if( err.status === 403 ){
						App.error404(err.responseJSON.mensaje);
					}else{
						Materialize.toast('No se pudieron obtener las tareas y eventos', 4000, 'rounded error');	
					}
				}
			});
		},
		armarCalendario(tareasEventos){
			$('#calendar').fullCalendar({
	      //Atributos
	     	header: {
	     		left	: 'prev,next today',
	     		center: 'title',
	     		right	: 'month,agendaWeek,agendaDay'
	     	},
	     	firstDay: 1,
	     	showNonCurrentDates: false,
	      navLinks	: true,
	      eventLimit: true, // for all non-agenda views
	      events 		: tareasEventos,
	      //Funciones
	      eventMouseover: function(calEvent, jsEvent, view) {
	        App.eventoSeleccionado = calEvent;
	        $('#selectEstado').val(App.eventoSeleccionado.estado);
	        $('#selectEstado').material_select();
	        App.cambiarClase(App.eventoSeleccionado);
	    	},
	    	eventRender: function(evento, elemento){
	    		App.renderizarEventos(evento, elemento);
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
	  	let divSeleccion 	= $('#tareas');

	  	divCalendario.removeClass('l12');
	  	divCalendario.addClass('l8');

	  	divSeleccion.show();
	  },
	  cambiarEstado(evento, estadoNuevo){
	  	const esTarea 	 = ( evento.type === 'tarea' );
	  	const esEvento 	 = ( evento.type === 'evento' );
	  	let mensajeExito = '';
	  	let urlApi = '';
	  	if( esTarea ){
	  		urlApi 			 = '/api/tareas/cambiarEstado/' + evento.id;
	  		mensajeExito = 'Tarea realizada'
	  	}
	  	if ( esEvento ) {
	  		urlApi 			 = '/api/eventos/cambiarEstado/' + evento.id;
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
    renderizarEventos(evento, elemento) {
      let esTarea = (evento.type === 'tarea');

      let eventoEsFormacion = (evento.categoria === 1);
      let eventoEsAccion 		= (evento.categoria === 2);
      let eventoEsFundacion = (evento.categoria === 3);

      let eventoPendiente  = (evento.estado === 1);
      let eventoEnProceso  = (evento.estado === 2);
      let eventoCompletado = (evento.estado === 3);

      if (esTarea) {
        elemento.addClass('tarea');
      } else {
        elemento.addClass('evento');
      }

      if (eventoEsFormacion) {
        elemento.addClass('formacion');
      } else if (eventoEsAccion) {
        elemento.addClass('accion');
      } else if (eventoEsFundacion) {
        elemento.addClass('fundacion');
      }

      if (eventoPendiente) {
        elemento.addClass('pendiente');
      } else if (eventoEnProceso) {
        elemento.addClass('proceso');
      } else if (eventoCompletado) {
        elemento.addClass('completado');
      }
    },
    error404(mensaje){
    	App.errorAjax.header = 'Usuario no autorizado';
			App.errorAjax.content=  mensaje;	
			$('#modalAjax').modal('open');
    },
  }
});