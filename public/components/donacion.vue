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
				}
			}
		}
	};
	VeeValidate.Validator.updateDictionary(dictionary);
	module.exports = {
		props: ['procariano', 'habilitaredicion', 'grupoprocariano', 'tipoprocariano'],
		data(){
			return{
				flag: true,
				errorObj: {
					campo: '',
					msj: ''
				},
				grupos: [],
				tempGrupoPrevio: {
					id: '',
					text: ''
				},
				tempTipoPrevio: {
					id: '',
					text: ''
				},
				tipos: [],
				gruposObtenidos: [],
				gruposFormacion: [],
				gruposCaminantes: [],
				gruposPescadores: [],
				gruposMayores: []
			}
		},
		created(){
			this.obtenerTodosLosGrupos(this);
			this.obtenerTiposProcariano(this);
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
				picker.set('select', self.procariano.fechaNacimiento, { format: 'yyyy-mm-dd'});
				//2 way data binding
				$('#fechaNacimiento').change(function(){
					self.bindFechaNacimiento();
				});

				//Asignación de temporales de grupo previo
				const tempGrupoProcarianoId = self.grupoprocariano.id;
				const tempGrupoProcarianoText = self.grupoprocariano.text;
				self.tempGrupoPrevio.id = tempGrupoProcarianoId;
				self.tempGrupoPrevio.text = tempGrupoProcarianoText;
				//Asignación de temporales de tipo previo
				const tempTipoProcarianoId = self.tipoprocariano.id;
				const tempTipoPrevioText = self.tipoprocariano.text;
				self.tempTipoPrevio.id = tempTipoProcarianoId;
				self.tempTipoPrevio.text = tempTipoPrevioText;

				//Habilidar cambio de grupo
				$('#grupoSelect').change(function(){
					self.abrirModalCambioGrupo(self);
				});
				//Habilitar cambio de tipo
				$('#tipoSelect').change(function(){
		    	let optionSelectedVal = $('#tipoSelect option:selected').val();
		    	let optionSelectedText = $('#tipoSelect option:selected').text();
		    	self.tipoprocariano.id = optionSelectedVal;
		    	self.tipoprocariano.text = optionSelectedText;
		    	self.procariano.tipoId = optionSelectedVal;
		    	self.armarArraysGrupos(self.gruposObtenidos, self);
				})
			},
			obtenerTodosLosGrupos(self){
				self.grupos = [];
				$.get('/api/grupos/', function(res){
					let conexionExitosa = (res.estado && res.mensaje === 'Se obtuvieron los grupos');
					if(conexionExitosa){
						self.gruposObtenidos = res.datos;
						self.armarArraysGrupos(self.gruposObtenidos, self);
					}
				});
			},
			/*
				@Descripción: Arma los arrays de grupos obtenidos de la base de datos
				@Params:
					grupos -> grupos obtenidos de la base de datos al hacer la llamada a la api.
	    */
	    armarArraysGrupos(grupos, self){
	    	//No borrar esto. Sirve cuando se eejcuta este método dentro del filtro de grupos
	    	self.gruposFormacion = [];
	    	self.gruposCaminantes = [];
	    	self.gruposPescadores = [];
	    	self.gruposMayores = [];

	    	$.each(grupos, function(index, grupo){
	    		let grupoObj = {
	  				id: grupo.id,
	  				text: grupo.nombre,
	  				genero: grupo.genero
	  			};
	    		if(grupo.tipo === 'Formación'){
	    			self.gruposFormacion.push(grupoObj);
	    		}else if(grupo.tipo === 'Caminantes'){
	    			self.gruposCaminantes.push(grupoObj);
	    		}else if(grupo.tipo === 'Pescadores'){
	    			self.gruposPescadores.push(grupoObj);
	    		}else if(grupo.tipo === 'Mayores'){
	    			self.gruposMayores.push(grupoObj);
	    		}
	    	});
	    	self.formarArrayGruposAMostrar(self);
	    },
	    /*
				@Descripción:
					Selecciona los grupos que se van a presentar en el select dependiendo del tipo de procariano que está seleccionado.
	    */
	    formarArrayGruposAMostrar(self){
	    	let tipoProcariano = self.tipoprocariano.text;
	    	if(tipoProcariano === 'Chico Formación'){
	    		self.grupos = self.gruposFormacion;
	    	}else if(tipoProcariano === 'Caminante'){
	    		self.grupos = self.gruposCaminantes;
	    	}else if(tipoProcariano === 'Pescador'){
	    		self.grupos = self.gruposPescadores;
	    	}else if(tipoProcariano === 'Mayor'){
	    		self.grupos = self.gruposMayores;
	    	}
	    },
			/*
				@Descripción:
					Filtra los grupos por el género y el tipo del procariano
			*/
			filtrarGrupos(self, array, genero, tipo){
				$.each(array, function(index, grupo){
					if(grupo.genero === genero && grupo.tipo === tipo){
						let obj = {
							id: grupo.id,
							text: grupo.nombre
						};
						self.grupos.push(obj);
					}
				});
			},
			/*
				@Descripción:
					Obtiene todos los tipos de procarianos de la base de datos
					Los almacena dentro de self.tipos
	    */
			obtenerTiposProcariano(self){
				self.tipos = [];
	    	$.ajax({
	    		type: 'GET',
	    		url: '/api/tipo/',
	    		success(res){
	    			self.armarArrayTipos(res.sequelizeStatus, self);
	    		}
	    	});
			},
			/*
				@Descripción:
					Arma el array de tipos obtenidos de la base de datos
				@Params:
					tipos -> tipos obtenidos de la base de datos
	    */
			armarArrayTipos(tipos, self){
				$.each(tipos, function(index, tipo){
	    		let tipoObj = {
	    			id: tipo.id,
	    			text: tipo.nombre
	    		};
	    		self.tipos.push(tipoObj);
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
		        self.editarProcariano();
		      }).catch(() => {
	          self.abrirModalError(self.errors.errors[0].field, self.errors.errors[0].msg);
		      });
				}
			},
			editarProcariano(){
				let self = this;
				var path = window.location.pathname;
				let id = path.split('/')[3];
				self.flag = false;
      	var urlApi = '/api/procarianos/' + id;
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
	    },
	    abrirModalCambioGrupo(self){
	    	self.grupoprocariano.text = $('#grupoSelect option:selected').text();
	    	self.grupoprocariano.id = $('#grupoSelect option:selected').val();

	    	$('#modalCambioGrupo').modal('open');
	    },
	    cambiarDeGrupo(){
	    	let self = this;
	    	let dataObj = {
	    		idGrupoPrev: self.tempGrupoPrevio.id,
	    		idGrupoNuevo: self.grupoprocariano.id
	    	};
	    	$.ajax({
	    		type: 'PUT',
	    		url: '/api/pg/' + self.procariano.procarianoID,
	    		data: dataObj,
	    		success(res){
	    			let msjErrorEditar = 'No se pudo editar ni crear el nuevo registro';
	    			let msjErrorCrear = 'Se pudo editar pero no crear el nuevo registro';

	    			if(res.status){
	    				//tempGrupoPrevio ahora es el mismo valor que el grupo actual. Para futuros cambios
	    				const auxId = self.grupoprocariano.id;
	    				const auxText = self.grupoprocariano.text;
	    				self.tempGrupoPrevio.id = auxId;
	    				self.tempGrupoPrevio.text = auxText;
	    				Materialize.toast('Procariano cambiado de grupo', 4000, 'rounded');
	    			}else if( !res.status && res.mensaje === msjErrorEditar ){
	    				//Regresa al valor previo ya que no se pudo realizar el cambio
	    				const tempGrupoPrevioId = self.tempGrupoPrevio.id;
	    				const tempGrupoPrevioText = self.tempGrupoPrevio.text;
	    				self.grupoprocariano.id = tempGrupoPrevioId;
	    				self.grupoprocariano.text = tempGrupoPrevioText;
	    				Materialize.toast('No se pudo cambiar de grupo', 4000, 'rounded tooltip-error');
	    			}else if( !res.status && res.mensaje === msjErrorCrear ){
	    				//Regresa al valor previo ya que no se pudo realizar el cambio
	    				const tempGrupoPrevioId = self.tempGrupoPrevio.id;
	    				const tempGrupoPrevioText = self.tempGrupoPrevio.text;
	    				self.grupoprocariano.id = tempGrupoPrevioId;
	    				self.grupoprocariano.text = tempGrupoPrevioText;
	    				Materialize.toast('No se pudo añadir al nuevo grupo', 4000, 'rounded tooltip-error');
	    			}
	    		},
	    		error(err){
	    			console.log(err)
	    		}
	    	});
	    },
	    cancelarCambioDeGrupo(){
	    	let self = this;
	    	const tempGrupoPrevioId = self.tempGrupoPrevio.id;
				const tempGrupoPrevioText = self.tempGrupoPrevio.text;
				self.grupoprocariano.id = tempGrupoPrevioId;
				self.grupoprocariano.text = tempGrupoPrevioText;
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