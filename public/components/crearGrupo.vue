<template>
	<div>
		<v-row>
			<form class="col s12">
				<v-row id="row-nombre-genero">
					<div class="input-field col s6">
						<input type="text" name="nombre" id="nombre" v-model="grupo.nombre" required v-validate="'required|regex:^([A-Za-z0-9# .\-]+)$'">
						<span v-show="errors.has('nombre')" class="help is-danger">{{ errors.first('nombre') }}</span>
						<label for="nombre">Nombre del grupo</label>
					</div>
					<div class="input-field col s6">
						<v-select id="genero" name="genero" v-model="grupo.genero" :items="generosGrupo" select-text="Procare/Procare Mujeres" required v-validate="'required'">
						</v-select>
						<span v-show="errors.has('genero')" class="help is-danger">{{ errors.first('genero') }}</span>
					</div>
				</v-row>
				<v-row id="row-etapa-animador">
					<div class="input-field col s6">
						<v-select id="etapa" name="etapa" v-model="grupo.etapa" :items="etapasGrupo" select-text="Etapa" required v-validate="'required'">
						</v-select>
						<span v-show="errors.has('etapa')" class="help is-danger">{{ errors.first('etapa') }}</span>
					</div>
					<div class="input-field col s6">
						<v-select name="animador" id="animador" v-model="grupo.animador" :items="animadores" select-text="Animadores" required v-validate="'required'">
							
						</v-select>
						<span v-show="errors.has('animador')" class="help is-danger">{{ errors.first('animador') }}</span>
					</div>
				</v-row>
				<v-row class="row" id="row-btn">
					<a class="waves-effect waves-light btn" id="btnCancelar" @click="cancelar">Cancelar</a>
					<a class="waves-effect waves-light btn pull right" id="btnContinuar" @click="continuar">Continuar</a>
				</v-row>
			</form>
		</v-row>
		<v-modal id="modalCamposIncompletos">
			<div slot="content">
				<h4 class="center-align">¡Campos incompletos!</h4>
				<p class="center-align">{{mensaje}}</p>
			</div>
			<div slot="footer">
				<v-btn-link class="pull-right" waves-light modal flat>Aceptar</v-btn-link>
			</div>
		</v-modal>
		<v-modal id="modalErrorAjax">
			<div slot="content">
				<h4 class="center-align">¡Error!</h4>
				<p class="center-align">No se pudo conectar con el servidor. Recargue la página.</p>
			</div>
			<div slot="footer">
				<v-btn-link class="pull-right" waves-light modal flat>Aceptar</v-btn-link>
			</div>
		</v-modal>
	</div>
	
</template>

<script>
	/*
		@Descripción: Este componente es utilizado para crear un nuevo grupo. Escribir el nombre, escoger el animador, etc...
		@Autor: edisonmora95
		@FechaCreación: 26-05-2017
	*/
	'use strict';

	import Materials from 'vue-materials';
	//import VeeValidate from 'vee-validate';

	Vue.use(Materials);
	Vue.use(VeeValidate);
	//Añadidas nuevas validaciones y mensajes
	const dictionary = {
		en: {
			messages: {
				required(){
					return 'Este campo es obligatorio.';
				},
				regex(field, val){
					return 'No ingrese caracteres especiales.';
				}
			}
		}
	};
	VeeValidate.Validator.updateDictionary(dictionary);

	module.exports = {
		props: ['flag', 'grupo'],
		mounted(){
			this.obtenerEtapas(this);
			this.obtenerPosiblesAnimadores(this);
		},
		data() {
			return{
				/*grupo: {
					nombre: '',
					animador: '',
				},*/
				mensaje: '',
				animadores: [],
				flagVue: true,
				generosGrupo: [
					{
						id: 'Procare',
						text: 'Procare'
					},
					{
						id: 'Procare Mujeres',
						text: 'Procare Mujeres'
					}
				],
				etapasGrupo: []
			}
		},
		methods: {
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
						console.log(res)
						let busquedaExitosa = (res.status && res.mensaje === 'Se obtuvieron las etapas correctamente');
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
					self.etapasGrupo.push(etapaObj);
				});
			},
			//Eventos de botones
			cancelar(){
				//Regresar al menú principal
				window.location.href = '/home';
			},
			/*
				@Descripción:
					Lleva al siguiente componente para escoger a los integrantes luego de crear el grupo en la base de datos
			*/
			continuar(){
				if(this.formCompleto()){
					this.crearRegistroGrupo();
				}else{
					$('#modalCamposIncompletos').modal('open');
				}
			},
			formCompleto(){
				var self = this;
				if( $('#nombre').val() === '' ){
					self.mensaje = 'Debe ingresar el nombre del grupo';
					return false;
				}
				else if( $('#genero option:selected').val() === '' ){
					self.mensaje = 'Debe ingresar si el grupo es de Procare o Procare Mujeres';
					return false;	
				}
				else if( $('#etapa option:selected').val() === '' ){
					self.mensaje = 'Debe seleccionar la etapa a la que pertenece el grupo';
					return false;	
				}
				else if( $('#animador option:selected').val() === '' ){
					self.mensaje = 'Debe ingresar el nombre del animador del grupo';
					return false;	
				}
				else{
					return true;	
				}
			},
			crearRegistroGrupo(){
				let self = this;
				console.log('Se va a crear el siguiente registro de grupo: ');
				console.log(self.grupo);
				$.ajax({
					type: 'POST',
					url: '/api/grupos/',
					data: self.grupo,
					success(res){
						if(res.status && res.mensaje === 'Grupo creado exitosamente'){
							self.grupo.id = res.grupo.id;
							self.flagVue = false;
							self.$emit('flagchanged', self.flagVue);		
						}
					},
					error(jqXHR, textStatus, error){
						$('#modalErrorAjax').modal('open');
					}
				});
			}
		}
	}
</script>

<style>
	.row{
		padding: 0 2%;
	}

</style>