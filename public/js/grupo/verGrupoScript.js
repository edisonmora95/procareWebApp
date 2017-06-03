/*
	@Descripción: Controlador de la vista de verGrupo.ejs
	@Autor: @edisonmora95
	@FechaCreación: 3/06/2017
*/
import Navbar from './../../components/navbar.vue';

Vue.component('navbar', Navbar); 

let verGrupoApp = new Vue({
	el: '#verGrupoApp',
	created(){

	},
	mounted(){

	},
	data: {
		grupo: {
			nombre: 'Grupo #1',
			animador: 'Luis Andino'
		},
		integrantes: [
			{
				nombres: 'Edison',
				apellidos: 'Mora',
				fechaNacimiento: '27/06/1995',
				cedula: '0927102848',
				celular: '0992556793',
				convencional: '042438648'
			},
			{
				nombres: 'Jose',
				apellidos: 'Viteri',
				fechaNacimiento: '1/05/1995',
				cedula: '0925480256',
				celular: '0995268745',
				convencional: '042568975'
			},
			{
				nombres: 'Jorge',
				apellidos: 'Rodriguez',
				fechaNacimiento: '1/06/1995',
				cedula: '0925874563',
				celular: '0995478563',
				convencional: '042568795'
			},
			{
				nombres: 'Erick',
				apellidos: 'Perez',
				fechaNacimiento: '5/04/1993',
				cedula: '0956897456',
				celular: '0985632145',
				convencional: '042587495'
			},
			{
				nombres: 'Jose',
				apellidos: 'Alcivar',
				fechaNacimiento: '05/05/1995',
				cedula: '0956874952',
				celular: '0987568954',
				convencional: '042568798'
			},
			{
				nombres: 'Jose',
				apellidos: 'Alcivar',
				fechaNacimiento: '05/05/1995',
				cedula: '0956874952',
				celular: '0987568954',
				convencional: '042568798'
			},
			{
				nombres: 'Jose',
				apellidos: 'Alcivar',
				fechaNacimiento: '05/05/1995',
				cedula: '0956874952',
				celular: '0987568954',
				convencional: '042568798'
			},
			{
				nombres: 'Jose',
				apellidos: 'Alcivar',
				fechaNacimiento: '05/05/1995',
				cedula: '0956874952',
				celular: '0987568954',
				convencional: '042568798'
			},
		],
		chicoSeleccionado: {}
	},
	methods: {
		//Eventos
		seleccionChico(chico){
			this.chicoSeleccionado = chico;
		}
	}
});