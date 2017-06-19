/*
	@Descripción: Controlador de la vista de buscarGrupo. Permisos:
		* Si el usuario es Director Ejecutivo o Personal, tiene acceso a todos los grupos.
		* Si el usuario es Director de Formación, tiene acceso solo a los grupos de Procare o Procare Mujeres dependiendo de su género.
		* Si el usuario es Animador, no tiene acceso a esta página... Solo se muestra el grupo al que pertenece.
	@Autor: @edisonmora95
	@FechaCreación: 31/05/2017
*/

import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';

Vue.use(Materials);
Vue.component('navbar', Navbar); 

let BuscarGrupoApp = new Vue({
	el: '#BuscarGrupoApp',
	created: function(){
		this.obtenerUsuario();
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
			etapa: '',
			genero: ''
		},
		usuario: {}
	},
	methods: {
		obtenerUsuario(){
			//Codigo para obtener el usuario loggeado
			let self = this;
			self.usuario = {
				nombre: '',
				tipo: 'director formacion',
				grupo: '',
				genero: 'masculino'
			};
			if(self.usuario.tipo === 'director formacion'){
				if(self.usuario.genero === 'masculino'){
					self.grupo.genero = 'Procare';
				}else if(self.usuario.genero === 'femenino'){
					self.grupo.genero = 'Procare Mujeres';
				}
			}
		},
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