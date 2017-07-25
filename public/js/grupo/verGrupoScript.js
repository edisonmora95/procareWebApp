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
		this.obtenerGrupo(this);
	},
	mounted(){
		$('.modal').modal();
	},
	data: {
		idGrupo: 0,
		usuario: 'personal',
		grupo: {
			nombre: 'Grupo #1',
			animador: 'Luis Andino',
			genero: '1',
			etapa: 'Quinta etapa'
		},
		animador: {},
		etapa: {
			id: '',
			text: ''
		},
		integrantes: [],
		chicoSeleccionado: {},
		editar: false
	},
	methods: {
		obtenerGrupo(self){
			let pathname = window.location.pathname;
			self.idGrupo = pathname.split('/')[2];
			$.ajax({
				type: 'GET',
				url: '/api/grupos/' + self.idGrupo,
				success(res){
					console.log(res)
					self.grupo = res.grupo;
					self.armarArrayIntegrantes(self, res.procarianos);
					let animadorObj = {
						nombres: res.procarianoAnimador.Persona.nombres + ' ' + res.procarianoAnimador.Persona.apellidos,
						id: res.procarianoAnimador.procarianoId
					};
					self.animador = animadorObj;	
					self.obtenerEtapaDeGrupo(self, res.grupo.Etapas);				
				}
			});
		},
		armarArrayIntegrantes(self, procarianos){
			self.integrantes = [];
			$.each(procarianos, function(index, procariano){
				let integranteObj = {
					idProcariano: procariano.idProcariano,
					nombre: procariano.Persona.nombres + ' ' + procariano.Persona.apellidos,
					idPersona: procariano.Persona.idPersona
				};
				self.integrantes.push(integranteObj);
			});
		},
		obtenerEtapaDeGrupo(self, etapas){
			$.each(etapas, function(index, etapa){
				let fechaFin = etapa.GrupoEtapa.fechaFin;
				if(fechaFin === null){
					self.etapa.id = etapa.id;
					self.etapa.text = etapa.nombre;
					return false;
				}
			});		
		},
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
		eliminarGrupo(){
			
		}
	}
});
