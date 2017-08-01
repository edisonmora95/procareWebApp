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
		this.obtenerUsuario(this);
		this.obtenerGrupo(this);
	},
	mounted(){
		$('.modal').modal();
	},
	data: {
		idGrupo: 0,
		grupo: {},
		animador: {},
		etapa: {
			id: '',
			text: ''
		},
		integrantes: [],
		chicoSeleccionado: {},
		editar: false,
		puedeEditar: false
	},
	methods: {
		obtenerUsuario(self){
			$.ajax({
				type: 'GET',
				url: '/api/login/usuarios',
				success(res){
					self.usuario = res;
					let usuarioEsPersonal = self.verificarTipoUsuario(self, 'Personal');
					if(usuarioEsPersonal){
						self.puedeEditar = true;
					}
				}
			});
		},
		obtenerGrupo(self){
			let pathname = window.location.pathname;
			self.idGrupo = pathname.split('/')[2];
			$.ajax({
				type: 'GET',
				url: '/api/grupos/' + self.idGrupo,
				success(res){
					self.grupo = res.grupo;
					self.armarArrayIntegrantes(self, res.procarianos);
					let animadorObj = {
						nombres: res.procarianoAnimador.Persona.nombres + ' ' + res.procarianoAnimador.Persona.apellidos,
						id: res.procarianoAnimador.procarianoId
					};
					self.grupo.animadorId = animadorObj.id;
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
					self.grupo.etapaId = etapa.id;
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
			this.editar = true;
			$('select').material_select();
		},
		checkIsEmpty(obj){
			return $.isEmptyObject(obj);
		},
		eliminarGrupo(){
			
		},
		verificarTipoUsuario(self, tipo){
			let roles = self.usuario.roles;
			let flag = false;
			$.each(roles, function(index, rol){
				if(rol === tipo){
					flag = true;
					return false;
				}
			});
			return flag;
		}
	}
});
