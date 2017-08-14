<template>
	
	<div>
		<section class="row" id="row-info-general">
			<header>
				<h4 class="center-align">Editar grupo</h4>
				<h5 class="center-align">Información general</h5>	
			</header>
			<main>
				<form class="col s12">
					<div class="row" id="row-nombre-genero">
						<div class="input-field col s6">
							<input type="text" name="nombre" id="nombre" v-model="grupo.nombre">
							<label for="nombre" class="active">Nombre del grupo</label>
						</div>
						<div class="input-field col s6">
							<v-select   name="genero" id="genero" v-model="grupo.genero" select-text="Procare/Procare Mujeres">
								<option value="Procare">Procare</option>
								<option value="Procare Mujeres">Procare Mujeres</option>
		          </v-select>
						</div>
					</div>
					<div class="row" id="row-etapa-animador">
						<div class="input-field col s6">
							<v-select id="etapa" name="etapa"	select-text="Etapa" :items="etapas" v-model="etapa.id">
							</v-select>
						</div>
						<div class="input-field col s6">
							<v-select name="animador" id="animador" v-model="grupo.animadorId" select-text="Animador" :items="animadores"></v-select>
							<label for="animador" class="active">Animador</label>
						</div>
					</div>
				</form>	
			</main>
		</section>
		<section class="row" id="row-escoger-chicos">
			<header>
				<h5 class="center-align">Selección de integrantes</h5>
			</header>
			<main>
				<div class="col s5 col-chicos" id="col-sin-grupo">
					<h6 class="center-align">Chicos sin grupo</h6>
					<ul id="chicosSinGrupo">
						<li v-for="chico in sinGrupo" :id="chico.id" @click="anadir(chico)">{{chico.nombre}}</li>
					</ul>
				</div>
				<div class="col s5  col-chicos pull right" id="col-con-grupo">
					<h6 class="center-align">Chicos en grupo</h6>
					<ul id="integrantes">
						<li v-for="chico in integrantes" :id="chico.idProcariano" @click="quitar(chico)">{{chico.nombre}} {{chico.apellido}}</li>
					</ul>
				</div>
			</main>
			<footer class="col s12" id="col-btn">
				<a class="waves-effect waves-light btn" id="btnCancelar" @click="cancelar">Cancelar</a>
				<a class="waves-effect waves-light btn pull right" id="btnContinuar" @click="aceptar">Aceptar</a>
			</footer>
		</section>
		 <!-- Modal Structure -->
	  <div id="modalCamposIncompletos" class="modal">
	    <div class="modal-content">
	      <h4 class="center-align">¡Campos incompletos!</h4>
      	<p class="center-align">{{mensaje}}</p>
	    </div>
	    <div class="modal-footer">
	      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
	    </div>
	  </div>
	</div>
	
</template>

<style>
	
</style>

<script>
	/*
		@Descripción: Este componente es utilizado para editar la información de grupo. 
		@Autor: edisonmora95
		@FechaCreación: 4-06-2017
	*/
	import Materials from 'vue-materials';
	Vue.use(Materials);

	module.exports = {
		props: ['grupo', 'integrantes', 'etapa'],
		created(){
			this.obtenerEtapas(this);
			this.obtenerPosiblesAnimadores(this);
			this.obtenerChicosFormacion(this);
		},
		mounted(){
			$('select').material_select();
			$('.modal').modal();
			this.inicializarDOM(this);
			console.log(this.grupo)
		},
		data() {
			return{
				mensaje: '',
				animadores: [],
				finEdicion: false,
				sinGrupo: [],
				etapas: [],
				tempEtapaAntigua: '',
				tempAnimadorAntiguo: '',
				tempIngetrantesNuevos: []
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
							Materialize.toast('Error al buscar etapas en la base de datos', 4000, 'rounded error');
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
				$('#etapa').change( () => {
					self.cambiarEtapa(self);
				})
			},
			cambiarEtapa(self){
				self.etapa.id = $('#etapa option:selected').val();
				self.etapa.text = $('#etapa option:selected').text();
			},
			//Eventos de botones
			anadir(chico){
				this.integrantes.push(chico);
				this.sinGrupo.splice(this.sinGrupo.indexOf(chico), 1);
				this.anadirChicoAGrupo(this, chico);
			},
			quitar(chico){
				this.sinGrupo.push(chico);
				this.integrantes.splice(this.integrantes.indexOf(chico), 1);
				this.quitarChicoDeGrupo(this, chico);
			},
			cancelar(){
				this.$emit('edicionterminada', this.finEdicion);
			},
			formCompleto(self){
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
				if(!self.formCompleto(self)){
					$('#modalCamposIncompletos').modal('open');
				}else{
					self.enviarEdicion(self);
				}
			},
			enviarEdicion(self){
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
				$.ajax({
					type: 'PUT',
					url: urlApi,
					data: grupoObj,
					success(res){
						if(res.estado){
							Materialize.toast(res.mensaje, 4000);
							self.$emit('edicionterminada', self.finEdicion);		
						}else{
							Materialize.toast(res.mensaje, 4000);
						}
					},
					error(err){
						console.log(err);
					}
				});
			},
			anadirChicoAGrupo(self, chico){
				$.ajax({
					type: 'POST',
					url: '/api/pg/anadir',
					data: {
						idGrupo: self.grupo.id,
						idProcariano: chico.id
					},
					success(res){
						if(!res.estado){
							Materialize.toast(res.mensaje, 4000, 'rounded error');
							self.sinGrupo.push(chico);
							self.integrantes.splice(self.integrantes.indexOf(chico), 1);
						}
					},
					error(err){
						Materialize.toast('No se pudo conectar con el servidor', 4000, 'rounded error');
						self.sinGrupo.push(chico);
						self.integrantes.splice(self.integrantes.indexOf(chico), 1);
					}
				});
			},
			quitarChicoDeGrupo(self, chico){
				const urlApi = '/api/pg/quitar/' + chico.idProcariano;
				console.log(urlApi)
				$.ajax({
					type: 'PUT',
					url: urlApi,
					data: {
						idGrupo: self.grupo.id
					},
					success(res){
						if(!res.estado){
							Materialize.toast(res.mensaje, 4000, 'rounded error');
							self.integrantes.push(chico);
							self.sinGrupo.splice(self.sinGrupo.indexOf(chico), 1);
						}
					}, 
					error(err){
						Materialize.toast('No se pudo conectar con el servidor', 4000, 'rounded error');
						self.integrantes.push(chico);
						self.sinGrupo.splice(self.sinGrupo.indexOf(chico), 1);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.error{
		color: red;
	}
</style>