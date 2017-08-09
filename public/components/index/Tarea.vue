<template>
	<div class="container" id="container-tarea-nueva">
		<a href="#" @click="regresar"><i class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></a>
		<header>
			<h3 class="center-align">Tarea nueva</h3>
		</header>
		<form>
	  	<v-row id="rowNombre">
	  		<div class="col s12">
	  			<label for="nombre">Nombre</label>	
	  			<input name="nombre" id="nombre" v-model="tarea.nombre" v-validate="'required|alpha_spaces'">
	  			<span v-show="errors.has('nombre')" class="help is-danger">{{ errors.first('nombre') }}</span>
	  		</div>
	  	</v-row>
	  	<v-row id="rowDescripcion">
	  		<div class="col s12">
	  			<label for="descripcion">Descripción</label>
		  		<textarea name="descripcion" id="descripcion" v-model="tarea.descripcion" class="materialize-textarea" v-validate="'required|regex:^([A-Za-z0-9# .\-]+)$'"></textarea>
		  		<span v-show="errors.has('descripcion')" class="help is-danger">{{ errors.first('descripcion') }}</span>
	  		</div>
	  	</v-row>
	  	<v-row id="rowFechaInicio">
	  		<div class="col s6">
	  			<label for="fechaInicio">Fecha de inicio</label>
		      <v-date-input id="fechaInicio" name="fechaInicio"></v-date-input>	
	  		</div>
	  		<div class="col s6" id="divHoraInicio">
	  			<label for="fechaInicio">Hora de inicio</label>
	  			<input type="text" class="timepicker" id="horaInicio">
	  		</div>
	  	</v-row>
	  	<v-row id="rowFechaFin">
	  		<div class="col s6">
	  			<label for="fechaFin">Fecha de fin</label>
		      <v-date-input id="fechaFin" name="fechaFin"></v-date-input>
	  		</div>
	  		<div class="col s6" id="divHoraFin">
	  			<label for="fechaInicio">Hora de fin</label>
	  			<input type="text" class="timepicker" id="horaFin">
	  		</div>
	  	</v-row>
	  	<v-row>
	  		<div class="input-field col s6">
	  			<v-select name="categoria" id="categoria" v-model="tarea.categoria" select-text="" :items="categoriasTarea"></v-select>
	  			<label for="categoria">Categoría</label>
	  		</div>
	  		<div class="input-field col s6">
	  			<v-select name="prioridad" id="prioridad" v-model="tarea.prioridad" select-text="" :items="prioridadesTarea"></v-select>
	  			<label for="prioridad">Prioridad</label>
	  		</div>
	  	</v-row>
	  	<v-row id="row-responsable">
	  		<div class="col s12">
	  			<v-row id="row-interior">
						<div class="input-field col s6" id="esteDiv">
							<label for="responsable">Responsable</label>
							<v-text-input type="text" name="responsable" id="responsable" v-model="responsable" class="autocomplete" autocomplete="off"></v-text-input>
						</div>
						<div class="input-field col s6">
							<v-select name="estado" id="estado" v-model="tarea.estado" select-text="" :items="estadosTarea"></v-select>
	  					<label for="estado">Estado</label>
						</div>
	  			</v-row>
	  		</div>
	  	</v-row>
	  	<v-row>
	  		<a class="waves-effect waves-light btn pul right" @click="crearTarea">Crear</a>
	  	</v-row>
	  </form>
	  <v-modal id="modalTareaCreada">
      <div slot="content">
        <h4 class="center-align">Tarea creada correctamente</h4>
	      <p class="center-align">¿Desea crear otra tarea?</p>
      </div>
      <div slot="footer">
        <a href="/home#/tarea" class="modal-action modal-close waves-effect waves-green btn-flat" @click="limpiarTarea">Si</a>
	      <a class="modal-action modal-close waves-effect waves-green btn-flat" @click="regresar">No</a>
      </div>
    </v-modal>
    <v-modal id="modalEventoErrorServidor">
      <div slot="content">
        <h4 class="center-align">Error</h4>
	      <p class="center-align">No se pudo crear el evento. Intente recargar la página.</p>
      </div>
      <div slot="footer">
        <a href="/home#/evento" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
      </div>
    </v-modal>
	  <v-modal id="modalTareaError">
      <div slot="content">
       <h4 class="center-align">Formulario con errores.</h4>
	      <p class="center-align">Existe un error del campo: "{{errorObj.campo}}"</p>
	      <p class="center-align">Con el siguiente mensaje de error: </p>
	      <p class="center-align">"{{errorObj.msj}}"</p>
      </div>
      <div slot="footer">
        <a href="/home#/tarea" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
      </div>
    </v-modal>
    <v-modal id="modalFechaIncorrecta">
      <div slot="content">
        <h4 class="center-align">Error</h4>
	      <p class="center-align">No puede escoger como fecha de realización una fecha ya pasada.</p>
      </div>
      <div slot="footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
      </div>
    </v-modal>
	</div>
</template>
<style scoped>
	#row-responsable{
		margin-top: 0;
	}
	#container-tarea-nueva{
		padding: 1%;
		background-color: white;
		margin-bottom: 3%;
		border-radius: 2%;
	}
	form{
		padding: 1%;
	}
	#row-interior{
		padding-left: 0;
		padding-right: 0; 
	}
	.help{
		font-size: small;
		font-weight: normal;
		color: red;
	}
</style>
<script>
	import Materials from 'vue-materials';
	import VeeValidate from 'vee-validate';
	
	Vue.use(Materials);
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

	module.exports = {
		created(){
			$('.tooltipped').tooltip('remove');
			this.obtenerProcarianos(this);
			this.bindFechaPublicacion(this);
		},
		mounted(){
			this.obtenerProcarianos(this);
			this.inicializarMaterialize(this);
			//inicializarAutocomplete();
			//function inicializarAutocomplete(){
				
			//}

		},
		data(){
			return{
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
			}
		},
		methods: {
			inicializarMaterialize(self){
				let inputHoraInicio = $('#horaInicio');
				let inputHoraFin = $('#horaFin');	
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
				//Asignaciones de funciones onChange
				inputHoraInicio.change( () => {
					self.bindFecha(self, '#fechaInicio', '#horaInicio', 'fechaInicio');
				});
				inputHoraFin.change(function(){
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
				@Descripción: Vincula la fecha indicada en el atributo indicado
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
						self.llamadaApi(self, self.tarea);
					}else{
						self.errorObj.campo = self.errors.items[0].field;
	          self.errorObj.msj = self.errors.items[0].msg;
						$('#modalTareaError').modal('open');
					}
				}).catch( () => {
					self.errorObj.campo = self.errors.items[0].field;
          self.errorObj.msj = self.errors.items[0].msg;
					$('#modalTareaError').modal('open');
				});
			},
			llamadaApi(self, tarea){
				let urlApi = '/api/tareas/';
				$.ajax({
					type: 'POST',
					url: urlApi,
					data: tarea,
					success(res){
						if(res.status){
							$('#modalTareaCreada').modal('open');
						}else{
							$('#modalEventoErrorServidor').modal('open');
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
	}

/*
	$(document).ready(function(){
		inicializarAutocomplete();
	});
	function inicializarAutocomplete(){
		let procarianos = [];
		let urlAPi = '/api/procarianos/';
		$.ajax({
			type: 'GET',
			url: urlAPi,
			success(res){
				procarianos = res;
				let datos = {};
				$.each(procarianos, function(index, procariano){
					let nombreCompleto = procariano.nombres + ' ' + procariano.apellidos;
					datos[nombreCompleto] = null;
				});
			  $('input.autocomplete').autocomplete({
			   data: datos
			 });
			}
		});
	}
	*/
	

</script>

