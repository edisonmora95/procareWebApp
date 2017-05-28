<template>
	<div class="row">
		<form class="col s12">
			<div class="row" id="row-nombre-genero">
				<div class="input-field col s6">
					<input type="text" name="nombre" id="nombre" v-model="grupo.nombre" @input="nombreChange">
					<label for="nombre">Nombre del grupo</label>
				</div>
				<div class="input-field col s6">
					<select id="genero">
						<option value="" disabled selected class="optDis">Procare/Procare Mujeres</option>	
						<option value="1">Procare</option>
						<option value="2">Procare Mujeres</option>
					</select>
					<!--<label for="genero">Género</label>-->
				</div>
			</div>
			<div class="row" id="row-etapa-animador">
				<div class="input-field col s6">
					<select id="etapa">
						<option value="" disabled selected class="optDis">Etapa</option>	
						<option value="1">Iniciación</option>
						<option value="2">Primera etapa</option>
						<option value="3">Segunda etapa</option>
						<option value="4">Tercera etapa</option>
						<option value="5">Cuarta etapa</option>
						<option value="6">Quinta etapa</option>
					</select>
					<!--<label for="etapa">Etapa</label>-->
				</div>
				<div class="input-field col s6">
					<input type="text" name="animador" id="animador" v-model="grupo.animador" @input="animadorChange">
					<label for="animador">Animador</label>
				</div>
			</div>
			<div class="row" id="row-btn">
				<a class="waves-effect waves-light btn" id="btnCancelar" @click="cancelar">Cancelar</a>
				<a class="waves-effect waves-light btn pull right" id="btnContinuar" @click="continuar">Continuar</a>
			</div>
		</form>
	</div>
</template>

<script>
	/*
		@Descripción: Este componente es utilizado para crear un nuevo grupo. Escribir el nombre, escoger el animador, etc...
		@Autor: edisonmora95
		@FechaCreación: 26-05-2017
	*/
	module.exports = {
		props: ['flag'],
		data() {
			return{
				grupo: {
					nombre: '',
					animador: '',
				},
				animadores: [],
				flagVue: true
			}
		},
		methods: {
			//Eventos de botones
			cancelar(){
				//Regresar al menú principal
			},
			continuar(){
				//Lleva al siguiente componente, para escoger a los chicos
				this.flagVue = false;
				this.$emit('flagchanged', this.flagVue);
			},
			nombreChange(){
				this.$emit('nombrechanged', this.grupo.nombre);
			},
			animadorChange(){
				this.$emit('animadorchanged', this.grupo.animador);
			}
		}
	}



</script>