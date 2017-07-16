<template>
	<div>
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

					<v-date-input id="fechaNacimiento" name="fechaNacimiento" v-model="procariano.fechaNacimiento" v-validate="'required'"></v-date-input>

					<!--<input type="date" class="" name="fechaNacimiento" id="fechaNacimiento" v-validate="'required'">-->


					<!--<v-date-input id="fechaNacimiento" name="fechaNacimiento" v-model="fechaAux" v-validate="'required'"></v-date-input>-->
					<input type="date" class="datepicker" name="fechaNacimiento" id="fechaNacimiento" v-validate="'required'">

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
					<input type="tel" name="celular" id="celular" v-model="procariano.celular" v-validate="'required|numeric'">
					<span v-show="errors.has('celular')" class="help is-danger">{{ errors.first('celular') }}</span>
					<label for="celular" class="active">Celular</label>
				</div>
				<div class="col s6 input-field">
					<input type="tel" name="convencional" id="convencional" v-model="procariano.convencional" v-validate="'required|numeric'">
					<span v-show="errors.has('convencional')" class="help is-danger">{{ errors.first('convencional') }}</span>
					<label for="convencional" class="active">Convencional</label>
				</div>	
			</v-row>

			<v-row>

			<!--<v-row>

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
					<v-select name="grupo" id="grupo" v-model="procariano.grupo"></v-select>
					<label class="active">Grupo</label>
				</div>

			</v-row>

			</v-row>-->

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
		<div id="modalError" class="modal">
	    <div class="modal-content">
	      <h4 class="center-align">Formulario con errores.</h4>
	      <p class="center-align">Existe un error del campo: "{{errorObj.campo}}"</p>
	      <p class="center-align">Con el siguiente mensaje de error: </p>
	      <p class="center-align">"{{errorObj.msj}}"</p>
	    </div>
	    <div class="modal-footer">
	      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
	    </div>
	  </div>
	</div>
	
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
				flag: true,
				procarianoId: 1,
				errorObj: {
					campo: '',
					msj: ''
				}
			}
		},
		mounted(){

			$('.modal').modal();


			/*//Vincular la fecha
			let input = $('#fechaNacimiento').pickadate();
			let picker = input.pickadate('picker');
			picker.set('select', new Date(this.procariano.fechaNacimiento));*/
			/*
			console.log(this.procariano);
			let fecha = new Date(this.procariano.fechaNacimiento);
			console.log(fecha);
			$('#fechaNacimiento').val(fecha);*/
			$('#fechaNacimiento').change(function(){
				console.log('Holaaaa');
				console.log($('#fechaNacimiento').val());
			})


			let self = this;
			self.inicializarMaterialize();

		},
		methods: {
			inicializarMaterialize(){
				let self = this;
				$('.modal').modal();
				$('.datepicker').pickadate({
					selectMonths: true, // Creates a dropdown to control month
					selectYears: 100 // Creates a dropdown of 15 years to control year
				});
				let datePickerFechaNacimiento = $('#fechaNacimiento').pickadate();
				let picker = datePickerFechaNacimiento.pickadate('picker');
				picker.set('select', self.procariano.fechaNacimiento, { format: 'yyyy-mm-dd'});
				$('#fechaNacimiento').change(function(){
					self.bindFechaNacimiento();
				});
			},
			cancelarEdicion(){
				location.reload();
			},
			aceptarEdicion(){
				var self = this;
				if(self.validarFechaNacimiento()){
		      this.$validator.validateAll().then(() => {
		        self.editarProcariano();
		      }).catch(() => {
	          self.abrirModalError(self.errors.errors[0].field, self.errors.errors[0].msg);
		      });
				}
			},
			editarProcariano(){
				let self = this;
				self.flag = false;
      	self.procariano.id = self.procarianoId;
      	var urlApi = '/api/procarianos/' + self.procarianoId;
      	$.ajax({
      		type: 'PUT',
      		data: self.procariano,
      		url: urlApi,
      		success: function(res){
      			location.reload();
      		} 
      	});
			},
			bindFechaNacimiento(){
				let self = this;
				let year = $('#fechaNacimiento').pickadate('picker').get('highlight', 'yyyy');
				let month = $('#fechaNacimiento').pickadate('picker').get('highlight', 'mm');
				let day = $('#fechaNacimiento').pickadate('picker').get('highlight', 'dd');
				if(self.validarFechaNacimiento()){
					let fechaSeleccionada = year + '/' + month + '/' + day;
					self.procariano.fechaNacimiento = fechaSeleccionada;				
				}
			},
			validarFechaNacimiento(){
	    	let self = this;
	    	let yearSelected = $('#fechaNacimiento').pickadate('picker').get('highlight', 'yyyy');
				let actualYear = new Date().getFullYear();
				let diferencia = actualYear - yearSelected;
				if(diferencia < 11){
					self.abrirModalError('Fecha de nacimiento', 'No puede ingresar a alguien con menos de 11 años.');
					return false;
				}
				return true;
	    },
	    abrirModalError(campo, mensaje){
	    	self.errorObj.campo = campo;
        self.errorObj.msj = mensaje;
        $('#modalError').modal('open');
	    }
		}
	}
</script>