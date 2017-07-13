<template>
	<div class="container" id="container-tarea-nueva">
		<a href="#" @click="regresar"><i class="fa fa-arrow-left fa-lg" aria-hidden="true"></i></a>
		<form>
	  	<v-row>
	  		<div class="col s6">
	  			<label for="nombre">Nombre</label>	
	  			<v-text-input name="nombre" id="nombre" v-model="tareaNueva.nombre"></v-text-input>
	  			
	  		</div>
	  		
	  	</v-row>
	  	<v-row>
	  		<div class="col s6">
	  			<label for="fechaLimite">Fecha de realización</label>
		      <v-date-input id="fechaLimite" name="fechaLimite"></v-date-input>	
	  		</div>
	  	</v-row>
	  	<v-row>
	  		<div class="col s12">
	  			<label for="descripcion">Descripción</label>
		  		<v-text-area name="descripcion" id="descripcion" v-model="tareaNueva.descripcion"></v-text-area>	
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
	  		<a class="waves-effect waves-light btn" @click="crearTarea">Crear</a>
	  	</v-row>
	  </form>
	  <v-modal id="modalTareaCreada">
      <div slot="content">
        <h4>Tarea creada correctamente</h4>
	      <p>¿Desea crear otra tarea?</p>
      </div>
      <div slot="footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" @click="limpiarTareaNueva">Si</a>
	      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" @click="regresar">No</a>
      </div>
    </v-modal>
	  <v-modal id="modalTareaError">
      <div slot="content">
        <h4>Error</h4>
	      <p>No se pudo crear la tarea. Intente recargar la página.</p>
      </div>
      <div slot="footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
      </div>
    </v-modal>
    <v-modal id="modalFechaIncorrecta">
      <div slot="content">
        <h4>Error</h4>
	      <p>No puede escoger como fecha de realización una fecha ya pasada.</p>
      </div>
      <div slot="footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
      </div>
    </v-modal>
	</div>
</template>
<style>
	#row-responsable{
		margin-top: 0;
	}
	#container-tarea-nueva{
		padding: 1%;
		background-color: white;
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
			
		},
		mounted(){
			$('.modal').modal();
		},
		data(){
			return{
				responsable: '',
				tareaNueva: {
					nombre: '',
					descripcion: '',
					fechaPublicacion: '',
					fechaLimite: '',
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
						text: 'Completada'
					},
					{
						id: '3',
						text: 'En proceso'
					}
				]
			}
		},
		methods: {
			regresar(){
				this.limpiarTareaNueva();
				this.$emit('flagchanged', true);	
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
				self.bindFechaPublicacion();
				self.obtenerIdProcarianoResponsable();
				if(self.bindFechaLimite()){
					self.llamadaApi(self.tareaNueva);
				}else{
					$('#modalFechaIncorrecta').modal('open');
				}
				
			},
			llamadaApi(tareaNueva){
				let urlApi = '/api/tarea/nuevo';
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
				@Descripción: Vincula el valor de la fecha límite seleccionada con el valor de fecha de self.tareaNueva
				@Return:
					true si se pudo vincular correctamente
					false si no se pudo vincular porque la fecha fue incorrecta
			*/
			bindFechaLimite(){
				let self = this;
				let year = $('#fechaLimite').pickadate('picker').get('highlight', 'yyyy');
				let month = $('#fechaLimite').pickadate('picker').get('highlight', 'mm');
				let day = $('#fechaLimite').pickadate('picker').get('highlight', 'dd');
				if(self.validarFecha(year)){
					self.tareaNueva.fechaLimite = year + '/' + month + '/' + day;
					return true;
				}else{
					//TODO
					return false;
				}
			},
			/*
				@Descripción: Valida que la fecha de realización no sea antes de la fecha actual
				@Return:
					true si la fecha es correcta
					false si es incorrecta
			*/
			validarFecha(yearSel){
				let actualYear = new Date().getFullYear();
				if(yearSel < actualYear){
					return false;
				}
				return true;
			},
			bindFechaPublicacion(){
				let self = this;
				let fechaActual = new Date();
				let anio = fechaActual.getFullYear();
				let mes = fechaActual.getMonth()+1;
				let dia = fechaActual.getDate();

				let fecha = anio + '/' + ((''+mes).length < 2 ? '0' : '') + mes + '/' + ((''+dia).length < 2 ? '0' : '') + dia;
				self.tareaNueva.fechaPublicacion = fecha;
			}
		}
	}

</script>

