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
		data() {
			return{
				/*grupo: {
					nombre: '',
					animador: '',
				},*/
				mensaje: '',
				animadores: [
				{
				  "id": 1,
				  "text": "Carmen Huxham"
				}, {
				  "id": 2,
				  "text": "Cris Hamblington"
				}, {
				  "id": 3,
				  "text": "Nelia Foli"
				}, {
				  "id": 4,
				  "text": "Noam Deverose"
				}, {
				  "id": 5,
				  "text": "Kaia Bordone"
				}, {
				  "id": 6,
				  "text": "Zonda Furmage"
				}, {
				  "id": 7,
				  "text": "Lenci Casarino"
				}, {
				  "id": 8,
				  "text": "Cary De Metz"
				}, {
				  "id": 9,
				  "text": "Mortie Connar"
				}, {
				  "id": 10,
				  "text": "Stephana McQuarter"
				}],
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
				etapasGrupo: [
					{
						id: 'Iniciación',
						text: 'Iniciación'
					},
					{
						id: 'Primera etapa',
						text: 'Primera etapa'
					},
					{
						id: 'Segunda etapa',
						text: 'Segunda etapa'
					},
					{
						id: 'Tercera etapa',
						text: 'Tercera etapa'
					},
					{
						id: 'Cuarta etapa',
						text: 'Cuarta etapa'
					},
					{
						id: 'Quinta etapa',
						text: 'Quinta etapa'
					}
				]
			}
		},
		methods: {
			//Eventos de botones
			cancelar(){
				//Regresar al menú principal
			},
			continuar(){
				//Lleva al siguiente componente, para escoger a los chicos
				if(this.formCompleto()){
					this.flagVue = false;
					this.$emit('flagchanged', this.flagVue);	
				}else{
					$('#modalCamposIncompletos').modal('open');
				}
			},
			formCompleto(){
				var self = this;
				//Revisión del input nombre
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
			}
		}
	}
</script>

<style>
	.row{
		padding: 0 2%;
	}

</style>