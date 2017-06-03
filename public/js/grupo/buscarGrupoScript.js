/*
	@Descripción: Controlador de la vista de buscarGrupo.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/05/2017
*/

import Navbar from './../../components/navbar.vue';

Vue.component('navbar', Navbar); 

let BuscarGrupoApp = new Vue({
	el: '#BuscarGrupoApp',
	created: function(){

	},
	mounted: function(){
		//Inicializadores de componentes de Materialize
		$('.modal').modal();
		$('select').material_select();
		$('.tooltipped').tooltip({delay: 50});
		//Flujo
	},
	data: {
		grupos: [],
		/*grupo:{
			nombre: '',
			anio: '',
			animador: '',
			etapa: ''
		}*/
		aux: [
			{
				nombre: 'Grupo de Mario',
				etapa: 'Quinta etapa',
				animador: 'Mario Montalván'
			},
			{
				nombre: 'Grupo de Fernando',
				etapa: 'Quinta etapa',
				animador: 'Fernando Icaza'
			},
			{
				nombre: 'Grupo de Luis',
				etapa: 'Quinta etapa',
				animador: 'Luis Andino'
			},
			{
				nombre: 'Grupo de Bernardo',
				etapa: 'Quinta etapa',
				animador: 'Bernardo Meitzner'
			}
		],
		grupo:{
			nombre: '',
			anio: new Date().getFullYear(),
			animador: '',
			etapa: ''
		}

	},
	methods: {
		//Eventos
		buscar(){
			let self = this;
			let campoLleno = false;	//Bandera que indicará si hay por lo menos un campo de búsqueda lleno.
			self.grupos = [];	//Lo vacío por si acaso...
			console.log(self.grupo);
			//Primero revisa si por lo menos un campo está lleno
			$.each(self.grupo, (property, value) => {
				if(value !== ''){
					campoLleno = true;
					return false;
				}
			});
			if(campoLleno){
				//Llamada a la api...
				$.each(self.aux, (index, grupo) => {
					self.grupos.push(grupo);
				});
			}else{
				Materialize.toast('Llene por lo menos un campo de búsqueda.', 3000, 'rounded');
			}
			
		}
	}
});

//2 way data binding
$('#etapaSelect').change(function(){
	BuscarGrupoApp.$data.grupo.etapa = $('#etapaSelect option:selected').text();
});