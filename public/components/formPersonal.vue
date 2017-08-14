<template>
	<div>
		<form>
			<v-row id="rowNombresApellidos">
				<div class="col s6 input-field">
					<input type="text" name="nombres" id="nombres" v-model="personal.nombres" v-validate="'required|alpha_spaces'">
					<span v-show="errors.has('nombres')" class="help is-danger">{{ errors.first('nombres') }}</span>
					<label for="nombres" class="active">Nombres</label>
				</div>
				<div class="col s6 input-field">
					<input type="text" name="apellidos" id="apellidos" v-model="personal.apellidos" v-validate="'required|alpha_spaces'">
					<span v-show="errors.has('apellidos')" class="help is-danger">{{ errors.first('apellidos') }}</span>
					<label for="apellidos" class="active">Apellidos</label>
				</div>
			</v-row>
			<v-row id="rowCedulaFechaNacimiento">
				<div class="col s6 input-field">
					<input type="text" name="cedula" id="cedula" v-model="personal.cedula" v-validate="'required|digits:10'">
					 <span v-show="errors.has('cedula')" class="help is-danger">{{ errors.first('cedula') }}</span>
					<label for="cedula" class="active">Cédula</label>
				</div>
				<div class="col s6 input-field">
					<!--<v-date-input id="fechaNacimiento" name="fechaNacimiento" v-model="fechaAux" v-validate="'required'"></v-date-input>-->
					<input type="date" class="datepicker" name="fechaNacimiento" id="fechaNacimiento" v-validate="'required'">
					<span v-show="errors.has('fecha-nacimiento')" class="help is-danger">{{ errors.first('fecha-nacimiento') }}</span>
					<label for="fechaNacimiento" class="active">Fecha de nacimiento</label>
				</div>
			</v-row>
			<v-row id="rowDirEmail">
				<div class="col s6 input-field">
					<input type="text" name="direccion" id="direccion" v-model="personal.direccion" v-validate="'regex:^([A-Za-z0-9# .\-]+)$'">
					<span v-show="errors.has('direccion')" class="help is-danger">{{ errors.first('direccion') }}</span>
					<label for="direccion" class="active">Dirección</label>
				</div>
				<div class="col s6 input-field">
					<input type="email" name="email" id="email" v-model="personal.email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }">
					<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
					<label for="email" class="active">Email</label>
				</div>
			</v-row>
			<v-row id="rowTelefonos">
				<div class="col s6 input-field">
					<input type="tel" name="celular" id="celular" v-model="personal.celular" v-validate="'numeric'">
					<span v-show="errors.has('celular')" class="help is-danger">{{ errors.first('celular') }}</span>
					<label for="celular" class="active">Celular</label>
				</div>
				<div class="col s6 input-field">
					<input type="tel" name="convencional" id="convencional" v-model="personal.convencional" v-validate="'numeric'">
					<span v-show="errors.has('convencional')" class="help is-danger">{{ errors.first('convencional') }}</span>
					<label for="convencional" class="active">Convencional</label>
				</div>	
			</v-row>
			<v-row id="rowSueldo">
				<div class="col s12 input-field">
					<input type="text" name="sueldo" id="sueldo" v-model="personal.sueldo" v-validate="'required|decimal:2'">
					<span v-show="errors.has('sueldo')" class="help is-danger">{{ errors.first('sueldo') }}</span>
					<label for="sueldo" class="active">Sueldo</label>
				</div>
			</v-row>
			<v-row id="rowBotones">
				<a class="waves-effect waves-light btn" @click="cancelarEdicion">Cancelar</a>
				<a class="waves-effect waves-light btn pull right" @click="aceptarEdicion">Aceptar</a>
			</v-row>
		</form>
		<!--Modal de mensaje de error-->
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
	  <!--Modal de cambio de grupo-->
	</div>
	
</template>

<script>
	/*
		@Autor: @edisonmora95
		@FechaCreación: *-06-2017
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
				},
				decimal: function(){
					return 'El sueldo puede tener como mucho dos decimales y debe ser numérico'
				}
			}
		}
	};
	VeeValidate.Validator.updateDictionary(dictionary);

	module.exports = {
		props: ['personal', 'habilitaredicion'],
		data(){
			return{
				flag: true,
				errorObj: {
					campo: '',
					msj: ''
				}
			}
		},
		created(){
		},
		mounted(){
			let self = this;
			self.inicializarMaterialize(self);
		},
		methods: {
			inicializarMaterialize(self){
				$('.modal').modal();
				$('.datepicker').pickadate({
					selectMonths: true, // Creates a dropdown to control month
					selectYears: 100 // Creates a dropdown of 15 years to control year
				});
				let datePickerFechaNacimiento = $('#fechaNacimiento').pickadate();
				let picker = datePickerFechaNacimiento.pickadate('picker');
				picker.set('select', self.personal.fechaNacimiento, { format: 'yyyy-mm-dd'});
				//2 way data binding
				$('#fechaNacimiento').change(function(){
					self.bindFechaNacimiento();
				});
			},
			//EVENTOS BOTONES
			cancelarEdicion(){
				location.reload();
			},
			aceptarEdicion(){
				var self = this;
				if(self.validarFechaNacimiento()){
		      this.$validator.validateAll().then(() => {
		        self.editarPersonal();
		      }).catch(() => {
	          self.abrirModalError(self.errors.errors[0].field, self.errors.errors[0].msg);
		      });
				}
			},
			editarPersonal(){
				let self = this;
				var path = window.location.pathname;
				let id = path.split('/')[3];
				self.flag = false;
      	var urlApi = '/api/personal/' + id;
      	$.ajax({
      		type: 'PUT',
      		data: self.personal,
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
					self.personal.fechaNacimiento = fechaSeleccionada;				
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

<style>
	.tooltip-error{
		background-color: red;
	}
	a{
		color: black;
	}
</style>