<template>
	<form>
		<v-row>
			<div class="col s6 input-field">
				<input type="text" name="nombres" id="nombres" v-model="procariano.nombres" v-validate="'required|alpha_spaces'">
				<span v-show="errors.has('nombres')" class="help is-danger">{{ errors.first('nombres') }}</span>
				<label for="nombres" class="active">Nombres</label>
			</div>
			<div class="col s6 input-field">
				<input type="text" name="apellidos" id="apellidos" v-model="procariano.apellidos" v-validate="'required|alpha_spaces'">
				<span v-show="errors.has('apellidos')" class="help is-danger">{{ errors.first('apellidos') }}</span>
				<label for="apellidos" class="active">Apellidos</label>
			</div>
		</v-row>
		<v-row>
			<div class="col s6 input-field">
				<input type="text" name="cedula" id="cedula" v-model="procariano.cedula" v-validate="'required|digits:10'">
				 <span v-show="errors.has('cedula')" class="help is-danger">{{ errors.first('cedula') }}</span>
				<label for="cedula" class="active">Cédula</label>
			</div>
			<div class="col s6 input-field">
				<v-date-input id="fechaNacimiento" name="fechaNacimiento" v-model="procariano.fechaNacimiento" v-validate="'required'">
					
				</v-date-input>
				<span v-show="errors.has('fecha-nacimiento')" class="help is-danger">{{ errors.first('fecha-nacimiento') }}</span>
				<label for="fechaNacimiento" class="active">Fecha de nacimiento</label>
			</div>
		</v-row>
		<v-row>
			<div class="col s6 input-field">
				<input type="text" name="direccion" id="direccion" v-model="procariano.direccion" v-validate="'regex:^([A-Za-z0-9# .\-]+)$'">
				<span v-show="errors.has('direccion')" class="help is-danger">{{ errors.first('direccion') }}</span>
				<label for="direccion" class="active">Dirección</label>
			</div>
			<div class="col s6 input-field">
				<input type="email" name="email" id="email" v-model="procariano.email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }">
				<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
				<label for="email" class="active">Email</label>
			</div>
		</v-row>
		<v-row>
			<div class="col s6 input-field">
				<input type="tel" name="celular" id="celular" v-model="procariano.celular" v-validate="'numeric'">
				<span v-show="errors.has('celular')" class="help is-danger">{{ errors.first('celular') }}</span>
				<label for="celular" class="active">Celular</label>
			</div>
			<div class="col s6 input-field">
				<input type="tel" name="convencional" id="convencional" v-model="procariano.convencional" v-validate="'numeric'">
				<span v-show="errors.has('convencional')" class="help is-danger">{{ errors.first('convencional') }}</span>
				<label for="convencional" class="active">Convencional</label>
			</div>	
		</v-row>
		<v-row>
			<div class="col s6 input-field">
				<v-select name="tipo" id="tipo" v-model="procariano.tipo">
					<option value="Chico de Formación">Chico de Formación</option>
					<option value="Caminante">Caminante</option>
					<option value="Pescador">Pescador</option>
					<option value="Pescador consagrado">Pescador consagrado</option>
					<option value="Sacerdote">Sacerdote</option>
				</v-select>
				<label class="active">Tipo</label>
			</div>
			<div class="col s6 input-field">
				<v-select name="grupo" id="grupo" v-model="procariano.grupo">
					
				</v-select>
				<label class="active">Grupo</label>
			</div>
		</v-row>
		<v-row>
			<div class="col s6 input-field">
				<input type="text" name="colegio" id="colegio" v-model="procariano.colegio" v-validate="'regex:^([A-Za-z0-9# .\-]+)$'">
				<span v-show="errors.has('colegio')" class="help is-danger">{{ errors.first('colegio') }}</span>
				<label for="colegio" class="active">Colegio</label>
			</div>
			<div class="col s6 input-field">
				<input type="text" name="universidad" id="universidad" v-model="procariano.universidad" v-validate="'regex:^([A-Za-z0-9# .\-]+)$'">
				<span v-show="errors.has('universidad')" class="help is-danger">{{ errors.first('universidad') }}</span>
				<label for="universidad" class="active">Universidad</label>
			</div>
		</v-row>
		<v-row>
			<div class="col s12 input-field">
				<input type="text" name="trabajo" id="trabajo" v-model="procariano.trabajo" v-validate="'regex:^([A-Za-z0-9# .\-]+)$'">
				<span v-show="errors.has('trabajo')" class="help is-danger">{{ errors.first('trabajo') }}</span>
				<label for="trabajo" class="active">Trabajo</label>
			</div>
		</v-row>
		<v-row>
			<a class="waves-effect waves-light btn" @click="cancelarEdicion">Cancelar</a>
			<a class="waves-effect waves-light btn pull right" @click="aceptarEdicion">Aceptar</a>
		</v-row>
	</form>
</template>

<script>
	/*
		@Autor: @edisonmora95
		@FechaCreación: /-06-2017
	*/
	'use strict';

	import Materials from 'vue-materials';
	//import VeeValidate from 'vee-validate';
	Vue.use(Materials);
	Vue.use(VeeValidate);
	//Validaciones. Cambio de mensajes de error
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
				}
			}
		}
	};
	VeeValidate.Validator.updateDictionary(dictionary);

	module.exports = {
		props: ['procariano', 'habilitaredicion'],
		data(){
			return{
				flag: true
			}
		},
		methods: {
			cancelarEdicion(){

			},
			aceptarEdicion(){
				var self = this;
	      this.$validator.validateAll().then(() => {
	        // eslint-disable-next-line
	        self.flag = false;
	       console.log('dfsfasdfasf');
	      	location.reload(); 
	      }).catch(() => {
          // eslint-disable-next-line
          alert('Correct them errors!');
	      });

	      
			}
		}
	}
</script>