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
	  			<v-text-input name="nombre" id="nombre" v-model="tareaNueva.nombre"></v-text-input>
	  		</div>
	  	</v-row>
	  	<v-row id="rowDescripcion">
	  		<div class="col s12">
	  			<label for="descripcion">Descripción</label>
		  		<v-text-area name="descripcion" id="descripcion" v-model="tareaNueva.descripcion"></v-text-area>	
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
	  			<v-select name="categoria" id="categoria" v-model="tareaNueva.categoria" select-text="" :items="categoriasTarea"></v-select>
	  			<label for="categoria">Categoría</label>
	  		</div>
	  		<div class="input-field col s6">
	  			<v-select name="prioridad" id="prioridad" v-model="tareaNueva.prioridad" select-text="" :items="prioridadesTarea"></v-select>
	  			<label for="prioridad">Prioridad</label>
	  		</div>
	  	</v-row>
	  	<v-row id="row-responsable">
	  		<div class="col s12">
	  			<v-row id="row-interior">
						<div class="input-field col s6">
							<label for="responsable">Responsable</label>
							<v-text-input type="text" name="responsable" id="responsable" v-model="responsable" class="autocomplete" autocomplete="off"></v-text-input>
						</div>
						<div class="input-field col s6">
							<v-select name="estado" id="estado" v-model="tareaNueva.estado" select-text="" :items="estadosTarea"></v-select>
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
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" @click="limpiarTareaNueva">Si</a>
	      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" @click="regresar">No</a>
      </div>
    </v-modal>
	  <v-modal id="modalTareaError">
      <div slot="content">
        <h4 class="center-align">Error</h4>
	      <p class="center-align">No se pudo crear la tarea. Intente recargar la página.</p>
      </div>
      <div slot="footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
      </div>
    </v-modal>
    <v-modal id="modalFechaIncorrecta">
      <div slot="content">
        <h4 class="center-align">Error</h4>
	      <p class="center-align">No puede escoger como fecha de realización una fecha ya pasada.</p>
      </div>
      <div slot="footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
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
	}
	form{
		padding: 1%;
	}
	#row-interior{
		padding-left: 0;
		padding-right: 0; 
	}
</style>
<script>
	import Materials from 'vue-materials';
	Vue.use(Materials);

	module.exports = {
		props: ['procarianos'],
		created(){
			this.bindFechaPublicacion(this);
		},
		mounted(){
			this.inicializarMaterialize(this);
		},
		data(){
			return{
				responsable: '',
				tareaNueva: {
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

				inputHoraInicio.change( () => {
					self.bindFecha(self, '#fechaInicio', '#horaInicio', 'fechaInicio');
				});

				inputHoraFin.change(function(){
					self.bindFecha(self, '#fechaFin', '#horaFin', 'fechaFin');
				});
			},
			/*
				@Descripción: Busca el id del responsable seleccionado
			*/
			obtenerIdProcarianoResponsable(){
				let self = this;
				let responsable = $('#responsable').val();
				$.each(self.procarianos, function(index, procariano){
					let nombreCompleto = procariano.nombres + ' ' + procariano.apellidos;
					if(nombreCompleto === responsable){
						self.tareaNueva.responsable = procariano.personaId;
						return false;
					}
				});
			},
			crearTarea(){
				let self = this;
				self.obtenerIdProcarianoResponsable();
				self.llamadaApi(self, self.tareaNueva);
			},
			llamadaApi(self, tareaNueva){
				console.log(tareaNueva)
				let urlApi = '/api/tareas/';
				$.ajax({
					type: 'POST',
					url: urlApi,
					data: tareaNueva,
					success(res){
						if(res.status){
							$('#modalTareaCreada').modal('open');
						}else{
							$('#modalTareaError').modal('open');
							console.log(res);
						}
					}
				});
			},
			limpiarTareaNueva(){
				let self = this;
				self.tareaNueva.nombre = '';
				self.tareaNueva.descripcion = '';
				self.tareaNueva.fechaPublicacion = new Date($.now());
				self.tareaNueva.fechaLimite = '';
				self.tareaNueva.prioridad = '';
				self.tareaNueva.categoria = '';
				self.tareaNueva.responsable = '';
				self.responsable = '';
			},
			/*
				@Descripción: Vincula la fecha indicada en el atributo indicado
				@Return:
					true -> Si se pudo vincular correctamente
					flase -> Si no se pudo vincular porque la fecha fue incorrecta
			*/
			bindFecha(self, idDatePicker, idTimePicker, tipo){
				let fechaCompleta = '';
				const anio = $(idDatePicker).pickadate('picker').get('highlight', 'yyyy');
				const mes = $(idDatePicker).pickadate('picker').get('highlight', 'mm');
				const dia = $(idDatePicker).pickadate('picker').get('highlight', 'dd');
				const hora = $(idTimePicker).val();
				const fechaIngresada = new Date( $(idDatePicker).val() );

				if(self.validarFecha(fechaIngresada)){
					fechaCompleta = anio + '-' + mes + '-' + dia + ' ' + hora + ' Z';
					if(tipo === 'fechaInicio'){
						self.tareaNueva.fechaInicio = fechaCompleta;	
					}
					else if(tipo === 'fechaFin'){
						self.tareaNueva.fechaFin = fechaCompleta;	
					}
					
				}else{
					alert('jiji')
				}
			},
			/*
				@Descripción: Valida que la fecha de realización no sea antes de la fecha actual
				@Return:
					true si la fecha es correcta
					false si es incorrecta
			*/
			validarFecha(fechaIngresada){
				const fechaActual = new Date();
				if(fechaActual < fechaIngresada){
					return true;
				}else{
					return false;
				}
			},
			bindFechaPublicacion(self){
				let fechaActual = new Date();
				let anio = fechaActual.getFullYear();
				let mes = fechaActual.getMonth()+1;
				let dia = fechaActual.getDate();

				let fecha = anio + '/' + ((''+mes).length < 2 ? '0' : '') + mes + '/' + ((''+dia).length < 2 ? '0' : '') + dia;
				self.tareaNueva.fechaPublicacion = fecha;
			},
			regresar(){
				this.limpiarTareaNueva();
				this.$emit('flagchanged', true);	
			},
		}
	}

</script>

