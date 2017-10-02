/*
	@Descripción: Controlador de la vista de verProcaeriano.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/04/2017
*/

'use strict';

let app = new Vue({
	el: '#app',
	created(){
		const path 	  	 	= window.location.pathname;
		this.idProcariano = path.split('/')[3];
		this.obtenerProcarianoPorId(this, this.idProcariano);
	},
	mounted: function(){
		$('.modal').modal();
	},
	data: {
		idProcariano 			 : 0,
		procariano 				 : {},
		fechaNacimiento 	 : '',
		habilitaredicion 	 : false,
		grupoprocariano 	 : {
			id 	: '',
			text: ''
		},
		tipoprocariano 		 : {
			id 	: '',
			text: ''
		},
		dataFinishedLoading: false
	},
	methods: {
		//Funciones para editar la forma en la que se muestra la fecha
		moment(date) {
      return moment(date);
    },
    date(date) {
      var es = moment().locale('es');
      if (date === undefined || date === '') {
        return '----';
      }
      return moment(date).format('DD MMMM YYYY');
    },
    /*
			@Descripción: 
				Obtiene toda la información del Procariano de la base de datos
				Asigna los valores al objeto para mostrar
			@ÚltimaModificación:
				23/09/2017 	@edisonmora95 	creada función para asignar valores al objeto
    */
		obtenerProcarianoPorId(self, id){
			const urlApi = '/api/procarianos/' + id;
			$.ajax({
				type 	 : 'GET',
				url 	 : urlApi,
				success: function(res){
					self.asignarValoresObtenidos(self, res);
				}
			});
		},
		/*
			@Descripción:
				De los datos obtenidos de la base, se asignan todos los valores al objeto self.procariano
		*/
		asignarValoresObtenidos(self, res){
			self.procariano 							= res.datos.procariano;
			self.procariano.idProcariano 	= self.procariano.id;
			Object.assign(self.procariano, self.procariano.Persona);
      delete self.procariano.Persona;
      delete self.procariano.id;

      self.tipoprocariano.id 		= res.datos.tipoActual.id;
			self.tipoprocariano.text 	= res.datos.tipoActual.nombre;
			//console.log(self.tipoprocariano);
			self.grupoprocariano.id 	= res.datos.grupoActual.id;
			self.grupoprocariano.text = res.datos.grupoActual.nombre;

			self.fechaNacimiento 			= new Date(self.procariano.fechaNacimiento.replace(/-/g, '\/').replace(/T.+/, ''));
			self.dataFinishedLoading 	= true;
		},
		eliminar(){
			console.log('entra en eliminar');
			var self = this;
			var urlApi= '/api/procarianos/' + self.idProcariano;
			$.ajax({
				type: 'DELETE',
				url: urlApi,
				success: function(res){
					console.log(res);
					if (res.status) {
						self.procariano.estado = 'inactivo';
						console.log('');
						$('#modalExitoEliminar').modal('open');
					}else{
						$('#modalErrorEliminar').modal('open');
					}
				},
				error : function(error){
					$('#modalErrorEliminar').modal('open');
				}
			});
		},
		habilitarEditar(){
			this.habilitaredicion = true;
		}
	}
});