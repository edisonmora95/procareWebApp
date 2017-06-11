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
				<a class="waves-effect waves-light btn" id="btnCancelar" @click="cancelar">Cancelar</a>
				<a class="waves-effect waves-light btn pull right" id="btnContinuar" v-modal:mensajeGrupoCreado>Aceptar</a>
			</div>
		</div>
		<v-modal id="mensajeGrupoCreado">
			<div slot="content">
				<h5 class="center-align">El grupo fue creado de manera correcta.</h5>
			</div>
			<div slot="footer">
				<v-btn-link class="pull-right" waves-light modal flat @click="aceptarModal">Aceptar</v-btn-link>
			</div>
		</v-modal>
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
		data() {
			return{
				sinGrupo: [
					{
						id: '1',
						nombre: 'Edison'
					},
					{
						id: '2',
						nombre: 'Jose'
					},
					{
						id: '3',
						nombre: 'Erick'
					},
					{
						id: '4',
						nombre: 'Jorge'
					},
					{
						id: '5',
						nombre: 'Jose Viteri'
					}
				],
				conGrupo: [],
				flagVue: false
			}
		},
		methods: {
			//Eventos de botones
			cancelar(){
				//Regresar al menú principal
				/*this.flagVue = true;
				this.$emit('flagchanged', this.flagVue);
				$('select').material_select();*/
			},
			aceptar(){
				//Llamada a la api
				console.log('afdsadsa')
				$('#mensajeGrupoCreado').modal('open');
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
			}
		}
	}
</script>