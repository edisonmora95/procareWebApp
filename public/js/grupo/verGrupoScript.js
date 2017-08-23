/*
	@Descripción: Controlador de la vista de verGrupo.ejs
	@Autor: @edisonmora95
	@FechaCreación: 3/06/2017
*/
import EditarGrupo from './../../components/editarGrupo.vue';

Vue.component('editar-grupo', EditarGrupo);

let verGrupoApp = new Vue({
	el: '#verGrupoApp',
	created(){
		this.obtenerUsuarioContectado(this);
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
		puedeEditar: false,
		logoImagen: ''
	},
	methods: {
		//////////////////////////////////////////////////
		//Llamadas a la base de datos
		//////////////////////////////////////////////////
		obtenerUsuarioContectado(self){
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
						id: res.procarianoAnimador.procarianoId,
						genero: res.procarianoAnimador.Persona.genero
					};
					self.grupo.animadorId = animadorObj.id;
					self.animador = animadorObj;
					self.obtenerEtapaDeGrupo(self, res.grupo.Etapas);
					self.generoUsuarioImagen();			
				}
			});
		},
		armarArrayIntegrantes(self, procarianos){
			self.integrantes = [];
			$.each(procarianos, function(index, procariano){
				if(self.validarProcarianoEnGrupo(procariano)){
					let integranteObj = {
						idProcariano: procariano.idProcariano,
						nombre: procariano.Persona.nombres + ' ' + procariano.Persona.apellidos,
						idPersona: procariano.Persona.idPersona
					};
					self.integrantes.push(integranteObj);
				}
			});
			console.log(self.integrantes)
		},
		validarProcarianoEnGrupo(procariano){
			let fechaFin = procariano.Grupos[0].ProcarianoGrupo.fechaFin;
			if(fechaFin === null){
				return true;
			}else{
				return false;
			}
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
		/*
			creador : JV
			fecha : 11/08/2017
			@Descripción: Pone la imagen del logo en la navbar dependiendo si eres mujer u hombre
		*/
		generoUsuarioImagen(){
			let self = this;
			if (self.animador.genero == 'femenino'){
				self.logoImagen = '/images/logoProcareMujeres2.png';
			}else{
				self.logoImagen = '/images/logoProcareHombres2.png';
			}
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
