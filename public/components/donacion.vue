<template>
<div>
	<form>
		<v-row id="DatosDonacion">
		<div class="col s6 input-field">
			<input type="text" name="nombres" id="nombres" v-model="procariano.nombres" v-validate="'required|alpha_spaces'">
			<span v-show="errors.has('nombres')" class="help is-danger">{{ errors.first('nombres') }}</span>
			<label for="nombres" class="active">Nombres</label>
		</div>
		<div class="col s6 input-field">
			<!--<v-date-input id="fechaNacimiento" name="fechaNacimiento" v-model="fechaAux" v-validate="'required'"></v-date-input>-->
			<input type="date" class="datepicker" name="fechaDonacion" id="fechaDonacion" v-validate="'required'">
			<span v-show="errors.has('fecha-nacimiento')" class="help is-danger">{{ errors.first('fecha-nacimiento') }}</span>
			<label for="fechaDonacion" class="active">Fecha de Donacion</label>
		</div>
		</v-row>
		<v-row id="Observacion">
		<div class="col s 12 input-field"></div>
		<textarea class="materialize-textarea" name="Observacion" id="Observacion">
		<label for="Observacion">Observacion</label>
		</textarea>
		</v-row>
		<v-row id="rowBotones">
		<a class="waves-effect waves-light btn" @click="cancelarDonacion">Cancelar</a>
		<a class="waves-effect waves-light btn pull right" @click="aceptarDonacion">Aceptar</a>
		</v-row>
	</form>
	<div class="container-button">
		<div class="row">
			<a class="waves-effect waves-light btn" @click="cancelarDonacion">Nuevo</a>
			<a class="waves-effect waves-light btn" @click="cancelarDonacion">Modificar</a>
			<a class="waves-effect waves-light btn" @click="cancelarDonacion">Eliminar</a>
			<a class="waves-effect waves-light btn" @click="cancelarDonacion">salir</a>
		</div>
		
	</div>
</div>
</template>
<script>
	
	/*
		@Descripción: Este componente es utilizado para editar la información de grupo.
		@Autor: edisonmora95
		@FechaCreación: 4-06-2017
	*/
	import Materials from 'vue-materials';
	Vue.use(Materials);
	module.exports = {
		props: ['grupo', 'integrantes'],
		created(){
			this.obtenerEtapas(this);
			this.obtenerPosiblesAnimadores(this);
			this.obtenerChicosFormacion(this);
		},
		mounted(){
			$('select').material_select();
			$('.modal').modal();
			this.inicializarDOM(this);
		},
		data() {
			return{
				mensaje: '',
				animadores: [],
				finEdicion: false,
				sinGrupo: [],
				etapas: [],
				tempEtapaAntigua: '',
				tempAnimadorAntiguo: ''
			}
		},
		methods: {
			inicializarDOM(self){
				self.tempEtapaAntigua = self.grupo.etapaId;
				self.tempAnimadorAntiguo = self.grupo.animadorId;
			},
			obtenerChicosFormacion(self){
				$.ajax({
					type: 'GET',
					url: '/api/procarianos/formacion',
					success(res){
						self.armarArraySinGrupo(self, res.datos);
					}
				});
			},
			armarArraySinGrupo(self, procarianos){
				$.each(procarianos, function(index, procariano){
					let obj = {
						id: procariano.procarianoId,
						nombre: procariano.Persona.nombres + ' ' + procariano.Persona.apellidos
					};
					self.sinGrupo.push(obj);
				});
				console.log(self.sinGrupo)
			},
			/*
				@Descripción:
					Obtiene a todos los procarianos que pueden ser animadores de la base de datos.
					A partir de eso, se arma el array para mostrar a los animadores en el select
			*/
			obtenerPosiblesAnimadores(self){
				$.ajax({
					type: 'GET',
					url: '/api/animadores/',
					success(res){
						if(res.status){
														self.armarArrayAnimadores(self, res.datos)
						}
					}
				});
			},
			armarArrayAnimadores(self, animadores){
				self.animadores = [];
				$.each(animadores, function(index, animador){
					let animadorObj = {
						id: animador.procarianoId,
						text:animador.Persona.nombres + ' ' +animador.Persona.apellidos
					};
					self.animadores.push(animadorObj);
				});
			},
			/*
				@Descripción: Obtiene todas las etapas de la base de datos y las añade al aray para mostrarlas en el <select>
				*/
				obtenerEtapas(self){
					$.ajax({
						type: 'GET',
						url: '/api/etapa/',
						success(res){
							let busquedaExitosa = (res.estado && res.mensaje === 'Se obtuvieron las etapas correctamente');
							if(busquedaExitosa){
								self.armarArrayEtapas(self, res.datos);
							}else{
								alert('Error al buscar etapas en la base de datos');
							}
						}
					});
				},
				armarArrayEtapas(self, etapas){
					$.each(etapas, function(index, etapa){
						let etapaObj = {
							id: etapa.id,
							text: etapa.nombre
						};
						self.etapas.push(etapaObj);
					});
				},
				//Eventos de botones
				anadir(chico){
					//Añade al chico seleccionado al grupo
					this.integrantes.push(chico);
					this.sinGrupo.splice(this.sinGrupo.indexOf(chico), 1);
				},
				quitar(chico){
					//Quita al chico seleccionado del grupo
					this.sinGrupo.push(chico);
					this.integrantes.splice(this.integrantes.indexOf(chico), 1);
				},
				cancelar(){
					this.$emit('edicionterminada', this.finEdicion);
				},
				formCompleto(){
					var self = this;
					if( $('#nombre').val() === '' ){
						self.mensaje = 'El campo nombre no puede quedar vacío';
						return false;
					}
					else if( $('#genero').val() === '' ){
						self.mensaje = 'El campo género no puede quedar vacío';
						return false;
					}
					else if( $('#etapa').val() === '' ){
						self.mensaje = 'El campo etapa no puede quedar vacío';
						return false;
					}
					else if( $('#animador').val() === '' ){
						self.mensaje = 'El campo animador no puede quedar vacío';
						return false;
					}
					else{
						return true;
					}
				},
				aceptar(){
					let self = this;
					if(!this.formCompleto()){
						console.log('Incompleto')
						$('#modalCamposIncompletos').modal('open');
					}
					else{
						let grupoObj = {
							nombre: self.grupo.nombre,
							tipo: self.grupo.tipo,
							genero: self.grupo.genero,
							cantidadChicos: self.grupo.cantidadChicos,
							numeroReuniones: self.grupo.numeroReuniones,
							etapaAntigua: self.tempEtapaAntigua,
							etapaNueva: self.grupo.etapaId,
							animadorAntiguo: self.tempAnimadorAntiguo,
							animadorNuevo: self.grupo.animadorId
						};
						let urlApi = '/api/grupos/' + self.grupo.id;
						console.log(urlApi)
						console.log(grupoObj)
						$.ajax({
							type: 'PUT',
							url: urlApi,
							data: grupoObj,
							success(res){
								console.log(res);
								if(res.estado){
									Materialize.toast(res.mensaje, 4000);
											this.$emit('edicionterminada', this.finEdicion);
								}else{
									Materialize.toast(res.mensaje, 4000);
								}
							},
							error(err){
								console.log(err);
							}
						});
						
					}
					
				}
			}
		}
	</script>