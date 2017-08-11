<template>
	<div class="container" id="container-evento-nueva">
		<a href="#" @click="regresar"><i class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></a>
		<header>
			<h3 class="center-align">Evento nuevo</h3>
		</header>
		<form>
	  	<v-row id="rowNombre">
	  		<div class="col s12">
	  			<label for="nombre">Nombre</label>	
	  			<input name="nombre" id="nombre" v-model="evento.nombre" v-validate="'required|alpha_spaces'">
	  			<span v-show="errors.has('nombre')" class="help is-danger">{{ errors.first('nombre') }}</span>
	  		</div>
	  	</v-row>
	  	<v-row id="rowDescripcion">
	  		<div class="col s12">
	  			<label for="descripcion">Descripción</label>
		  		<textarea name="descripcion" id="descripcion" v-model="evento.descripcion" class="materialize-textarea" v-validate="'required|regex:^([A-Za-z0-9# .\-]+)$'"></textarea>
		  		<span v-show="errors.has('descripcion')" class="help is-danger">{{ errors.first('descripcion') }}</span>	
	  		</div>
	  	</v-row>
	  	<v-row id="rowLugar">
	  		<div class="col s12">
	  			<label for="descripcion">Lugar</label>
		  		<textarea name="lugar" id="lugar" v-model="evento.lugar" class="materialize-textarea" v-validate="'required|regex:^([A-Za-z0-9# .\-]+)$'"></textarea>
		  		<span v-show="errors.has('lugar')" class="help is-danger">{{ errors.first('lugar') }}</span>	
	  		</div>
	  	</v-row>
	  	<v-row id="rowFechaInicio">
	  		<div class="col s6">
	  			<label for="eventoFechaInicio">Fecha de inicio</label>
		      <v-date-input id="eventoFechaInicio" name="eventoFechaInicio"></v-date-input>
	  		</div>
	  		<div class="col s6" id="divHoraInicio">
	  			<label for="eventoHoraInicio">Hora de inicio</label>
	  			<input type="text" class="timepicker" id="eventoHoraInicio">
	  		</div>
	  	</v-row>
	  	<v-row id="rowFechaFin">
	  		<div class="col s6">
	  			<label for="eventoFechaFin">Fecha de fin</label>
		      <v-date-input id="eventoFechaFin" name="eventoFechaFin"></v-date-input>
	  		</div>
	  		<div class="col s6" id="divHoraFin">
	  			<label for="eventoHoraFin">Hora de fin</label>
	  			<input type="text" class="timepicker" id="eventoHoraFin">
	  		</div>
	  	</v-row>
	  	<v-row id="rowIngresosGastos">
	  		<div class="col s6">
	  			<label for="ingresos">Ingresos</label>
	  			<input type="number" name="ingresos" id="ingresos" v-model="evento.ingresos" min="0" step="0.01" v-validate="'between:0,100000'">
	  			<span v-show="errors.has('ingresos')" class="help is-danger">{{ errors.first('ingresos') }}</span>
	  		</div>
	  		<div class="col s6">
	  			<label for="gastos">Gastos</label>
	  			<input type="number" name="gastos" id="gastos" v-model="evento.gastos" min="0" step="0.01" v-validate="'between:0,100000'">
	  			<span v-show="errors.has('gastos')" class="help is-danger">{{ errors.first('gastos') }}</span>
	  		</div>
	  	</v-row>
	  	<v-row id="row-responsable">
	  		<div class="col s12">
	  			<v-row id="row-interior">
						<div class="input-field col s6">
							<label for="eventoResponsable">Responsable</label>
							<input type="text" name="eventoResponsable" id="eventoResponsable" class="autocomplete" autocomplete="off">
						</div>
						<div class="input-field col s6">
							<v-select name="estado" id="estado" v-model="evento.estado" select-text="" :items="estados"></v-select>
	  					<label for="estado">Estado</label>
						</div>
	  			</v-row>
	  		</div>
	  	</v-row>
	  	<v-row>
	  		<a class="waves-effect waves-light btn pul right" @click="crearEvento">Crear</a>
	  	</v-row>
	  </form>
	  <v-modal id="modalEventoCreado">
      <div slot="content">
        <h4 class="center-align">Evento creado correctamente</h4>
	      <p class="center-align">¿Desea crear otro evento?</p>
      </div>
      <div slot="footer">
        <a href="/home#/evento" class="modal-action modal-close waves-effect waves-green btn-flat" @click="limpiarEventoNuevo">Si</a>
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
    <v-modal id="modalError">
    	<div slot="content">
    		<h4 class="center-align">Formulario con errores.</h4>
	      <p class="center-align">Existe un error del campo: "{{errorObj.campo}}"</p>
	      <p class="center-align">Con el siguiente mensaje de error: </p>
	      <p class="center-align">"{{errorObj.msj}}"</p>
    	</div>
    	<div slot="footer">
    		<a href="/home#/evento" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
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
	#container-evento-nueva{
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

	Vue.use(VeeValidate);
	Vue.use(Materials);

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
		},
		mounted(){
			this.inicializarMaterialize(this);
		},
		data(){
			return{
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
					console.log('Fecha de inicio ' + fechaInicio);
					let fechaFin = new Date( $('#eventoFechaFin').val() );
					console.log('Fecha de fin ' + fechaFin);
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
						self.llamadaApi(self, self.evento);
					}else{
						console.log(self.errors)
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
			llamadaApi(self, evento){
				console.log(evento)
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
			}
		}
	}
</script>

