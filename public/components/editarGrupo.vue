<template>
	<div>
		<div class="row">
			<h5 class="center-align">Editar grupo</h5>
			<h6 class="center-align">Información general</h6>
			<form class="col s12">
				<div class="row" id="row-nombre-genero">
					<div class="input-field col s6">
						<input type="text" name="nombre" id="nombre" v-model="grupo.nombre">
						<label for="nombre" class="active">Nombre del grupo</label>
					</div>
					<div class="input-field col s6">
						<v-select   name="genero"
	                      id="genero"
	                      v-model="grupo.genero"
	                      select-text="Procare/Procare Mujeres">
							<option value="1">Procare</option>
							<option value="2">Procare Mujeres</option>
	          </v-select>
					</div>
				</div>
				<div class="row" id="row-etapa-animador">
					<div class="input-field col s6">
						<v-select id="etapa"
											name="etapa"
											v-model="grupo.etapa"
											select-text="Etapa">
							<option value="Iniciación">Iniciación</option>
							<option value="Primera etapa">Primera etapa</option>
							<option value="Segunda etapa">Segunda etapa</option>
							<option value="Tercera etapa">Tercera etapa</option>
							<option value="Cuarta etapa">Cuarta etapa</option>
							<option value="Quinta etapa">Quinta etapa</option>
						</v-select>
					</div>
					<div class="input-field col s6">
						<input type="text" name="animador" id="animador" v-model="grupo.animador">
						<label for="animador" class="active">Animador</label>
					</div>
				</div>
				<div class="row">
					<a class="waves-effect waves-light btn" @click="cancelar">Cancelar</a>
					<a class="waves-effect waves-light btn pull right" @click="aceptar">Aceptar</a>
				</div>
			</form>
		</div>
		<div class="row" id="row-escoger-chicos">
			<h6 class="center-align">Selección de integrantes</h6>
			<div class="col s5 col-chicos" id="col-sin-grupo">
				<h5 class="center-align">Chicos sin grupo</h5>
				<ul id="chicosSinGrupo">
					<li v-for="chico in sinGrupo" :id="chico.id" @click="anadir(chico)">{{chico.nombres}}</li>

				</ul>
			</div>
			<div class="col s5  col-chicos pull right" id="col-con-grupo">
				<h5 class="center-align">Chicos en grupo</h5>
				<ul id="integrantes">
					<li v-for="chico in integrantes" :id="chico.id" @click="quitar(chico)">{{chico.nombres}}</li>
				</ul>
			</div>
			<div class="col s12" id="col-btn">
				<a class="waves-effect waves-light btn" id="btnCancelar" @click="cancelar">Cancelar</a>
				<a class="waves-effect waves-light btn pull right" id="btnContinuar" @click="aceptar">Aceptar</a>
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
		props: ['grupo', 'integrantes'],
		mounted(){
			$('select').material_select();
		},
		data() {
			return{
				animadores: [],
				finEdicion: false,
				sinGrupo: [
					{
					  "id": 7,
					  "nombres": "Felipe",
					  "apellidos": "Harnes",
					  "fechaNacimiento": "10/11/2000",
					  "cedula": "30-9393333",
					  "celular": "746-88-3719",
					  "convencional": "645-28-2793"
					}, {
					  "id": 8,
					  "nombres": "Roxanne",
					  "apellidos": "Rouke",
					  "fechaNacimiento": "19/12/1983",
					  "cedula": "96-0002895",
					  "celular": "572-50-4057",
					  "convencional": "410-79-5504"
					}, {
					  "id": 9,
					  "nombres": "Gwen",
					  "apellidos": "Calrow",
					  "fechaNacimiento": "24/04/1993",
					  "cedula": "36-0067759",
					  "celular": "755-03-1952",
					  "convencional": "679-80-8195"
					}, {
					  "id": 10,
					  "nombres": "Rowland",
					  "apellidos": "Ikringill",
					  "fechaNacimiento": "28/07/2016",
					  "cedula": "43-5975626",
					  "celular": "654-04-1659",
					  "convencional": "727-47-7809"
					}, {
					  "id": 11,
					  "nombres": "Caitlin",
					  "apellidos": "Edlington",
					  "fechaNacimiento": "21/06/1993",
					  "cedula": "12-0078481",
					  "celular": "510-02-4204",
					  "convencional": "723-00-0271"
					}, {
					  "id": 12,
					  "nombres": "Norri",
					  "apellidos": "Chinnock",
					  "fechaNacimiento": "21/11/2001",
					  "cedula": "20-7425474",
					  "celular": "279-31-0961",
					  "convencional": "369-85-8272"
					}, {
					  "id": 13,
					  "nombres": "Ettie",
					  "apellidos": "Avraam",
					  "fechaNacimiento": "23/10/1986",
					  "cedula": "40-7460034",
					  "celular": "446-33-3984",
					  "convencional": "843-24-6511"
					}, {
					  "id": 14,
					  "nombres": "Brook",
					  "apellidos": "Eborall",
					  "fechaNacimiento": "13/04/2005",
					  "cedula": "00-6515914",
					  "celular": "258-41-1356",
					  "convencional": "440-02-4743"
					}, {
					  "id": 15,
					  "nombres": "Delano",
					  "apellidos": "Borthwick",
					  "fechaNacimiento": "25/12/2005",
					  "cedula": "11-8355142",
					  "celular": "794-47-1935",
					  "convencional": "473-77-4596"
					}, {
					  "id": 16,
					  "nombres": "Titus",
					  "apellidos": "Jain",
					  "fechaNacimiento": "08/11/1998",
					  "cedula": "93-3077914",
					  "celular": "208-32-6174",
					  "convencional": "456-77-7588"
					}, {
					  "id": 17,
					  "nombres": "Liva",
					  "apellidos": "Lynd",
					  "fechaNacimiento": "23/08/2004",
					  "cedula": "59-4048294",
					  "celular": "137-57-6863",
					  "convencional": "123-67-3142"
					}, {
					  "id": 18,
					  "nombres": "Neel",
					  "apellidos": "Born",
					  "fechaNacimiento": "03/06/1985",
					  "cedula": "51-2373652",
					  "celular": "195-45-5370",
					  "convencional": "649-68-4279"
					}, {
					  "id": 19,
					  "nombres": "Valencia",
					  "apellidos": "Beine",
					  "fechaNacimiento": "06/05/1990",
					  "cedula": "35-9750258",
					  "celular": "228-93-1063",
					  "convencional": "947-63-5378"
					}, {
					  "id": 20,
					  "nombres": "Magdaia",
					  "apellidos": "Surmeyer",
					  "fechaNacimiento": "28/10/1994",
					  "cedula": "20-0717751",
					  "celular": "888-41-9494",
					  "convencional": "760-22-3515"
					}
				]
			}
		},
		methods: {
			//Eventos de botones
			anadir(chico){
				//Añade al chico seleccionado al grupo
				this.integrantes.push(chico);
				this.sinGrupo.splice(this.sinGrupo.indexOf(chico), 1);
			},
			quitar(chico){
				//Quita al chico seleccionado del grupo
				this.sinGrupo.push(chico);
				this.integrantes.splice(this.integrantes.indexOf(chico), 1);
			},
			cancelar(){
				this.$emit('edicionterminada', this.finEdicion);
			},
			aceptar(){
				this.$emit('edicionterminada', this.finEdicion);
			}
		}
	}
</script>