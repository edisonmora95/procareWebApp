<template>
	<div>
		<div class="row" id="row-escoger-chicos">
			<h4 class="center-align">{{grupo.nombre}}</h4>
			<div class="col s5 col-chicos" id="col-sin-grupo">
				<h5 class="center-align">Chicos sin grupo</h5>
				<ul>
					<li v-for="chico in sinGrupo" :id="chico.id" @click="anadir(chico)">{{chico.nombre}}</li>
				</ul>
			</div>
			<div class="col s5  col-chicos pull right" id="col-con-grupo">
				<h5 class="center-align">Chicos en grupo</h5>
				<ul>
					<li v-for="chico in conGrupo" :id="chico.id" @click="quitar(chico)">{{chico.nombre}}</li>
				</ul>
			</div>
			<div class="col s12" id="col-btn">
				<a class="waves-effect waves-light btn pull right" id="btnContinuar" @click="aceptar">Aceptar</a>
			</div>
		</div>
		<!-- Modal Structure -->
	  <div id="mensajeGrupoCreado" class="modal">
	    <div class="modal-content">
	      <h5 class="center-align">El grupo fue creado de manera correcta.</h5>
	    </div>
	    <div class="modal-footer">
	      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" @click="aceptarModal">Aceptar</a>
	    </div>
	  </div>
	  <!-- Modal Structure -->
	  <div id="mensajeError" class="modal">
	    <div class="modal-content">
	      <h5 class="center-align">¡Error!</h5>
	      <p class="center-align">{{mensajeError}}</p>
	    </div>
	    <div class="modal-footer">
	      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
	    </div>
	  </div>
	</div>
</template>

<script>
	/*
		@Descripción: Este componente es usado para seleccionar a los chicos sin grupo al grupo que se está creando
		@Autor: @edisonmora95
		@FechaCreación: 26-05-2017
	*/
	'use strict';

	import Materials from 'vue-materials';
	Vue.use(Materials);

	module.exports = {
		props: ['grupo'],
		created(){
			this.obtenerChicosFormacion();
		},
		mounted(){
			$('.modal').modal();
		},
		data() {
			return{
				sinGrupo: [],
				conGrupo: [],
				flagVue: false,
				integrantes: [],
				mensajeError: ''
			}
		},
		methods: {
			obtenerChicosFormacion(){
				let self = this;
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
			//Eventos de botones
			aceptar(){
				let self = this;
				self.armarArray(self);
				self.agregarAGrupo(self);
			},	
			agregarAGrupo(self){
				$.ajax({
					type: 'POST',
					url: '/api/pg/',
					data: {integrantes: JSON.stringify(self.integrantes)},
					success(res){
						console.log(res)
						if(res.status === true){
							$('#mensajeGrupoCreado').modal('open');
						}else if(res.status === false){
							if(res.hasOwnProperty('errors')){
								let mensajeSequelize = res.sequelizeStatus.errors[0].message;
								if( mensajeSequelize === 'PRIMARY must be unique'){
									self.crearMensajeError(self, res);
								}
							}else{
								self.mensajeError = 'Error al ingresar a los procarianos al grupo';
							}
							$('#mensajeError').modal('open');
						}
					},
					error(err){
						self.mensajeError = 'No se pudo conectar con el servidor';
						$('#mensajeError').modal('open');
						console.log(err);
					}
				});
			},
			buscarProcariano(self, idProcariano){
				let nombre = '';
				$.each(self.conGrupo, function(index, procariano){
					if(procariano.id == idProcariano){
						nombre = procariano.nombre
						return false;
					}
				});
				return nombre;
			},
			crearMensajeError(self, res){
				let valueError = res.sequelizeStatus.errors[0].value;
				let idProcarianoError = valueError.split('-')[1];
				let nombreProcariano = self.buscarProcariano(self, idProcarianoError);
				self.mensajeError = 'No se puede ingresar a los procarianos porque ' + nombreProcariano + ' pertenece a otro grupo';
			},
			anadir(chico){
				//Añade al chico seleccionado al grupo
				this.conGrupo.push(chico);
				this.sinGrupo.splice(this.sinGrupo.indexOf(chico), 1);
			},
			quitar(chico){
				//Quita al chico seleccionado del grupo
				this.sinGrupo.push(chico);
				this.conGrupo.splice(this.conGrupo.indexOf(chico), 1);
			},
			aceptarModal(){
				//Debe regresar al menú principal
				window.location.href = '/grupos/';
			},
			armarArray(self){
				self.integrantes = [];
				$.each(self.conGrupo, function(index, chico){
					let integrante = {
						fechaInicio: new Date(),
						fechaFin: null,
						GrupoId: parseInt(self.grupo.id),
						ProcarianoId: parseInt(chico.id)
					};
					self.integrantes.push(integrante);
				});
			}
		}
	}
</script>