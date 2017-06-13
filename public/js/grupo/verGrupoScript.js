/*
	@Descripción: Controlador de la vista de verGrupo.ejs
	@Autor: @edisonmora95
	@FechaCreación: 3/06/2017
*/
import Navbar from './../../components/navbar.vue';
import EditarGrupo from './../../components/editarGrupo.vue';
import EscogerChicos from './../../components/escogerChicos.vue';

Vue.component('navbar', Navbar);
Vue.component('editar-grupo', EditarGrupo);
Vue.component('chicos-grupo', EscogerChicos);

let verGrupoApp = new Vue({
	el: '#verGrupoApp',
	created(){

	},
	mounted(){

	},
	data: {
		usuario: 'personal',
		grupo: {
			nombre: 'Grupo #1',
			animador: 'Luis Andino',
			genero: '1',
			etapa: 'Quinta etapa'
		},
		integrantes: [
			{
			  "id": 1,
			  "nombres": "Cart",
			  "apellidos": "Luton",
			  "fechaNacimiento": "13/07/1990",
			  "cedula": "46-5990062",
			  "celular": "988-13-1683",
			  "convencional": "357-32-4321"
			}, {
			  "id": 2,
			  "nombres": "Lanette",
			  "apellidos": "Clayborn",
			  "fechaNacimiento": "02/08/1991",
			  "cedula": "36-5271501",
			  "celular": "859-75-7411",
			  "convencional": "399-22-6973"
			}, {
			  "id": 3,
			  "nombres": "Sayers",
			  "apellidos": "Alyokhin",
			  "fechaNacimiento": "26/09/2013",
			  "cedula": "88-6676700",
			  "celular": "988-86-8004",
			  "convencional": "905-05-2871"
			}, {
			  "id": 4,
			  "nombres": "Linnell",
			  "apellidos": "Swanbourne",
			  "fechaNacimiento": "06/11/1991",
			  "cedula": "10-5216070",
			  "celular": "351-45-6967",
			  "convencional": "256-64-0884"
			}, {
			  "id": 5,
			  "nombres": "Mendie",
			  "apellidos": "Poytress",
			  "fechaNacimiento": "18/12/1990",
			  "cedula": "24-6063644",
			  "celular": "165-94-4766",
			  "convencional": "656-56-9311"
			}, {
			  "id": 6,
			  "nombres": "Tedman",
			  "apellidos": "Perrins",
			  "fechaNacimiento": "30/04/1992",
			  "cedula": "31-8383073",
			  "celular": "176-64-4204",
			  "convencional": "892-35-4355"
			}, 
		],
		chicoSeleccionado: {},
		editar: false
	},
	methods: {
		//Eventos
		seleccionChico(chico){
			this.chicoSeleccionado = chico;
		},
		habilitarEditar(){
			if(this.usuario === 'personal'){
				this.editar = true;
				$('select').material_select();
			}
		},
		checkIsEmpty(obj){
			return $.isEmptyObject(obj);
		},
		eliminar(){
			
		}
	}
});
